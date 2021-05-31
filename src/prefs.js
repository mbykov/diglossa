'use strict'

import { log, q, qs, create, empty, cleanDname } from './lib/utils'
import _ from 'lodash'
import { router, render } from './app'
const mouse = require('mousetrap')
const { app } = require('electron').remote
import { remote } from "electron"
let dgl = remote.getGlobal('dgl')
const { dialog } = require('electron').remote
import { book } from './book'
import { progress } from './lib/progress'
import { message } from './lib/message'

const Store = require('electron-store')
const prefstore = new Store({name: 'prefs'})
const appstore = new Store({name: 'app'})

let homepath = app.getPath('home');
let exportpath = appstore.get('exportpath')
if (!exportpath) {
  exportpath = homepath
  appstore.set('exportpath', exportpath)
}

let defaults = {
  'name': 'example',
  version: '1.0.0',
  'editor': 'John Doe',
  email: 'john.doe@example.com',
  homepage: 'http://example.com',
  license: 'CC BY-SA',
  keywords: 'diglossa, bilingua, dgl',
  'exportpath': exportpath,
  // files: {
  //   css: 'path-to-file',
  //   images: 'path-to-file',
  //   info: 'path-to-file',
  //   annotation: 'path-to-file',
  //   license: 'path-to-file',
  //   acknowledgements: 'path-to-file'
  // },
}

export const preference = {
  async ready() {
    let books = book.sbooks
    if (!books) {
      message.show('select a book first','darkred')
      return
    }
    render('prefs')
    this.tbody = q('#prefs-table .tbody')
    const odata = q('#pref-package-data')
    let origin = dgl.origin(books)
    let oauthor = odata.querySelector('#pref-book-author')
    oauthor.textContent = origin.descr.author
    let otitle = odata.querySelector('#pref-book-title')
    otitle.textContent = origin.descr.title
    this.origin = origin

    let prefs = prefstore.get(origin.bid) || this.initPrefs(origin)
    this.prefs = prefs

    const oexportpath = q('#exportpath')
    oexportpath.textContent = exportpath

    for (let name in prefs) {
      if (name == 'exportpath') continue
      if (name == 'bpath') continue
      if (name == 'files') {
        let files = prefs.files
        for (let fn in files) {
          // let value = files[fn]
          // this.addRow('file', fn, value)
        }
      } else {
        this.addRow('str', name, prefs[name])
      }
    }
    this.stripes()
  },

  initPrefs(origin) {
    defaults.name = [origin.descr.author, origin.descr.title].join('-')
    // defaults.exportpath =  '/home/michael/diglossa.export.md' // todo: export dirpath - NB!!! - пока прописан жестко diglossa.export.md <<<====== NB!!! ?????????
    prefstore.set(origin.bid, defaults)
    return defaults
  },

  // savePrefs(type, name, value) {
  //   let bid = this.origin.bid
  //   let prefs = this.prefs
  //   if (type == 'dir') prefs[name] = value
  //   else if (type == 'file') prefs.files[name] = value
  //   else if (type == 'value') prefs[name] = value
  //   prefstore.set(bid, prefs)
  // },

  addRow(type, name, value) {
    const tmpl = q('.table-line.tmpl')
    const orow = tmpl.cloneNode(true)
    orow.classList.remove('tmpl')
    orow.setAttribute('type', type)
    orow.setAttribute('prefname', name)
    orow.setAttribute('contenteditable', true)
    let oname = orow.querySelector('.td-name')
    let ovalue = orow.querySelector('.td-value')
    oname.textContent = name
    ovalue.textContent = value
    this.tbody.appendChild(orow)
  },

  stripes() {
    let orows = qs('.table-line:not(.hidden)')
    let n = 0
    for (let orow of orows) {
      if ((n % 2) === 1) orow.classList.remove('odd'), orow.classList.add('even')
      else orow.classList.add('odd'), orow.classList.remove('even')
      n++
    }
  },
}

document.addEventListener('click',  (ev) => {
  // const otable = q('#prefs-table')
  // if (!otable) return
  let orow = ev.target.closest('.table-line')
  if (!orow) return
  let type = orow.getAttribute('type')
  if (type == 'file') {
    // dialog.showOpenDialog({properties: ['openFile'] })
    //   .then(result => {
    //     const bpath = result.filePaths[0]
    //     if (!bpath) return
    //     let name = orow.querySelector('.td-name').textContent
    //     // let ovalue = orow.querySelector('.td-value')
    //     // ovalue.textContent = bpath
    //     let type = orow.getAttribute('type')
    //     preference.savePrefs(type, name, bpath)
    //     preference.ready()
    //   }).catch(err => {
    //     console.log(err)
    //   })
  } else if (type == 'dir') {
    dialog.showOpenDialog({properties: ['openDirectory'] })
      .then(result => {
        const bpath = result.filePaths[0]
        if (!bpath) return
        exportpath = bpath
        let type = orow.getAttribute('type')
        // preference.savePrefs(type, 'exportpath', bpath)
        appstore.set('exportpath', bpath)
        let prefname = [preference.origin.bid, exportpath].join('.')
        prefstore.set(prefname, bpath)
        preference.ready()
      }).catch(err => {
        console.log(err)
      })

  }
})

document.addEventListener('keydown', ev => {
  if (ev.key !== 'Enter') return
  ev.preventDefault()
  let orow = ev.target.closest('.table-line')
  if (!orow) return
  let name = orow.querySelector('.td-name').textContent.trim()
  let value = orow.querySelector('.td-value').textContent.trim()
  let prefname = [preference.origin.bid, name].join('.')
  // preference.savePrefs('value', name, value)
  prefstore.set(prefname, value)
  preference.ready()
})


mouse.bind('ctrl+p', function(ev) {
  const state = {route: 'preference'}
  router(state)
})
