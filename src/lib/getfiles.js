import _ from 'lodash'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import { navigate } from './nav'
import { pushBook } from './pouch'

const fse = require('fs-extra')
const JSON = require('json5')
const path = require('path')
const slash = require('slash')
const glob = require('glob')
const dirTree = require('directory-tree')
const textract = require('textract')
const log = console.log
const restricted = ['.info', '.json', '.txt']
// const rePuncts = new RegExp('[.,\/#!$%\^&\*;:{}«»=\|\-+_`~()a-zA-Z0-9\'"<>\[\]]', 'g')

export function getInfoFiles(infopath, cb) {
  let info
  try {
    let json = fse.readFileSync(infopath)
    info = JSON.parse(json)
    info = parseInfo(info)
  } catch(err) {
    log('INFO JSON ERR:', err)
  }

  let dir = path.parse(infopath).dir
  let bpath = path.resolve(dir, info.book.path)
  info.bpath = slash(bpath)
  info.infopath = slash(infopath)
  info.nics = []
  info.stats = []
  let book = getDir(info)
  pushBook(info, book)
    .then(function(res) {
      cb(true)
    })
    .catch(function(err) {
        log('PUSH BOOK ERR:', err)
    })
}

function getDir(info) {
  const dtree = dirTree(info.bpath);
  let fulltree = walk(dtree.children)
  let pars = []
  let map = {}
  let children = _.clone(fulltree)
  let tree = shortTree(children, info.bpath)
  info.tree = tree
  log('SHORT TREE', tree)
  walkRead(info, fulltree, pars, map)
  let mapdocs = _.values(map)
  let book = {pars: pars, mapdocs: mapdocs}
  return book
}

function shortTree(children, bpath) {
  children.forEach(child=> {
    if (child.children && child.file) {
      let fpath = child.children[0].split(bpath)[1].split('.')[0]
      child.fpath = fpath.replace(/^\//, '')
      let children = _.filter(child.children, child=> { return !child.author })
      child.cnics = children.map(fn=> { return path.extname(fn).replace('.', '') })
      child.nic = child.cnics[0]
      if (child.cnics.length == 1) child.mono = true
      // delete child.children
    } else if (child.children) {
      shortTree(child.children, bpath)
    }
  })
  return children
}

function walkRead(info, children, pars, map) {
  children.forEach(child=> {
    if (child.file) {
      child.children.forEach(fn=> {
        readFile(info, fn, pars, map)
      })
    } else {
      walkRead(info, child.children, pars, map)
    }
  })
  // хрень какая-то с никами здесь
  info.nics = _.uniq(info.nics)
}

function readFile(info, fn, pars, map) {
  let ext = path.extname(fn)
  if (!ext) return
  if (['.info', '.json', '.txt'].includes(ext)) return
  let nic = ext.replace(/^\./, '')
  info.nics.push(nic)
  let auth = _.find(info.auths, auth=> { return auth.nic == nic})
  let lang = (auth && auth.lang) ? auth.lang : 'lang'
  let txt
  let mypars = 0
  try {
    txt = fse.readFileSync(fn, 'utf8')
  } catch(err) {
    txt = ['can not read file:', fn].join(' ')
    log('TXT ERR:', txt)
  }
  let dirname = path.dirname(fn)
  dirname = slash(dirname)
  let fpath = fn.split(info.bpath)[1].split('.')[0]
  fpath = slash(fpath)
  fpath = fpath.replace(/^\//, '')

  // info.sections.push(fpath)
  let clean = txt.trim().replace(/\n+/, '\n') //.replace(/\s+/, ' ')
  let rows = _.compact(clean.split('\n'))
  rows.forEach((row, idx)=> {
    // if (idx == 0) log('ROW', row)
    // let groupid = ['text', info.book.author, info.book.title, fpath, idx].join('-')
    // let parid = [groupid, nic].join('-')
    let parid = ['text', info.book.author, info.book.title, fpath, idx, nic].join('-')
    let par = { _id: parid, infoid: info._id, pos: idx, nic: nic, fpath: fpath, lang: lang, text: row }
    if (auth && auth.author) {
      par.author = true
      bookWFMap(map, row, fpath, idx)
    }
    pars.push(par)
    mypars +=1
  })
  let stat = {fpath: fpath, nic: nic, pars: mypars}
  info.stats.push(stat)
}

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
function hashCode(s) {
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

function bookWFMap(map, row, fpath, pos) {
  let punctless = row.replace(/[.,\/#!$%\^&\*;:{}«»=\|\-+_`~()a-zA-Z0-9'"<>\[\]]/g,'')
  let wfs = _.uniq(_.compact(punctless.split(' ')))
  wfs.forEach(wf=> {
    let id = hashCode(wf)
    let doc = { fpath: fpath, pos: pos }
    if (!map[id]) map[id] = {wf: wf, docs: []}
    map[id].docs.push(doc)
  })
}

//   if (['.info', '.json', '.txt'].includes(ext)) return
function walk(children) {
  let dirs = _.filter(children, child=> { return child.type == 'directory' })
  let files = _.filter(children, child=> { return child.type == 'file' })
  // log('FILES', files)
  files = _.filter(files, fn=> { return !restricted.includes(fn.extension) })
  let grDirs = []
  dirs.forEach(dir=> {
    if (!dir.children.length) return
    let grDir = walk(dir.children)
    grDirs.push({text: dir.name, children: grDir})
  })
  let fileGrs = groupByName(files)
  children = []
  if (grDirs.length) children.push(grDirs)
  if (fileGrs.length) children.push(fileGrs)
  return _.flatten(children)
}

function groupByName(fns) {
  let children = []
  let names = fns.map(fn=> { return {name: _.first(_.last(fn.path.split('/')).split('.')), fn: fn}})
  let grouped = _.groupBy(names, 'name')
  for (let name in grouped) {
    let clean = name.replace(/_/g, ' ')
    let child = {text: clean, children: grouped[name].map(obj=> { return obj.fn.path}), file: true}
    children.push(child)
  }
  return children
}

function parseInfo(info) {
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
