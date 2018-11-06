//

// import "./stylesheets/app.css";
// import "./stylesheets/main.css";
// import { BrowserWindow } from "electron";


import "./lib/context_menu.js";
import _ from "lodash";
import Split from 'split.js'
import { remote } from "electron";
import { shell } from 'electron'
import { ipcRenderer } from "electron";
import { q, qs, empty, create, remove, span, p, div, enclitic } from './lib/utils'
import { twoPages, parseTitle, parseBook } from './lib/book'
// import { nav } from './lib/nav'
import { openODS, openDir } from './lib/getfiles'

const Mousetrap = require('mousetrap')
let fse = require('fs-extra')
const log = console.log
const Store = require('electron-store')
const store = new Store()
// const elasticlunr = require('elasticlunr')

// const Mousetrap = require('mousetrap')
// const axios = require('axios')
const path = require('path')

const clipboard = require('electron-clipboard-extended')
const {dialog} = require('electron').remote

// const isDev = require('electron-is-dev')
// const isDev = false
const isDev = true
const app = remote.app;
const apath = app.getAppPath()
let upath = app.getPath("userData")
// const watch = require('node-watch')

const PouchDB = require('pouchdb')
// let libPath = path.resolve(upath, 'pouch/lib')
let libPath = path.resolve(upath, 'library')
let pouch = new PouchDB(libPath)

ipcRenderer.on('save-state', function (event) {
  pouch.get('_local/current').then(function(doc) {
    let current = window.navpath
    current._id = '_local/current'
    current._rev = doc._rev
    pouch.put(current).then(function() {
      ipcRenderer.send('state-saved', current)
    })
  }).catch(function (err) {
    // log('CURERR', err)
    pouch.put({ _id: '_local/current', section: 'lib'}).then(function() {
      navigate({section: 'lib'})
    })
  })
})

ipcRenderer.on('home', function (event) {
  navigate({section: 'lib'})
})

ipcRenderer.on('section', function (event, name) {
  log('SECTION NAME', name)
  navigate({section: name})
})

ipcRenderer.on('parseDir', function (event, name) {
  log('PARSE DIR', name)
  // dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'book', extensions: ['ods'] }]}, showBook)
  dialog.showOpenDialog({properties: ['openDirectory'] }, getFNS)
})

// let hstates =   store.get('hstates') || []
// let hstate = store.get('hstate') || -1
let hstates = []
let hstate =  -1
// let hstakey = {}

// log('HSTATE=>', hstate)
// log('HSTATES=>', hstates)
// let position = hstates[hstate] || {section: 'lib'}
// log('HSTATES=>POS', position)

window.split = twoPages()
// window.split.setSizes([50,50])

pouch.get('_local/current').then(function (current) {
  log('CURRENT:', current)
  if (current.section == 'lib') navigate({section: 'lib'})
  else getDir(current)
}).catch(function (err) {
  // log('CURERR', err)
  pouch.put({ _id: '_local/current', section: 'lib'}).then(function() {
    navigate({section: 'lib'})
  })
})

function getLib() {
  let options = {
    include_docs: true,
    startkey: 'info',
    endkey: 'info\ufff0'
  }
  pouch.allDocs(options).then(function (result) {
    let docs = result.rows.map(row=> { return row.doc})
    log('GETLIB', docs)
    parseLib(docs)
  }).catch(function (err) {
    log('getLib', err);
  })
}

function getTitle(navpath) {
  let options = {
    include_docs: true,
    key: navpath.titleid
  }
  pouch.allDocs(options).then(function (result) {
    let docs = result.rows.map(row=> { return row.doc})
    // log('GETTITLE', docs)
    window.info = docs[0]
    parseTitle(docs[0])
  }).catch(function (err) {
    log('getLib', err);
  })
}

function getBook(navpath) {
  log('GB info', window.info)
  let options = {
    include_docs: true,
    keys: window.info.fns
  }
  pouch.allDocs(options).then(function (result) {
    let texts = result.rows.map(row=> { return row.doc})
    // log('GET TEXTS', texts)
    parseBook(texts)
  }).catch(function (err) {
    log('getLib', err);
  })
}


function parseLib(infos) {
  window.split.setSizes([100,0])
  let osource = q('#source')
  empty(osource)
  let oul = create('ul')
  osource.appendChild(oul)

  if (!infos.length) oul.textContent = 'no book in lib'
  infos.forEach(info => {
    let ostr = create('li', 'libauth')
    ostr.titleid = info._id
    oul.appendChild(ostr)
    let author = span(info.book.author)
    let title = span(info.book.title)
    author.classList.add('lib-auth')
    title.classList.add('lib-title')
    ostr.appendChild(author)
    ostr.appendChild(title)
  })
  oul.addEventListener('click', goTitleEvent, false)
}

