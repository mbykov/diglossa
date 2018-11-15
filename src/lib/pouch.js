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
pouch.createIndex({
  index: {fields: ['info']},
});


let limit = 20

export function getLib() {
  let selector = { info: true }
  return pouch.find({ selector: selector })
}

export function getText(start, end) {
  if (!start && !end) start = 0, end = start+limit
  let selector = {fpath: 'Dialogues/Parmenides', idx: {$gte: start, $lt: end}}
  return pouch.find({selector: selector}) // sort: ['idx'], , limit: 20
}
