'use strict';

import _ from 'lodash'
import { log, q, qs, empty, create, remove, span, p, div, space, ctext } from './lib/utils'
import { router, render } from './app'
import { book } from './book'
import { page } from './page'
import { remote } from "electron"
const Store = require('electron-store')
const bkstore = new Store({name: 'libks'})
let dgl = remote.getGlobal('dgl')

let templates = remote.getGlobal('templates')

export const header = {
  async ready (idx) {
    setEmptyHeader()
    showLeftHeader()
    if (book.sbooks.length > 1) showRightHeader(idx)
    else showSimpleHeader(idx)
  }
}

function setEmptyHeader() {
  let oheader = q('.header')
  oheader.classList.add('grid-cols-2')
  oheader.innerHTML = templates.header
  let estyle = q('#editStyle')
  if (estyle) estyle.innerHTML = ''
}

function showLeftHeader() {
  let oleft = q('.header-cell.left')
  if (dgl.route == 'book') oleft.textContent = 'Library'
  else if (dgl.route == 'page') {
    let origin = dgl.origin(book.sbooks)
    oleft.textContent = origin.descr.title //.slice(0, 25)
  }
}

function showRightHeader(cntidx) {
  let oheader = q('.header-cell.right')
  empty(oheader)
  let oul = create('div', 'header-block')
  oul.classList.add('block')
  if (cntidx === undefined) cntidx = dgl.idx
  book.sbooks.forEach(sbook=> {
    if (sbook.origin) return
    let htext
    if (dgl.route == 'book') htext = sbook.descr.title
    else if (dgl.route == 'page') htext = sbook.cnts[cntidx].md
    htext = [': ', htext].join('')
    let oli = create('p')
    oul.appendChild(oli)
    oli.classList.add('headline')
    oli.setAttribute('lang', sbook.lang)
    oli.setAttribute('bid', sbook.bid)
    if (sbook.shown) oli.classList.remove('hidden')
    else oli.classList.add('hidden')
    let olang = span(sbook.lang, 'head-lang')
    oli.appendChild(olang)
    let ohtext = span(htext)
    oli.appendChild(ohtext)
  })
  oheader.appendChild(oul)
}

function showSimpleHeader(cntidx) {
  let oheader = q('.header-cell.right')
  empty(oheader)
  let oul = create('div', 'header-block')
  oul.classList.add('block')
  if (cntidx === undefined) cntidx = dgl.idx
  let origin = dgl.origin(book.sbooks)
  let oli = create('p')
  oul.appendChild(oli)
  oli.classList.add('headline')
  oli.setAttribute('lang', origin.lang)
  oli.setAttribute('bid', origin.bid)
  oli.classList.remove('hidden')
  let htext
  if (dgl.route == 'book') htext = origin.descr.title
  else if (dgl.route == 'page') htext = origin.cnts[cntidx].md
  oli.textContent = htext
  oheader.appendChild(oul)
}

export function rotateBlock(oblock) {
  const pars = _.filter(oblock.children, child=> child.nodeName == 'P')
  if (!pars.length) return false
  let next = 0
  _.each(pars, (par, idx)=> {
    if (par.classList.contains('hidden')) return
    par.classList.add('hidden')
    next = idx + 1
    if (next === pars.length) next = 0
  })
  const nextpar = pars[next]
  nextpar.classList.remove('hidden')
  return next
}

document.addEventListener ("click",  async (ev) => {
  if (dgl.editMode) return
  if (!dgl.bid) return
  let oleft = ev.target.closest('.header-cell.left')
  if (oleft) {
    if (dgl.route == 'book') router({route: 'library'})
    else if (dgl.route == 'page') router({route: 'book', bid: dgl.bid})
  }
})
