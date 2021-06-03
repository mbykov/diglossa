'use strict';

import _ from 'lodash'
import { clipboard, ipcRenderer } from "electron";
import { log, q, empty, create, tokenizer } from './lib/utils'
import { router, render } from './app'
import { fetchBook, fetchChapterDocs, fetchBlock } from "./lib/pouch";
const mouse = require('mousetrap')
const FlexSearch = require("flexsearch")
import { progress } from './lib/progress'
const Mark = require('mark.js')
import { page, getSyncs } from './page'
import { message } from './lib/message'
import { book, getCSyncs } from './book'
import { porter } from './lib/stemmer'
import { rotateBlock } from './header'
import { getSyncedDocs } from './exportBook'

import { remote } from "electron"
let dgl = remote.getGlobal('dgl')
let templates = remote.getGlobal('templates')

const Store = require('electron-store')
const ftstore = new Store({name: 'fts'})
const bkstore = new Store({name: 'libks'})
const syncstore = new Store({name: 'syncs'})

const ftsopts =  {
  depth: 3,
  doc: {
    id: 'idx',
    field: 'md',
    store: 'ids'
  },
  tokenize: function(str) {
    return str.split(/[\p{P} ]+/ug).filter(Boolean)
  }
}

let fts = importFts()

function importFts() {
  let fts = []
  for (let lang in ftstore.store) {
    let langfts = ftstore.store[lang]
    for (let bid in langfts) {
      let bidfts = langfts[bid]
      for (let cntidx in bidfts) {
        let json = bidfts[cntidx]
        let ftsidx = new FlexSearch(ftsopts)
        ftsidx.import(json)
        ftsidx.bid = bid
        ftsidx.lang = lang
        ftsidx.cntidx = cntidx
        fts.push(ftsidx)
      }
    }
  }
  return fts
}

ipcRenderer.on('generateFTS', function (event) {
  generateFTS()
})

// todo: remove generateFTS
mouse.bind('ctrl+g', function(ev) {
  generateFTS()
})

async function generateFTS() {
  if (!dgl.bid) {
    message.show('select a book', 'darkred')
    return
  }
  progress.show()
  let oprocent = q('#dict-progress')
  let originbid = dgl.origin(book.sbooks).bid

  let origin = dgl.origin(book.sbooks)
  let csyncs = getCSyncs(origin.bid)
  let syncs  = getSyncs(origin.bid)

  let sbooks = dgl.actives(book.sbooks)
  book.sbooks = book.syncCnts(sbooks, csyncs)

  for await (let sbook of book.sbooks) {
    let mess = ['indexing', sbook.lang, sbook.descr.title, '...'].join(' - ')
    message.show(mess, 'darkgreen', true)

    let total = sbook.cnts.length
    const stemmer = porter(sbook.lang)

    for await (let cnt of sbook.cnts) {
      showProgress(oprocent, total, cnt.idx+1)
      await sleep(1000)
      let queries = book.sbooks.map(sbook=> {
        let qcnt = sbook.cnts[cnt.idx]
        if (!qcnt) return false
        return {bid: sbook.bid, path: qcnt.path, size: qcnt.size, lang: sbook.lang}
      })
      queries = _.compact(queries)

      let chapters = await page.getChapters(book, cnt.idx)
      chapters = await syncChapters(chapters, syncs)

      let chapter = chapters.find(chapter=> chapter.bid == sbook.bid)
      let chdocs = chapter.chdocs

      let clean, doc
      let cleans = chdocs.map((chdoc, idx)=> {
        // if (!chdoc.md) log('_NO MD', idx, chdoc)
        let ids = chapters.map((chapter, idy)=> {
          doc = chapter.chdocs[idx]
          if (!doc) return false
          return {bid: idy, id: doc._id}
        })
        ids = _.compact(ids)
        clean = {idx, ids}
        try {
          if (stemmer) clean.md = tokenizer(chdoc.md).map(wf=> stemmer(wf)).join(' ')
          else clean.md = chdoc.md
        } catch(err) {
          console.log('_ERR TOKEN:', err)
          return null
        }
        return clean
      })
      cleans = _.compact(cleans)

      let ftspath = [sbook.lang, originbid, cnt.idx].join('.')
      let ftsidx = new FlexSearch(ftsopts)
      ftsidx.add(cleans)
      let json = ftsidx.export()
      ftstore.set(ftspath, json)
    } // for sbook.cnts
  }

  fts = importFts()
  oprocent.classList.add('hidden')
  let mess = 'full text search index generated'
  message.show(mess, 'darkgreen')

}

