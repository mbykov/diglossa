import _ from 'lodash'
import Split from 'split.js'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import tree from './tree';

const fse = require('fs-extra')
const path = require('path')
const log = console.log
const Store = require('electron-store')
const store = new Store()


export function parseTitle() {
  log('========= parse title =============')
  let lib = store.get('lib')
  let cur = store.get('current')
  let book = store.get(cur.title)
  let info = lib[cur.title]
  log('LIB', lib)
  log('CUR', cur)
  log('BOOK', book)
  log('INFO', info)

  let oleft = q('#source')
  let oright = q('#trns')

  let obookCont = div('')
  obookCont.classList.add('bookTitle')
  oright.appendChild(obookCont)
  let otree = tree(info.tree, info.dname)
  obookCont.appendChild(otree)
  otree.addEventListener('click', goNode, false)
  // let writings = store.get('Writings')
  // log('WRT________________', writings)
  // kuku()
}

function goNode(ev) {
  let cur = store.get('current')
  // let info = lib[cur.title]
  // if (!cur.nic) cur.nic = info.nics[0]
  let fpath = ev.target.getAttribute('fpath')
  cur.fpath = fpath
  store.set('current', cur)
  log('GO CUR_________', cur)
  // createRightHeader(cur, info.nics)
  // let json = localStorage.getItem('Writings')
  // log('WRT________________', json.length)
  // let writings = store.get('Writings')
  // log('WRT________________', writings)

  setBookText()
}

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

function setBookText() {
  let osource = q('#source')
  let otrns = q('#trns')
  empty(osource)
  empty(otrns)

  let cur = store.get('current')
  let book = store.get(cur.title)

  let author = _.filter(book.panes, auth=> { return auth.author && auth.fpath == cur.fpath})[0]
  let trns = _.filter(book.panes, auth=> { return !auth.author && auth.fpath == cur.fpath})
  log('TRNS', trns)

  let nic = cur.nic
  if (!nic) {
    let nics = trns.map(auth=> { return auth.nic })
    log('NICS', nics)
    nic = nics[0]
  }

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
  let lib = store.get('lib')
  let cur = store.get('current')
  let book = store.get(cur.title)
  let info = lib[cur.title]
  let names = info.nics
  if (names.length < 2) return
  let nics = names.map(name=> { return name.nic })

  // некузяво
  let selector = '#trns [idx="'+idx+'"]'
  let pars = qs(selector)
  let curpar = _.find(pars, par=> { return !par.classList.contains('hidden') })
  let nic = curpar.getAttribute('nic')
  let nicidx = nics.indexOf(nic)
  let nextnic = (nicidx+1 == nics.length) ? nics[0] : nics[nicidx+1]
  let next = _.find(pars, par=> { return par.getAttribute('nic') == nextnic })
  next.classList.remove('hidden')
  curpar.classList.add('hidden')
}

function reSetBook() {
  let osource = q('#source')
  let otrns = q('#trns')
  let scrollTop = osource.scrollTop
  setBookText()
  osource.scrollTop = scrollTop
  otrns.scrollTop = scrollTop
}

function parseLeftHeader() {
  let anchor = q('#hleft')
  // oheader.textContent = '========================'
}

function createRightHeader(cur) {
  let oapp = q('#book')
  let arect = oapp.getBoundingClientRect()
  let ohright = div()
  ohright.classList.add('hright')
  ohright.style.left = arect.width*0.70 + 'px'

  let oul = create('ul')
  oul.setAttribute('id', 'niclist')
  ohright.appendChild(oul)
  oapp.appendChild(ohright)
  let nics = [cur.nic]
  setRightHeader(nics)
}

function createNicList(nics) {
  let oul = q('#niclist')
  empty(oul)
  nics.forEach(nic=> {
    let oli = create('li')
    if (nics.length == 1) oli.addEventListener("click", expandRightHeader, false)
    else oli.addEventListener("click", selectCurrent, false)
    oli.textContent = nic.name
    oli.setAttribute('nic', nic.nic)
    oul.appendChild(oli)
  })
}

function setRightHeader(nics) {
  let oright = q('.hright')
  oright.classList.remove('header')
  createNicList(nics)
}

function expandRightHeader(ev) {
  let oright = q('.hright')
  oright.classList.add('header')
  let lib = store.get('lib')
  let cur = store.get('current')
  let info = lib[cur.title]
  let oul = q('#niclist')
  createNicList(info.nics)
}

function selectCurrent(ev) {
  let oright = q('.hright')
  oright.classList.remove('header')
  let name = ev.target.textContent
  let nic = ev.target.getAttribute('nic')
  let cur = store.get('current')
  cur.nic = {nic: nic, name: name}
  store.set('current', cur)
  let nics = [cur.nic]
  // log('SELECT nics', nics)
  setRightHeader(nics)
  reSetBook()
}
