'use strict'

import { router, render } from './app'
import _ from 'lodash'
import { remote } from "electron"
import { log, q, qs, create, remove, empty, insertAfter } from './lib/utils'
import { progress } from './lib/progress'
import { deleteDB } from "./lib/pouch";

const Store = require('electron-store')
const libstore = new Store({name: 'library'})
const bkstore = new Store({name: 'libks'})
const bmkstore = new Store({name: 'bookmarks'})
const csyncstore = new Store({name: 'csyncs'})
const syncstore = new Store({name: 'syncs'})
const prefstore = new Store({name: 'prefs'})
const ftstore = new Store({name: 'fts'})

const mouse = require('mousetrap')
import { message } from './lib/message'

let dgl = remote.getGlobal('dgl')
let templates = remote.getGlobal('templates')

// todo: del
mouse.bind(['v'], function(ev) {
  log('_LIB-store', libstore.store)
  console.clear()
  let bks = {}
  for (let bid in libstore.store) {
    let store = libstore.store[bid]
    let books = store.books
    let origin = books.find(book=> book.origin)
    books.forEach(book=> {
      delete book.csyncs
      delete book.syncs
      book.descr = {author: book.author, title: book.title}
      delete book.author
      delete book.title
      if (!book.origin) book.orbid = origin.bid
    })
    books.libidx = store.idx
    bks[bid] = books
  }
  bkstore.clear()
  bkstore.set(bks)

  // let libidxs = []
  // for(let libbid in bks) {
  //   libidxs.push(bks[libbid].libidx)
  // }
})

