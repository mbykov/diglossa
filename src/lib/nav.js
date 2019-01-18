//
import _ from "lodash"
import { q, qs, empty, create, remove, span, p, div, enclitic } from './utils'
import Split from 'split.js'
// import { bookData, scrollPanes, keyPanes, parseLib, parseTitle, parseBook } from './lib/book'
import { scrollPanes, keyPanes } from './book'
// import { parseLib, parseTitle } from './book'
import { getInfo, getLib, getTitle, getBook, getQuery } from './pouch'


const log = console.log
const clipboard = require('electron-clipboard-extended')
const settings = require('electron').remote.require('electron-settings')
const Mousetrap = require('mousetrap')
const fse = require('fs-extra')
const path = require('path')
const slash = require('slash')

// let current = {section: 'title'}
let init = {section: 'home'}
let history = [init]
let hstate = 0
let split

function goLeft() {
  if (hstate - 1 < 0) return
  if (hstate - 1 >= 0) hstate--
  let state = history[hstate]
  state.old = true
  navigate(state)
}

function goRight() {
  if (hstate + 1 >= history.length) return
  if (hstate + 1 < history.length) hstate++
  let state = history[hstate]
  state.old = true
  navigate(state)
}

function twoPanes(state) {
  let osource = q('#booksource')
  let otrns = q('#booktrns')
  empty(osource)
  empty(otrns)

  let sizes = settings.get('split-sizes') || [50, 50]
  if (split && state.mono) split.collapse(1)
  else if (split) split.setSizes(sizes)

  if (split) return
  settings.set('split-sizes', sizes)

  split = Split(['#booksource', '#booktrns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      // log('RESIZED', sizes)
      settings.set('split-sizes', sizes)
    }
  })
  if (state.mono) split.collapse(1)

  let obook = q('#book')
  document.addEventListener("keydown", function(ev) {
    keyPanes(ev, state)
  }, false)

  obook.addEventListener("wheel", function(ev) {
    scrollPanes(ev, state)
  }, false)
}

function twoPanesTitle(state) {
  let osource = q('#titlesource')
  let otrns = q('#titletrns')
  empty(osource)
  empty(otrns)

  let gutsel = ['#title > .gutter'].join('')
  let ogutter = q(gutsel)
  if (ogutter) return

  Split(['#titlesource', '#titletrns'], {
    sizes: [50, 50],
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0]
  })
}

// arrows
Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  if (ev.which == 37) goLeft()
  else if (ev.which == 39) goRight()
})

Mousetrap.bind(['alt+1', 'alt+2'], function(ev) {
  if (ev.which == 49) log('----1')
  else if (ev.which == 50) log('----2')
})

Mousetrap.bind(['ctrl+f'], function(ev) {
  let query = clipboard.readText().split(' ')[0]
  log('CTRL F', query)
  navigate({section: 'search', query: query})
})

Mousetrap.bind(['ctrl+v'], function(ev) {
  let state = settings.get('state')
  getInfo(state.infoid)
    .then(function(info) {
      log('CTRL V state', JSON.parse(JSON.stringify(state)), info)
    })
  // navigate({section: 'search', query: query})
})

Mousetrap.bind(['esc'], function(ev) {
  // log('ESC')
  // похоже, общий метод не получится
})

function hideAll () {
  const sections = document.querySelectorAll('.section.is-shown')
  Array.prototype.forEach.call(sections, (section) => {
    section.classList.remove('is-shown')
  })
}

function sectionTrigger(section) {
  hideAll()
  const sectionId = ['#', section].join('')
  q(sectionId).classList.add('is-shown')
}

export function navigate(state) {
  log('NAV-state', JSON.parse(JSON.stringify(state)))
  let section = state.section
  let progress = q('#progress')
  if (['title', 'book', 'search'].includes(section)) progress.classList.add('is-shown')
  sectionTrigger(section)
  // delete state.nic
  if (!state.old) {
    // history.push(_.clone(state))
    history.push(state)
    hstate = history.length-1
  } else {
    delete state.old
  }
  // log('HISTORY', history)

  if (section == 'home')  getLib()
  else if (section == 'title') twoPanesTitle(state), getTitle(state)
  else if (section == 'book') twoPanes(state), getBook(state)
  else if (section == 'search') getQuery(state)
  // else showSection(section)

  settings.set('state', state)
}
