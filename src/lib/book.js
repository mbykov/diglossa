import _ from 'lodash'
// import Split from 'split.js'
import { q, qs, empty, create, recreate, span, p, div, remove } from './utils'
import { tree } from './tree';
import { navigate } from './nav';
import { pushInfo, getText } from './pouch'

const settings = require('electron').remote.require('electron-settings')
const path = require('path')
const log = console.log
const clipboard = require('electron-clipboard-extended')

let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)'
let rePunct = new RegExp(punct, 'g')
let limit = 20
let around = 50

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
  log('TITLE STATE', state)
  log('TITLE INFO', info)
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

  let otree = create('div', 'tree')
  otree.id = 'tree'
  let tbody = create('div', 'tbody')
  otree.appendChild(tbody)
  otrns.appendChild(otree)
  log('INFO.TREE', info.tree)
  tree(info.tree, otree)

  otree.addEventListener("click", function(ev) {
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
  if (!pars.length) return
  let osource = q('#booksource')
  let otrns = q('#booktrns')
  empty(osource)
  empty(otrns)

  let cnics = _.compact(_.uniq(pars.map(auth=> { if (!auth.author) return auth.nic })))
  let current = {}
  current = readTree(current, info.tree, state.fpath)
  let nic = current.nic || cnics[0]
  state.nic = nic
  current.cnics = cnics

  if (state.mono)
    setMono(state, pars)
  else
    setChunk(state, pars)
  createRightHeader(state, info)
  createLeftHeader(state, info)

  osource.addEventListener("mouseover", copyToClipboard, false)
  otrns.addEventListener("wheel", cyclePar, false)
  hideProgress()
}

function setChunk(state, pars, direction) {
  let osource = q('#booksource')
  let otrns = q('#booktrns')

  let apars = _.filter(pars, par=> { return par.author})
  let tpars = _.filter(pars, par=> { return !par.author})
  if (!apars.length) return
  // log('APARS', apars)
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
      if (par.nic == state.nic) oright.classList.add('active')
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
    let firstel = qs('#booksource [pos="'+firstpos+'"]')[0]
    let offset = firstel.offsetTop
    otrns.scrollTop = osource.scrollTop = offset
  }
}

