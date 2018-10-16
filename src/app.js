//

// import "./stylesheets/app.css";
// import "./stylesheets/main.css";

import "./lib/context_menu.js";
// import { readCfg, writeCfg, recreateDBs, addDB } from "./lib/databases.js";
// import { getPos, getMorphs, rDict, rMorph, rTrns } from "./lib/results.js";

import _ from "lodash";
import { remote } from "electron";
import { shell } from 'electron'
// import sband from "./lib/clean-greek";
import { ipcRenderer } from "electron";
import { q, qs, empty, create, span, p, div, enclitic, getStore, setStore } from './lib/utils'
import { parseBook } from './lib/book'
import { openODS, openDir } from './lib/getfiles'

let fse = require('fs-extra')
const log = console.log

const Mousetrap = require('mousetrap')
// const axios = require('axios')
const path = require('path')

// const mustache = require('mustache')

const clipboard = require('electron-clipboard-extended')
const {dialog} = require('electron').remote

// const isDev = require('electron-is-dev')
// const isDev = false
const isDev = true
const app = remote.app;
const appPath = app.getAppPath()
let userDataPath = app.getPath("userData")
// enableDBs(userDataPath, appPath, isDev)

try {
  let lib = getStore('lib')
  if (!lib) {
    setStore('lib', {})
  }
} catch (err) {
  log('LIB ERR', err)
}

showSection('title')

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
  log('SHOWBOOK', fpath)
  if (/\.ods/.test(fpath)) // это убрать
    openODS(fpath, (res) => {
      log('ODS END JSON', res)
      if (!res) return
      // parseBook()
      oprg.style.display = "none"
    })
  else {
    // let bookpath = '../../texts/Thrax'
    let bookpath = '../../texts/Aristotle/deAnima'
    log('= OTHER THEN ODS =', bookpath)
    openDir(bookpath, (res) => {
      if (!res) return
      parseBook()
      oprg.style.display = "none"
    })
  }
}

document.addEventListener("click", go, false)
document.addEventListener("wheel", scrollPanes, false)
document.addEventListener("keydown", keyGo, false)

function scrollPanes(ev) {
  if (ev.shiftKey == true) return;
  let delta = (ev.deltaY > 0) ? 24 : -24
  let source = q('#source')
  let trns = q('#trns')
  source.scrollTop += delta
  trns.scrollTop = source.scrollTop
}

function go(ev) {
  let data = ev.target.dataset
  log('go DATA', ev.target.dataset)
  if (data.section) {
    showSection(data.section)
  } else if (data.book) {
    showBook(data.book)
  } else if (data.ods) {
    dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'book', extensions: ['ods'] }]}, showBook)
  }
}

function keyGo(ev) {
  let source = q('#source')
  let trns = q('#trns')
  if (!source || !trns) return
  trns.scrollTop = source.scrollTop
  if (ev.keyCode == 38) {
    source.scrollTop = source.scrollTop - 24
  } else if (ev.keyCode == 40) {
    source.scrollTop = source.scrollTop + 24
  } else if (ev.keyCode == 33) {
    let height = source.clientHeight
    source.scrollTop = source.scrollTop - height + 60
  } else if (ev.keyCode == 34) {
    let height = source.clientHeight
    source.scrollTop = source.scrollTop + height - 60
  }
  trns.scrollTop = source.scrollTop
}
