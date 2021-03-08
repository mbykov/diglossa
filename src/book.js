'use strict'

import { router, render } from './app'
import _ from 'lodash'
import { remote } from "electron"
import { log, q, qs, create, remove, empty, insertAfter } from './lib/utils'
import { progress } from './lib/progress'
import { message } from './lib/message'
import { page } from './page'
import { header, rotateBlock } from './header'
import { semaphore } from './semaphore'
import { createTree } from './lib/tree'

const mouse = require('mousetrap')
const Store = require('electron-store')
const bkstore = new Store({name: 'libks'})
const csyncstore = new Store({name: 'csyncs'})
let dgl = remote.getGlobal('dgl')

export const book = {
  async ready(state) {
    progress.show()
    render('book')
    delete dgl.idx
    let books
    if (state && state.bid) {
      books = bkstore.get(state.bid)
      books = dgl.actives(books)
    } else {
      throw new Error('_BOOK NO STATE')
    }
    let csyncs = getCSyncs(state.bid)
    this.srcbooks = books
    this.sbooks = this.syncCnts(this.srcbooks, csyncs)
    this.drawCont()
    showSearchIcon()
    header.ready()
    progress.hide()
  },
  origin() {
    return this.sbooks.find(book=> book.origin)
  },
  shown() {
    return this.sbooks.find(book=> book.shown)
  },
  syncCnts(sbooks, csyncs) {
    sbooks = _.cloneDeep(sbooks)
    sbooks.forEach(sbook=> {
      let bsyncs = csyncs.filter(csync=> csync.bid == sbook.bid)
      bsyncs.forEach(csync=> {
        sbook.cnts = syncCnt(sbook.cnts, csync)
      })
    })
    return sbooks
  },
  reSync(sync) {
    let sbook = this.sbooks.find(book=> book.bid == sync.bid)
    sbook.cnts = syncCnt(sbook.cnts, sync)
    let csyncs = getCSyncs(sbook.bid)
    csyncs.push(sync)
    csyncstore.set(dgl.bid, csyncs)
    semaphore.ready()
    this.drawCont()
  },
  undo() {
    let csyncs = getCSyncs(dgl.bid)
    csyncs = csyncs.slice(0,-1)
    this.sbooks = this.syncCnts(this.srcbooks, csyncs)
    csyncstore.set(dgl.bid, csyncs)
    semaphore.ready()
    this.drawCont()
  },
  drawCont() {
    let books = this.sbooks
    let {osrc, otrn} = setPanes(books)
    const src = dgl.origin(books)

    let roots = _.filter(src.cnts, doc=> doc.level == 1)
    let oroots = createTree(src.cnts, roots, [src])
    oroots.forEach(oroot=> osrc.appendChild(oroot))

    const trn = dgl.shown(books)
    if (!trn) return
    let trnroots = _.filter(trn.cnts, doc=> doc.level == 1)
    const trns = dgl.trns(books)
    oroots = createTree(trn.cnts, trnroots, trns)
    oroots.forEach(oroot=> otrn.appendChild(oroot))
  }
 }

export function getCSyncs(bid) {
  let syncs = csyncstore.get(bid)
  if (_.isEmpty(syncs)) syncs = []
  return syncs
}

function setPanes(books) {
  let {osrc, otrn} = getPanes()
  empty(osrc)
  empty(otrn)
  let opage = document.querySelector('.page')
  if (books.length == 1) {
    opage.classList.remove('grid-cols-2')
    otrn.classList.add('hidden')
  } else if (book.layout) {
    opage.classList.remove('grid-cols-2')
    if (book.layout == 'src') {
      osrc.classList.remove('hidden')
      otrn.classList.add('hidden')
    }  else if (book.layout == 'trn') {
      osrc.classList.add('hidden')
      otrn.classList.remove('hidden')
    }
  } else {
    opage.classList.add('grid-cols-2')
    osrc.classList.remove('hidden')
    otrn.classList.remove('hidden')
  }
  return {osrc, otrn}
}

