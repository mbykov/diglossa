//

// import "./stylesheets/app.css";
// import "./stylesheets/main.css";

import "./lib/context_menu.js";
import _ from "lodash";
// import Split from 'split.js'
import { remote } from "electron";
import { shell } from 'electron'
import { ipcRenderer } from "electron";

import { q, qs, empty, create, remove, span, p, div, enclitic } from './lib/utils'
// import { bookData, scrollPanes, keyPanes, parseLib, parseTitle, parseBook } from './lib/book'
// import { parseInfo, parseDir, parseODS } from './lib/getfiles'
// import { parseQuery } from './lib/search';
import { getInfoFiles, getOds } from './lib/getfiles'
import { navigate } from './lib/nav';
// cleanup - перенести в book?
import { getInfo, cleanup } from './lib/pouch'

const settings = require('electron').remote.require('electron-settings')

const JSON = require('json5')
const axios = require('axios')
let fse = require('fs-extra')
const slash = require('slash')
const log = console.log

const path = require('path')

const clipboard = require('electron-clipboard-extended')
const {dialog, getCurrentWindow} = require('electron').remote

// const isDev = require('electron-is-dev')
// const isDev = false
const isDev = true
const app = remote.app;
// const apath = app.getAppPath()
// let upath = app.getPath("userData")
// const watch = require('node-watch')
let over = q("#new-version")

let container = q('#container')
let imports = qs('link[rel="import"]')
imports.forEach(link=> {
  let content = link.import
  let section = content.querySelector('.section')
  container.appendChild(section.cloneNode(true))
})

// let home = q('#home')
// home.classList.add('is-shown')
// navigate({section: 'home'})
let state = settings.get('state')
if (!state) state = {section: 'home'}
navigate(state)

document.body.addEventListener('click', (event) => {
  // log('CLICK-DOC', event.target.dataset)
  if (event.target.dataset.section) {
    const section = event.target.dataset.section
    // log('CLICK', section)

    // TODO:
    // let fn = '/home/michael/diglossa.texts/Xuanzang/datangxiyuji.json'
    let fn = '/home/michael/diglossa.texts/Plato/dialogues.json'
    // let fns = [fn]
    if (section == 'readInfo') {
      getInfoFiles(fn, function(res) {
        navigate({section: 'home'})
      })
    }
    else
      navigate({section: section})
  }
  else if (event.target.id == 'cleanupdb') {
    cleanup()
      .then(function () {
        let progress = q('#progress')
        progress.classList.remove('is-shown')
        getCurrentWindow().reload()
        navigate({section: 'home'})
      }).catch(function (err) {
        log('DESTROY ERR:', err)
      })
  }
})

ipcRenderer.on('parseDir', function (event) {
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'JSON', extensions: ['json'] }]}, parseDir)
})

ipcRenderer.on('parseOds', function (event) {
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'ODS', extensions: ['ods'] }]}, parseOds)
})

function parseDir(fns) {
  if (!fns || !fns.length) return
  let progress = q('#progress')
  progress.classList.add('is-shown')
  let infopath = fns[0]
  getInfoFiles(infopath, function(res) {
    navigate({section: 'home'})
  })
}

function parseOds(fns) {
  if (!fns || !fns.length) return
  let progress = q('#progress')
  progress.classList.add('is-shown')
  let odsopath = fns[0]
  log('ODSPATH', odsopath)
  getOds(odsopath, function(res) {
    log('ODS RES', res)
    navigate({section: 'home'})
  })
}

ipcRenderer.on('reread', function (event) {
  let progress = q('#progress')
  progress.classList.add('is-shown')
  let state = settings.get('state')
  log('RE-READ', JSON.stringify(state))
  if (!state.infoid) {
    navigate(state)
    return
  }
  getInfo(state.infoid)
    .then(function (info) {
      if (info.infopath) {
        getInfoFiles(info.infopath, function(res) {
          navigate(state)
        })
      } else {
        getOds(info.odspath, function(res) {
          navigate(state)
        })
      }
    }).catch(function(err) {
      log('RE-READ BOOK ERR:', err)
    })
})

// R+Shift
ipcRenderer.on('reload', function (event) {
  let state = settings.get('state')
  getCurrentWindow().reload()
  navigate(state)
})

ipcRenderer.on('action', function (event, action) {
  navigate({section: action})
})

ipcRenderer.on('version', function (event, oldver) {
  axios.get('https://api.github.com/repos/mbykov/diglossa.js/releases/latest')
    .then(function (response) {
      if (!response || !response.data) return
      let newver = response.data.name
      if (oldver && newver && newver > oldver) {
        let verTxt = ['new version available:', newver].join(' ')
        over.textContent = verTxt
        over.classList.add('is-shown')
      }
    })
    .catch(function (err) {
      console.log('VERSION ERR', err)
    })
})

over.addEventListener('click', getNewVersion, false)

function getNewVersion() {
  let href = 'https://github.com/mbykov/diglossa.js/releases/latest'
  shell.openExternal(href)
}

function copyToClipboard(ev) {
  if (ev.shiftKey == true) return
  if (ev.ctrlKey == true) return
  if (ev.target.nodeName != 'SPAN') return
  if (!ev.target.classList.contains('active')) return
  let wf = ev.target.textContent
  clipboard.writeText(wf)
}

document.addEventListener("mouseover", copyToClipboard, false)
