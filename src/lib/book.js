import _ from 'lodash'
import Split from 'split.js'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import tree from './tree';
import { navigate } from '../app';
import { getText } from './pouch';

const fse = require('fs-extra')
const path = require('path')
const log = console.log
const Store = require('electron-store')
const store = new Store()
// const Apstore = require('./apstore')
// const store = new Apstore()
// const elasticlunr = require('elasticlunr');
const clipboard = require('electron-clipboard-extended')

let current, info
let limit = 20
// let apars = []
// let tpars = []

let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)'
let rePunct = new RegExp(punct, 'g')

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
  obook.addEventListener("wheel", scrollPanes, false)
  document.addEventListener("keydown", keyScroll, false)
  return split
}

function scrollPanes(ev) {
  if (ev.shiftKey == true) return;
  let delta = (ev.deltaY > 0) ? 24 : -24
  let source = q('#source')
  let trns = q('#trns')
  source.scrollTop += delta
  trns.scrollTop = source.scrollTop

  if (!current || current.section != 'book') return

  let sTop = source.scrollTop;
  let spars = qs('#source > p')
  _.each(spars, el=> {
    let off = sTop - el.offsetTop
    if (off < 0) {
      current.pos = el.getAttribute('pos')
      return false
    }
  })

  addChunk()
}