function setMono(state, pars, direction) {
  let osource = q('#booksource')
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

function cyclePar(ev) {
  if (ev.shiftKey != true) return
  let idx = ev.target.getAttribute('pos')

  let selector = '#booktrns [pos="'+idx+'"]'
  let pars = qs(selector)
  let nics = _.map(pars, par=> { return par.getAttribute('nic') })
  if (nics.length == 1) return
  let curpar = _.find(pars, par=> { return !par.classList.contains('hidden') })
  let nic = curpar.getAttribute('nic')
  let nicidx = nics.indexOf(nic)
  let nextnic = (nicidx+1 == nics.length) ? nics[0] : nics[nicidx+1]
  let next = _.find(pars, par=> { return par.getAttribute('nic') == nextnic })
  next.classList.remove('hidden')
  curpar.classList.add('hidden')
}

function createRightHeader(state, info) {
  let obook = q('#book')
  let arect = obook.getBoundingClientRect()
  let ohright = q('.hright')
  if (ohright) remove(ohright)
  ohright = create('div', 'hright')
  ohright.style.left = arect.width*0.70 + 'px'
  obook.appendChild(ohright)
  // log('CREATE RH state', state)

  let current = {}
  current = readTree(current, info.tree, state.fpath)

  let oul = create('ul')
  oul.setAttribute('id', 'namelist')
  oul.setAttribute('fpath', current.fpath)
  let fpath = current.fpath
  oul.addEventListener("click", function(ev) {
    clickRightHeader(ev, info)
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

function clickRightHeader(ev, info) {
  if (ev.target.classList.contains('active')) {
    expandRightHeader()
  } else {
    let nic = ev.target.getAttribute('nic')
    let oul = q('#namelist')
    let fpath = oul.getAttribute('fpath')
    writeTree(info.tree, fpath, nic)
    pushInfo(info)
      .then(function(res) {
        collapseRightHeader(nic)
        otherNic(nic)
      })
  }
}

function otherNic(nic) {
  let pars = qs('#booktrns > p')
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
  let ohleft = q('.hleft')
  if (ohleft) remove(ohleft)
  ohleft = create('div', 'hleft')
  obook.appendChild(ohleft)
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
  otree.addEventListener("click", function(ev) {
    goBookEvent(ev, info)
  }, false)
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

function copyToClipboard(ev) {
  if (ev.shiftKey == true) return
  if (ev.ctrlKey == true) return
  if (ev.target.nodeName != 'SPAN') return
  let wf = ev.target.textContent
  clipboard.writeText(wf)
}

export function scrollPanes(ev, state) {
  if (ev.shiftKey == true) return;
  let delta = (ev.deltaY > 0) ? 24 : -24
  let osource = q('#booksource')
  let otrns = q('#booktrns')
  osource.scrollTop += delta
  otrns.scrollTop = osource.scrollTop

  if (!state || state.section != 'book') return

  let sTop = osource.scrollTop;
  let spars = qs('#source > p')
  _.each(spars, el=> {
    let off = sTop - el.offsetTop
    if (off < 0) {
      state.pos = el.getAttribute('pos')
      return false
    }
  })
  // if (state && state.section != 'book') return
  addChunk(state)
}

export function keyPanes(ev, state) {
  let source = q('#booksource')
  let trns = q('#booktrns')
  // trns.scrollTop = source.scrollTop
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

  // if (state && state.section != 'book') return
  addChunk(state)
}


function addChunk(state) {
  if (state && state.section != 'book') return
  let osource = q('#booksource')

  if (osource.scrollTop == 0) {
    let start = qs('#booksource > p')[0]
    if (!start) return
    let startpos = start.getAttribute('pos')
    if (startpos <= 0) return

    let newstart = (startpos - limit > 0) ? startpos - limit : 0
    state.pos = newstart
    getText(state, startpos)
      .then(function(res) {
        if (!res.docs.length) return
        setChunk(state, _.reverse(res.docs), true)
      })
  }

  if (osource.scrollHeight - osource.scrollTop - osource.clientHeight <= 3.0) {
    let start = qs('#booksource > p').length
    state.pos = start
    getText(state)
      .then(function(res) {
        setChunk(state, res.docs)
      })
    .catch(function (err) {
      log('GET CHUNK ERR:', err)
    })
  }
}

export function parseQuery(state, qtree) {
  let osec = q('#qresults')
  empty(osec)
  let otree = create('div', 'tree')
  otree.id = 'qtree'
  let otbody = create('div', 'tbody')
  otree.appendChild(otbody)
  osec.appendChild(otree)
  // otree.addEventListener('click', treeClick, false)
  otree.addEventListener("click", function(ev) {
    treeClick(ev, state)
  }, false)
  // otree.addEventListener('click', jumpPos, false)
  otree.addEventListener("wheel", scrollQueries, false)

  // log('QTRE', qtree)
  for (let infoid in qtree) {
    let child  = {text: infoid}
    let ibranch = branch(child)
    otbody.appendChild(ibranch)

    let inode = qtree[infoid]
    for (let fpath in inode) {
      let fchild  = {text: fpath}
      let fbranch = branch(fchild)
      ibranch.appendChild(fbranch)

      let fnode = inode[fpath]
      for (let pos in fnode) {
        let pars = fnode[pos]
        let auth = _.find(pars, par=> { return par.author })
        let trns = _.filter(pars, par=> { return !par.author })

        let otext = div('', 'qtext')
        fbranch.appendChild(otext)
        otext.setAttribute('pos', pos)
        otext.setAttribute('fpath', fpath)
        otext.setAttribute('infoid', infoid)

        let {html, percent} = aroundQuery(auth.text, state.query, pos)
        // if (pos == 5) log('NODE', html)
        let oauth = p('', 'qline')
        oauth.innerHTML = html
        otext.appendChild(oauth)
      }
    }
  }

  hideProgress()
}

function branch(node) {
  let onode = create('div', 'tree-branch')
  let osign = create('span', 'tree-sign')
  osign.textContent = '▾'
  onode.appendChild(osign)
  let otext = create('span', 'tree-node-branch')
  otext.textContent = node.text
  onode.appendChild(otext)
  let tbody = create('div', 'tbody')
  onode.appendChild(tbody)
  return onode
}

function aroundQuery(str, wf, pos) {
  let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)'
  let rePunct = new RegExp(punct, 'g')
  let arr = str.split(wf)
  let head = arr[0].slice(-around)
  let percent = head.length/str.length
  head =  head.replace(rePunct, "<span class=\"active\">$1<\/span>")
  let tail = arr.slice(1).join('').slice(0, around)
  tail = tail.replace(rePunct, "<span class=\"active\">$1<\/span>")
  let qspan = ['<span class="query">', wf, '</span>'].join('')
  let html = [head, qspan, tail] .join('')
  return {html: html, percent: percent}
}

function treeClick(ev, state) {
  let parent = ev.target.parentNode
  if (ev.target.classList.contains('tree-node-branch')) {
    parent.classList.toggle('tree-collapse')
  // } else if (ev.target.classList.contains('active') || ev.target.classList.contains('query')) {
  } else if (ev.target.classList.contains('query')) {
    let target = ev.target.closest('.qtext')
    jumpPos(target, state.query)
  }
}

function jumpPos(el, query) {
  let infoid = el.getAttribute('infoid')
  let fpath = el.getAttribute('fpath')
  let pos = el.getAttribute('pos')
  let state = {section: "book", infoid: infoid, fpath: fpath, pos: pos, query: query}
  navigate(state)
}

function scrollQueries(ev) {
  if (ev.shiftKey != true) return
  log('SCROLL', ev.target)
  return
  let el = ev.target
  let parent = el.closest('.qtext')
  if (!parent) return
  let pars = parent.children
  let nics = _.map(pars, par=> { return par.getAttribute('nic') })

  let curpar = _.find(pars, par=> { return !par.classList.contains('hidden') })
  let nic = curpar.getAttribute('nic')
  let nicidx = nics.indexOf(nic)
  let nextnic = (nicidx+1 == nics.length) ? nics[0] : nics[nicidx+1]
  let next = _.find(pars, par=> { return par.getAttribute('nic') == nextnic })
  next.classList.remove('hidden')
  curpar.classList.add('hidden')
}

// export function parseOds() {

//   hideProgress()
// }
