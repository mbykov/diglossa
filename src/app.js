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
import { getInfoFiles } from './lib/getfiles'
import { navigate } from './lib/nav';
import { cleanup } from './lib/pouch'

// require('./lib/nav')
const settings = require('electron').remote.require('electron-settings')

const JSON = require('json5')
const Mousetrap = require('mousetrap')
const axios = require('axios')
let fse = require('fs-extra')
const slash = require('slash')
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

let container = q('#container')
let imports = qs('link[rel="import"]')
imports.forEach(link=> {
  let content = link.import
  let section = content.querySelector('.section')
  container.appendChild(section.cloneNode(true))
})

let home = q('#home')
home.classList.add('is-shown')

document.body.addEventListener('click', (event) => {
  // log('CLICK-DOC', event.target.dataset)
  if (event.target.dataset.section) {
    const section = event.target.dataset.section
    // log('CLICK', section)

    // TODO:
    // let fn = '/home/michael/diglossa.texts/Xuanzang/datangxiyuji.json'
    let fn = '/home/michael/diglossa.texts/Plato/dialogues.json'
    let fns = [fn]
    if (section == 'readInfo') {
      getInfoFiles(fns, function(res) {
        // log('APP BOOK PUSHED')
        navigate({section: 'home'})
      })
    }
    else
      navigate({section: section})
  }
  else if (event.target.id == 'cleanupdb') {
    log('DESTROYED CLICKED')
    cleanup()
      .then(function () {
        log('DB DESTROYED')
        getCurrentWindow().reload()
      }).catch(function (err) {
        log('DESTROY ERR:', err)
      })
  }
})

ipcRenderer.on('action', function (event, action) {
  // if (action == 'cleanup') showCleanup()
  // else
  navigate({section: action})
})

// function showCleanup() {
//   showSection('cleanup')
//   let ocleanup = q('#cleanup')
//   ocleanup.addEventListener("click", goCleanup, false)
// }
