//

// import "./stylesheets/app.css";
// import "./stylesheets/main.css";

import "./lib/context_menu.js";

import _ from "lodash";
import { remote } from "electron";
import { shell } from 'electron'
import { ipcRenderer } from "electron";
import { q, qs, empty, create, span, p, div, enclitic } from './lib/utils'
import { twoPages, parseTitle, parseTitleTui } from './lib/book'
import { openODS, openDir } from './lib/getfiles'

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

ipcRenderer.on('section', function (event, name) {
  log('NAME', name)
  if (name == 'library') parseLib()
  if (name == 'help') showSection('help')
  // else if (name == 'cleanup') showCleanup()
  // else if (name == 'install') showInstall()
  // else showSection(name)
})

showSection('help')

function showSection(name) {
  let oapp = q('#app')
  let secpath = path.resolve(appPath, 'src/sections', [name, 'html'].join('.'))
  const section = fse.readFileSync(secpath)
  oapp.innerHTML = section
}

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
      // twoPages()
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

document.addEventListener("click", go, false)

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
  showSection('lib')
  let books = store.get('lib') || []
  if (book) {
    books.push(book)
    store.set('lib', books)
  }
  log('B', book)

  let olib = q('#lib')
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
  let oapp = q('#app')
  oapp.book = book
  showSection('main')
  parseTitle(book)
}
