'use strict';

import _ from 'lodash'
import { log, q, qs, create, previousSiblings, getCoords } from './lib/utils'
import { render } from './app'
const mouse = require('mousetrap')
import { message } from './lib/message'
import { header } from './header'
import { getFirstBlock } from './autosync'
const fse = require('fs-extra')

const Store = require('electron-store')
const syncstore = new Store({name: 'syncs'})

const natural = require('natural')
const tokenizer = new natural.WordTokenizer()
const sw = require('stopword')
const langs = require('langs')
// const a = require('debug')('cycle')
// const d = require('debug')('sync')

import { page, alignPars } from './page'
import { book } from './book'

let style = document.createElement('style')
style.type = 'text/css'
style.id = 'editStyle'
document.getElementsByTagName('head')[0].appendChild(style)

import { remote } from "electron"
let dgl = remote.getGlobal('dgl')
let templates = remote.getGlobal('templates')

function addEditStyle() {
  style.innerHTML = 'p.ptext:hover {background-color: #eefddd; }'
}

export function removeEditStyle() {
  style.innerHTML = ''
  let oed = q('.editable')
  if (oed) oed.classList.remove('editable')
  oed = q('.editable-wf')
  if (oed) oed.classList.remove('editable-wf')
  let omarks = qs('.em-green-circle')
  omarks.forEach(omark=> omark.classList.remove('em-green-circle'))
  omarks = qs('.em-red-circle')
  omarks.forEach(omark=> omark.classList.remove('em-red-circle'))
}

mouse.bind('ctrl+e', function(ev) {
  if (!q('.header') || dgl.editMode) return
  dgl.editMode = true
  message.hide()
  semaphore.ready()
})

// todo: semaphore - что тут происхоит при смене языка ?
export const semaphore = {
  async ready() {
    setEmptyHeader()
    setSemaphore()
    if (!page.idx) setCntSynchroMarks()
  }
}

async function setSemaphore() {
  if (!book.shown()) return
  let ocircle = q('svg #em-big-circle')
  let oleft = q('#em-src-size')
  let oright = q('#em-trn-size')
  let osrc = q('#em-lang-origin')
  let otrn = q('#em-lang-shown')
  if (page && page.idx) {
    let chapters = await page.chapters
    let origin = dgl.origin(chapters)
    let shown = dgl.shown(chapters)
    if (origin.chdocs.length == shown.chdocs.length) ocircle.setAttribute('fill', 'green')
    oleft.textContent = origin.chdocs.length
    oright.textContent = shown.chdocs.length
    osrc.textContent = origin.lang
    otrn.textContent = shown.lang
  }  else if (book) {
    let origin = book.origin()
    let shown = book.shown()
    if (origin.cnts.length == shown.cnts.length) ocircle.setAttribute('fill', 'green')
    oleft.textContent = origin.cnts.length
    oright.textContent = shown.cnts.length
    osrc.textContent = origin.lang
    otrn.textContent = shown.lang
  }
}

function setCntSynchroMarks() {
  let osvg = q('svg.svg-circle')
  if (!osvg) return
  let oapp = q('#app')
  let osrcs = qs('#src p.tree-text:not(.hidden)')

  for (let osrc of osrcs) {
    let idx = osrc.getAttribute('idx')
    let srcsize = osrc.getAttribute('size')
    let selector = ['#trn p.tree-text:not(.hidden)[idx="', idx, '"]' ].join('')
    let otrn = q(selector)
    if (!otrn) continue
    let oblock = otrn.closest('.block')
    let trnsize = otrn.getAttribute('size')

    const omark = osvg.cloneNode(true)
    omark.classList.add('synchroMark')
    oblock.parentNode.insertBefore(omark, oblock)
    let title = [srcsize, trnsize].join('/')
    let ocircle = omark.querySelector('circle')
    if (srcsize == trnsize) ocircle.setAttribute('fill', 'green')
    else ocircle.setAttribute('fill', 'red')
    let otitle = create('title')
    otitle.textContent = title
    ocircle.appendChild(otitle)
  }
}

