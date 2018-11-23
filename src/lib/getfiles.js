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

// const Store = require('electron-store')
// const store = new Store()

// const Apstore = require('./apstore')
// const apstore = new Apstore()

// const yuno = require('../../../yunodb')
// const storage = require('electron-json-storage')

function extractAllText(str){
  const re = /"(.*?)"/g
  const results = []
  let current
  while (current == re.exec(str)) {
    results.push(current.pop())
  }
  return results
}

export function openODS(fpath, cb) {
  if (fpath === undefined) return
  try {
    textract.fromFileWithPath(fpath, {preserveLineBreaks: true, delimiter: '|'}, function(err, str) {
      // parseCSV(str)
      cb(true)
    })
  } catch (err) {
    if (err) log('ODS ERR', err)
    cb(false)
  }
}

function parseCSV(str) {
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
  // localStorage.setItem('auths', JSON.stringify(auths))
  // localStorage.setItem('book', JSON.stringify(book))
}

export function openDir(bookpath, cb) {
  if (!bookpath) return
  try {
    let book = parseDir(bookpath)
    cb(book)
  } catch (err) {
    if (err) log('NO INFO FILE')
    cb(false)
  }
}

function walk(info, fns, dname, dtree, tree) {
  let fpath = dtree.path.split(dname)[1]
  if (!fpath) fpath = info.book.title
  tree.text = fpath.split('/').slice(-1)[0]
  tree.fpath = fpath.replace(/^\//, '')
  if (!dtree.children) return
  let hasFiles = false
  dtree.children.forEach(child=> {
    if (child.type == 'file') hasFiles = true
  })
  tree.hasFiles = hasFiles
  dtree.children.forEach((child, idx)=> {
    fns.push(dtree.path)
    if (child.type != 'directory') return
    if (!tree.children) tree.children = []
    tree.children.push({})
    walk(info, fns, dname, child, tree.children[idx])
  })
}

function parseDir(bookpath) {
  let bpath = path.resolve(__dirname, bookpath)
  let dname = bookpath.split('/').slice(-1)[0] // + '/'
  const dtree = dirTree(bpath)
  // log('=BPATH', bpath, bookpath)
  // log('=DTREE', dtree)
  if (!dtree) return
  let ipath = path.resolve(bpath, 'info.json')
  let info = parseInfo(ipath)
  log('=INFO', info)

  let fns = []
  let tree = {}
  walk(info, fns, dname, dtree, tree)
  log('=TREE', tree)
  fns = glob.sync('**/*', {cwd: bpath})

  // log('INFO', info)
  fns = _.filter(fns, fn=>{ return fn != ipath })
  // log('FNS', fns.length)

  let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)'
  let rePunct = new RegExp(punct, 'g')

  let infoid = ['info', info.book.author, info.book.title].join('-')
  info._id = infoid

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

    let txt = fse.readFileSync(path.resolve(bpath, fn), 'utf8')
    let clean = txt.trim().replace(/\n+/, '\n').replace(/\s+/, ' ')
    let rows = _.compact(clean.split('\n'))

    let fparts = fn.split('/')
    let fname = fparts.pop()
    let fpath = fparts.join('/')
    if (!fpath) fpath = info.book.title
    info.sections.push(fpath)

    let lang
    if (auth) lang = auth.lang

    rows.forEach((row, idx)=> {
      let groupid = ['text', info.book.author, info.book.title, fpath, idx].join('-')
      let parid = [groupid, nic].join('-')
      // let parid = [info.book.author, info.book.title, fpath, idx, nic].join('-')
      let par = { _id: parid, infoid: infoid, pos: idx, nic: nic, fpath: fpath, lang: lang, text: row }
      if (auth.author) {
        // let html = row.replace(rePunct, "<span class=\"active\">$1<\/span>")
        par.author = true
        // par.text = html
        // bookWFMap_(map, row, fpath, idx) // mango failes use index
        bookWFMap(map, row, groupid)
      }
      // if (comment) coms.push(par)
      // else pars.push(par)
      if (!comment) pars.push(par)
    })
  })

  nics = _.uniq(nics)
  info.tree = tree
  info.info = true
  info.bpath = bpath

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

  let book = {info: info, pars: pars, mapdocs: mapdocs}
  log('GETFILE BOOK:', book)
  return book
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


function parseInfo(ipath) {
  let info
  try {
    info = fse.readJsonSync(ipath)
  } catch (err) {
    log('ERR INFO', err)
    throw new Error()
  }
  let nicnames = {}
  info.auths.forEach(auth => {
    if (auth.author) {
      info.book.author = auth.name
      return
    }
    nicnames[auth.ext] = auth.name
  })
  info.nicnames = nicnames
  return info
}

function done (err) {
  if (err) throw err
  console.log('successfully added documents')
}
