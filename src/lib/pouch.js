//
import _ from "lodash";
import { remote } from "electron";
import { parseLib, parseTitle, parseBook } from './book'
const { getCurrentWindow } = require('electron').remote

const log = console.log
const path = require('path')
let fse = require('fs-extra')

const isDev = require('electron-is-dev')
// const isDev = false
// const isDev = true
log('=====IS-DEV', isDev)
const limit = 20

const app = remote.app;
const apath = app.getAppPath()
const upath = app.getPath("userData")

let dbPath = path.resolve(upath, 'pouch')
fse.ensureDirSync(dbPath)

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

let ftdbPath = path.resolve(upath, 'pouch/fulltext')
let ftdb = new PouchDB(ftdbPath)
let libPath = path.resolve(upath, 'pouch/library')
let libdb = new PouchDB(libPath)

export function pushBook(info, book) {
  return Promise.all([
    pushInfo(info),
    pushTexts(book.pars),
    // pushMap(book.mapdocs)
  ])
    // .then(function(res) {
    //   if (res[1].length) {
    //     libdb.createIndex({
    //       index: {fields: ['fpath', 'pos']},
    //       name: 'fpathindex'
    //     })
    //   }
    // })
}

function pushInfo(ndoc) {
  return libdb.get(ndoc._id).catch(function (err) {
    if (err.name === 'not_found') return
    else throw err
  }).then(function (doc) {
    if (doc) {
      let testdoc = _.clone(doc)
      delete testdoc._rev
      if (_.isEqual(ndoc, testdoc)) return
      else {
        ndoc._rev = doc._rev
        return libdb.put(ndoc)
      }
    } else {
      return libdb.put(ndoc)
    }
  })
}

function pushTexts(newdocs) {
  return libdb.allDocs({include_docs: true})
    .then(function(res) {
      let docs = res.rows.map(row=>{ return row.doc })
      log('========= DOCS', docs[0])
      let cleandocs = []
      let hdoc = {}
      docs.forEach(doc=> { hdoc[doc._id] = doc })
      newdocs.forEach(newdoc=> {
        let doc = hdoc[newdoc._id]
        if (doc) {
          if (newdoc.text == doc.text) return
          else doc.text = newdoc.text, cleandocs.push(doc)
        } else {
          cleandocs.push(newdoc)
        }
      })
      log('========= CLEANDOCS', cleandocs[0])
      return libdb.bulkDocs(cleandocs)
    })
}

// export function getLib() {
//   let options = {
//     include_docs: true,
//     startkey: 'info',
//     endkey: 'info\ufff0'
//   }
//   return libdb.allDocs(options)
// }

export function getLib() {
  let options = {
    include_docs: true,
    startkey: 'info',
    endkey: 'info\ufff0'
  }
  libdb.allDocs(options)
    .then(function (result) {
      let infos = result.rows.map(row=> { return row.doc})
      parseLib(infos)
    })
    .catch(function (err) {
      log('getLibErr', err);
    })
}

export function getTitle(state) {
  log('T', state)
  if (!state.infoid) return
  libdb.get(state.infoid)
    .then(function (info) {
      // log('T-info', info)
      parseTitle(info)
    }).catch(function (err) {
      log('getTitleErr', err);
    })
}

export function getBook(state) {
  log('GB', state)
  libdb.get(state.infoid)
    .then(function (info) {
      getText(state)
        .then(function(res) {
          let pars = _.compact(res.docs)
          parseBook(state, info, pars)
        })
    }).catch(function (err) {
      log('getBookErr', err);
    })
}

export function getText(state, endpos) {
  // log('GETTXT', state)
  let fpath = state.fpath
  let start = state.pos*1 || 0
  let end = endpos*1 || start*1 + limit*1
  let selector = {fpath: fpath, pos: {$gte: start, $lt: end}}
  log('SELECT', selector)
  return libdb.find({selector: selector}) // sort: ['idx'], , limit: 20
  // return libdb.explain({selector: selector})
}


export function cleanup() {
  log('before destroy')
  return Promise.all([
    libdb.destroy(),
    ftdb.destroy()
  ])
}
