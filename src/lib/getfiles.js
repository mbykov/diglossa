import _ from 'lodash'
import { q, qs, empty, create, span, p, div, remove, getStore, setStore } from './utils'

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
  while (current = re.exec(str)) {
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
  localStorage.setItem('auths', JSON.stringify(auths))
  localStorage.setItem('book', JSON.stringify(book))
}

export function openDir(bookname, cb) {
  try {
    parseDir(bookname)
    cb(true)
  } catch (err) {
    if (err) log('DIR ERR', err)
    cb(false)
  }
}

function walk(dname, dtree, tree) {
  let fpath = dtree.path.split(dname)[1]
  tree.text = fpath.split('/').slice(-1)[0]
  tree.fpath = fpath.replace(/^\//, '')
  if (!dtree.children) return
  dtree.children.forEach((child, idx)=> {
    if (child.type != 'directory') return
    if (!tree.children) tree.children = []
    tree.children.push({})
    walk(dname, child, tree.children[idx])
  })
}

function parseDir(bookname) {
  let bpath = path.resolve(__dirname, bookname)
  let dname = bookname.split('/').slice(-1)[0] // + '/'
  const dtree = dirTree(bpath)
  // log('=DTR', dtree)
  let tree = {}
  walk(dname, dtree, tree)
  // log('=TREE', tree)

  let fns = glob.sync('**/*', {cwd: bpath})
  // log('FNS', fns)
  let ipath = _.find(fns, fn=>{ return /info.json/.test(fn) })
  ipath = path.resolve(bpath, ipath)
  // log('IPATH', ipath)
  if (!ipath) return
  let info = parseInfo(ipath)
  // log('INFO', info)
  fns = _.filter(fns, fn=>{ return fn != ipath })
  // log('FNS', fns.length)

  let book = {panes: [], coms: []}
  // let panes = []
  // let titles = []
  fns.forEach(fn => {
    let comment = false
    let com = fn.split('-')[1]
    if (com && com == 'com') comment = true, fn = fn.replace('-com', '')
    let ext = path.extname(fn)
    if (!ext) return
    let nic = ext.replace(/^\./, '')
    let auth = _.find(info.auths, auth=> { return auth.ext == nic})
    if (!auth) return
    let txt = fse.readFileSync(path.resolve(bpath, fn), 'utf8') //.toString()
    let clean = txt.trim().replace(/\n+/, '\n').replace(/\s+/, ' ')
    let rows = _.compact(clean.split('\n'))
    // log('R', rows)
    let fparts = fn.split('/')
    let fname = fparts.pop()
    let fpath = fparts.join('/')
    let pane = { lang: auth.lang, title: info.book.title, nic: nic, fpath: fpath, fname: fname, rows: rows }
    if (auth.author) book.author = pane
    else if (comment) book.coms.push(pane)
    else book.panes.push(pane)
    if (auth.author) book.map = bookWFMap(clean, info.book.title, fn)
  })
  book.title = info.book.title
  // info.nics = _.uniq(book.panes.map(auth => { return auth.nic }))
  info.tree = tree.children

  let lib = getStore('lib')
  lib[book.title] = info
  setStore('lib', lib)
  setStore(book.title, book)
  let current = {title: book.title}
  setStore('current', current)
}

function bookWFMap(text, title, fn) {
  let map = {}
  let pless = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9'"<>\[\]]/g,'')
  let rows = pless.split('\n')
  rows.forEach((row, idx)=> {
    let wfs = _.compact(row.split(' '))
    wfs.forEach(wf=> {
      if (!map[wf]) map[wf] = []
      map[wf].push({title: title, fn: fn, idx: idx})
    })
  })
  return map
}


function parseInfo(ipath) {
  let info
  try {
    info = fse.readJsonSync(ipath)
  } catch (err) {
    log('ERR INFO', err)
    throw new Error()
  }
  let nics = []
  info.auths.forEach(auth => {
    if (auth.author) return
    let nic = {nic: auth.ext, name: auth.name}
    nics.push(nic)
  })
  info.nics = nics
  info.nic = nics[0]
  return info
}

function getFiles_(bookname) {
  let bpath = path.resolve(__dirname, bookname)
  let dir = bpath.split('/')[bpath.split('/').length-1]
  let fns = glob.sync('**/*', {cwd: bpath})
  let info = _.filter(fns, fn=>{ return path.extname == '.info' })
  fns = _.filter(fns, fn=>{ return path.extname != '.info' })
  let book = {nics: []}
  let auths = []
  let author
  let titles = []
  fns.forEach(fn => {
    let comment = false
    let com = fn.split('-')[1]
    if (com && com == 'com') comment = true, fn = fn.replace('-com', '')
    let parts = fn.split('.')
    if (parts.length != 3) return
    let title = parts[0]
    titles.push(title)
    let lang = parts[1]
    let nic = parts[2]
    let txt = fse.readFileSync(path.resolve(bpath, fn)).toString()
    // no txt ?
    let rows = txt.split(/\n+/)
    let auth = { lang: lang, title: title, nic: nic, fn: fn, rows: rows }
    if (dir.toLowerCase() == nic.toLowerCase()) auth.author = true, book.author = nic, book.lang = lang
    else if (comment) auth.com = true
    if (!comment && !auth.author) book.nics.push(nic)
    auths.push(auth)
  })
  // if (_.uniq(titles).length != 1) return { err: 'different titles' } // тут нужно хитрее, неясно как
  localStorage.setItem('auths', JSON.stringify(auths))
  localStorage.setItem('book', JSON.stringify(book))
  return auths
}
