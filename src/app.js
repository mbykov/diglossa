//

import "./stylesheets/app.css";
import "./stylesheets/main.css";

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

ipcRenderer.on('section', function (event, name) {
  if (name == 'dicts') showDicts()
  else if (name == 'cleanup') showCleanup()
  else if (name == 'install') showInstall()
  else showSection(name)
})

function orthoPars(pars) {
  pars.forEach(spans => {
    spans.forEach(spn => {
      if (spn.gr) spn.text = comb(spn.text)
    })
  })
}

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

// document.addEventListener("mouseover", checkGreek, false)
document.addEventListener("click", go, false)
document.addEventListener("wheel", scrollPanes, false)

function scrollPanes(event) {
  let delta = (event.deltaY > 0) ? 24 : -24
  let source = q('#source')
  let trns = q('#trns')
  source.scrollTop += delta
  trns.scrollTop = source.scrollTop
}

function go(event) {
  if (event.target.dataset.section) {
    showSection(event.target.dataset.section)
  } else if (event.target.dataset.book) {
    showBook(event.target.dataset.book)
  }
}


function showText (pars) {
  if (!pars) return
  showSection('main')
  let oprg = q('#progress')
  oprg.style.display = "inline-block"

  // Split(['#text', '#results'], {
  //   sizes: [50, 50],
  //   gutterSize: 5,
  //   cursor: 'col-resize',
  //   minSize: [0, 0]
  // })

  let otext = q('#text')
  empty(otext)

  let wfs = []
  pars.forEach(spans => {
    let opar = p()
    opar.classList.add('greek')
    spans.forEach(spn => {
      let ospan = span(spn.text)
      if (spn.gr) ospan.classList.add('greek'), wfs.push(spn.text)
      if (spn.text == ' ') ospan.classList.add('space')
      opar.appendChild(ospan)
    })
    otext.appendChild(opar)
  })

  oprg.style.display = "none"
}

function showNoRes() {
  let nores = span('no result')
  let ores = q('#results')
  ores.appendChild(nores)
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
};

const checkGreek = event => {
  if (event.shiftKey) return
  const checkDomElement = element => {
    if (element.nodeName !== "SPAN") return
    if (element.classList.contains("greek")) {
      let query = element.textContent
      if (!query) return
      // showResults(query)
    }
  }
  checkDomElement(event.target);
}

Mousetrap.bind(['command+p', 'ctrl+p'], function() {
  let el = q('span.greek:hover')
  if (!el) return
  let query = el.textContent
  let href1 = 'http://www.perseus.tufts.edu/hopper/morph?l='
  let href2 = '&la=greek#lexicon'
  let href = [href1, query, href2].join('')
  shell.openExternal(href)
  return false
})

Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  if (ev.which == 37 && hstate - 1 > -1) hstate--
  if (ev.which == 39 && hstate + 1 < hstates.length) hstate++
  // showText(hstates[hstate])
  return false
})

function showDicts() {
  showSection('dicts')
  let cfg = readCfg()
  let hiddens = ['flex', 'specs']
  let mins = _.filter(cfg, db => { return !hiddens.includes(db.name)})
  let obj = {dbs: mins}

  const tablePath = path.resolve(appPath, 'src/sections/dictTable.mustache')
  const tmpl = fse.readFileSync(tablePath).toString()
  let html = mustache.render(tmpl, obj);

  let otbody = q('#tbody')
  otbody.innerHTML = html
  let rows = qs('.active-dict')
  rows.forEach(row => {
    let cf = _.find(cfg, db => { return db.name == row.name })
    if (!cf) return
    row.checked = (cf.active) ? true : false
  })

  let oorder = q('#order')
  otbody.addEventListener("click", activeCfg, false)
  oorder.addEventListener("click", reorderCfg, false)
}

function reorderCfg(ev) {
  let cfg = readCfg()
  let clicked = _.find(cfg, db => { return db.name == ev.target.id })
  if (!clicked) return
  cfg = cfg.filter(db => db.name !== ev.target.id)
  cfg.unshift(clicked)
  cfg.forEach((cf, idx) => { cf.idx = idx })
  writeCfg(cfg)
  showDicts()
}

function activeCfg(ev) {
  if (ev.target.type != 'checkbox') return
  let cfg = readCfg()
  let clicked = _.find(cfg, db => { return db.name == ev.target.name })
  if (!clicked) return
  let chk = ev.target.checked
  clicked.active = (chk) ? true : false

// погасить галочку
  let row = ev.target.parentNode.parentNode
  let img = row.getElementsByTagName('img')[0]
  // if (chk) img.style.display = 'block'
  // else img.style.display = 'none'

  writeCfg(cfg)
  showDicts()
}

function showCleanup() {
  showSection('cleanup')
  let ocleanup = q('#cleanup')
  ocleanup.addEventListener("click", cleanupDBs, false)
}

function cleanupDBs() {
  recreateDBs()
  showDicts()
}

function showInstall() {
  showSection('install')
  let oinputfile = q('#inputfile')

  oinputfile.onchange = function(ev) {
    let fileList = oinputfile.files
    let fname = fileList[0].name
    let fpath = fileList[0].path
    let ofn = q('#filename')
    ofn.textContent = fname
    ofn.setAttribute('fpath', fpath)
  }
  let oinstall = q('#dbinstall')
  oinstall.addEventListener("click", installDB, false)
}

function installDB() {
  let ofn = q('#filename')
  let fpath = ofn.getAttribute('fpath')
  addDB(fpath)
  ofn.textContent = 'done'
  // showDicts()
}

function cleanStr(str) {
  str = str.replace(/·/, '')
  return str
}

const links = document.querySelectorAll('link[rel="import"]')
log('LINKS', links)

// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
  let template = link.import.querySelector('.task-template')
  let clone = document.importNode(template.content, true)
  document.querySelector('.container').appendChild(clone)
})