function getPanes() {
  let osrc = q('#src')
  let otrn = q('#trn')
  return {osrc, otrn}
}

// todo: export - del
export function syncCnt(cnts, sync) {
  let cnt = cnts.find(cnt=> cnt.path == sync.path)
  if (!cnt) return cnts
  let fakecnt, mess, next, prev

  switch(sync.action) {
  case 'delete':
    cnts = cnts.filter(cnt=> cnt.path != sync.path)
    break
  case 'right':
    cnt.level += 1
    break
  case 'mergeNext':
    next = cnts[cnt.idx+1]
    if (!next) return cnts
    let md = [cnt.md, '.'].join('').replace('..', '.')
    cnt.md = [md, next.md].join(' ')
    cnt.size = cnt.size + next.size
    cnts = cnts.filter(cnt=> cnt.path != next.path)
    break
  case 'insertAfter':
    fakecnt = _.clone(cnt)
    fakecnt.md = 'x'
    fakecnt.size = 1
    cnts.splice(cnt.idx+1, 0, fakecnt)
    break
  case 'insertBefore':
    fakecnt = _.clone(cnt)
    fakecnt.md = 'x'
    fakecnt.size = 1
    cnts.splice(cnt.idx, 0, fakecnt)
    break
  case 'empty':
    cnt.size = 1
    mess = ['s_ection', cnt.md, 'emptied'].join(' ')
    message.show(mess,'darkgreen')
    break
  case 'copy':
    fakecnt = _.clone(cnt)
    fakecnt.md = 'x - copied s_ection'
    cnts.splice(cnt.idx+1, 0, fakecnt)
    break
  case 'action':
    break
  case 'action':
    break
  default:
  }

  cnts.forEach((cnt, idx)=> cnt.idx = idx)
  return cnts
}

// router jump to page
document.addEventListener ("click",  (ev) => {
  if (dgl.route != 'book') return
  if (dgl.editMode) return
  let opar = ev.target.closest('p.tree-text')
  if (!opar) return
  const idx = opar.getAttribute('idx') * 1
  const state = {route: 'page', bid: dgl.bid, idx}
  router(state)
})

// switch shown lang
document.addEventListener("wheel", function(ev) {
  if (!ev.shiftKey) return
  if (dgl.route != 'book') return
  let oblock = ev.target.closest('.block')
  if (!oblock) return
  rotateBlock(oblock)

  oblock = ev.target.closest('.header-cell.right .block') // header block
  if (!oblock) return
  let par = oblock.querySelector('p.headline:not(.hidden)')
  let bid = par.getAttribute('bid')

  for (let sbook of book.sbooks) {
    if (sbook.origin) continue
    sbook.shown = false
    if (sbook.bid == bid) sbook.shown = true
  }
  book.drawCont()
})

mouse.bind('1', function(ev) {
  if (!book || book.sbooks.length <= 1) return
  let opage = q('.page')
  if (!opage) return
  let cols = opage.classList.contains('grid-cols-2') // both panes shown
  if (cols) book.layout = 'src'
  else book.layout = false
  if (dgl.route == 'book') book.drawCont()
  else if (dgl.route == 'page') page.drawPage()
})

mouse.bind('2', function(ev) {
  if (!book || book.sbooks.length <= 1) return
  let opage = q('.page')
  if (!opage) return
  let cols = opage.classList.contains('grid-cols-2')
  if (cols) book.layout = 'trn'
  else book.layout = false
  if (dgl.route == 'book') book.drawCont()
  else if (dgl.route == 'page') page.drawPage()
})

mouse.bind('3', function(ev) {
  // todo: change page panes
  log('_как 3 отразится на fts, exports, etc?_')
})

function showSearchIcon() {
  q('#search-icon').classList.remove('hidden')
}

// todo: del
mouse.bind('ctrl+i', function(ev) {
  console.clear()
  log('_B:', book.sbooks)
})
