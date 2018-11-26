import _ from 'lodash'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import {nav} from '../app';

const md5 = require('md5');
const fse = require('fs-extra')
const path = require('path')
const glob = require('glob')
const dirTree = require('directory-tree')
const textract = require('textract')
const log = console.log

function extractAllText(str){
  const re = /"(.*?)"/g
  const results = []
  let current
  while (current == re.exec(str)) {
    results.push(current.pop())
  }
  return results
}

export function parseODS(info, cb) {
  let bpath = info.bpath
  if (bpath === undefined) return
  try {
    textract.fromFileWithPath(bpath, {preserveLineBreaks: true, delimiter: '|'}, function(err, str) {
      let book = parseCSV(info, str)
      log('ODS INFO', info)
      log('ODS BOOK', book)
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
  // let nics = _.keys(info.nicnames)
  // log('NICS', nics)
  rows.forEach((row, idx) => {
    if (row[0] == '#') return
    if (row == ',,') return
    let clean
    let strs
    // if (/","/.test(row)) strs = row.split('","')
    if (/","|,"|",/.test(row)) strs = row.split(/","|,"|",/)
    else strs = row.split(',')
    strs = _.compact(strs)
    let fpath = 'FPATH'
    strs.forEach((str, idy)=> {
      let auth = info.auths[idy]
      // log('AUTH', idy, auth)
      if (!auth) log('STR', 111, str, 222)
      if (!auth) log('ROW', idy, row, strs)
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
  let mapdocs = []
  return {pars: pars, mapdocs: mapdocs}
}

function parseCSV_(info, str) {
  let rows = str.split('\n')
  let size = rows[0].length
  let book = {}
  rows.slice(0,2).forEach((row, idx) => {
    if (row[0] != '#') return
    if (/title/.test(row)) book.title = row.split(',')[0].split(':')[1].trim()
    else book.nics = row.split(',')
  })
  let nics = ['name_a', 'name_b', 'name_c']
  if (!book.nics) book.nics = nics.slice(1)
  book.author = nics[0]
  let auths = []
  nics.forEach((nic, idx) => {
    let auth = { idx: idx, nic: nic, rows: [] }
    if (nic == book.author) auth.author = true
    auths.push(auth)
  })
  log('ODS', info)
  log('ODS', rows.length)
  log('ODS-1', rows[0])

  return
  rows.forEach((row, idx) => {
    if (row[0] == '#') return
    if (row == ',,') return
    let matches = extractAllText(row)
    matches.forEach(str => {
      let corr = str.split(',').join('COMMA')
      row = row.replace(str, corr)
    })
    let cols = row.split(',')
    cols.forEach((col, idy) => {
      col = col.split('COMMA').join(',')
      if (col == ',') return
      // if (!auths[idy]) log('ERR', idy, row)
      auths[idy].rows.push(col)
    })
  })
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
  // log('=DTREE', dtree)
  if (!dtree) return

  let dname = info.bpath.split('/').slice(0,-1).join('/')
  // log('=DNAME', dname)
  let tree = {}
  walk(dname, dtree, tree)
  // log('=TREE', tree)
  info.tree = tree
  info.info = true
  // log('=TREEINFO', info)

  let fns = glob.sync('**/*', {cwd: bpath})

  // .txt ?
  fns = _.filter(fns, fn=>{ return path.extname(fn) != '.json' })

  // let infoid = ['info', info.book.author, info.book.title].join('-')
  // info._id = infoid

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
    let auth = _.find(info.auths, auth=> { return auth.ext == nic}) || nic

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
  log('GETFILE BOOK:', book)
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
    nicnames[auth.ext] = auth.name
  })
  info.nicnames = nicnames
  let infoid = ['info', info.book.author, info.book.title].join('-')
  info._id = infoid
  return info
}

function done (err) {
  if (err) throw err
  console.log('successfully added documents')
}