function goTitleEvent(ev) {
  if (ev.target.parentNode.nodeName != 'LI') return
  let titleid = ev.target.parentNode.titleid
  navigate({section: 'title', titleid: titleid})
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

  let sec = navpath.section
  // if (sec == 'lib') parseLib()
  if (sec == 'lib') getLib()
  else if (sec == 'title') getTitle(navpath)
  else if (sec == 'book') getBook(navpath)
  else showSection(sec)

  // let hkey = JSON.stringify(navpath)
  // // log('HKEY', hkey)
  // if (!hstakey[hkey]) {
  //   hstates.push(navpath)
  //   hstate = hstates.length-1
  //   hstakey[hkey] = true
  //   // log('ADD-SEC', navpath.section)
  // }

  // store.set('navpath', navpath)
  // log('STORE-navpath', navpath)
  log('Navigate:', navpath)
  window.navpath = navpath
}

Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  // log('EV', ev.which, hstate, hstate - 1 > -1, hstates[hstate])
  // if (ev.which == 37 && hstate - 1 > -1) log('LEFT', hstate, hstates[hstate-1])
  // if (ev.which == 39 && hstate + 1 < hstates.length) log('RIGHT', hstate, hstates[hstate+1])
  if (ev.which == 37 && hstate - 1 > -1) hstate--
  if (ev.which == 39 && hstate + 1 < hstates.length) hstate++
  let navpath = hstates[hstate]
  // log('_arrow_navpath_', navpath)
  // store.set('hstate', hstate)
  navigate(navpath)
})

function showSection(name) {
  window.split.setSizes([100,0])
  let osource = q('#source')
  let secpath = path.resolve(apath, 'src/sections', [name, 'html'].join('.'))
  const section = fse.readFileSync(secpath)
  osource.innerHTML = section
}

// let lunr = elasticlunr(function () {
//   this.addField('nic')
//   this.addField('lang')
//   this.addField('fpath')
//   this.addField('text')
//   this.setRef('id')
// })


// унести в getFile, и грязно пока
function getFNS(fns) {
  if (!fns) return
  let bpath = fns[0]
  // log('Bpath:', bpath)
  // current
  // getDir(bpath)
}

function getDir(navpath) {
  let bpath = navpath.titleid.split('-')[1]
  if (!bpath) return
  openDir(bpath, (book) => {
    if (!book) return
    // startWatcher(book.bpath)
    // log('INFO::', book.info)

    Promise.all([
      pushInfo(book.info),
      pushTexts(book.texts)
    ]).then(function(res) {
      log('PUSH ALL RES', res)
      if (navpath) window.info = book.info, navigate(navpath)
      else navigate({section: 'lib'})
      // navigate({section: 'lib'})
    }).catch(function(err) {
      log('ALL RES ERR', err)
    })

  })
}

function pushInfo(ndoc) {
  // log('NDOCinfo', ndoc)
  return pouch.get(ndoc._id).catch(function (err) {
    if (err.name === 'not_found') return
    else throw err
  }).then(function (doc) {
    // log('DOC-old', doc)
    if (doc) {
      // log('DOC-old', doc)
      let testdoc = _.clone(doc)
      delete testdoc._rev
      if (_.isEqual(ndoc, testdoc)) return
      else {
        ndoc._rev = doc._rev
        // log('NDOC-rev', ndoc)
        return pouch.put(ndoc)
      }
      // if (JSON.stringify(ndoc) == JSON.stringify(testdoc)) return
    } else {
      return pouch.put(ndoc)
    }
  })
}

function pushTexts(newdocs) {
  // log('PUSH-NEW-TEXTS', newdocs)
  return pouch.allDocs({include_docs: true})
    .then(function(res) {
      let docs = res.rows.map(row=>{ return row.doc})

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
      log('CLD', cleandocs)
      return pouch.bulkDocs(cleandocs)
    })
}



function setSearch_(bkey, texts) {
  texts.forEach(text => {
    if (!text.author) return
    let id = [bkey, text.fpath].join('/')
    let panee = { id: id, lang: text.lang, nic: text.nic, fpath: text.fpath, text: _.flatten(text.rows)[0] }
    // lunr.addDoc(panee)
  })
}

const historyMode_ = event => {
  const checkArrow = element => {
    // if (!element.classList.contains("arrow")) return
    if (element.id === "new-version") {
      // log('NEW VERS CLICKED')
    }
    if (element.id === "arrow-left") {
      if (hstate - 1 > -1) hstate--
      // showText(hstates[hstate])
    } else if (element.id === "arrow-right") {
      if (hstate + 1 < hstates.length) hstate++
      // showText(hstates[hstate])
    }
  };
  checkArrow(event.target);
}

// document.addEventListener("click", historyMode, false)

// не работает - почему?
// function startWatcher(bpath) {
//   watch(bpath, { recursive: true }, function(evt, name) {
//     log('%s changed.', name);
//     // navigate(navpath)
//     navigate({section: 'lib'})
//   })
// }
