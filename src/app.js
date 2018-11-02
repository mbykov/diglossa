//

// import "./stylesheets/app.css";
// import "./stylesheets/main.css";
import { BrowserWindow } from "electron";


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
const Store = require('electron-store')
const store = new Store()
let fse = require('fs-extra')
const log = console.log

// const Mousetrap = require('mousetrap')
// const axios = require('axios')
const path = require('path')

const clipboard = require('electron-clipboard-extended')
const {dialog} = require('electron').remote

// const isDev = require('electron-is-dev')
// const isDev = false
const isDev = true
const app = remote.app;
const appPath = app.getAppPath()
let userDataPath = app.getPath("userData")
const watch = require('node-watch')

// let hstates =   store.get('hstates') || []
// let hstate = store.get('hstate') || -1
let hstates = []
let hstate =  -1
let hstakey = {}

// log('HSTATE=>', hstate)
// log('HSTATES=>', hstates)
// let position = hstates[hstate] || {section: 'lib'}
// log('HSTATES=>POS', position)

// showSection('help')
window.split = twoPages()
// window.split.collapse(1)
// window.split.setSizes([100,0])

// window.book = store.get('book')
let hpos = store.get('hpos') || {section: 'lib'}
log('LOAD-hpos', hpos)

// navigate({section: 'lib'})
window.navpath = hpos
navigate(hpos)

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

// унести в getFile, и грязно пока
function getFNS(fns) {
  if (!fns) return
  let bpath = fns[0]
  log('Watch:', bpath)
  getDir(bpath)
}

function getDir(bpath) {
  openDir(bpath, (book) => {
    log('FUT BOOK', book)
    if (!book) return
    let lib = store.get('lib') || {}
    lib = {}
    lib[book.bkey] = book.info
    store.set('lib', lib)
    let libtext = store.get('libtexts') || {}
    libtext = {}
    libtext[book.bkey] = book.texts
    store.set('libtext', libtext)
    startWatcher(book.bpath)
    navigate({section: 'lib'})
  })
}

// не работает - почему?
function startWatcher(bpath) {
  watch(bpath, { recursive: true }, function(evt, name) {
    log('%s changed.', name);
    // navigate(hpos)
    navigate({section: 'lib'})
  })
}

// app.on('before-quit', () => {
  // store.set('hstate', hstate)
  // store.set('hstates', hstates)
  // store.set('hpos', hpos)
  // store.set('book', window.book)
// })


// function showBook(fns) {
//   showSection('main')
//   let oprg = q('#progress')
//   oprg.style.display = "inline-block"
//   let fpath = fns[0]
//   // log('SHOWBOOK', fpath)
//   if (/\.ods/.test(fpath)) // это убрать
//     openODS(fpath, (res) => {
//       log('ODS END JSON', res)
//       if (!res) return
//       oprg.style.display = "none"
//     })
//   else {
//     // let bookpath = '../../texts/Thrax'
//     // let bookpath = '../../texts/Aristotle/deAnima'
//     // let bookpath = '../../texts/Plato/Letters'
//     let bookpath = '../../texts/Plato'
//     openDir(bookpath, (book) => {
//       if (!book) return
//       showSection('lib')
//       parseLib(book)
//       oprg.style.display = "none"
//     })
//   }
// }

// document.addEventListener("click", go, false)

// function go_(ev) {
//   let data = ev.target.dataset
//   if (data.section) {
//     showSection(data.section)
//   } else if (data.book) {
//     showBook(data.book)
//   } else if (data.ods) {
//     dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'book', extensions: ['ods'] }]}, showBook)
//   }
// }



function parseLib() {
  window.split.setSizes([100,0])
  let lib = store.get('lib') || []
  let infos = _.values(lib)
  // log('LIB INFOS', infos)

  let olib = q('#source')
  empty(olib)
  let oul = create('ul')
  olib.appendChild(oul)

  if (!infos.length) oul.textContent = 'no book in lib'
  infos.forEach(info => {
    let ostr = create('li', 'libauth')
    ostr.bkey = info.bkey
    oul.appendChild(ostr)
    let author = span(info.book.author)
    let title = span(info.book.title)
    author.classList.add('lib-auth')
    title.classList.add('lib-title')
    ostr.appendChild(author)
    ostr.appendChild(title)
  })
  oul.addEventListener('click', goBook, false)
}

function goBook(ev) {
  if (ev.target.parentNode.nodeName != 'LI') return
  // log('___', ev.target.parentNode.bkey)
  let bkey = ev.target.parentNode.bkey
  // let books = store.get('lib')
  // let book = _.find(books, book=> { return book.bkey == ev.target.parentNode.bkey })
  // if (!book) return
  // window.book = book
  // store.set('book', book)
  // log('GO TITLE-info', window.book.info)
  navigate({section: 'title', bkey: bkey})
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
  if (sec == 'lib') parseLib()
  else if (sec == 'title') parseTitle(navpath)
  else if (sec == 'book') parseBook(navpath)
  else showSection(sec)

  let hkey = JSON.stringify(navpath)
  // log('HKEY', hkey)
  if (!hstakey[hkey]) {
    hstates.push(navpath)
    hstate = hstates.length-1
    hstakey[hkey] = true
    // log('ADD-SEC', navpath.section)
  }
  hpos = hstates[hstate]
  store.set('hpos', hpos)
  // log('STORE-hpos', hpos)
  log('Navigate:', navpath)
  window.navpath = navpath
}

Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  // log('EV', ev.which, hstate, hstate - 1 > -1, hstates[hstate])
  // if (ev.which == 37 && hstate - 1 > -1) log('LEFT', hstate, hstates[hstate-1])
  // if (ev.which == 39 && hstate + 1 < hstates.length) log('RIGHT', hstate, hstates[hstate+1])
  if (ev.which == 37 && hstate - 1 > -1) hstate--
  if (ev.which == 39 && hstate + 1 < hstates.length) hstate++
  // hpos = hstates[hstate]
  // log('_arrow_hpos_', hpos)
  // store.set('hstate', hstate)
  navigate(hpos)
})

function showSection(name) {
  window.split.setSizes([100,0])
  let osource = q('#source')
  let secpath = path.resolve(appPath, 'src/sections', [name, 'html'].join('.'))
  const section = fse.readFileSync(secpath)
  osource.innerHTML = section
}



const historyMode = event => {
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

// let win = BrowserWindow.getFocusedWindow()
// app.on("close", log('================================================'));
