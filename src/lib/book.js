import _ from 'lodash'
import Split from 'split.js'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import tree from './tree';
import {navigate} from '../app';

const fse = require('fs-extra')
const path = require('path')
const log = console.log
const Store = require('electron-store')
const store = new Store()
// const Apstore = require('./apstore')
// const store = new Apstore()
// const elasticlunr = require('elasticlunr');
const clipboard = require('electron-clipboard-extended')

export function twoPages() {
  var sizes = store.get('split-sizes')
  if (sizes) sizes = JSON.parse(sizes)
  else sizes = [50, 50]
  let split = Split(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      // reSetBook()
    }
  })
  let obook = q('#book')
  // obook.addEventListener("wheel", scrollPanes, false)
  // document.addEventListener("keydown", keyScroll, false)
  return split
}

function scrollPanes(ev) {
  if (ev.shiftKey == true) return;
  let delta = (ev.deltaY > 0) ? 24 : -24
  let source = q('#source')
  let trns = q('#trns')
  source.scrollTop += delta
  trns.scrollTop = source.scrollTop
  let el = ev.target
  let oapp = q('#app')
  let book = oapp.book
  if (source.scrollHeight - source.scrollTop - source.clientHeight <= 3.0) {
    let start = qs('#source > p').length
    log('___START', start)
    setChunk(start, book)
  }
}

function keyScroll(ev) {
  let source = q('#source')
  let trns = q('#trns')
  if (!source || !trns) return
  trns.scrollTop = source.scrollTop
  if (ev.keyCode == 38) {
    source.scrollTop = source.scrollTop - 24
  } else if (ev.keyCode == 40) {
    source.scrollTop = source.scrollTop + 24
  } else if (ev.keyCode == 33) {
    let height = source.clientHeight
    source.scrollTop = source.scrollTop - height + 60
  } else if (ev.keyCode == 34) {
    let height = source.clientHeight
    source.scrollTop = source.scrollTop + height - 60
  }
  trns.scrollTop = source.scrollTop
  let book = window.book
  if (source.scrollHeight - source.scrollTop - source.clientHeight <= 3.0) {
    let start = qs('#source > p').length
    // log('___KEY START', start)
    // ошибка при прокрутке всегда
    // setChunk(start, book)
  }
}


export function parseTitle(navpath) {
  // log('========= parse title =============')
  window.split.setSizes([50,50])
  let lib = store.get('lib') || []
  let info = lib[navpath.bkey]

  let oright = q('#trns')
  let obookCont = div('')
  obookCont.classList.add('bookTitle')
  oright.appendChild(obookCont)
  let otree = tree(info.tree)
  obookCont.appendChild(otree)
  otree.addEventListener('click', goBookEvent, false)
}

function goBookEvent(ev) {
  let navpath = window.navpath
  let fpath = ev.target.getAttribute('fpath')
  navpath.fpath = fpath
  navpath.section = 'book'
  navigate(navpath)
}

export function parseBook(navpath) {
  // log('___parseBook_start')
  window.split.setSizes([50,50])
  let obook = q('#source')
  let osource = q('#source')
  let otrns = q('#trns')
  empty(osource)
  empty(otrns)

  log('parse-BOOK-npath:', navpath)
  let lib = store.get('lib')
  // log('LIB', lib)
  let info = lib[navpath.bkey]
  let libtext = store.get('libtext')
  let texts = libtext[navpath.bkey]
  log('INFO', info)
  log('TEXTS', texts)

  // let nicnames = info.nicnames
  // let panes = texts.panes
  // let coms = texts.coms

  let start = 0
  let fpath = navpath.fpath
  let book = {}
  book.info = info
  book.texts = texts

  // let author = _.filter(panes, auth=> { return auth.author && auth.fpath == fpath})[0]
  // let trns = _.filter(panes, auth=> { return !auth.author && auth.fpath == fpath})

  // book.author = author
  // book.trns = trns

  // let cnics = trns.map(auth=> { return auth.nic })
  // book.cnics = cnics
  let nic
  // if (!nic) nic = cnics[0]
  // book.nic = nic

  // log('NO BOOK INFO', book)
  // setChunk(start, book)
  setBookText(book, fpath, nic, start)

  osource.addEventListener("mouseover", copyToClipboard, false)
  otrns.addEventListener("wheel", cyclePar, false)
}

function setBookText(book, fpath, nic, start) {
  let author = _.filter(book.texts.panes, auth=> { return auth.author && auth.fpath == fpath})[0]
  let trns = _.filter(book.texts.panes, auth=> { return !auth.author && auth.fpath == fpath})

  book.author = author
  book.trns = trns

  let cnics = trns.map(auth=> { return auth.nic })
  book.cnics = cnics
  if (!nic) nic = cnics[0]
  book.nic = nic

  // log('BEFORE CHUNK book', book)
  setChunk(start, book)
  createRightHeader(book)
  createLeftHeader(book)
}

