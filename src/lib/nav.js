//
import _ from "lodash";
import { q, qs, empty, create, remove, span, p, div, enclitic } from './utils'
import Split from 'split.js'
// import { bookData, scrollPanes, keyPanes, parseLib, parseTitle, parseBook } from './lib/book'
// import { parseLib, parseTitle } from './book'
import { getLib, getTitle, getBook } from './pouch'


const log = console.log
const settings = require('electron').remote.require('electron-settings')
const Mousetrap = require('mousetrap')
const fse = require('fs-extra')
const path = require('path')
const slash = require('slash')

// let current = {section: 'title'}
let init = {section: 'home'}
let history = [init]
let hstate = 0

function hideAll () {
  const sections = document.querySelectorAll('.section.is-shown')
  Array.prototype.forEach.call(sections, (section) => {
    section.classList.remove('is-shown')
  })
}

function goLeft() {
  // log('<<=== LEFT', hstate)
  if (hstate - 1 < 0) return
  if (hstate - 1 >= 0) hstate--
  let state = history[hstate]
  state.old = true
  navigate(state)
}

function goRight() {
  // log('===>> RIGHT', hstate)
  if (hstate + 1 >= history.length) return
  if (hstate + 1 < history.length) hstate++
  let state = history[hstate]
  state.old = true
  navigate(state)
}

function twoPageTitle() {
  let ogutter = q('#title > .gutter')
  if (ogutter) return
  let sizes = [50, 50]
  let split = Split(['#book-title', '#book-contents'], {
    sizes: sizes,
    gutterSize: 5,
    // cursor: 'col-resize',
    minSize: [0, 0]
  })
  return split
}

function twoPage() {
  let ogutter = q('#book > .gutter')
  if (ogutter) return
  let sizes = settings.get('split-sizes')
  if (!sizes) sizes = [50, 50]
  let split = Split(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      // log('RESIZED', sizes)
      settings.set('split-sizes', sizes)
    }
  })
  // let obook = q('#book')
  // obook.addEventListener("wheel", scrollPanes, false)
  // document.addEventListener("keydown", keyPanes, false)
  return split
}

// arrows
Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  if (ev.which == 37) goLeft()
  else if (ev.which == 39) goRight()
})

function sectionTrigger (section) {
  // log('TRIGGER section', section)
  hideAll ()
  const sectionId = ['#', section].join('')
  q(sectionId).classList.add('is-shown')
}

export function parseInfo(info) {
  let nicnames = {}
  info.auths.forEach(auth => {
    if (auth.author) {
      info.book.author = auth.name
      return
    }
    nicnames[auth.nic] = auth.name
  })
  info.nicnames = nicnames
  let infoid = ['info', info.book.author, info.book.title].join('-')
  info._id = infoid
  return info
}

export function navigate(state) {
  log('NAV-state', state)
  let section = state.section
  sectionTrigger(section)
  // current.section = section
  if (!state.old) {
    history.push(_.clone(state))
    hstate = history.length-1
  }
  delete state.old
  // log('STATES', hstate, history)
  // bookData(current)

  if (section == 'title') twoPageTitle()
  else if (section == 'book') twoPage()

  if (section == 'home')  getLib()
  else if (section == 'title') getTitle(state)
  else if (section == 'book') getBook(state)
  // else if (section == 'cleanup') goCleanup(state)
  // else if (section == 'search') parseQuery(libdb, current)
  // else showSection(section)

  let progress = q('#progress')
  progress.classList.remove('is-shown')
}
