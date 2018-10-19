import _ from 'lodash'
import Split from 'split.js'
import { q, qs, empty, create, span, p, div, remove, getStore, setStore } from './utils'
let fse = require('fs-extra')
let path = require('path')
const log = console.log
// const TreeView = require('js-treeview')
// import {Tree} from 'tui-tree'
var Tree = require('tui-tree')

export function parseTitle() {
  log('========= parse title =============')
  let lib = getStore('lib')
  let cur = getStore('current')
  let book = getStore(cur.title)
  log('LIB', lib)
  log('CUR', cur)
  log('BOOK', book)
  let oleft = q('#source')
  let oright = q('#trns')
  let obookTitle = div('')
  obookTitle.classList.add('bookTitle')
  oleft.appendChild(obookTitle)
  let oauth = div('')
  // let oauth = q('#author')
  let info = lib[cur.title]
  let auth = _.find(info.auths, auth=> { return auth.author})
  oauth.textContent = auth.name
  oauth.classList.add('author')
  obookTitle.appendChild(oauth)
  let otitle = div('')
  otitle.textContent = info.book.title
  otitle.classList.add('title')
  obookTitle.appendChild(otitle)
  let oname = span(auth.name)
  obookTitle.appendChild(oname)
  info.nics.forEach(nic=> {
    let onic = div(nic.name)
    obookTitle.appendChild(onic)
  })

  let obookCont = div('')
  obookCont.classList.add('bookTitle')
  oright.appendChild(obookCont)
  let otree = q('#tree')
  obookCont.appendChild(otree)

  log('TREE', info.tree)

  let tree = new Tree('tree', {
    data: info.tree,
    nodeDefaultState: 'opened'
  }).enableFeature('Selectable', {
    selectedClassName: 'tui-tree-selected',
  });
  tree.on('select', function(eventData) {
    let data = tree.getNodeData(eventData.nodeId);
    // log('NDATA', data)
    cur.fpath = data.fpath
    cur.nic = info.nics[0]
    setStore('current', cur)
    createRightHeader(cur, info.nics)
    // let nic = cur.nic.nic
    setBookText()
  })

}

export function parseBook() {
  var sizes = localStorage.getItem('split-sizes')
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

  // let lib = getStore('lib')
  let cur = getStore('current')
  // let info = lib[cur.title]

  // let curnic = (cur.nic) ? cur.nic.nic : info.nics[0].nic
  let nic = cur.nic.nic

  let book = getStore(cur.title)
  // log('setBookText cur==>', cur)


  let author = book.author
  let trns = _.filter(book.panes, auth=> { return auth.fpath == cur.fpath})

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
  let lib = getStore('lib')
  let cur = getStore('current')
  let book = getStore(cur.title)
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
  let lib = getStore('lib')
  let cur = getStore('current')
  let info = lib[cur.title]
  let oul = q('#niclist')
  createNicList(info.nics)
}

function selectCurrent(ev) {
  let oright = q('.hright')
  oright.classList.remove('header')
  let name = ev.target.textContent
  let nic = ev.target.getAttribute('nic')
  let cur = getStore('current')
  cur.nic = {nic: nic, name: name}
  setStore('current', cur)
  let nics = [cur.nic]
  // log('SELECT nics', nics)
  setRightHeader(nics)
  reSetBook()
}
