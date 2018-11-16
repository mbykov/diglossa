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
let pouch = new PouchDB(libPath)
pouch.createIndex({
  index: {fields: ['fpath', 'idx']}
})
// pouch.createIndex({
//   index: {fields: ['info']},
// });


let limit = 20

export function getLib_() {
  let selector = { info: true }
  return pouch.find({ selector: selector })
}

export function getInfo(current) {
  return pouch.get(current.info_id)
}


export function getLib() {
  let options = {
    include_docs: true,
    startkey: 'info',
    endkey: 'info\ufff0'
  }
  return pouch.allDocs(options)
}


export function getText(fpath, start, end) {
  if (!start && !end) start = 0, end = start+limit
  let selector = {fpath: fpath, idx: {$gte: start, $lt: end}}
  return pouch.find({selector: selector}) // sort: ['idx'], , limit: 20
}
