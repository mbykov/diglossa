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
// libdb.createIndex({
//   index: {fields: ['fpath', 'idx']},
//   name: 'fpathindex'
// })


let limit = 20

// export function getDBState() {
//   return libdb.get('_local/libstate')
// }

export function setDBState(psize) {
  let dbstate = {psize: psize}
  return libdb.get('_local/libstate')
    .then(function(doc) {
      log('DB-DOC:', doc)
      dbstate._id = '_local/libstate'
      if (doc) dbstate._rev = doc._rev
      return libdb.put(dbstate).then(function(res) {
        log('DB-STATE:', res)
      })
    }).catch(function (err) {
      log('DB-STATE-ERR:', err)
    })
}

export function getInfo(info_id) {
  return libdb.get(info_id)
}

export function getLib() {
  let options = {
    include_docs: true,
    startkey: 'info',
    endkey: 'info\ufff0'
  }
  return libdb.allDocs(options)
}

export function getText(current) {
  let fpath = current.fpath
  let start = current.pos*1 || 0
  let end = start*1 + limit*1
  let selector = {fpath: fpath, pos: {$gte: start, $lt: end}}
  // log('=pouch-text-selector=:', selector)
  return libdb.find({selector: selector}) // sort: ['idx'], , limit: 20
  // return libdb.explain({selector: selector})
}
