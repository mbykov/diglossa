'use strict'

import { log, q, qs, create, empty } from './lib/utils'
import { ipcRenderer } from "electron";
import _ from 'lodash'
import { router, render } from './app'
const Store = require('electron-store')
const bmkstore = new Store({name: 'bookmarks'})
const mouse = require('mousetrap')
import { remote } from "electron"
import { rotateBlock } from './header'
import { book } from './book'
import { page } from './page'
let dgl = remote.getGlobal('dgl')

export const bookmarks = {
  async ready(state) {
    render('bmks')
    if (state && state.bmk) this.newBmk(state.bmk)
    this.showBmks()
  },

  newBmk(bmk) {
    this.bmk = bmk
    let orow = q('#add-bmk .list-line')
    parseBmk(orow, bmk)
  },

  deleteBmk(key) {
    bmkstore.delete(key)
    this.ready()
  },

  saveBmk() {
    let key = [this.bmk.idx, this.bmk.blockid].join('-')
    key = [this.bmk.bid, key].join('.')
    bmkstore.set(key, this.bmk)
    delete this.bmk
    this.ready()
  },

  showBmks() {
    let bmks = bmkstore.store
    let obmks = q('#bmks-list')
    empty(obmks)
    for (const bid in bmks) {
      let bidbmks = bmks[bid]
      for (const key in bidbmks) {
        let bmk = bidbmks[key]
        let tmpl = q('.tmpl')
        let orow = tmpl.cloneNode(true)
        orow = parseBmk(orow, bmk)
        obmks.appendChild(orow)
      }
    }
  }
}

function parseBmk(orow, bmk) {
  orow.classList.remove('tmpl')
  orow.classList.remove('hidden')

  orow.setAttribute('bid', bmk.bid)
  orow.setAttribute('idx', bmk.idx)
  orow.setAttribute('blockid', bmk.blockid)

  let ohead = orow.querySelector('.line-head')
  let oauthor = ohead.querySelector('.line-author')
  oauthor.textContent = bmk.descr.author
  let otitle = ohead.querySelector('.line-title')
  otitle.textContent = bmk.descr.title
  let osname = ohead.querySelector('.line-sname')
  osname.textContent = bmk.descr.sname
  ohead.classList.add('truncate')

  let shown = true
  let oblock = orow.querySelector('.block')
  empty(oblock)
  for (const doc of bmk.docs) {
    let opar = create('p', 'ptext')
    opar.setAttribute('lang', doc.lang)
    opar.textContent = doc.md
    if (shown) shown = false
    else opar.classList.add('hidden')
    oblock.appendChild(opar)
  }
  return orow
}

// jump
document.addEventListener('click',  (ev) => {
  if (dgl.route != 'bookmarks') return
  const olistline = ev.target.closest('.list-line')
  if (!olistline) return
  const bid = olistline.getAttribute('bid')
  const idx = olistline.getAttribute('idx')
  const blockid = olistline.getAttribute('blockid')

  if (ev.target.id == 'add-bmk-button') {
    bookmarks.saveBmk();
  } else if (ev.target.classList.contains('line-delete')) {
    let key = [idx, blockid].join('-')
    key = [bid, key].join('.')
    bookmarks.deleteBmk(key)
  }

  const orow = ev.target.closest('.line-block')
  if (orow) {
    if (ev.target.classList.contains('ptext')) {
      let oblock = orow.querySelector('.block')
      oblock.classList.toggle('truncate')
    } else {
      const state = {route: 'page', bid, idx, blockid, jump: true}
      router(state)
    }
  }
})

document.addEventListener("wheel", function(ev) {
  if (!ev.shiftKey) return
  if (dgl.route != 'bookmarks') return
  let oblock = ev.target.closest('.block')
  if (!oblock) return
  let next = rotateBlock(oblock)
}, false)

// jump bookmarks
mouse.bind('ctrl+b', function(ev) {
  const state = {route: 'bookmarks'}
  const opar = q('p.ptext:hover')
  if (opar && page.idx) {
    const oblock = opar.closest('.block')
    const blockid = oblock.getAttribute('blockid')
    const origin = _.find(book.sbooks, book=> book.origin)
    const descr = {title: origin.descr.title, author: origin.descr.author}
    descr.sname = (origin.cnts[page.idx]) ? origin.cnts[page.idx].md : 'right header'
    let selector = ['.block[blockid="', blockid, '"] .ptext'].join('')
    let pars = qs(selector)
    const docs = _.map(pars, opar=> { return {md: opar.textContent, lang: opar.getAttribute('lang')}})
    const bmk = {bid: dgl.bid, idx: page.idx, blockid, descr, docs}
    state.bmk = bmk
  }
  router(state)
})
