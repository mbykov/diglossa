'use strict'

import { log, q, qs, empty, create, remove, getCoords, placePopup, scrollToPosition, removeAll, ndash } from './lib/utils'
import _ from 'lodash'
import { render } from './app'
import { fetchChapter, fetchFN } from "./lib/pouch";
const mouse = require('mousetrap')
const marked = require('marked')
// const stopword = require('stopword')
import { header, rotateBlock } from './header'
import { semaphore, removeEditStyle } from './semaphore'

import { message } from './lib/message'
import { book, getCSyncs } from './book'
const Mark = require('mark.js')
import { progress } from './lib/progress'

const Store = require('electron-store')
const libstore = new Store({name: 'library'})
const bkstore = new Store({name: 'libks'})
const csyncstore = new Store({name: 'csyncs'})
const syncstore = new Store({name: 'syncs'})

import { remote } from "electron"
let dgl = remote.getGlobal('dgl')

export const page = {
  async ready (state) {
    progress.show()
    render('book')
    if (!state || !state.bid) throw new Error('_PAGE NO STATE')

    let sbooks = bkstore.get(state.bid)
    sbooks = dgl.actives(sbooks)
    dgl.idx = state.idx
    if (state.idx < 0) throw new Error('_PAGE NO CHAPTER IDX') // todo: del
    let syncs = getSyncs(state.bid)
    syncs = syncs.filter(sync => sync.idx === dgl.idx)

    if (state.jump) {
      dgl.bid = state.bid
      dgl.idx = state.idx // переназвать cntidx?
      let csyncs = getCSyncs(state.bid)
      book.sbooks = book.syncCnts(sbooks, csyncs)
    }

    this.copy = await this.getChapters(book, state.idx)
    let chapters = _.cloneDeep(this.copy)
    await this.syncChapters(chapters, syncs)
    drawPage(chapters)

    header.ready(state.idx)
    this.localquery = ''
    if (state && state.blockid) this.scroll(state)
    showSearchIcon()
    progress.hide()
    showPagePosition()
  },
  async getChapters(book, cntidx) { // hard copy - chapter for all langs
    let chapters = []
    for await (let sbook of book.sbooks) {
      let chdocs = await this.getChapter(sbook, cntidx)
      let chapter = {bid: sbook.bid, lang: sbook.lang, idx: cntidx, chdocs: chdocs}
      if (sbook.active) chapter.active = true
      if (sbook.origin) chapter.origin = true
      if (sbook.shown) chapter.shown = true
      chapters.push(chapter)
    }
    return chapters
  },
  async syncChapters(chapters, syncs) {
    for await (let chapter of chapters) {
      let booksyncs = syncs.filter(sync=> sync.bid == chapter.bid)
      chapter.chdocs = await this.syncChapter(booksyncs, chapter.chdocs)
    }
    this.chapters = chapters
  },
  async getChapter(sbook, cntidx) {
    let cnt = sbook.cnts[cntidx]
    if (!cnt) return []
    let query = {bid: sbook.bid, path: cnt.path, size: cnt.size}
    let chdocs = await fetchChapter(query)
    return chdocs
  },
  syncChapter(syncs, chdocs) {
    syncs.forEach(sync=> {
      chdocs = syncDoc(chdocs, sync)
    })
    return chdocs
  },
  async undo() {
    let origin = book.sbooks.find(sbook=> sbook.origin)
    let syncs = getSyncs(origin.bid)
    syncs = syncs.slice(0,-1)
    syncstore.set(origin.bid, syncs)
    let chsyncs = syncs.filter(sync => sync.idx === dgl.idx)
    let chapters = _.cloneDeep(this.copy)
    await this.syncChapters(chapters, chsyncs)
    drawPage(chapters)
    semaphore.ready()
  },
  reload() {
    drawPage(this.chapters)
  },
  reSync(sync) {
    let chapter = this.chapters.find(chapter=> chapter.bid == sync.bid)
    chapter.chdocs = syncDoc(chapter.chdocs, sync)

    let origin = book.sbooks.find(sbook=> sbook.origin)
    let syncs = getSyncs(origin.bid)
    syncs.push(sync)
    syncstore.set(origin.bid, syncs)

    drawPage(this.chapters)
    semaphore.ready()
  },
  localSearch() {
    let instance = new Mark(q('.page'))
    if (this.localquery.length < 2) {
      instance.unmark()
      return
    }
    let query = this.localquery
    instance.unmark({
  	  done: function() {
        instance.mark(query, {
          "element": "span",
          "className": "highlight"
        })
      }
    })
  },
  drawPage() {
    drawPage(this.chapters)
  },
  scroll(state) {
    let qblockid = state.blockid
    if (state.context) {
      let recontext = new RegExp('^' + state.context)
      for (let book of this.sbooks) {
        let blockid = 0
        for (let doc of book.chdocs) {
          if (doc.md.split(state.context).length == 2) qblockid = blockid
          blockid ++
        }
      }
    }
    const selector =['#src .block[blockid="', qblockid, '"]'].join('')
    const oblock = q(selector)
    if (!oblock) return

    // todo: state.stem ?
    if (state.query) {
      let markInstance = new Mark(oblock)
      markInstance.mark(state.query, {
        "element": "span",
        "className": "highlight"
      })
    }
    scrollToPosition(oblock.offsetTop - 100)
  },
}

