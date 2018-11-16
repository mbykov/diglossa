//
import { remote } from "electron";

import _ from "lodash";
const path = require('path')
const log = console.log

const app = remote.app;
const apath = app.getAppPath()
let upath = app.getPath("userData")

let libPath = path.resolve(upath, 'library')
const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
let libdb = new PouchDB(libPath)
libdb.createIndex({
  index: {fields: ['fpath', 'idx']},
  name: 'myindex'
  // ddoc: 'mydesigndoc'
})


let limit = 20

export function getLib_() {
  let selector = { info: true }
  return libdb.find({ selector: selector })
}

export function getInfo(current) {
  return libdb.get(current.info_id)
}

export function getLib() {
  let options = {
    include_docs: true,
    startkey: 'info',
    endkey: 'info\ufff0'
  }
  return libdb.allDocs(options)
}


export function getText(fpath, start, end) {
  if (!start && !end) start = 0, end = start+limit
  let selector = {fpath: fpath, idx: {$gte: start, $lt: end}}
  return libdb.find({selector: selector}) // sort: ['idx'], , limit: 20
  // return libdb.explain({selector: selector})
}
