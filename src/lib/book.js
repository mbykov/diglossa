import _ from 'lodash'
// import Split from 'split.js'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import { tree } from './tree';
import { navigate } from './nav';

const settings = require('electron').remote.require('electron-settings')
const path = require('path')
const log = console.log
const clipboard = require('electron-clipboard-extended')

let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)'
let rePunct = new RegExp(punct, 'g')

export function parseLib(infos) {
  log('==>> LIB INFOs', infos)
  let osource = q('#home')
  empty(osource)
  let oul = create('ul')
  osource.appendChild(oul)

  if (!infos.length) oul.textContent = 'your library is empty'
  infos.forEach(info => {
    let ostr = create('li', 'libauth')
    ostr.infoid = info._id
    oul.appendChild(ostr)
    let author = span(info.book.author)
    let title = span(info.book.title)
    author.classList.add('lib-auth')
    title.classList.add('lib-title')
    ostr.appendChild(author)
    ostr.appendChild(title)
  })
  oul.addEventListener('click', goTitleEvent, false)
  hideProgress()
}

function goTitleEvent(ev) {
  if (ev.target.parentNode.nodeName != 'LI') return
  let infoid = ev.target.parentNode.infoid
  navigate({section: 'title', infoid: infoid})
}


export function parseTitle(state, info) {
  // log('TITLE INFO', info.tree)
  let srcsel = ['#', state.section, '> #source'].join('')
  let trnsel = ['#', state.section, '> #trns'].join('')
  let osource = q(srcsel)
  let otrns = q(trnsel)
  empty(osource)
  empty(otrns)
  let obookTitle = div('')
  obookTitle.classList.add('bookTitle')
  osource.appendChild(obookTitle)

  let oauthor = div(info.book.author, 'author')
  let otitle = div(info.book.title, 'title')
  obookTitle.appendChild(oauthor)
  obookTitle.appendChild(otitle)

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
  let ocontent = create('div', 'book-content')
  ocontent.id = 'book-content'
  ocontent.textContent = 'Content:'
  otrns.appendChild(ocontent)
  ocontent.setAttribute('infoid', info._id)

  let otree = create('div', 'tree')
  otree.id = 'tree'
  let tbody = create('div', 'tbody')
  otree.appendChild(tbody)
  otrns.appendChild(otree)
  tree(info.tree, otree)

  otree.addEventListener('click', goBookEvent, false)
  hideProgress()
}

function goBookEvent(ev) {
  let fpath = ev.target.getAttribute('fpath')
  if (!fpath) return
  let osource = q('#book-content')
  let infoid  = osource.getAttribute('infoid')
  navigate({section: 'book', infoid: infoid, fpath: fpath})
}

export function parseBook(state, info, pars) {
  // log('parseBOOK', pars.length)
  if (!pars.length) return
  let srcsel = ['#', state.section, '> #source'].join('')
  let trnsel = ['#', state.section, '> #trns'].join('')
  let osource = q(srcsel)
  let otrns = q(trnsel)
  empty(osource)
  empty(otrns)

  let cnics = _.compact(_.uniq(pars.map(auth=> { if (!auth.author) return auth.nic })))
  let nic = state.nic
  if (!nic) nic = cnics[0]
  else if (!cnics.includes(nic)) nic = cnics[0]
  state.nic = nic
  state.cnics = cnics

  setChunk(state, pars)
  createRightHeader(state, info)
  createLeftHeader(state, info)

  // osource.addEventListener("mouseover", copyToClipboard, false)
  // otrns.addEventListener("wheel", cyclePar, false)
  hideProgress()
}

function setChunk(state, pars, direction) {
  let nic = state.nic
  let srcsel = ['#', state.section, '> #source'].join('')
  let trnsel = ['#', state.section, '> #trns'].join('')
  let osource = q(srcsel)
  let otrns = q(trnsel)

  let apars = _.filter(pars, par=> { return par.author})
  let tpars = _.filter(pars, par=> { return !par.author})
  apars.forEach(apar=> {
    let html = apar.text.replace(rePunct, "<span class=\"active\">$1<\/span>")
    if (state.query) {
      let requery = new RegExp(state.query, 'g')
      html = html.replace(requery, "<span class=\"query\">"+state.query+"<\/span>")
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
    let firstel = qs('#source [pos="'+firstpos+'"]')[0]
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

function hideProgress() {
  let progress = q('#progress')
  progress.classList.remove('is-shown')
}

function createRightHeader(state, info) {
  let obook = q('#book')
  let arect = obook.getBoundingClientRect()
  let ohright = div()
  ohright.classList.add('hright')
  ohright.style.left = arect.width*0.70 + 'px'
  settings.set('state', state)

  let oul = create('ul')
  oul.setAttribute('id', 'namelist')
  oul.addEventListener("click", clickRightHeader, false)
  ohright.appendChild(oul)
  obook.appendChild(ohright)
  createNameList(state, info)
  collapseRightHeader(state.nic)
}

function createNameList(state, info) {
  let nicnames = info.nicnames
  let oul = q('#namelist')
  empty(oul)
  oul.setAttribute('nics', state.cnics)
  state.cnics.forEach(nic=> {
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
    let state = settings.get('state')
    state.nic = nic
    settings.set('state', state)
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

function createLeftHeader(state, info) {
  let obook = q('#book')
  let arect = obook.getBoundingClientRect()
  let ohleft = div()
  obook.appendChild(ohleft)
  ohleft.classList.add('hleft')
  ohleft.style.left = arect.width*0.15 + 'px'
  ohleft.addEventListener("click", clickLeftHeader, false)


  let otree = create('div', 'tree')
  otree.id = 'tree'
  otree.setAttribute('tree', info.tree)
  let otitle = q('.hleft .tree-title')
  if (!otitle) {
    otitle = create('div', 'tree-title')
    otree.appendChild(otitle)
  }
  otitle.textContent = state.fpath

  let otbody = create('div', 'tbody')
  otree.appendChild(otbody)
  ohleft.appendChild(otree)
  tree(info.tree, otree)
  otree.addEventListener('click', goBookEvent, false)

  otbody.classList.add('tree-collapse')
}

function clickLeftHeader(ev) {
  let fpath = ev.target.getAttribute('fpath')
  let otbody = q('.hleft .tbody')
  if (!otbody) return
  otbody.classList.toggle('tree-collapse')
  let ohleft = q('.hleft')
  ohleft.classList.toggle('header')
}