function drawPage(chapters) {
  const scrollTop = q('.page').scrollTop
  let {osrc, otrn} = setPanes(book.sbooks)
  const src = dgl.origin(chapters)
  const trn = dgl.shown(chapters)
  if (!src) return
  let trns = dgl.trns(chapters)
  let oBlock

  src.chdocs.forEach((doc, blockid)=> {
    const aligns = []
    oBlock = create('div', 'block')
    oBlock.setAttribute('blockid', blockid)
    osrc.appendChild(oBlock)
    let opar = parsePar(doc, src.lang)

    oBlock.appendChild(opar)
    aligns.push(opar)

    if (!trn) return
    let otrnBlock = create('div', 'block')
    otrnBlock.setAttribute('blockid', blockid)
    otrn.appendChild(otrnBlock)
    trns.forEach(trn=> {
      let trndoc = trn.chdocs[blockid]
      if (!trndoc) return
      let opar = parsePar(trndoc, trn.lang)
      if (!trn.shown) opar.setAttribute('hdn', true)
      otrnBlock.appendChild(opar)
      aligns.push(opar)
    })
    alignPars(aligns)
  })
  scrollToPosition(scrollTop)
}

export function getSyncs(bid) {
  let syncs = syncstore.get(bid)
  if (_.isEmpty(syncs)) syncs = []
  return syncs
}

export function syncDoc(docs, sync) {
  let blockid = sync.blockid
  let doc = docs[blockid]
  if (!doc) return docs
  let newdoc, mess

  switch(sync.action) {
  case 'delete':
    doc.skip = true
    break
  case 'empty':
    doc.md = 'x'
    // mess = 'paragraph emptied'
    break
  case 'copy':
    newdoc = _.clone(doc)
    docs.splice(blockid+1, 0, newdoc)
    // mess = 'paragraph copied'
    break
  case 'mergeNext':
    let next = docs[blockid+1]
    if (!next) return docs
    doc.md = [doc.md, next.md].join(' ')
    next.skip = true
    // mess = 'paragraphs merged'
    break
  case 'breakParagraph':
    let md = doc.md.toString()
    let cindex = md.indexOf(sync.param.context)
    let context = md.slice(cindex)
    let index = context.indexOf(sync.param.text)
    let head = doc.md.slice(0, cindex+index)
    let tail = doc.md.slice(cindex+index)
    if (_.last(head) == '‘') head = head.replace(/‘$/, ''), tail = ['‘', tail].join('')
    doc.md = head
    newdoc = _.clone(doc)
    newdoc.md = tail
    docs.splice(blockid+1, 0, newdoc)
    // mess = ['paragraph broken by \"', sync.param.text, '\"'].join(' ')
    break
  case 'breakSection':
    // todo:
    break
  case 'insertAfter':
    newdoc = _.clone(doc)
    newdoc.md = 'x'
    newdoc.fake = true
    docs.splice(blockid+1, 0, newdoc)
    // mess = 'empty paragraph incerted'
    break
  case 'insertBefore':
    newdoc = _.clone(doc)
    newdoc.md = 'x'
    newdoc.fake = true
    docs.splice(blockid, 0, newdoc)
    // mess = ''empty paragraph incerted'
    break
  case 'action':
    break
  case 'action':
    break
  default:
    // todo: any key press:
    message.show('edit actions are d, e, c, m, ia, ib, b, & ctrl+z (undo)', 'darkred')
  }
  docs = _.filter(docs, doc=> !doc.skip)
  docs.forEach((doc, idx)=> doc.idx = idx)
  return docs
}

