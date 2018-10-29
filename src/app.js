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
import { q, qs, empty, create, span, p, div, enclitic } from './lib/utils'
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

// let hstates =   store.get('hstates') || []
// let hstate = hstates.length - 1
let hstates = []
let hstate =  -1
let hstakey = {}

ipcRenderer.on('section', function (event, name) {
  log('SECTION NAME', name)
  // if (name == 'library') parseLib()
  // if (name == 'help') showSection('help')
  // else if (name == 'install') showInstall()
  // else showSection(name)

  nav({section: name})
})

// showSection('help')
window.split = twoPages()
// window.split.collapse(1)

log('HSTATE', hstates[hstate])
// nav(hstates[hstate])
nav({section: 'lib'})

function showBook(fns) {
  showSection('main')
  let oprg = q('#progress')
  oprg.style.display = "inline-block"
  let fpath = fns[0]
  // log('SHOWBOOK', fpath)
  if (/\.ods/.test(fpath)) // это убрать
    openODS(fpath, (res) => {
      log('ODS END JSON', res)
      if (!res) return
      oprg.style.display = "none"
    })
  else {
    // let bookpath = '../../texts/Thrax'
    // let bookpath = '../../texts/Aristotle/deAnima'
    // let bookpath = '../../texts/Plato/Letters'
    let bookpath = '../../texts/Plato'
    openDir(bookpath, (book) => {
      if (!book) return
      showSection('lib')
      parseLib(book)
      oprg.style.display = "none"
    })
  }
}

// document.addEventListener("click", go, false)

function go(ev) {
  let data = ev.target.dataset
  if (data.section) {
    showSection(data.section)
  } else if (data.book) {
    showBook(data.book)
  } else if (data.ods) {
    dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'book', extensions: ['ods'] }]}, showBook)
  }
}


function parseLib(book) {
  window.split.setSizes([100,0])
  let books = store.get('lib') || []
  if (book) {
    books.push(book)
    store.set('lib', books)
  }
  log('LIB: addBook', book)
  // add в отдельную функцию

  let olib = q('#source')
  let oul = create('ul')
  olib.appendChild(oul)
  books.forEach(book => {
    let ostr = create('li', 'libauth')
    ostr.bkey = book.bkey
    oul.appendChild(ostr)
    let author = span(book.info.book.author)
    let title = span(book.info.book.title)
    author.classList.add('lib-auth')
    title.classList.add('lib-title')
    ostr.appendChild(author)
    ostr.appendChild(title)
  })
  oul.addEventListener('click', goBook, false)
}

function goBook(ev) {
  if (ev.target.parentNode.nodeName != 'LI') return
  let books = store.get('lib')
  let book = _.find(books, book=> { return book.bkey == ev.target.parentNode.bkey })
  if (!book) return
  window.book = book
  log('GO TITLE', book)
  let navpath = {section: 'title'}
  nav({section: 'title'})
}

export function nav(navpath) {
  let obook = q('#source')
  let osource = q('#source')
  let otrns = q('#trns')
  empty(osource)
  empty(otrns)

  let sec = navpath.section
  if (sec == 'lib') parseLib()
  else if (sec == 'title') parseTitle()
  else if (sec == 'book') parseBook()
  else showSection(sec)

  let hkey = JSON.stringify(navpath)
  // log('HKEY', hkey)
  if (!hstakey[hkey]) {
    hstates.push(navpath)
    hstate = hstates.length-1
    hstakey[hkey] = true
    log('ADD', navpath.section)
  }
  store.set('hstates', hstates)
  // log('NAV', navpath, hstate, hstates.length)
}

Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  // log('EV', ev.which, hstate, hstate - 1 > -1, hstates[hstate])
  // if (ev.which == 37 && hstate - 1 > -1) log('LEFT', hstate, hstates[hstate-1])
  // if (ev.which == 39 && hstate + 1 < hstates.length) log('RIGHT', hstate, hstates[hstate+1])
  if (ev.which == 37 && hstate - 1 > -1) hstate--
  if (ev.which == 39 && hstate + 1 < hstates.length) hstate++
  nav(hstates[hstate])
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