export const library = {
  async ready() {
    render('library')
    dgl.editMode = false
    this.bks = bkstore.store
    parseLib()
    this.stripes()
    progress.hide()
  },

  isOrigin(bid) {
    return _.keys(this.bks).includes(bid)
  },

  originBid(bid) {
    let orbid = bid
    for (let libbid in this.bks) {
      let books = this.bks[libbid]
      for (let book of books) {
        if (book.bid == bid) orbid = dgl.origin(books).bid
      }
    }
    return orbid
  },

  expandBook(orbid) {
    let books = this.bks[orbid]
    let selector
    books.forEach(book=> {
      if (orbid == book.bid) return
      selector = ['.table-line[bid="', book.bid, '"]'].join('')
      let row = q(selector)
      if (!row) return
      row.classList.toggle('hidden')
    })
    this.stripes()
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

  activate(bid) {
    let book, books, orbid
    if (this.isOrigin(bid)) {
      books = this.bks[bid]
      orbid = dgl.origin(books).bid
      for (const book of books) {
        book.active = true
      }
    } else {
      orbid = this.originBid(bid)
      books = this.bks[orbid]
      let origin = books.find(book=> book.bid == orbid)
      if (!origin.active) {
        let mess = ['the origin book -', origin.descr.title, 'should be activated first'].join(' ')
        message.show(mess,'darkred')
        return
      }
      book = books.find(book=> book.bid == bid)
      book.active = true
    }
    setStore(this.bks)
    parseLib(orbid)
  },

  deactivate(bid) {
    let book, books, orbid
    if (this.isOrigin(bid)) {
      books = this.bks[bid]
      orbid = dgl.origin(books).bid
      for (const book of books) {
        book.active = false
      }
    } else {
      orbid = this.originBid(bid)
      books = this.bks[orbid]
      book = books.find(book=> book.bid == bid)
      book.active = false
    }
    // log('_DEACT BKS', this.bks)
    setStore(this.bks)
    parseLib(orbid)
  },

  async deleteBook(bid) {
    progress.show()
    let book, books
    if (this.isOrigin(bid)) {
      books = this.bks[bid]
      for (const book of books) {
        await deleteDB(book.bid)
        let ftspath = [book.lang, bid].join('.')
        await ftstore.delete(ftspath)
        await bmkstore.delete(bid)
        await prefstore.delete(bid)
        await csyncstore.delete(bid)
        await syncstore.delete(bid)
      }
      delete this.bks[bid]
    } else {
      let libbid = this.originBid(bid)
      books = this.bks[libbid]
      if (!books) return
      this.bks[libbid] = books.filter(book=> book.bid != bid)
    }
    book = books.find(book=> book.bid == bid)
    setStore(this.bks)
    this.ready()
    let mess = ['book -', book.descr.author, book.descr.title, 'deleted'].join(' ')
    message.show(mess,'darkgreen')
  },
}

function setStore(bks) {
  let libidx = 0
  for (let libbid in bks) {
    let books = bks[libbid]
    books.libidx = libidx
    libidx++
  }
  bkstore.clear()
  bkstore.set(bks)
}

document.addEventListener('click',  (ev) => {
  let orow = ev.target.closest('#lib-table .table-line')
  if (!orow) return
  let bid = orow.getAttribute('bid')
  let orbid = library.originBid(bid)

  let direction = (ev.ctrlKey && ev.altKey) ? 'down' : (ev.ctrlKey) ? 'up' : null
  let olangs = ev.target.closest('.td-langs')
  let ocheck = ev.target.closest('svg')
  let oact = ev.target.closest('button.td-activate')
  let odel = ev.target.closest('button.td-delete')

  if (olangs) library.expandBook(orbid)
  else if (oact) library.activate(bid)
  else if (ocheck) library.deactivate(bid)
  else if (odel) library.deleteBook(bid)
  else {
    let books = bkstore.get(orbid)
    const origin = dgl.origin(books)
    if (orbid != bid) {
      const shown = dgl.shown(books)
      const book = books.find(book=> book.bid == bid)
      if (shown.bid != bid && book.active) {
        book.shown = true
        shown.shown = false
        library.bks[orbid] = books
        bkstore.clear()
        bkstore.set(library.bks)
      } else {
        let mess = [book.descr.title, 'should be activated first'].join(' ')
        message.show(mess,'darkred')
      }
    } else {
      if (!origin.active) {
        let mess = 'no active books'
        message.show(mess,'darkred')
        return
      }
    }

    let state = {route: 'book', bid: orbid}
    dgl.bid = orbid
    router(state)
  }
  // todo: else if (direction) moveRow(bid, direction)
})

function parseLib() {
  const tbody = q('#lib-table .tbody')
  empty(tbody)
  let books
  for (let libbid in library.bks) {
    books = library.bks[libbid]
    for (let book of books) {
      let orow = parseRow(book)

      orow.setAttribute('bid', book.bid)
      if (book.origin) {
        let olangs = orow.querySelector('.td-langs')
        olangs.textContent = ''
        let oactlangs = create('span')
        let actlangs = dgl.langs(books)
        oactlangs.textContent = actlangs
        let passives = _.difference(dgl.alllangs(books), actlangs)
        olangs.appendChild(oactlangs)
        if (passives.length) {
          let oalllangs = create('span')
          oalllangs.textContent = [' (', passives, ')'].join('')
          oalllangs.classList.add('text-gray-400')
          olangs.appendChild(oalllangs)
        }

      }
      tbody.appendChild(orow)
    }
  }
}

function parseRow (book) {
  const tmpl = q('.table-line.tmpl')
  const orow = tmpl.cloneNode(true)
  orow.classList.remove('tmpl')

  let oauthor = orow.querySelector('.td-author')
  let otitle = orow.querySelector('.td-title')
  let olangs = orow.querySelector('.td-langs')
  let ocheck = orow.querySelector('svg')
  let oact = orow.querySelector('button.td-activate')

  otitle.textContent = book.descr.title
  oauthor.textContent = book.descr.author
  if (book.origin) {
    orow.classList.remove('hidden')
  } else {
    orow.classList.add('hidden')
    orow.classList.add('grey')
  }
  if (book.active) {
    ocheck.classList.remove('hidden')
    oact.classList.add('hidden')
  } else {
    ocheck.classList.add('hidden')
    oact.classList.remove('hidden')
  }

  olangs.textContent = book.lang
  orow.setAttribute('bid', book.bid)
  return orow
}
