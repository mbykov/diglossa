//
import { remote } from "electron";

import _ from "lodash";
const path = require('path')
const log = console.log

const app = remote.app;
const apath = app.getAppPath()
let upath = app.getPath("userData")
let fse = require('fs-extra')

let dbPath = path.resolve(upath, 'pouch')
let libPath = path.resolve(upath, 'pouch/library')
let ftPath = path.resolve(upath, 'pouch/fulltext')

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
// let libdb = new PouchDB(libPath)

let limit = 20

export function getInfo(info_id) {
  return libdb.get(info_id)
}

export function getLib(libdb) {
  let options = {
    include_docs: true,
    startkey: 'info',
    endkey: 'info\ufff0'
  }
  return libdb.allDocs(options)
}

export function getText(current, endpos) {
  let fpath = current.fpath
  let start = current.pos*1 || 0
  let end = endpos*1 || start*1 + limit*1
  let selector = {fpath: fpath, pos: {$gte: start, $lt: end}}
  // log('=pouch-text-selector=:', selector)
  return libdb.find({selector: selector}) // sort: ['idx'], , limit: 20
  // return libdb.explain({selector: selector})
}
