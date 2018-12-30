//
import _ from "lodash";
import { q, qs, empty, create, remove, span, p, div, enclitic } from './utils'
import Split from 'split.js'
// import { bookData, scrollPanes, keyPanes, parseLib, parseTitle, parseBook } from './lib/book'
import { parseTitle } from './book'

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
  // if (current) delete current.query
  log('<<=== LEFT', hstate)
  if (hstate - 1 < 0) return
  if (hstate - 1 >= 0) hstate--
  let state = history[hstate]
  state.old = true
  navigate(state)
}

function goRight() {
  log('===>> RIGHT', hstate)
  // if (current) delete current.query
  if (hstate + 1 >= history.length) return
  if (hstate + 1 < history.length) hstate++
  let state = history[hstate]
  state.old = true
  navigate(state)
}

function twoPages() {
  // log('TWO PAGES')
  let gutter = q('.gutter')
  // log('GUTTER', gutter)
  if (gutter) return
  let sizes = settings.get('split-sizes')
  if (!sizes) sizes = [50, 50]
  // log('SIZES', sizes)
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
  log('TRIG', section)
  hideAll ()
  const sectionId = ['#', section].join('')
  q(sectionId).classList.add('is-shown')
}

function getInfoFile(fns) {
  if (!fns) return
  let infopath = fns[0]
  if (!infopath) return
  try {
    let progress = q('#progress')
    progress.style.display = 'inline-block'

    let json = fse.readFileSync(infopath)
    let info = JSON.parse(json)
    info = parseInfo(info)
    let dir = path.parse(infopath).dir
    let bpath = path.resolve(dir, info.book.path)
    info.bpath = slash(bpath)
    // getDir(info)
  } catch(err) {
    log('INFO JSON ERR:', err)
  }
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

  if (section == 'title') twoPages()

  if (section == 'lib') log('SEC FAKE') // goLib()
  else if (section == 'title') parseTitle(state.info)
  // else if (section == 'book') getBook()
  // else if (section == 'search') parseQuery(libdb, current)
  // else showSection(section)

  let progress = q('#progress')
  // progress.style.display = 'none'
}
