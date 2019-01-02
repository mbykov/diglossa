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

export function getInfoFiles(fns, cb) {
  if (!fns || !fns.length) return
  let info
  let book
  let progress = q('#progress')
  progress.classList.add('is-shown')
  let infopath = fns[0]
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
  // info.sections = []
  info.nics = []
  log('INFO', info)
  book = getDir(info)
  pushBook(info, book)
    .then(function(res) {
      log('PUSH BOOK OK')
      cb(true)
    })
    .catch(function(err) {
        log('PUSH BOOK ERR:', err)
    })

  log('BOOK', book.pars[10])
  let aups = _.filter(book.pars, par=> { return par.author })
  log('AUPS', aups[100])
  log('INFO', info)
  return
}

function getDir(info) {
  // здесь тип файла
  const dtree = dirTree(info.bpath);
  log('TD', dtree)
  let fulltree = walk(dtree.children)
  let pars = []
  let map = {}
  let book = walkRead(info, fulltree, pars)
  let children = _.clone(fulltree)
  let tree = shortTree(children, info.bpath)
  info.tree = tree
  log('TREE', tree)
  return book
}

function shortTree(children, bpath) {
  children.forEach(child=> {
    if (child.children && child.file) {
      let fpath = child.children[0].split(bpath)[1].split('.')[0]
      child.fpath = fpath.replace(/^\//, '')
      child.children = child.children.length
    } else if (child.children) {
      shortTree(child.children, bpath)
      child.children.forEach(child=> {
      })
    } else {
      log('CANT BE')
    }
  })
  return children
}

function walkRead(info, children, pars) {
  children.forEach(child=> {
    if (child.file) {
      child.children.forEach(fn=> {
        readFile(info, fn, pars)
      })
    } else {
      walkRead(info, child.children, pars)
    }
  })
  info.nics = _.uniq(info.nics)
  // let book = {pars: pars, mapdocs: mapdocs}
  let book = {pars: pars}
  return book
}

function readFile(info, fn, pars) {
  let ext = path.extname(fn)
  if (!ext) return
  if (['.info', '.json', '.txt'].includes(ext)) return
  let nic = ext.replace(/^\./, '')
  info.nics.push(nic)
  let auth = _.find(info.auths, auth=> { return auth.nic == nic})
  let lang = (auth && auth.lang) ? auth.lang : 'lang'
  let txt
  try {
    txt = fse.readFileSync(fn, 'utf8')
  } catch(err) {
    txt = ['can not read file:', fn].join(' ')
    log('TXT ERR:', txt)
  }
  let dirname = path.dirname(fn)
  dirname = slash(dirname)
  // let fpath = dirname.split(info.bpath)[1]
  // если тае определить fpath, то при одинаковых basename в разных директориях - конфликт
  let fpath = path.basename(fn).split('.')[0]
  fpath = slash(fpath)
  fpath = fpath.replace(/^\//, '')
  // info.sections.push(fpath)
  let clean = txt.trim().replace(/\n+/, '\n').replace(/\s+/, ' ')
  let rows = _.compact(clean.split('\n'))
  rows.forEach((row, idx)=> {
    let groupid = ['text', info.book.author, info.book.title, fpath, idx].join('-')
    let parid = [groupid, nic].join('-')
    let par = { _id: parid, infoid: info._id, pos: idx, nic: nic, fpath: fpath, lang: lang, text: row }
    if (auth && auth.author) {
      par.author = true
      // bookWFMap(map, row, groupid)
    }
    pars.push(par)
  })
}

function walk(children) {
  let dirs = _.filter(children, child=> { return child.type == 'directory' })
  let files = _.filter(children, child=> { return child.type == 'file' })
  // log('D', dirs)
  // log('F', files)
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
  // log('GR', grouped)
  for (let name in grouped) {
    let child = {text: name, children: grouped[name].map(obj=> { return obj.fn.path}), file: true}
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
