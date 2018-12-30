import _ from 'lodash'
import { q, qs, empty, create, span, p, div, remove } from './utils'
// import {nav} from '../app';

const fse = require('fs-extra')
const JSON = require('json5')
const path = require('path')
const slash = require('slash')
const glob = require('glob')
const dirTree = require('directory-tree')
const textract = require('textract')
const log = console.log

export function getInfoFiles(fns) {
  if (!fns || !fns.length) return
  let infopath = fns[0]
  let info
  try {
    let progress = q('#progress')
    progress.classList.add('is-shown')

    let json = fse.readFileSync(infopath)
    let info = JSON.parse(json)
    info = parseInfo(info)
    let dir = path.parse(infopath).dir
    let bpath = path.resolve(dir, info.book.path)
    info.bpath = slash(bpath)
    log('INFO', info)
    getDir(info)
  } catch(err) {
    log('INFO JSON ERR:', err)
  }
  return
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

function walk(children) {
  let dirs = _.filter(children, child=> { return child.type == 'directory' })
  let files = _.filter(children, child=> { return child.type == 'file' })
  log('D', dirs)
  log('F', files)
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
  return children
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

function getDir(info) {
  const dtree = dirTree(info.bpath);
  log('T', dtree)
  let tree = walk(dtree.children)
  log('T1', tree)

  return

  // log('BPATH', info.bpath)
  // let strs = glob.sync('**', {
  //   cwd: info.bpath,
  //   dot: true,
  //   mark: true,
  //   strict: true
  // })
  // log('GLOB', strs)
  // let tree = []
  // let dir = {text: null, children: []}
  // strs.forEach(str=> {
  //   if (_.last(str) == '/') {
  //     if (dir.children.length) {
  //       tree.push(_.clone(dir))
  //       dir = {text: null, children: []}
  //     }
  //     dir.text = str.slice(0,-1)
  //   } else {
  //     dir.children.push(str)
  //   }
  // })

  // if (dir.children.length) {
  //   if (!dir.text) {
  //     let last = _.last(info.bpath.split('/'))
  //     dir.text = last
  //   }
  //   dir.children = groupByName(dir.children)
  // }
  // // let hasFiles = false
  // // dir.children.forEach(child=> {
  // //   if (_.last(child.fn) == '/') hasFiles = true
  // // })
  // // dir.hasFiles = hasFiles
  // tree.push(_.clone(dir))
  // log('TREE', tree)
}