export function alignPars(opars) {
  let heights = _.map(opars, opar => { return opar.scrollHeight })
  let max = _.max(heights)  + 'px'
  opars.forEach((opar, idx) => {
    opar.style.height = max
    if (opar.getAttribute('hdn')) opar.classList.add('hidden')
  })
}

function parsePar(doc, lang) {
  let parent = create('div')
  if (!doc.md) doc.md = '**empty paragraph**'
  let md = ndash(doc.md)
  parent.innerHTML = marked(md)
  let opar = parent.firstChild
  opar.classList.add('ptext')
  opar.setAttribute('_id', doc._id) // отсюда узнаю path при поиске ref
  opar.setAttribute('lang', lang)
  if (doc.refnotes) opar.setAttribute('refnotes', JSON.stringify(doc.refnotes))
  if (doc.imgsrc) opar.setAttribute('imgsrc', doc.imgsrc)
  if (doc.type == 'list') opar.classList.add('plist')
  else if (doc.type == 'ulist') opar.classList.add('plist'), opar.classList.add('ul')
  if (doc.level) {
    let levstyle = ['h', doc.level].join('')
    opar.classList.add(levstyle)
  }
  return opar
}

function wrapSpan(opar) {
  opar.innerHTML = opar.innerHTML.replace(/(\[[^\]]{1,4}\])/g, "<span class=\"ref\">$1</span>")
  let nodes = opar.childNodes
  let html = ''
  nodes.forEach(node=> {
    if (node.nodeType == 3) {
      let text = node.nodeValue
      // text = text.replace(/\'/g, '᾽').replace(/\’/g, '᾽') // apocope - todo: нужно включить для greek-plugin
      html += text.replace(/([^\p{P} ]+)/ug, "<span class=\"wf\">$1</span>")
    } else if (node.nodeName == 'EM') {
      html += ['<em>', wrapSpan(node), '</em>'].join('')
    } else {
      html += node.outerHTML
    }
  })
  return html
}

// todo: mousetrap ?
let scrollByKey = function(ev) {
  const opage = q('.page')
  if (!opage) return
  let height = opage.clientHeight
  if (ev.keyCode == 38) { // arrow up
    if (ev.ctrlKey) opage.scrollTop = 0
    else opage.scrollTop = opage.scrollTop - 24
  } else if (ev.keyCode == 40) { // arrow down
    opage.scrollTop = opage.scrollTop + 24
  } else if (ev.keyCode == 33) { // pageUp
    opage.scrollTop = opage.scrollTop - height + 60
  } else if (ev.keyCode == 34) { // pageDown
    opage.scrollTop = opage.scrollTop + height - 60
  } else if (ev.keyCode == 36) { // home, ctrl-home
    opage.scrollTop = 0
  } else if (ev.keyCode == 35) { // end, ctrl-end
    opage.scrollTop = opage.scrollHeight - opage.clientHeight;
  }
  // show position:
  let osrc = q('#src')
  if (!osrc) return
  let hidden = osrc.classList.contains('hidden')
  if (hidden) osrc = q('#trn')
  let scrolltop = opage.scrollTop
  height  = osrc.clientHeight
  let ohr = q('.show-page-position')
  if (!ohr) return
  ohr.style.width = (scrolltop/height)*90 + '%'
  if (dgl.route == 'book') ohr.style.width = 0
}

