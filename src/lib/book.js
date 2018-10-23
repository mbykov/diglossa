import _ from 'lodash'
import Split from 'split.js'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import tree from './tree';

const fse = require('fs-extra')
const path = require('path')
const log = console.log
// const Store = require('electron-store')
// const store = new Store()
const Apstore = require('./apstore')
const store = new Apstore()

export function twoPages() {
  var sizes = store.get('split-sizes')
  if (sizes) sizes = JSON.parse(sizes)
  else sizes = [50, 50]
  Split(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      reSetBook()
    }
  })
}

export function parseTitle() {
  // log('========= parse title =============')
  // let lib = store.get('lib')
  // let lib = store.get('lib')
  let cur = store.get('current')
  let info = cur.info

  // log('LIB', lib)
  // log('CUR', cur)
  // log('BOOK', book)
  // log('INFO', info)


  let oleft = q('#source')
  let oright = q('#trns')

  let obookCont = div('')
  obookCont.classList.add('bookTitle')
  oright.appendChild(obookCont)
  let otree = tree(info.tree)
  obookCont.appendChild(otree)
  otree.addEventListener('click', goNode, false)
}

function goNode(ev) {
  let cur = store.get('current')
  // let info = lib[cur.title]
  // if (!cur.nic) cur.nic = info.nics[0]
  let fpath = ev.target.getAttribute('fpath')
  let obook = q('#source')
  obook.dataset.fpath = JSON.stringify(fpath)
  cur.fpath = fpath
  store.set('current', cur)
  setBookText()
  createRightHeader()
  createLeftHeader()
}

function setBookText(nic) {
  let obook = q('#source')
  let osource = q('#source')
  let otrns = q('#trns')
  empty(osource)
  empty(otrns)

  // let lib = store.get('lib')
  let cur = store.get('current')
  let texts = store.get('curtexts')
  // let book = lib[cur.title]
  let info = cur.info
  let nicnames = info.nicnames
  // log('BB', book.panes)
  let panes = texts.panes
  let coms = texts.coms

  let fpath = obook.dataset.fpath
  let author = _.filter(panes, auth=> { return auth.author && auth.fpath == cur.fpath})[0]
  let trns = _.filter(panes, auth=> { return !auth.author && auth.fpath == cur.fpath})
  // log('TRNS', author)

  // let nic = cur.nic
  let cnics = trns.map(auth=> { return auth.nic })
  store.set('cnics', cnics)
  // log('NICS', nics)
  if (!nic) nic = cnics[0]

  // let ohright = q('.hright')
  // if (!ohright) createRightHeader(cnics, nicnames, nic)

  author.rows.forEach((astr, idx) => {
    let oleft = p(astr)
    oleft.setAttribute('idx', idx)
    oleft.setAttribute('nic', author.nic)
    osource.appendChild(oleft)
    let orights = []
    trns.forEach(auth => {
      let rstr = auth.rows[idx]
      let oright = p(rstr)
      oright.setAttribute('idx', idx)
      oright.setAttribute('nic', auth.nic)
      otrns.appendChild(oright)
      if (auth.nic == nic) oright.setAttribute('active', true)
      orights.push(oright)
    })
    alignPars(idx, oleft, orights)
  })
  otrns.addEventListener("wheel", cyclePar, false)
}

function alignPars(idx, oleft, orights) {
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
  // log('PS', pars)
  let nics = _.map(pars, par=> { return par.getAttribute('nic') })
  // log('nics', nics)
  let curpar = _.find(pars, par=> { return !par.classList.contains('hidden') })
  // log('CP', curpar)
  let nic = curpar.getAttribute('nic')
  let nicidx = nics.indexOf(nic)
  let nextnic = (nicidx+1 == nics.length) ? nics[0] : nics[nicidx+1]
  let next = _.find(pars, par=> { return par.getAttribute('nic') == nextnic })
  next.classList.remove('hidden')
  curpar.classList.add('hidden')
}

function createLeftHeader() {
  let obook = q('#book')
  let arect = obook.getBoundingClientRect()
  let ohleft = div()
  obook.appendChild(ohleft)
  ohleft.classList.add('hright')
  ohleft.style.left = arect.width*0.15 + 'px'
  ohleft.classList.add('header')
  log('LEFT HEADER', ohleft)

  let cur = store.get('current')
  let otree = tree(cur.info.tree)
  ohleft.appendChild(otree)
  // ohleft.textContent = 'LEFT HEADER'

}

function createRightHeader() {
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
  createNameList()
  collapseRightHeader()
}

function createNameList() {
  let nics = store.get('cnics')
  let cur = store.get('current')
  let nicnames = cur.info.nicnames
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
    collapseRightHeader(nic)
    reSetBook(nic)
  }
}

function collapseRightHeader(nic) {
  if (!nic) {
    let nics = store.get('cnics')
    nic = nics[0]
  }
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

function reSetBook(nic) {
  let osource = q('#source')
  let otrns = q('#trns')
  let scrollTop = osource.scrollTop
  setBookText(nic)
  osource.scrollTop = scrollTop
  otrns.scrollTop = scrollTop
}
