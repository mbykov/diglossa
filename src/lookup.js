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

const Store = require('electron-store')
// const prefstore = new Store({name: 'prefs'})
const appstore = new Store({name: 'app'})
import { message } from './lib/message'

export const lookup = {
  async ready() {
    render('lookup')
    let heappath = appstore.get('heappath')
    if (!heappath) {
      message.show('set path to heap of the books')
    }
    const oheappath = q('#heappath')
    oheappath.textContent = heappath
    this.heappath = heappath
    let oinput = q('.searchinput')
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
  let oheap = ev.target.closest('#heap')
  let orow = ev.target.closest('.lookup-line')
  let oinput = ev.target.closest('.searchinput')
  if (oheap && !oinput) {
    // let oheappath = oheap.querySelector('#heappath')
    openHeappath()
  } else if (orow) fireImport(orow)
})

function fireImport(orow) {
  let bpath = orow.textContent
  if (!bpath) return
  ipcRenderer.send('importBook', {bpath})
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
  let oinput = ev.target.closest('.searchinput')
  if (!oinput) return
  let query = oinput.value
  if (!query) return
  lookupBook(lookup.heappath, query)
  oinput.focus();
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