function setChunk(start, book) {
  let limit = 20
  let author = book.author
  let trns = book.trns
  let authrows = author.rows.slice(start, start+limit)
  let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)'
  let rePunct = new RegExp(punct, 'g')
  let osource = q('#source')
  let otrns = q('#trns')

  authrows.forEach((astr, idx) => {
    let oleft = p()
    let html = astr.replace(rePunct, " <span class=\"active\">$1</span>")
    oleft.innerHTML = html
    oleft.setAttribute('idx', start+idx)
    oleft.setAttribute('nic', author.nic)
    osource.appendChild(oleft)
    let orights = []
    trns.forEach(auth => {
      let rstr = auth.rows[start+idx]
      let oright = p(rstr)
      oright.setAttribute('idx', start+idx)
      oright.setAttribute('nic', auth.nic)
      otrns.appendChild(oright)
      if (auth.nic == book.nic) oright.setAttribute('active', true)
      orights.push(oright)
    })
    alignPars(oleft, orights)
  })
}

function copyToClipboard(ev) {
  if (ev.target.nodeName != 'SPAN') return
  let wf = ev.target.textContent
  clipboard.writeText(wf)
}

function alignPars(oleft, orights) {
  orights.push(oleft)
  let heights = orights.map(par => { return par.scrollHeight })
  let max = _.max(heights)
  orights.forEach(par => {
    par.style.height = max + 'px'
    if (!par.getAttribute('active')) par.classList.add('hidden')
  })
}

function cyclePar(ev) {
  if (ev.shiftKey != true) return
  let idx = ev.target.getAttribute('idx')

  let selector = '#trns [idx="'+idx+'"]'
  let pars = qs(selector)
  let nics = _.map(pars, par=> { return par.getAttribute('nic') })
  let curpar = _.find(pars, par=> { return !par.classList.contains('hidden') })
  let nic = curpar.getAttribute('nic')
  let nicidx = nics.indexOf(nic)
  let nextnic = (nicidx+1 == nics.length) ? nics[0] : nics[nicidx+1]
  let next = _.find(pars, par=> { return par.getAttribute('nic') == nextnic })
  next.classList.remove('hidden')
  curpar.classList.add('hidden')
}

function createLeftHeader(book) {
  let obook = q('#book')
  let arect = obook.getBoundingClientRect()
  let ohleft = div()
  obook.appendChild(ohleft)
  ohleft.classList.add('hleft')
  ohleft.style.left = arect.width*0.15 + 'px'
  ohleft.classList.add('header')
  // log('LEFT HEADER', ohleft)
  ohleft.addEventListener("click", clickLeftHeader, false)

  // let oact = div()
  // oact.textContent = 'active'
  let otree = tree(book.info.tree)
  // ohleft.appendChild(oact)
  ohleft.appendChild(otree)
}

function clickLeftHeader(ev) {
  let fpath = ev.target.getAttribute('fpath')
  // let text = ev.target.textContent
  if (fpath) log('LEFT', fpath)
  // let book = window.book
  // book.fpath = fpath
  let navpath = window.navpath
  navpath.fpath = fpath
  navigate(navpath)
}


function createRightHeader(book) {
  // let book = window.book
  let obook = q('#book')
  let arect = obook.getBoundingClientRect()
  let ohright = div()
  ohright.classList.add('hright')
  ohright.style.left = arect.width*0.70 + 'px'

  let oul = create('ul')
  oul.setAttribute('id', 'namelist')
  oul.addEventListener("click", clickRightHeader, false)
  ohright.appendChild(oul)
  obook.appendChild(ohright)
  createNameList(book)
  let nic = book.nic
  collapseRightHeader(nic)
}

function createNameList(book) {
  let nics = book.cnics
  let nicnames = book.info.nicnames
  let oul = q('#namelist')
  empty(oul)
  oul.setAttribute('nics', nics)
  nics.forEach(nic=> {
    let oli = create('li')
    let name = nicnames[nic] ? nicnames[nic] : nic
    oli.textContent = name
    oli.setAttribute('nic', nic)
    oul.appendChild(oli)
  })
}

function clickRightHeader(ev) {
  if (ev.target.classList.contains('active')) {
    expandRightHeader()
  } else {
    let nic = ev.target.getAttribute('nic')
    if (!nic) return
    collapseRightHeader(nic)
    otherNic(nic)
  }
}

function otherNic(nic) {
  let pars = qs('#trns > p')
  pars.forEach((par, idx) => {
    // if (idx == 1) log('PAR', par, par.getAttribute('nic'))
    if (par.getAttribute('nic') == nic) par.setAttribute('active', true), par.classList.remove('hidden')
    else par.classList.add('hidden')
  })
}

function collapseRightHeader(nic) {
  let oright = q('.hright')
  oright.classList.remove('header')
  let olis = qs('#namelist > li')
  _.each(olis, oli=> {
    if (oli.getAttribute('nic') == nic) oli.classList.add('active')
    else oli.classList.add('hidden')
  })
}

function expandRightHeader() {
  let oright = q('.hright')
  oright.classList.add('header')
  let olis = qs('#namelist > li')
  _.each(olis, oli=> {
    oli.classList.remove('hidden')
    oli.classList.remove('active')
  })
}

function reSetBook_(nic) {
  let osource = q('#source')
  let otrns = q('#trns')
  let scrollTop = osource.scrollTop
  setBookText(nic)
  osource.scrollTop = scrollTop
  otrns.scrollTop = scrollTop
}
