'use strict'

import { log, q, qs, create, empty, cleanDname } from './lib/utils'
import _ from 'lodash'
const fse = require('fs-extra')
const glob = require("glob")
import { router, render } from './app'
const mouse = require('mousetrap')
const { app } = require('electron').remote
import { remote } from "electron"
const { dialog } = require('electron').remote
import { progress } from './lib/progress'
import { ipcRenderer } from "electron";
import { book } from './book'
let dgl = remote.getGlobal('dgl')

const Store = require('electron-store')
const appstore = new Store({name: 'appstore'})
import { message } from './lib/message'

export const lookup = {
  async ready() {
    render('lookup')
    let heappath = appstore.get('heappath')
    if (!heappath) {
      message.show('set path to heap of the books', 'darkred')
    }
    const oheappath = q('#heappath')
    oheappath.textContent = heappath
    this.heappath = heappath
    let oinput = q('.lookupinput')
    oinput.focus();
  },

  addRow(type, name, value) {
    const tmpl = q('.search-result-line.tmpl')
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
    let orows = qs('.lookup-line')
    let n = 0
    for (let orow of orows) {
      if ((n % 2) === 1) orow.classList.remove('odd'), orow.classList.add('even')
      else orow.classList.add('odd'), orow.classList.remove('even')
      n++
    }
  },
}

document.addEventListener('click',  (ev) => {
  let olookup = ev.target.closest('#lookup')
  if (!olookup) return
  ev.stopPropagation()
  let ohelp = ev.target.closest('#lookup-help-button')
  let oheap = ev.target.closest('#heap')
  let orow = ev.target.closest('.lookup-line')
  let oinput = ev.target.closest('.lookupinput')
  if (oheap && !oinput) {
    openHeappath()
  } else if (ohelp) {
    ohelp = q('#lookup-help')
    ohelp.classList.toggle('hidden')
  } else if (orow) {
    let shift = (ev.shiftKey) ? true: false
    fireImport(orow, shift)
  }
})

function fireImport(orow, shift) {
  let bpath = orow.textContent
  if (!bpath) return
  let sbooks = book.sbooks
  if (shift && book) {
    let origin = dgl.origin(book.sbooks)
    ipcRenderer.send('importBook', {bpath, orbid: origin.bid})
  } else if (shift) {
    message.show('select book before', 'darkred')
    return
  } else ipcRenderer.send('importBook', {bpath})
}

function openHeappath() {
  dialog.showOpenDialog({properties: ['openDirectory'] })
    .then(result => {
      const bpath = result.filePaths[0]
      if (!bpath) return
      appstore.set('heappath', bpath)
      lookup.ready()
    }).catch(err => {
      console.log(err)
    })
}

document.addEventListener('keydown', ev => {
  if (ev.key !== 'Enter') return
  ev.preventDefault()
  let oinput = ev.target.closest('.lookupinput')
  if (!oinput) return
  let query = oinput.value
  if (!query) return
  if (!lookup.heappath) {
    message.show('set path to heap of the books', 'darkred')
    return
  }
  lookupBook(lookup.heappath, query)
})

function lookupBook(srcdir, query) {
  progress.show()
  let restr = new RegExp(query, 'i')
  let pattern = [srcdir, '**/*'].join('/')

  glob(pattern, function (er, fns) {
    let qs = query.split(/ ,?/)
    qs.forEach(query=> {
      let req = new RegExp(query, 'i')
      fns = fns.filter(fn=> req.test(fn))
    })
    let oresults = q('#search-list')
    empty(oresults)

    for (let fn of fns) {
      const tmpl = q('.lookup-line.tmpl')
      const orow = tmpl.cloneNode(true)
      orow.classList.remove('tmpl')
      orow.textContent = fn
      oresults.appendChild(orow)
    }
    lookup.stripes()
    progress.hide()
  })
}
