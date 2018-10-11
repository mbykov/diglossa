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
import { q, qs, empty, create, span, p, div, enclitic } from './lib/utils'
import { parseBook } from './lib/book'

let fse = require('fs-extra')
const log = console.log

const Mousetrap = require('mousetrap')
// const axios = require('axios')
const path = require('path')

// const mustache = require('mustache')

const clipboard = require('electron-clipboard-extended')

let hterms = {}
let hstate = -1
let hstates = []

// const isDev = require('electron-is-dev')
// const isDev = false
const isDev = true
const app = remote.app;
const appPath = app.getAppPath()
let userDataPath = app.getPath("userData")
// enableDBs(userDataPath, appPath, isDev)

showSection('title')

// ipcRenderer.on('section', function (event, name) {
//   if (name == 'dicts') showDicts()
//   else if (name == 'cleanup') showCleanup()
//   else if (name == 'install') showInstall()
//   else showSection(name)
// })

// function orthoPars(pars) {
//   pars.forEach(spans => {
//     spans.forEach(spn => {
//       if (spn.gr) spn.text = comb(spn.text)
//     })
//   })
// }

clipboard
  .on('text-changed', () => {
    // showText ([])
  })
  .startWatching()

function showSection(name) {
  let oapp = q('#app')
  let secpath = path.resolve(appPath, 'src/sections', [name, 'html'].join('.'))
  const section = fse.readFileSync(secpath)
  oapp.innerHTML = section
}

function showBook(book) {
  showSection('main')
  let oprg = q('#progress')
  oprg.style.display = "inline-block"
  parseBook(book)
  oprg.style.display = "none"
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
  if (data.section) {
    showSection(data.section)
  } else if (data.book) {
    showBook(data.book)
  }
}

function keyGo(ev) {
  let source = q('#source')
  let trns = q('#trns')
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
