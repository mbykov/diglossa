'use strict'

import { log, q, qs, create, empty, cleanDname } from './lib/utils'
import _ from 'lodash'
const fse = require('fs-extra')
const glob = require("glob")
import { router, render } from './app'
const mouse = require('mousetrap')
const { app } = require('electron').remote
import { remote } from "electron"
// let dgl = remote.getGlobal('dgl')
const { dialog } = require('electron').remote
// import { book } from './book'
import { progress } from './lib/progress'
import { message } from './lib/message'

const Store = require('electron-store')
// const prefstore = new Store({name: 'prefs'})
const appstore = new Store({name: 'app'})

export const lookup = {
  async ready() {
    render('lookup')
    let heappath = appstore.get('heappath')
    log('_HEAP PATH', heappath)
    const oheappath = q('#heappath')
    oheappath.textContent = heappath
    this.heappath = heappath
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
  const otable = q('#lookup-table')
  if (!otable) return
  log('_CLICK')
  let osearch = ev.target.closest('.searchinput')
  if (osearch) {
    let str = osearch.value
    log('_SEARCH', str)
  }

  let orow = ev.target.closest('.table-line')
  if (!orow) return
  let type = orow.getAttribute('type')
  if (type == 'input') {
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
  log('_ENTER')
  let osearch = ev.target.closest('.searchinput')
  if (!osearch) return
  let query = osearch.value
  if (!query) return
  lookupBook(lookup.heappath, query)
  // lookup.ready()
})

function lookupBook(srcdir, query) {
  log('_lookupBook')

  let restr = new RegExp(query, 'i')
  let pattern = [srcdir, '**/*'].join('/')
  console.log('PATT', pattern)

  glob(pattern, function (er, fns) {
    fns = fns.filter(fn=> restr.test(fn))
    log('_FNS', fns.length)
    for (let fn of fns) {
      log('_FN', fn)
    }
  })

  // console.log("after")
  // let fns = fse.readdirSync(srcdir)
  // log('_fns', fns)
  // if (books.length > 1) {
  //   log('_MANY', books)
  // } else if (!books.length) {
  //   log('_NO', books)
  // } else {
  //   let bookname = books[0]
  //   log('_ONE', bookname)
  // }
}