function addChunk() {
  let source = q('#source')
  if (source.scrollTop == 0) {
    let start = qs('#source > p')[0]
    if (!start) return
    let startpos = start.getAttribute('pos')
    if (startpos > 0) {
      let start = (startpos - limit > 0) ? startpos - limit : 0
      // log('___START', start)
      current.pos = start
      getText(current, startpos)
        .then(function(res) {
          // log('___res.docs UP', res.docs)
          setChunk(_.reverse(res.docs), true)
        })
    }
  }

  if (source.scrollHeight - source.scrollTop - source.clientHeight <= 3.0) {
    let start = qs('#source > p').length
    current.pos = start
    getText(current)
      .then(function(res) {
        // log('___res.docs', res.docs)
        setChunk(res.docs)
      })
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
  else return
  trns.scrollTop = source.scrollTop

  if (!current || current.section != 'book') return
  addChunk()
  log('KEY CUR', current)
}

export function parseTitle(bookinfo, bookcurrent) {
  // log('========= parse title =============')
  window.split.setSizes([50,50])
  info = bookinfo
  current = bookcurrent
  log('TITLEinfo', info)

  let osource = q('#source')
  let otrns = q('#trns')
  let obookTitle = div('')
  obookTitle.classList.add('bookTitle')
  osource.appendChild(obookTitle)

  let oauthor = div(info.book.author, 'author')
  let otitle = div(info.book.title, 'title')
  obookTitle.appendChild(oauthor)
  obookTitle.appendChild(otitle)

  // problem if not all names in nics list ?
  let onics = create('ul')
  for (let nic in info.nicnames) {
    let name = info.nicnames[nic]
    let onicli = create('li')
    let ocheck = create('input')
    ocheck.type = 'checkbox'
    ocheck.checked = true
    let oname = span(name)
    oname.classList.add('check-name')
    onicli.appendChild(ocheck)
    onicli.appendChild(oname)
    onics.appendChild(onicli)
  }
  obookTitle.appendChild(onics)

  let obookCont = div('')
  obookCont.classList.add('bookTitle')
  otrns.appendChild(obookCont)
  let otree = tree(info.tree, info.book.title)
  obookCont.appendChild(otree)
  let otbody = q('#tree-body')
  otree.addEventListener('click', goBookEvent, false)
}

function goBookEvent(ev) {
  if (!ev.target.classList.contains('tree-node-text')) return
  let fpath = ev.target.getAttribute('fpath')
  current.fpath = fpath
  current.section = 'book'
  navigate(current)
}

export function parseBook(bookcurrent, bookinfo, pars) {
  info = bookinfo
  current = bookcurrent
  // log('parseBook_info', info)
  // log('parseBook_ cur', current)
  if (!pars.length) return
  window.split.setSizes([50,50])
  let osource = q('#source')
  let otrns = q('#trns')
  empty(osource)
  empty(otrns)

  let cnics = _.uniq(pars.map(auth=> { if (!auth.author) return auth.nic }))
  // log('CNICS', cnics)
  let nic = current.nic
  if (!nic) nic = cnics[0]
  if (!cnics.includes(nic)) nic = cnics[0]
  current.nic = nic
  // current.nics = cnics

  setChunk(pars)
  createRightHeader(cnics)
  createLeftHeader()

  osource.addEventListener("mouseover", copyToClipboard, false)
  otrns.addEventListener("wheel", cyclePar, false)
}

function setChunk(pars, direction) {
  let nic = current.nic
  let osource = q('#source')
  let otrns = q('#trns')

  let apars = _.filter(pars, par=> { return par.author})
  // log('AP', apars)
  let tpars = _.filter(pars, par=> { return !par.author})
  // log('Cur Query', current.query)
  apars.forEach(apar=> {
    let html = apar.text.replace(rePunct, "<span class=\"active\">$1<\/span>")
    // let oleft = p(apar.text)
    if (current.query) {
      let requery = new RegExp(current.query, 'g')
      html = html.replace(requery, "<span class=\"query\">"+current.query+"<\/span>")
    }
    let oleft = p()
    oleft.innerHTML = html
    oleft.setAttribute('pos', apar.pos)
    oleft.setAttribute('nic', apar.nic)
    if (!direction) osource.appendChild(oleft)
    else osource.prepend(oleft)
    let aligns = [oleft]

    let pars = _.filter(tpars, par=> { return par.pos == apar.pos})
    pars.forEach(par => {
      let oright = p(par.text)
      oright.setAttribute('pos', apar.pos)
      oright.setAttribute('nic', par.nic)
      if (par.nic == nic) oright.classList.add('active')
      else oright.classList.add('hidden')
      if (!direction) otrns.appendChild(oright)
      else otrns.prepend(oright)
      aligns.push(oright)
    })
    alignPars(aligns)
  })

  // position before adding upper chunk:
  if (direction) {
    let firstpos = apars[0].pos
    // log('F', firstpos)
    let firstel = qs('#source [pos="'+firstpos+'"]')[0]
    // log('FEL', firstel)
    let offset = firstel.offsetTop
    otrns.scrollTop = osource.scrollTop = offset
  }
}

function alignPars(pars) {
  let heights = pars.map(par => { return par.scrollHeight })
  let max = _.max(heights) + 12
  pars.forEach(par => {
    par.style.height = max + 'px'
  })
}

function copyToClipboard(ev) {
  if (ev.shiftKey == true) return
  if (ev.ctrlKey == true) return

  if (ev.target.nodeName != 'SPAN') return
  let wf = ev.target.textContent
  clipboard.writeText(wf)
}

function cyclePar(ev) {
  if (ev.shiftKey != true) return
  let idx = ev.target.getAttribute('pos')

  let selector = '#trns [pos="'+idx+'"]'
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

function createLeftHeader() {
  let obook = q('#book')
  let arect = obook.getBoundingClientRect()
  let ohleft = div()
  obook.appendChild(ohleft)
  ohleft.classList.add('hleft')
  ohleft.style.left = arect.width*0.15 + 'px'
  ohleft.addEventListener("click", clickLeftHeader, false)

  let otree = tree(info.tree, info.book.title)
  ohleft.appendChild(otree)
  let otitle = q('#tree-title')
  let otbody = q('#tree-body')
  if (current.fpath) {
    otitle.textContent = current.fpath
    otbody.classList.add('tree-collapse')
  } else {
    otitle.textContent = info.book.title
    remove(otbody)
  }
}

function clickLeftHeader(ev) {
  let fpath = ev.target.getAttribute('fpath')
  // log('LEFT', ev.target)
  let otbody = q('#tree-body')
  if (!otbody) return
  if (fpath) {
    if (ev.target.classList.contains('tree-node-empty')) return
    let otitle = q('#tree-title')
    current.fpath = fpath
    current.pos = 0
    otitle.textContent = current.fpath
    otbody.classList.add('tree-collapse')
    navigate(current)
  } else {
    otbody.classList.remove('tree-collapse')
    let ohleft = q('.hleft')
    ohleft.classList.add('header')
  }
}

function createRightHeader(nics) {
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
  createNameList(nics)
  let nic = current.nic
  collapseRightHeader(nic)
}

function createNameList(nics) {
  let nicnames = info.nicnames
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
    current.nic = nic
    if (!nic) return
    collapseRightHeader(nic)
    otherNic(nic)
  }
}

function otherNic(nic) {
  let pars = qs('#trns > p')
  pars.forEach((par, idx) => {
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
