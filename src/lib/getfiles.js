import _ from 'lodash'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import {nav} from '../app';

const fse = require('fs-extra')
const path = require('path')
const glob = require('glob')
const dirTree = require('directory-tree')
const textract = require('textract')
const log = console.log

export function parseODS(info, cb) {
  let bpath = info.bpath
  if (bpath === undefined) return
  try {
    textract.fromFileWithPath(bpath, {preserveLineBreaks: true, delimiter: '|'}, function(err, str) {
      let book = parseCSV(info, str)
      cb(book)
    })
  } catch (err) {
    if (err) log('ODS ERR', err)
    cb(false)
  }
}

function parseCSV(info, str) {
  let pars = []
  let map = {}
  let rows = str.split('\n')
  let size = rows[0].length
  let fpath = info.bpath.split('/')[info.bpath.split('/').length-2]

  rows.forEach((row, idx) => {
    if (row[0] == '#') return
    if (row == ',,') return
    let strs
    if (/","|,"|",/.test(row)) strs = row.split(/","|,"|",/)
    else strs = row.split(',')
    strs = _.compact(strs)
    strs.forEach((str, idy)=> {
      let auth = info.auths[idy]
      if (!auth) return
      let nic = auth.nic
      let lang = auth.lang
      let text = str.replace(/"/g, '')
      let groupid = ['text', info.book.author, info.book.title, fpath, idx].join('-')
      let parid = [groupid, nic].join('-')
      let par = { _id: parid, infoid: info._id, pos: idx, nic: nic, fpath: fpath, lang: lang, text: text }
      if (auth.author) par.author = true
      pars.push(par)
    })
  })
  let tree = {text: info.book.title, fpath: fpath}
  info.tree = tree
  info.info = true
  let mapdocs = []
  return {pars: pars, mapdocs: mapdocs}
}

function walk(dname, dtree, tree) {
  let fpath = dtree.path.split(dname)[1]
  tree.text = fpath.split('/').slice(-1)[0]
  tree.fpath = fpath.replace(/^\//, '')
  if (!dtree.children) return
  let hasFiles = false
  dtree.children.forEach(child=> {
    if (child.type == 'file') hasFiles = true
  })
  tree.hasFiles = hasFiles
  dtree.children.forEach((child, idx)=> {
    if (child.type != 'directory') return
    if (!tree.children) tree.children = []
    tree.children.push({})
    walk(dname, child, tree.children[idx])
  })
}

export function parseDir(info, cb) {
  let bpath = info.bpath
  const dtree = dirTree(bpath)
  if (!dtree) return

  let dname = info.bpath.split('/').slice(0,-1).join('/')
  let tree = {}
  walk(dname, dtree, tree)
  info.tree = tree
  info.info = true

  let fns = glob.sync('**/*', {cwd: bpath})

  // .txt ?
  fns = _.filter(fns, fn=>{ return path.extname(fn) != '.json' })

  let nics = []
  let pars = []
  let map = {}
  info.sections = []

  fns.forEach(fn => {
    let comment = false
    let com = fn.split('-')[1]
    if (com && com == 'com') comment = true, fn = fn.replace('-com', '')
    let ext = path.extname(fn)
    if (!ext) return
    if (ext == '.info') return
    if (ext == '.json') return
    let nic = ext.replace(/^\./, '')
    nics.push(nic)
    let auth = _.find(info.auths, auth=> { return auth.nic == nic})

    let fullpath = path.resolve(bpath, fn)
    let txt = fse.readFileSync(fullpath, 'utf8')
    let clean = txt.trim().replace(/\n+/, '\n').replace(/\s+/, ' ')
    let rows = _.compact(clean.split('\n'))

    let fpath = path.dirname(fullpath).split(dname)[1]
    fpath = fpath.replace(/^\//, '')
    info.sections.push(fpath)

    let lang
    if (auth) lang = auth.lang

    rows.forEach((row, idx)=> {
      let groupid = ['text', info.book.author, info.book.title, fpath, idx].join('-')
      let parid = [groupid, nic].join('-')
      let par = { _id: parid, infoid: info._id, pos: idx, nic: nic, fpath: fpath, lang: lang, text: row }
      if (auth.author) {
        par.author = true
        bookWFMap(map, row, groupid)
      }
      // if (comment) coms.push(par)
      // else pars.push(par)
      if (!comment) pars.push(par)
    })
  })

  nics = _.uniq(nics)

  let mapnics = {}
  for (let wf in map) {
    map[wf].forEach(groupid=> {
      nics.forEach(nic=> {
        let parid = [groupid, nic].join('-')
        if (!mapnics[wf]) mapnics[wf] = []
        mapnics[wf].push(parid)
      })
    })
  }
  let mapdocs = []
  for (let wf in mapnics) {
    let mapdoc = {_id: wf, parids: mapnics[wf]}
    mapdocs.push(mapdoc)
  }

  let book = {pars: pars, mapdocs: mapdocs}
  cb(book)
}

function bookWFMap(map, row, groupid) {
  let punctless = row.replace(/[.,\/#!$%\^&\*;:{}«»=\|\-+_`~()a-zA-Z0-9'"<>\[\]]/g,'')
  let wfs = _.compact(punctless.split(' '))
  wfs.forEach(wf=> {
    if (!map[wf]) map[wf] = []
    map[wf].push(groupid)
  })
}

// mango-find can not use indexes with $or
function bookWFMap_(map, row, fpath, pos) {
  let punctless = row.replace(/[.,\/#!$%\^&\*;:{}«»=\|\-+_`~()a-zA-Z0-9'"<>\[\]]/g,'')
  let wfs = _.compact(punctless.split(' '))
  wfs.forEach(wf=> {
    if (!map[wf]) map[wf] = []
    let mdoc = { fpath: fpath, pos: pos }
    map[wf].push(mdoc)
  })
}


export function parseInfo(info) {
  let nicnames = {}
  info.auths.forEach(auth => {
    if (auth.author) {
      info.book.author = auth.name
      return
    }
    nicnames[auth.nic] = auth.name
  })
  info.nicnames = nicnames
  let infoid = ['info', info.book.author, info.book.title].join('-')
  info._id = infoid
  return info
}