function setEmptyHeader() {
  let oheader = q('.header')
  oheader.innerHTML = templates.semaphore
  oheader.classList.remove('grid-cols-2')
  addEditStyle()
}

function synchronize(action, param) {
  if (!dgl.editMode) return
  const oblock = q('.block:hover')
  if (!oblock) {
    message.show('select chapter / paragraph to synchronize', 'darkred')
    return
  }

  let bid = oblock.closest('#src') ? book.origin().bid : book.shown().bid
  let sync = {bid, action, tmp: true} // idx не нужен, bid только для origin/shown
  if (page.idx > -1) {
    const blockid = oblock.getAttribute('blockid') * 1
    sync.blockid = blockid
    sync.idx = page.idx
    if (param) sync.param = param
    page.reSync(sync)
  } else {
    const opar = oblock.querySelector('p.tree-text:hover:not(.hidden)')
    if (!opar) return
    const path = opar.getAttribute('path')
    sync.path = path
    book.reSync(sync)
  }
}

mouse.bind('ctrl+z', function(ev) {
  if (!dgl.editMode) return
  if (page.idx > -1) page.undo()
  else book.undo()
})

mouse.bind('d', function(ev) {
  synchronize('delete')
})

mouse.bind('b', function(ev) {
  let oed = q('.editable-wf')
  if (!oed) {
    message.show('choose wordform to break paragraph', 'darkred')
    return
  }
  let text = oed.textContent
  let prev, pprev, next, nnext
  prev = oed.previousSibling.textContent
  if (prev) pprev = oed.previousSibling.previousSibling
  if (pprev) pprev = pprev.textContent
  next = oed.nextSibling.textContent
  if (next) nnext = oed.nextSibling.nextSibling
  if (nnext) nnext = nnext.textContent
  let context = [pprev, prev, text, next, nnext].join('')

  // quotation marks and dashes placed before wf:
  let restricted = ['–', '\"', "«"]
  if (oed.previousSibling && oed.previousElementSibling != oed.previousSibling && restricted.includes(oed.previousSibling.textContent.trim())) {
    text = [oed.previousSibling.textContent, text].join('')
    let re = new RegExp(oed.previousSibling.textContent + '$')
    prev = prev.replace(re, '')
    context = [pprev, prev, text, next, nnext].join('')
  }

  let param = {context, text}
  synchronize('breakParagraph', param)
})

mouse.bind('m', function(ev) {
  synchronize('mergeNext')
})

mouse.bind('i a', function(ev) {
  synchronize('insertAfter')
})

mouse.bind('i b', function(ev) {
  synchronize('insertBefore')
})

mouse.bind('e', function(ev) {
  synchronize('empty')
})

mouse.bind('c', function(ev) {
  synchronize('copy')
})

mouse.bind('right', function(ev) {
  synchronize('right')
})

mouse.bind('left', function(ev) {
  synchronize('left')
})

// set editable block and wf
document.addEventListener ("click",  (ev) => {
  if (!dgl.editMode) return
  let owf = ev.target.closest('span.wf')
  if (!owf) return
  let oblock = ev.target.closest('.block')
  if (!oblock) return
  let oed = q('.editable')
  if (oed) oed.classList.remove('editable')
  oblock.classList.add('editable')
  oed = q('.editable-wf')
  if (oed) oed.classList.remove('editable-wf')
  owf.classList.add('editable-wf')
})

// todo:  truncate??? а будет ли работать align pars без пересчета?
mouse.bind('ctrl+t_', function(ev) {
  if (!dgl.editMode) return
  if (!page.idx) return
  let oblocks = qs('.page .block')
  let oblock = q('.page .block[blockid="0"]')
  let trnk = oblock.classList.contains('truncate') ? true : false
  _.each(oblocks, oblock=> {
    if (trnk) oblock.classList.remove('truncate'), oblock.classList.remove('truncated')
    else oblock.classList.add('truncate'), oblock.classList.add('truncated')
  })
})
