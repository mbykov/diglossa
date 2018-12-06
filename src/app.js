//

// import "./stylesheets/app.css";
// import "./stylesheets/main.css";

import "./lib/context_menu.js";
import _ from "lodash";
import Split from 'split.js'
import { remote } from "electron";
import { shell } from 'electron'
import { ipcRenderer } from "electron";

import { q, qs, empty, create, remove, span, p, div, enclitic } from './lib/utils'
import { bookData, scrollPanes, keyPanes, parseLib, parseTitle, parseBook } from './lib/book'
import { parseInfo, parseDir, parseODS } from './lib/getfiles'
import { parseQuery } from './lib/search';

const JSON = require('json5')
const Mousetrap = require('mousetrap')
const axios = require('axios')
let fse = require('fs-extra')
const log = console.log
// const Store = require('electron-store')
// const store = new Store()

const path = require('path')

const clipboard = require('electron-clipboard-extended')
const {dialog, getCurrentWindow} = require('electron').remote

// const isDev = require('electron-is-dev')
// const isDev = false
const isDev = true
const app = remote.app;
const apath = app.getAppPath()
let upath = app.getPath("userData")
// const watch = require('node-watch')

let dbPath = path.resolve(upath, 'pouch')
fse.ensureDirSync(dbPath)

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))

let ftdbPath = path.resolve(upath, 'pouch/fulltext')
let ftdb = new PouchDB(ftdbPath)
let libPath = path.resolve(upath, 'pouch/library')
let libdb = new PouchDB(libPath)

let current, info
let limit = 20
// let uf = '\ufff0'

window.onbeforeunload = function (ev) {
  libdb.get('_local/current')
    .then(function(doc) {
      current._id = '_local/current'
      current._rev = doc._rev
      libdb.put(current).then(function() {
        ev.returnValue = false
      })
    }).catch(function (err) {
      libdb.put({ _id: '_local/current', section: 'lib'}).then(function() {
        navigate({section: 'lib'})
      })
    })
}

ipcRenderer.on('reload', function (event) {
  getCurrentWindow().reload()
})

ipcRenderer.on('parseDir', function (event) {
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'JSON', extensions: ['json'] }]}, getInfoFile)
})

// ipcRenderer.on('home', function (event) {
//   navigate({section: 'lib'})
// })

ipcRenderer.on('reread', function (event) {
  libdb.get('_local/current')
    .then(function (current) {
      if (!current.infoid) return
      libdb.get(current.infoid)
        .then(function (info) {
          getDir(info)
        })
    })
    .catch(function (err) {
      log('ERR GET INFO DIR')
    })
})

ipcRenderer.on('action', function (event, action) {
  if (action == 'goleft') goLeft()
  else if (action == 'goright') goRight()
  else if (action == 'cleanup') showCleanup()
  else navigate({section: action})
})


ipcRenderer.on('version', function (event, oldver) {
  axios.get('https://api.github.com/repos/mbykov/diglossa.js/releases/latest')
    .then(function (response) {
      if (!response || !response.data) return
      let newver = response.data.name
      if (oldver && newver && newver > oldver) {
        let over = q("#new-version")
        let verTxt = ['new version available:', newver].join(' ')
        over.textContent = verTxt
      }
    })
    .catch(function (error) {
      console.log('VERSION ERR')
    })
})


let hstates = []
let hstate =  -1

window.split = twoPages()

getState()

function getState() {
  libdb.get('_local/current')
    .then(function (navpath) {
      current = navpath
      navigate(current)
    })
    .catch(function (err) {
      if (err.name === 'not_found') {
        libdb.put({ _id: '_local/current', section: 'lib'})
          .then(function() {
            navigate({section: 'lib'})
          })
      }
      else throw err
    })
}

function twoPages() {
  // var sizes = store.get('split-sizes')
  // if (sizes) sizes = JSON.parse(sizes)
  // else
  let sizes = [50, 50]
  let split = Split(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
    }
  })
  let obook = q('#book')
  obook.addEventListener("wheel", scrollPanes, false)
  document.addEventListener("keydown", keyPanes, false)
  return split
}

function goLib() {
  getLib()
    .then(function (result) {
      let infos = result.rows.map(row=> { return row.doc})
      parseLib(infos)
    }).catch(function (err) {
      log('getLibErr', err);
    })
}

function getTitle() {
  libdb.get(current.infoid)
    .then(function (curinfo) {
      info = curinfo
      current.bpath = info.bpath
      parseTitle(info)
    }).catch(function (err) {
      log('getTitleErr', err);
    })
}

function getBook() {
  libdb.get(current.infoid)
    .then(function (curinfo) {
      getText(current)
        .then(function(res) {
          let pars = _.compact(res.docs)
          parseBook(curinfo, pars)
        })
    }).catch(function (err) {
      log('getTitleErr', err);
    })
}

export function navigate(navpath) {
  let osource = q('#source')
  let otrns = q('#trns')
  empty(osource)
  empty(otrns)
  let ohleft = q('.hleft')
  let ohright = q('.hright')
  remove(ohleft)
  remove(ohright)

  current = navpath
  if (!current.old) {
    hstates.push(_.clone(current))
    hstate = hstates.length-1
  }
  delete current.old
  bookData(current)

  let sec = current.section
  if (sec == 'lib') goLib()
  else if (sec == 'title') getTitle()
  else if (sec == 'book') getBook()
  else if (sec == 'search') parseQuery(libdb, current)
  else showSection(sec)

  let progress = q('#progress')
  progress.style.display = 'none'
}

