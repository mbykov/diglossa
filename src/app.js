'use strict'

// import "./css/tailwind.css";
import "./css/compiled.css";
import "./css/index.css";
import "./css/tree.css";

import _ from 'lodash'
import { remote, ipcRenderer, shell } from "electron"
import { log, q, qs, remove } from './lib/utils'
import { progress } from './lib/progress'
import { message } from './lib/message'
import { loadTemplates, loadSection } from './lib/load-templates'
import { config } from "./config"
import { header, rotateBlock } from './header'

const mouse = require('mousetrap')
const Store = require('electron-store')
const appstore = new Store({name: 'app'})

let dgl = remote.getGlobal('dgl')
import { getExportBook } from './exportBook'
import { getImportBook } from './importBook'
import { getImportDict } from './importDict'
let templates = remote.getGlobal('templates')

import { library } from './library'
import { book } from './book'
import { page } from './page'
import { bookmarks } from './bookmarks'
import { newtext } from './newtext'
import { preference } from './prefs'
import { dictionary } from './dicts'
import { search } from './search'

const axios = require('axios')

// const { app } = require('electron').remote
// let homepath = app.getPath('home')
// let lang = appstore.get('lang') || config.deflang
const routes = { library, book, page, bookmarks, newtext, preference, dictionary, search }

class History {
  constructor() {
    this.store = [],
    this.index = 0
  }
  get state() {
    return this.store[this.index]
  }
  set state(state) {
    this.store.push(state)
    this.index = this.store.length -1
  }
  back() {
    if (this.index) this.index--, router(this.state, true) // чтобы не запомнить
    // if (this.index) this.index--, router(this.state)
  }
  forward() {
    if (this.index < this.store.length-1) this.index++, router(this.state, true)
    // if (this.index < this.store.length-1) this.index++, router(this.state)
  }
  log() {
    log('HST:', this)
  }
}

let hst = new History()

mouse.bind(['alt+left'], function(ev) {
  if (dgl.editMode) return
  hst.back()
})

mouse.bind(['alt+right'], function(ev) {
  if (dgl.editMode) return
  hst.forward()
})

export const router = async (state, skip) => {
  closeAll()
  if (!skip) hst.state = state
  dgl.route = state.route
  let section = routes[state.route]
  await section.ready(state)
}

export function render(template, selector = '#app') {
  const region = q(selector)
  region.innerHTML = templates[template]
  hideSearchIcon()
}

function closeAll() {
  let ofn = q('#footnote')
  if (ofn) ofn.parentElement.removeChild(ofn)
  let oimgs = qs('img.floatimg')
  oimgs.forEach(el => { el.parentElement.removeChild(el) })
  progress.hide()
  message.hide()
  page.localquery = ''
  // hideSearchIcon()
}

;(async function init() {
  await loadTemplates()
  const initState = {route: 'library'}
  dgl.langs = (books) => books.filter(book=> book.active).map(book=> book.lang),
  dgl.alllangs = (books) => books.map(book=> book.lang),
  dgl.actives = (books) => {
    books = books.filter(book=> book.active)
    if (books.length > 1 && !books.find(book=> book.shown)) books[1].shown = true
    return books
  }
  dgl.origin = (books) => books.find(book=> book.origin), // origin always active
  dgl.shown = (books) => books.filter(book=> book.active).find(book=> book.shown),
  dgl.trns = (books) => books.filter(book=> book.active && !book.origin)

  router(initState)
  setSearchIcon()
  render('message', '#message')
})()

document.addEventListener ("click",  (ev) => {
  message.hide()
  if (ev.target.nodeName == 'BUTTON') return
  // if (ev.target.nodeName == 'A') return
  let ohref = ev.target.closest('.external')
  if (!ohref) return
  ev.preventDefault()
  let href = ohref.textContent
  if (!href) return
  shell.openExternal(href)
})

document.addEventListener ("click",  (ev) => {
  message.hide()
  if (!ev.ctrlKey) return
  let owf = ev.target.closest('span.wf')
  if (!owf) return
  ev.preventDefault()
  let href = owf.textContent
  if (!href) return
  href = 'http://diglossa.org/' + href
  shell.openExternal(href)
})


// scroll page
document.addEventListener("wheel", function(ev) {
  if (ev.shiftKey) return
  const opage = q('.page') // || q('.section') // todo: del
  if (!opage) return
  let delta = (ev.deltaY > 0) ? 24 : -24
  opage.scrollTop += delta

  const osrc = q('#src')
  if (!osrc) return
  let hidden = osrc.classList.contains('hidden')
  if (hidden) osrc = q('#trn')
  let scrolltop = opage.scrollTop
  let height  = osrc.clientHeight
  let ohr = q('.show-page-position')
  if (!ohr) return
  ohr.style.width = (scrolltop/height)*100 + '%'
  if (dgl.route == 'book') ohr.style.width = 0
})

mouse.bind('esc', function(ev) {
  ipcRenderer.send('hide-popup-window')
  // exitEditMode()
  closeAll()
})

mouse.bind('ctrl+v', function(ev) {
  let state = {route: 'newtext'}
  router(state)
})

mouse.bind('ctrl+d', function(ev) {
  router({route: 'dictionary'})
})

// mouse.bind('ctrl+b', function(ev) {
  // router({route: 'bookmarks'})
// })

ipcRenderer.on('route', function (event, route) {
  router({route})
})

ipcRenderer.on('section', function (event, route) {
  let lang = appstore.get('lang') || config.deflang
  loadSection(lang, route)
})


ipcRenderer.on('lang', function (event, lang) {
  appstore.set('lang', lang)
  ipcRenderer.send('lang', lang)
})

ipcRenderer.on('version', function (event, oldver) {
  axios.get(config.version)
    .then(function (response) {
      if (!response || !response.data) return
      let newver = response.data.name
      if (oldver && newver && newver > oldver) {
        let versionTxt = ['new version available:', newver].join(' ')
        message.show(versionTxt, 'darkgreen', true)
      }
    })
    .catch(function (error) {
      console.log('API.GITHUB ERR')
    })
})

// todo: del ================== DEL
mouse.bind('ctrl+l', function(ev) {
  ev.preventDefault()
  const state = {route: 'library'}
  router(state)
})

function hideSearchIcon() {
  q('#search-icon').classList.add('hidden')
  q('#search-input').classList.add('hidden')
}

function setSearchIcon() {
  let oicon = q('#search-icon')
  oicon.innerHTML = templates.searchicon
  let oinput = q('#search-input')
  oinput.innerHTML = templates.searchinput
}


const handleError = (title, error) => {
  log('_HANDLE ERR title', title)
  log('_HANDLE ERR', error)
}

if (process.type === 'renderer') {
	const errorHandler = _.debounce(error => {
		handleError('Unhandled Error', error);
	}, 200);
	window.addEventListener('error', event => {
		event.preventDefault();
		errorHandler(event.error || event);
	});

	const rejectionHandler = _.debounce(reason => {
		handleError('Unhandled Promise Rejection', reason);
	}, 200);
	window.addEventListener('unhandledrejection', event => {
		event.preventDefault();
		rejectionHandler(event.reason);
	});
} else {
	process.on('uncaughtException', error => {
		handleError('Unhandled Error', error);
	});

	process.on('unhandledRejection', error => {
		handleError('Unhandled Promise Rejection', error);
	});
}
