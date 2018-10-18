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
  info.nics.forEach(nic=> {
    let auth = _.find(info.auths, auth=> { return auth.ext == nic})
    let onicdiv = div()
    let oname = span(auth.name)
    onicdiv.appendChild(oname)
    obookTitle.appendChild(onicdiv)
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
    log('NDATA', data)
    cur.fpath = data.fpath
    setStore('current', cur)
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

  // createRightHeader()
  // setBookText()
}

function setBookText() {
  let osource = q('#source')
  let otrns = q('#trns')
  empty(osource)
  empty(otrns)

  let lib = getStore('lib')
  let cur = getStore('current')
  let book = getStore(cur.title)
  let info = lib[cur.title]
  log('CUR B==>', cur)


  let nics = info.nics
  log('==>NICS', nics)
  let curnic = cur.nic
  if (!cur || !cur.nic || !nics.includes(cur.nic)) {
    curnic = nics[0]
    cur.nic = curnic
    log('==>CUR', curnic)
    setStore('current', cur)
  }

  let author = book.author
  // let trns = book.panes
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
      // if (idx == 1) log('AuthNIC', auth.nic, curnic)
      if (auth.nic == curnic) oright.setAttribute('active', true)
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
  let nics = info.nics
  if (nics.length < 2) return

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
  let auths = localStorage.getItem('auths')
  if (!auths) return
  auths = JSON.parse(auths)
  let osource = q('#source')
  let otrns = q('#trns')
  let scrollTop = osource.scrollTop
  setBookText(auths)
  osource.scrollTop = scrollTop
  otrns.scrollTop = scrollTop
}

function parseLeftHeader() {
  let anchor = q('#hleft')
  // oheader.textContent = '========================'
}

function changeRightHeader(ev) {
  let oright = q('.hright')
  oright.classList.add('header')
  let json = localStorage.getItem('book')
  if (!json) return
  let book = JSON.parse(json)
  let nics = _.uniq(book.nics)
  createNicList(nics)
}

function selectCurrent(ev) {
  let oright = q('.hright')
  let current = ev.target.textContent
  localStorage.setItem('current', current)
  let cnics = [current]
  createNicList(cnics)
  oright.classList.remove('header')
  reSetBook()
}

function createRightHeader() {
  let oapp = q('#book')
  let arect = oapp.getBoundingClientRect()
  let oright = div()
  oright.classList.add('hright')
  oright.style.left = arect.width*0.70 + 'px'
  let current = localStorage.getItem('current')
  if (!current) {
    let json = localStorage.getItem('book')
    if (!json) return
    let book = JSON.parse(json)
    let nics = _.uniq(book.nics)
    current = nics[0]
    localStorage.setItem('current', current)
  }
  let cnics = [current]
  let oul = createNicList(cnics)
  oright.appendChild(oul)
  oapp.appendChild(oright)
}

function createNicList(nics) {
  let oul = q('#oul')
  if (!oul) {
    oul = create('ul')
    oul.id = 'oul'
  }
  empty(oul)
  nics.forEach(nic=> {
    let oli = create('li')
    if (nics.length == 1) oli.addEventListener("click", changeRightHeader, false)
    else oli.addEventListener("click", selectCurrent, false)
    oli.textContent = nic
    oul.appendChild(oli)
  })
  return oul
}

function closeHeaders() {
  // let oright = q('#hright')
  // oright.classList.remove('header')
  // oright.dataset.header = 'right'
}
