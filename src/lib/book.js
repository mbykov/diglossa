import _ from 'lodash'
import Split from 'split.js'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import { tree } from './tree';
import { navigate } from './nav';

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
}

function goTitleEvent(ev) {
  if (ev.target.parentNode.nodeName != 'LI') return
  let infoid = ev.target.parentNode.infoid
  navigate({section: 'title', infoid: infoid})
}


export function parseTitle(info) {
  // log('TITLE INFO', info.tree)
  let osource = q('#book-title')
  let otrns = q('#book-contents')
  empty(osource)
  empty(otrns)
  let obookTitle = div('')
  obookTitle.classList.add('bookTitle')
  osource.appendChild(obookTitle)
  osource.setAttribute('infoid', info._id)

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

  let otree = create('div', 'tree')
  otree.id = 'tree'
  let tbody = create('div', 'tbody')
  otree.appendChild(tbody)
  otrns.appendChild(otree)
  tree(info.tree, otree)

  otree.addEventListener('click', goBookEvent, false)
}

function goBookEvent(ev) {
  let fpath = ev.target.getAttribute('fpath')
  if (!fpath) return
  let osource = q('#book-title')
  let infoid  = osource.getAttribute('infoid')
  navigate({section: 'book', infoid: infoid, fpath: fpath})
}


export function parseBook(state, info, pars) {
  log('parseBOOK', pars.length)
  if (!pars.length) return

  let osource = q('#source')
  let otrns = q('#trns')
  empty(osource)
  empty(otrns)

  let cnics = _.compact(_.uniq(pars.map(auth=> { if (!auth.author) return auth.nic })))
  let nic = state.nic
  if (!nic) nic = cnics[0]
  else if (!cnics.includes(nic)) nic = cnics[0]
  state.nic = nic

  setChunk(state, pars)
  // createRightHeader(cnics)
  // createLeftHeader()

  // osource.addEventListener("mouseover", copyToClipboard, false)
  // otrns.addEventListener("wheel", cyclePar, false)
  let progress = q('#progress')
  progress.classList.remove('is-shown')
}

function setChunk(state, pars, direction) {
  let nic = state.nic
  let osource = q('#source')
  let otrns = q('#trns')

  let apars = _.filter(pars, par=> { return par.author})
  let tpars = _.filter(pars, par=> { return !par.author})
  apars.forEach(apar=> {
    let html = apar.text.replace(rePunct, "<span class=\"active\">$1<\/span>")
    if (state.query) {
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