// arrows
Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  if (ev.which == 37) goLeft()
  else if (ev.which == 39) goRight()
})

function goLeft() {
  if (current) delete current.query
  if (hstate - 1 <= -1) return
  if (hstate - 1 > -1) hstate--
  let state = hstates[hstate]
  state.old = true
  navigate(state)
}

function goRight() {
  if (current) delete current.query
  if (hstate + 1 >= hstates.length) return
  if (hstate + 1 < hstates.length) hstate++
  let state = hstates[hstate]
  state.old = true
  navigate(state)
}

// MAP
Mousetrap.bind(['f'], function(ev) {
  let query = clipboard.readText()
  ftdb.get(query)
    .then(function (wfdoc) {
      let opts = { include_docs: true, keys: wfdoc.parids }
      libdb.allDocs(opts)
        .then(function (result) {
          let qdocs = _.compact(result.rows.map(row=> { return row.doc}))
          let qinfos = _.groupBy(qdocs, 'infoid')
          current = {_id: '_local/current', section: 'search', qinfos: qinfos, query: query}
          navigate(current)
        })
    }).catch(function (err) {
      log('SEARCH ERR:', err)
    })
})


function showSection(name) {
  window.split.setSizes([100,0])
  let osource = q('#source')
  let otrns = q('#trns')
  empty(osource)
  empty(otrns)
  let ohleft = q('.hleft')
  let ohright = q('.hright')
  remove(ohleft)
  remove(ohright)

  let secpath = path.resolve(apath, 'src/sections', [name, 'html'].join('.'))
  try {
    const section = fse.readFileSync(secpath)
    osource.innerHTML = section
  } catch(e) {
    osource.innerHTML = 'this feature will be realized in future version'
    log('NO SECTION ERR')
  }
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
      return libdb.bulkDocs(cleandocs)
    })
}

// MAP
function pushMap(ndocs) {
  return ftdb.allDocs({ include_docs: true })
    .then(function(res) {
      let docs = res.rows.map(row=>{ return row.doc})
      let hdoc = {}
      docs.forEach(doc=> { hdoc[doc._id] = doc })

      let cleandocs = []
      ndocs.forEach(ndoc=> {
        let doc = hdoc[ndoc._id]
        if (doc) {
          let testdoc = _.clone(doc)
          delete testdoc._rev
          if (_.isEqual(ndoc, testdoc)) return
          else {
            // неверно - нужны только уникальные значения, uniq не катит
            doc.docs = ndoc.docs //  _.uniq(doc.docs.concat(ndoc.docs))
            cleandocs.push(doc)
          }
        } else {
          cleandocs.push(ndoc)
        }
      })
      return ftdb.bulkDocs(cleandocs)
    })
}

function getInfoFile(fns) {
  if (!fns) return
  let infopath = fns[0]
  if (!infopath) return
  try {
    let progress = q('#progress')
    progress.style.display = 'inline-block'

    let json = fse.readFileSync(infopath)
    let info = JSON.parse(json)
    info = parseInfo(info)
    let dir = path.parse(infopath).dir
    let bpath = path.resolve(dir, info.book.path)
    info.bpath = bpath
    getDir(info)
  } catch(err) {
    log('INFO JSON ERR:', err)
  }
}

function getDir(info) {
  if (!info || !info.bpath) return
  if (path.extname(info.bpath) == '.ods') {
    parseODS(info, (book) => {
      pushBook(info, book)
    })
  }  else {
    parseDir(info, (book) => {
      pushBook(info, book)
    })
  }
}

function pushBook(info, book) {
  if (!book || !book.pars || !book.pars.length) return
  Promise.all([
    pushInfo(info),
    pushTexts(book.pars),
    pushMap(book.mapdocs)
  ])
    .then(function(res) {
      if (res[1].length) {
        libdb.createIndex({
          index: {fields: ['fpath', 'pos']},
          name: 'fpathindex'
        })
          .then(function(res) {
            // log('INDEX CREATED')
          })
      }
      navigate(current)
    }).catch(function(err) {
      log('ALL RES ERR', err)
    })
}


function showCleanup() {
  showSection('cleanup')
  let ocleanup = q('#cleanup')
  ocleanup.addEventListener("click", goCleanup, false)
}

function goCleanup() {
  // let fsee = require('fs-extra')
  fse.emptyDirSync(dbPath)
  getCurrentWindow().reload()
  getState()
}

export function getText(current, endpos) {
  let fpath = current.fpath
  let start = current.pos*1 || 0
  let end = endpos*1 || start*1 + limit*1
  let selector = {fpath: fpath, pos: {$gte: start, $lt: end}}
  return libdb.find({selector: selector}) // sort: ['idx'], , limit: 20
  // return libdb.explain({selector: selector})
}

function getLib() {
  let options = {
    include_docs: true,
    startkey: 'info',
    endkey: 'info\ufff0'
  }
  return libdb.allDocs(options)
}
