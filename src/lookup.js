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
// const prefstore = new Store({name: 'prefs'})
const appstore = new Store({name: 'app'})

let heappath = appstore.get('heappath')

// let defaults = {
//   'name': 'example',
//   version: '1.0.0',
//   'editor': 'John Doe',
//   email: 'john.doe@example.com',
//   homepage: 'http://example.com',
//   license: 'CC BY-SA',
//   keywords: 'diglossa, bilingua, dgl',
//   'exportpath': exportpath,
// }

export const lookup = {
  async ready() {
    log('_LOOKUP')
    render('lookup')

    this.tbody = q('#prefs-table .tbody')
    const odata = q('#pref-package-data')

    // let origin = dgl.origin(books)
    // let oauthor = odata.querySelector('#pref-book-author')
    // oauthor.textContent = origin.descr.author
    // let otitle = odata.querySelector('#pref-book-title')
    // otitle.textContent = origin.descr.title
    // this.origin = origin
    // let prefs = prefstore.get(origin.bid) || this.initPrefs(origin)
    // this.prefs = prefs

    const oheappath = q('#heappath')
    oheappath.textContent = heappath
    // this.stripes()
  },

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
        log('_EX BPATH', bpath)
        if (!bpath) return
        appstore.set('heappath', bpath)
        lookup.ready()
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
  lookup.ready()
})
