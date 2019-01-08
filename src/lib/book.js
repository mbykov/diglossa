import _ from 'lodash'
// import Split from 'split.js'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import { tree } from './tree';
import { navigate } from './nav';
import { pushInfo } from './pouch'

const settings = require('electron').remote.require('electron-settings')
const path = require('path')
const log = console.log
const clipboard = require('electron-clipboard-extended')

let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)'
let rePunct = new RegExp(punct, 'g')

export function parseLib(infos) {
  let osource = q('#library')
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
  let osource = q('#titlesource')
  let otrns = q('#titletrns')
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
  // ocontent.setAttribute('infoid', info._id)

  let otree = create('div', 'tree')
  otree.id = 'tree'
  let tbody = create('div', 'tbody')
  otree.appendChild(tbody)
  otrns.appendChild(otree)
  tree(info.tree, otree)

  // otree.addEventListener('click', goBookEvent, false)
  otree.addEventListener("click", function(ev){
    goBookEvent(ev, info)
  }, false)

  hideProgress()
}

function goBookEvent(ev, info) {
  let fpath = ev.target.getAttribute('fpath')
  if (!fpath) return
  let mono = ev.target.getAttribute('mono')
  let infoid = info._id
  let state = {section: 'book', infoid: infoid, fpath: fpath}
  if (mono) state.mono = true
  navigate(state)
}

export function parseBook(state, info, pars) {
  log('parseBOOK', info)
  log('parseBOOKs', state)
  if (!pars.length) return
  let osource = q('#booksource')
  let otrns = q('#booktrns')
  empty(osource)
  empty(otrns)

  // let cnics = _.compact(_.uniq(pars.map(auth=> { if (!auth.author) return auth.nic })))
  let nic //  = info.nic
  // if (!nic) nic = cnics[0]
  // else if (!cnics.includes(nic)) nic = cnics[0]
  // // state.nic = nic
  // state.cnics = cnics

  if (state.mono)
    setMono(nic, state, pars)
  else
    setChunk(nic, state, pars)
  createRightHeader(state, info)
  createLeftHeader(state, info)

  // osource.addEventListener("mouseover", copyToClipboard, false)
  // otrns.addEventListener("wheel", cyclePar, false)
  hideProgress()
}

function setChunk(nic, state, pars, direction) {
  let osource = q('#booksource')
  let otrns = q('#booktrns')

  let apars = _.filter(pars, par=> { return par.author})
  let tpars = _.filter(pars, par=> { return !par.author})
  apars.forEach(apar=> {
    // log('APAR', apar)
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

function setMono(nic, state, pars, direction) {
  let osource = q('#booksource')
  // log('APARs', pars.length)
  pars.forEach(par=> {
    let oleft = p(par.text)
    oleft.setAttribute('pos', par.pos)
    oleft.setAttribute('nic', par.nic)
    osource.appendChild(oleft)
  })
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
  log('========================> CREATE H', state.fpath, info.tree)
  let obook = q('#book')
  let arect = obook.getBoundingClientRect()
  let ohright = div()
  ohright.classList.add('hright')
  ohright.style.left = arect.width*0.70 + 'px'
  obook.appendChild(ohright)

  let current = {}
  current = readTree(current, info.tree, state.fpath)
  log('CURRENT', current)
  if (!current.nic) current.nic = current.cnics[0] // это нужно убрать, nic всегда должен быть

  let oul = create('ul')
  oul.setAttribute('id', 'namelist')
  // oul.addEventListener("click", clickRightHeader, false)
  oul.addEventListener("click", function(ev){
    clickRightHeader(ev, info, state.fpath)
  }, false)
  ohright.appendChild(oul)
  createNameList(current.cnics, info.nicnames)
  collapseRightHeader(current.nic)
}

function readTree(current, children, fpath) {
  children.forEach(child=> {
    if (child.fpath && child.fpath == fpath) current = child
    else if (!child.file) current = readTree(current, child.children, fpath)
  })
  return current
}

function writeTree(children, fpath, nic) {
  children.forEach(child=> {
    if (child.fpath && child.fpath == fpath) child.nic = nic
    else if (!child.file) writeTree(child.children, fpath, nic)
  })
}

function createNameList(cnics, nicnames) {
  let oul = q('#namelist')
  empty(oul)
  oul.setAttribute('nics', cnics)
  cnics.forEach(nic=> {
    let oli = create('li')
    let name = nicnames[nic] ? nicnames[nic] : nic
    oli.textContent = name
    oli.setAttribute('nic', nic)
    oul.appendChild(oli)
  })
}

function clickRightHeader(ev, info, fpath) {
  log('=========== R SAVE INFO =>', info.tree)
  if (ev.target.classList.contains('active')) {
    expandRightHeader()
  } else {
    let nic = ev.target.getAttribute('nic')
    writeTree(info.tree, fpath, nic)
    log('=========== R SAVE INFO 2 =>', info.tree)
    pushInfo(info)
      .then(function(res) {
        log('INFO SAVED NIC', nic)
        log('INFO SAVED info', info)
        collapseRightHeader(nic)
        otherNic(nic)
      })
  }
}

function otherNic(nic) {
  let pars = qs('#trns > p')
  pars.forEach(par => {
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