function getPanes() {
  let osrc = q('#src')
  let otrn = q('#trn')
  return {osrc, otrn}
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

document.addEventListener("keydown", scrollByKey)

// wrap wf to span
document.addEventListener("mouseover", function(ev) {
  if (!q('.book')) return
  let target = ev.target
  if (!target.classList.contains('ptext')) return
  if (!target.getAttribute('ok')) {
    const html = wrapSpan(target)
    target.innerHTML = html
    target.setAttribute('ok', true)
  }
})

// show footnote
document.addEventListener ("click",  async (ev) => {
  if (!dgl.bid || dgl.editMode) return
  let owf = ev.target.closest('span.ref')
  if (!owf) return
  let reftext = owf.textContent
  if (!reftext) return
  let bid = owf.closest('#src') ? dgl.origin(book.sbooks).bid : dgl.shown(book.sbooks).bid
  if (!bid) return

  let opar = ev.target.closest('p.ptext')
  let parid = opar.getAttribute('_id')
  let refnotes = opar.getAttribute('refnotes')
  if (!refnotes) return
  let path = _.first(parid.split('-'))
  let ref = reftext.replace(/[\[\]]/g, '')
  let notes = JSON.parse(refnotes)
  let ref_id = notes[ref]
  let res = await fetchFN([ref_id], [bid])
  let fntext = ''
  if (!res[0]) fntext = 'not found'
  else fntext = res[0].md

  let ofn = q('#footnote') || create('div', 'footnote')
  ofn.id = 'footnote'
  ofn.textContent = fntext
  document.body.appendChild(ofn)
  let coords = getCoords(owf)
  placePopup(coords, ofn)
})

// hide footnote
document.addEventListener ("click",  async (ev) => {
  let ofn = q('#footnote')
  if (ofn) remove(ofn)
})

document.addEventListener("wheel", function(ev) {
  if (!ev.shiftKey) return
  if (dgl.route != 'page') return
  let oblock = ev.target.closest('.block')
  if (!oblock) return
  rotateBlock(oblock)
  oblock = ev.target.closest('.header-cell.right .block')
  if (!oblock) return
  let par = oblock.querySelector('p.headline:not(.hidden)')
  let bid = par.getAttribute('bid')

  for (let chapter of page.chapters) {
    if (chapter.origin) continue
    chapter.shown = false
    if (chapter.bid == bid) chapter.shown = true
  }
  page.reload()
}, false)

let localSearch = function(ev) {
  if (dgl.editMode) return
  if (dgl.route != 'page') return
  if (ev.which == 8) page.localquery = page.localquery.slice(0, -1)
  else if (ev.which == 27) page.localquery = ''
  else if (ev.key.length > 1) return
  else if (ev.ctrlKey) return
  else page.localquery += ev.key
  page.localSearch()
}

document.addEventListener("keydown", localSearch)

async function exitEditMode(ev) { // ESC
  if (ev.which != 27) return
  if (!q('.header') || !dgl.editMode) return
  progress.show()
  dgl.editMode = false
  removeEditStyle()
  let origin = book.sbooks.find(sbook=> sbook.origin)
  let syncs = getSyncs(origin.bid)
  syncs = syncs.filter(sync=> !sync.tmp)
  syncstore.set(origin.bid, syncs)

  if (dgl.idx > -1) {
    let chapters = _.cloneDeep(page.copy)
    let chsyncs = syncs.filter(sync => sync.idx === dgl.idx)
    await page.syncChapters(chapters, chsyncs)
    drawPage(chapters)
  }

  header.ready()
  let omarks = qs('.em-green-circle')
  omarks.forEach(omark=> omark.classList.remove('em-green-circle'))
  message.show('all last changes lost', 'darkgreen')
}

document.addEventListener("keydown", exitEditMode)

mouse.bind('ctrl+s', async function(ev) {
  saveEditChanges()
})

document.addEventListener ("click",  (ev) => {
  let osave = ev.target.closest('.em-save')
  if (!osave) return
  saveEditChanges()
})

async function saveEditChanges() {
  if (!q('.header') || !dgl.editMode) return
  progress.show()
  dgl.editMode = false
  removeEditStyle()
  message.hide()
  let origin = book.sbooks.find(sbook=> sbook.origin)
  let syncs = getSyncs(origin.bid)

  syncs.forEach(sync=> delete sync.tmp)
  syncstore.set(dgl.bid, syncs)
  header.ready()
  message.show('changes saved', 'darkgreen')
  let omarks = qs('.em-green-circle')
  omarks.forEach(omark=> omark.classList.remove('em-green-circle'))
}

function showSearchIcon() {
  q('#search-icon').classList.remove('hidden')
}

function showPagePosition() {
  let obody = q('body')
  let opos = create('hr', 'show-page-position')
  obody.appendChild(opos)
}