// // todo: через export getSyncs, del
// function getSyncs(bid) {
//   let syncs = syncstore.get(bid)
//   if (_.isEmpty(syncs)) syncs = []
//   return syncs
// }

// это почти копия из page
async function syncChapters(chapters, syncs) {
  for await (let chapter of chapters) {
    let booksyncs = syncs.filter(sync=> sync.bid == chapter.bid)
    chapter.chdocs = await page.syncChapter(booksyncs, chapter.chdocs)
  }
  return chapters
}

const sleep = ms => {
  return new Promise(resolve=> {
    setTimeout(() => resolve(), ms)
  })
}
function showProgress(oprocent, total, size) {
  oprocent.classList.remove('hidden')
  let percent = Math.round(size*100/total)
  if (percent < 100) oprocent.textContent = [percent, '%'].join(' ')
  else oprocent.textContent = '', oprocent.classList.add('hidden')
}

export const search = {
  async ready(state) {
    progress.show()
    render('search')
    const oquery = q('#search-query')
    oquery.textContent = state.query
    this.query(state)
  },
  async query(state) {
    let results = []
    for await (let ftsidx of fts) {
      const stemmer = porter(ftsidx.lang)
      let rstem
      try {
        rstem = state.query.split(' ').map(st=> stemmer(st))
      } catch(err) {
        // log('_ERR: bad stemmer')
        continue
      }
      if (!rstem.length) continue
      rstem = rstem.join(' ')

      // let ftsres = ftsidx.search(stem, { limit: 5 })
      let ftsres = ftsidx.search(rstem)
      if (!ftsres.length) continue
      for (let res of ftsres) {
        results.push({bid: ftsidx.bid, cntidx: ftsidx.cntidx, lang: ftsidx.lang, ids: res.ids, rstem})
      }
    }

    let randoms = _.shuffle(results)
    let oresults = q('#search-list')
    empty(oresults)
    mark(q('.search-query'), state.query)

    let orow
    for await (let ftsres of randoms) {
      orow = await this.parseBlock(ftsres)
      if (!orow) return
      oresults.appendChild(orow)
      mark(orow, ftsres.rstem)
    }
    progress.hide()
  },

  async parseBlock(ftsres) {
    let books = bkstore.get(ftsres.bid)
    if (!books) return
    let params = ftsres.ids.map((param, idx)=> {
      param.bid = books[idx].bid
      param.lang = books[idx].lang
      return param
    })
    let dbdocs = await fetchBlock(params)
    dbdocs = _.compact(dbdocs)
    let mds = dbdocs.map(doc=> doc.md)
    let origin = dgl.origin(books)
    let sname = origin.cnts[ftsres.cntidx].md

    const tmpl = q('.list-line.tmpl')
    const orow = tmpl.cloneNode(true)
    orow.classList.remove('tmpl')
    orow.classList.remove('hidden')
    orow.setAttribute('bid', ftsres.bid)
    orow.setAttribute('idx', ftsres.cntidx)
    orow.setAttribute('blockid', ftsres.blockid)

    let ohead = orow.querySelector('.line-head')
    let oauthor = ohead.querySelector('.line-author')
    oauthor.textContent = origin.descr.author
    let otitle = ohead.querySelector('.line-title')
    otitle.textContent = origin.descr.title
    let osname = ohead.querySelector('.line-sname')
    osname.textContent = sname
    ohead.classList.add('truncate')

    let oblock = orow.querySelector('.block')
    empty(oblock)

    let shown = true
    for (const dbdoc of dbdocs) {
      let opar = create('p', 'ptext')
      opar.setAttribute('lang', dbdoc.lang)
      opar.textContent = dbdoc.md
      if (shown) shown = false
      else opar.classList.add('hidden')
      oblock.appendChild(opar)
    }
    return orow
  },
}

function mark(el, query) {
  let markInstance = new Mark(el)
  markInstance.mark(query, {
    "element": "span",
    "className": "highlight"
  })
}

mouse.bind('ctrl+c', function(ev) {
  const owf = q('span.wf:hover')
  if (!owf) return
  const text = owf.textContent
  clipboard.writeText(text)
})

document.addEventListener ("click",  (ev) => {
  if (dgl.route != 'search') return
  const oheader = q('.header-active')
  if (!oheader) return
  let oinput = ev.target.closest('input.search-input')
  if (!oinput) return
  if (oheader.classList.contains('hidden')) {
    hideSearchInput()
  } else {
    showSearchInput()
  }
})

function showSearchInput(query) {
  const oheader = q('.header-active')
  if (!oheader) return
  let oinput = q('input.search-input')
  const osearch = q('#search')
  oheader.classList.add('hidden')
  osearch.classList.add('search-full')
  oinput.classList.add('search-input-full')
  oinput.placeholder = 'search...'
  if (query) oinput.value = query
}

export function hideSearchInput() {
  const oheader = q('.header-active')
  if (!oheader) return
  let oinput = q('input.search-input')
  const osearch = q('#search')
  oheader.classList.remove('hidden')
  osearch.classList.remove('search-full')
  oinput.classList.remove('search-input-full')
  oinput.placeholder = ''
  oinput.value = ''
}

// todo: восстановить showSearchInput()
mouse.bind('ctrl+f', function(ev) {
  const owf = q('span.wf:hover')
  if (!owf) return
  const query = owf.textContent
  const opar = owf.closest('p.ptext')
  const lang = opar.getAttribute('lang')
  const oblock = owf.closest('.block')
  const blockid = oblock.getAttribute('blockid') * 1
  // const books = bkstore.get(dgl.bid)
  const origin = dgl.origin(book.sbooks)
  const state = {route: 'search', bid: dgl.bid, idx: dgl.idx, blockid, query, lang, descr: origin.descr}
  // search.query(state)
  router(state)
})

// jump to search result
document.addEventListener ("click",  (ev) => {
  if (dgl.route != 'search') return
  let oblock = ev.target.closest('.block')
  if (oblock) return
  const oline = ev.target.closest('.list-line')
  if (!oline) return
  const bid = oline.getAttribute('bid')
  const idx = oline.getAttribute('idx') * 1
  const context = oline.getAttribute('context')
  let oquery = q('#search-query')
  let query = oquery.textContent
  const state = {route: 'page', bid, idx, query, context, jump: true}
  router(state)
})

document.addEventListener("wheel", function(ev) {
  if (!ev.shiftKey) return
  if (dgl.route != 'search') return
  let oblock = ev.target.closest('.block')
  if (!oblock) return
  rotateBlock(oblock)
}, false)

document.addEventListener ("click",  (ev) => {
  if (dgl.route != 'search') return
  let oblock = ev.target.closest('.block')
  if (!oblock) return
  oblock.classList.toggle('truncate')
})

document.getElementById('search-icon').onclick = function () {
  page.localquery = ''
  let oicon = q('#search-icon')
  oicon.classList.add('hidden')
  let oinput = q('#search-input')
  oinput.classList.remove('hidden')
  oinput = q('.searchinput')
  oinput.value = ''
  oinput.focus();
};

let escInput = function(ev) {
  if (ev.which == 27) hideSearchField()
  else if (ev.which == 13) fireFTSearch()
}

document.addEventListener('keydown', escInput, true);

function hideSearchField() {
  let oinput = q('.searchinput')
  oinput.blur();
  oinput = q('#search-input')
  oinput.classList.add('hidden')
  let oicon = q('#search-icon')
  oicon.classList.remove('hidden')
}

function fireFTSearch() {
  let oinput = q('.searchinput')
  let query = oinput.value
  if (!query) return
  const state = {route: 'search', query}
  // search.query(state)
  router(state)
  hideSearchField()
}
