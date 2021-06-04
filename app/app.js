/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "router": () => (/* binding */ router),
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _css_compiled_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/compiled.css */ "./src/css/compiled.css");
/* harmony import */ var _css_compiled_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_compiled_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./css/index.css */ "./src/css/index.css");
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_index_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_tree_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/tree.css */ "./src/css/tree.css");
/* harmony import */ var _css_tree_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_tree_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _lib_progress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/progress */ "./src/lib/progress.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");
/* harmony import */ var _lib_load_templates__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/load-templates */ "./src/lib/load-templates.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _exportBook__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./exportBook */ "./src/exportBook.js");
/* harmony import */ var _importBook__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./importBook */ "./src/importBook.js");
/* harmony import */ var _importDict__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./importDict */ "./src/importDict.js");
/* harmony import */ var _library__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./library */ "./src/library.js");
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./book */ "./src/book.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./page */ "./src/page.js");
/* harmony import */ var _bookmarks__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./bookmarks */ "./src/bookmarks.js");
/* harmony import */ var _newtext__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./newtext */ "./src/newtext.js");
/* harmony import */ var _prefs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./prefs */ "./src/prefs.js");
/* harmony import */ var _dicts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./dicts */ "./src/dicts.js");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./search */ "./src/search.js");
/* harmony import */ var _lookup__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./lookup */ "./src/lookup.js");
 // import "./css/tailwind.css";













const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const appstore = new Store({
  name: 'app'
});
let dgl = electron__WEBPACK_IMPORTED_MODULE_4__.remote.getGlobal('dgl');



let templates = electron__WEBPACK_IMPORTED_MODULE_4__.remote.getGlobal('templates');








 // const { app } = require('electron').remote
// let homepath = app.getPath('home')
// let lang = appstore.get('lang') || config.deflang

const routes = {
  library: _library__WEBPACK_IMPORTED_MODULE_14__.library,
  book: _book__WEBPACK_IMPORTED_MODULE_15__.book,
  page: _page__WEBPACK_IMPORTED_MODULE_16__.page,
  bookmarks: _bookmarks__WEBPACK_IMPORTED_MODULE_17__.bookmarks,
  newtext: _newtext__WEBPACK_IMPORTED_MODULE_18__.newtext,
  preference: _prefs__WEBPACK_IMPORTED_MODULE_19__.preference,
  dictionary: _dicts__WEBPACK_IMPORTED_MODULE_20__.dictionary,
  search: _search__WEBPACK_IMPORTED_MODULE_21__.search,
  lookup: _lookup__WEBPACK_IMPORTED_MODULE_22__.lookup
};

class History {
  constructor() {
    this.store = [], this.index = 0;
  }

  get state() {
    return this.store[this.index];
  }

  set state(state) {
    this.store.push(state);
    this.index = this.store.length - 1;
  }

  back() {
    if (this.index) this.index--, router(this.state, true); // чтобы не запомнить
    // if (this.index) this.index--, router(this.state)
  }

  forward() {
    if (this.index < this.store.length - 1) this.index++, router(this.state, true); // if (this.index < this.store.length-1) this.index++, router(this.state)
  }

  log() {
    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.log)('HST:', this);
  }

}

let hst = new History();
mouse.bind(['alt+left'], function (ev) {
  if (dgl.editMode) return;
  hst.back();
});
mouse.bind(['alt+right'], function (ev) {
  if (dgl.editMode) return;
  hst.forward();
});
const router = async (state, skip) => {
  closeAll();
  if (!skip) hst.state = state;
  dgl.route = state.route;
  let section = routes[state.route];
  await section.ready(state);
};
function render(template, selector = '#app') {
  const region = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.q)(selector);
  region.innerHTML = templates[template];
  hideSearchIcon();
}

function closeAll() {
  let ofn = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.q)('#footnote');
  if (ofn) ofn.parentElement.removeChild(ofn); // let oimgs = qs('img.floating')
  // oimgs.forEach(el => { el.parentElement.removeChild(el) })

  _lib_progress__WEBPACK_IMPORTED_MODULE_6__.progress.hide();
  _lib_message__WEBPACK_IMPORTED_MODULE_7__.message.hide();
  _page__WEBPACK_IMPORTED_MODULE_16__.page.localquery = ''; // hideSearchIcon()
}

;

(async function init() {
  await (0,_lib_load_templates__WEBPACK_IMPORTED_MODULE_8__.loadTemplates)();
  const initState = {
    route: 'library'
  };
  dgl.langs = books => books.filter(book => book.active).map(book => book.lang), dgl.alllangs = books => books.map(book => book.lang), dgl.actives = books => {
    books = books.filter(book => book.active);
    if (books.length > 1 && !books.find(book => book.shown)) books[1].shown = true;
    return books;
  };
  dgl.origin = books => books.find(book => book.origin), // origin always active
  dgl.shown = books => books.filter(book => book.active).find(book => book.shown), dgl.trns = books => books.filter(book => book.active && !book.origin);
  router(initState);
  setSearchIcon();
  render('message', '#message');
})();

document.addEventListener("click", ev => {
  const omessage = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.q)('#message-text');
  let version = omessage.classList.contains('version');

  if (version) {
    omessage.classList.remove('version');
    electron__WEBPACK_IMPORTED_MODULE_4__.shell.openExternal(_config__WEBPACK_IMPORTED_MODULE_9__.config.version);
  }

  _lib_message__WEBPACK_IMPORTED_MODULE_7__.message.hide();
  if (ev.target.nodeName == 'BUTTON') return;
  if (ev.target.nodeName == 'A') return;
  let ohref = ev.target.closest('.external');
  if (!ohref) return;
  ev.preventDefault();
  let href = ohref.textContent;
  if (!href) return;
  electron__WEBPACK_IMPORTED_MODULE_4__.shell.openExternal(href);
});
document.addEventListener("click", ev => {
  if (ev.ctrlKey) return;
  if (dgl.editMode) return;
  let owf = ev.target.closest('span.wf');
  if (!owf) return;
  ev.preventDefault();
  let href = owf.textContent;
  if (!href) return;
  href = 'http://diglossa.org/' + href;
  electron__WEBPACK_IMPORTED_MODULE_4__.shell.openExternal(href);
}); // scroll page

document.addEventListener("wheel", function (ev) {
  if (ev.shiftKey) return;
  const opage = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.q)('.page'); // || q('.section') // todo: del

  if (!opage) return;
  let delta = ev.deltaY > 0 ? 24 : -24;
  opage.scrollTop += delta;
  const osrc = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.q)('#src');
  if (!osrc) return;
  let hidden = osrc.classList.contains('hidden');
  if (hidden) osrc = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.q)('#trn');
  let scrolltop = opage.scrollTop;
  let height = osrc.clientHeight;
  let ohr = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.q)('.show-page-position');
  if (!ohr) return;
  ohr.style.width = scrolltop / height * 100 + '%';
  if (dgl.route == 'book') ohr.style.width = 0;
});
mouse.bind('esc', function (ev) {
  electron__WEBPACK_IMPORTED_MODULE_4__.ipcRenderer.send('hide-popup-window'); // exitEditMode()

  closeAll();
});
mouse.bind('ctrl+v', function (ev) {
  let state = {
    route: 'newtext'
  };
  router(state);
});
mouse.bind('ctrl+d', function (ev) {
  router({
    route: 'dictionary'
  });
});
electron__WEBPACK_IMPORTED_MODULE_4__.ipcRenderer.on('route', function (event, route) {
  router({
    route
  });
});
electron__WEBPACK_IMPORTED_MODULE_4__.ipcRenderer.on('section', function (event, route) {
  let lang = appstore.get('lang') || _config__WEBPACK_IMPORTED_MODULE_9__.config.deflang;
  (0,_lib_load_templates__WEBPACK_IMPORTED_MODULE_8__.loadSection)(lang, route);
});
electron__WEBPACK_IMPORTED_MODULE_4__.ipcRenderer.on('lang', function (event, lang) {
  appstore.set('lang', lang);
  electron__WEBPACK_IMPORTED_MODULE_4__.ipcRenderer.send('lang', lang);
});
electron__WEBPACK_IMPORTED_MODULE_4__.ipcRenderer.on('version', async function (event, oldver) {
  fetch(_config__WEBPACK_IMPORTED_MODULE_9__.config.version).then(res => {
    let redirected = res.url;

    let newver = lodash__WEBPACK_IMPORTED_MODULE_3___default().last(redirected.split('/'));

    if (!newver) return;
    newver = newver.replace(/v/g, '');

    if (oldver && newver && newver > oldver) {
      let versionTxt = ['new version available:', newver].join(' ');
      _lib_message__WEBPACK_IMPORTED_MODULE_7__.message.show(versionTxt, 'darkgreen', true);
      const omessage = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.q)('#message-text');
      omessage.classList.add('version'); // let omessage = omess.querySelector('#message-text')
      // progress.hide()
      // omess.classList.remove('hidden')
      // omessage.classList.remove('darkred')
      // omessage.textContent = versionTxt
    }
  }).catch(err => {
    console.log('FETCH VERSION ERR', err);
  });
}); // todo: del ================== DEL

mouse.bind('ctrl+l', function (ev) {
  ev.preventDefault();
  const state = {
    route: 'library'
  };
  router(state);
});

function hideSearchIcon() {
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.q)('#search-icon').classList.add('hidden');
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.q)('#search-input').classList.add('hidden');
}

function setSearchIcon() {
  let oicon = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.q)('#search-icon');
  oicon.innerHTML = templates.searchicon;
  let oinput = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.q)('#search-input');
  oinput.innerHTML = templates.searchinput;
}

const handleError = (title, error) => {
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.log)('_HANDLE ERR title', title);
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_5__.log)('_HANDLE ERR', error);
};

if (process.type === 'renderer') {
  const errorHandler = lodash__WEBPACK_IMPORTED_MODULE_3___default().debounce(error => {
    handleError('Unhandled Error', error);
  }, 200);

  window.addEventListener('error', event => {
    event.preventDefault();
    errorHandler(event.error || event);
  });

  const rejectionHandler = lodash__WEBPACK_IMPORTED_MODULE_3___default().debounce(reason => {
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

/***/ }),

/***/ "./src/autosync.js":
/*!*************************!*\
  !*** ./src/autosync.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFirstBlock": () => (/* binding */ getFirstBlock)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _lib_stemmer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/stemmer */ "./src/lib/stemmer.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./page */ "./src/page.js");
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./book */ "./src/book.js");






const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");




const fse = __webpack_require__(/*! fs-extra */ "fs-extra");



const Store = __webpack_require__(/*! electron-store */ "electron-store");

const natural = __webpack_require__(/*! natural */ "natural");

const tokenizer = new natural.WordTokenizer();

const sw = __webpack_require__(/*! stopword */ "stopword");

const langs = __webpack_require__(/*! langs */ "langs");


let dgl = electron__WEBPACK_IMPORTED_MODULE_6__.remote.getGlobal('dgl');

 // let stemdictpath = '/home/michael/b/synchro.js/dicts/dict-stems-eng-rus.json'
// let stemdicts = fse.readJsonSync(stemdictpath)

mouse.bind('ctrl+y', function (ev) {
  if (!dgl.editMode) return;
  if (_book__WEBPACK_IMPORTED_MODULE_8__.book.sbooks.length < 2) return;
  let start = 0;
  let oed = getFirstBlock();
  if (!oed) return;
  start = oed.getAttribute('blockid') * 1;
  setLamps(start);
  autoSync(start);
});

async function autoSync(blockid) {
  let synced = true;

  while (synced) {
    synced = await nextLamp(blockid);
    blockid++;
  }
}

function nextLamp(blockid) {
  let osrc = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)(['#src .block[blockid="', blockid, '"]'].join(''));
  let otrn = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)(['#trn .block[blockid="', blockid, '"]'].join(''));
  if (!osrc || !otrn) return false;
  otrn.classList.remove('em-red-circle');
  return sleep(1000).then(async () => {
    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.scrollToPosition)(osrc.offsetTop - 100); // let synced = await syncParagraphByStem(osrc, otrn)

    let synced = await checkBlock(osrc, otrn);
    if (synced) otrn.classList.add('em-green-circle');else otrn.classList.add('em-red-circle');
    return synced;
  });
}

async function checkBlock(osrc, otrn) {
  let oparsrc = osrc.querySelector('p.ptext:not(.hidden)');
  let srclang = oparsrc.getAttribute('lang');
  let src = oparsrc.textContent;
  let opartrn = otrn.querySelector('p.ptext:not(.hidden)');
  let trnlang = opartrn.getAttribute('lang');
  let trn = opartrn.textContent; // log XXX

  let oblock = otrn.closest('.block');
  let blockid = oblock.getAttribute('blockid');
  let srcwfs = wordforms(src, srclang);
  let destwfs = wordforms(trn, trnlang);
  let limit = 10;
  let sizes = [srcwfs.length, destwfs.length];

  let wfmax = lodash__WEBPACK_IMPORTED_MODULE_0___default().max(sizes);

  let wfmin = lodash__WEBPACK_IMPORTED_MODULE_0___default().min(sizes);

  if (wfmax < limit) return true;
  if (wfmax / wfmin > 2) return false;else return true;
}

async function syncParagraphByStem_(osrc, otrn) {
  let oparsrc = osrc.querySelector('p.ptext:not(.hidden)');
  let srclang = oparsrc.getAttribute('lang');
  let src = oparsrc.textContent;
  let opartrn = otrn.querySelector('p.ptext:not(.hidden)');
  let trnlang = opartrn.getAttribute('lang');
  let trn = opartrn.textContent;
  let srcwfs = wordforms(src, srclang);
  let destwfs = wordforms(trn, trnlang);
  let limit = 10;
  if (Math.abs(srcwfs.length - destwfs.length) / srcwfs.length > 0.5) return false;else if (srcwfs.length < limit && destwfs.length < limit) return true;
  let stemmer_src = (0,_lib_stemmer__WEBPACK_IMPORTED_MODULE_5__.porter)(srclang);
  let stemmer_dest = (0,_lib_stemmer__WEBPACK_IMPORTED_MODULE_5__.porter)(trnlang);
  let srcstems = srcwfs.map(wf => stemmer_src ? stemmer_src(wf) : wf);
  let expects = await getStems(stemdicts, srcstems);
  let deststems = destwfs.map(wf => stemmer_dest ? stemmer_dest(wf) : wf);

  let intersect = lodash__WEBPACK_IMPORTED_MODULE_0___default().intersection(expects, deststems);

  return intersect.length ? true : false;
}

function getStems(sdicts, ids) {
  return Promise.all(ids.map(function (id) {
    return sdicts.find(sdict => sdict.id == id);
  })).then(dicts => {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default().flatten(lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(dicts).map(dict => dict.stems));
  });
}

function wordforms(str, lang) {
  let lang2 = '';
  lang2 = langs.where('3', lang);
  if (!lang2) return [];
  lang2 = lang2[1];
  let srcwfs = tokenizer.tokenize(str);
  srcwfs = sw.removeStopwords(srcwfs, sw[lang2]);
  return lodash__WEBPACK_IMPORTED_MODULE_0___default().uniq(srcwfs);
}

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
};

function getFirstBlock() {
  const oblock = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.block:hover'); // const oblock = q('.editable')

  if (!oblock) _lib_message__WEBPACK_IMPORTED_MODULE_3__.message.show('select paragraph to start', 'darkred');
  return oblock;
}

function setLamps(startidx) {
  let blocks = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.qs)('#trn .block');
  let idx = 0;

  for (let block of blocks) {
    if (idx < startidx) block.classList.add('em-green-circle'), block.classList.remove('em-red-circle'); // else if (idx == startidx) block.classList.remove('em-green-circle'), block.classList.add('em-red-circle')
    else block.classList.remove('em-green-circle'), block.classList.remove('em-red-circle');
    idx++;
  }
}

mouse.bind('space', function (ev) {
  let ored = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.em-red-circle');
  if (!ored) return;
  let otrnpar = ored.closest('.block');
  let blockid = otrnpar.getAttribute('blockid');
  let next = blockid * 1 + 1;
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.log)('_blockid', blockid);
  setLamps(next);
  autoSync(next);
});

/***/ }),

/***/ "./src/book.js":
/*!*********************!*\
  !*** ./src/book.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "book": () => (/* binding */ book),
/* harmony export */   "getCSyncs": () => (/* binding */ getCSyncs),
/* harmony export */   "syncCnt": () => (/* binding */ syncCnt)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _lib_progress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/progress */ "./src/lib/progress.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page */ "./src/page.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _semaphore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./semaphore */ "./src/semaphore.js");
/* harmony import */ var _lib_tree__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/tree */ "./src/lib/tree.js");













const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const bkstore = new Store({
  name: 'libks'
});
const csyncstore = new Store({
  name: 'csyncs'
});
let dgl = electron__WEBPACK_IMPORTED_MODULE_2__.remote.getGlobal('dgl');
const book = {
  async ready(state) {
    _lib_progress__WEBPACK_IMPORTED_MODULE_4__.progress.show();
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.render)('book');
    delete dgl.idx;
    let books;

    if (state && state.bid) {
      books = bkstore.get(state.bid);
      books = dgl.actives(books);
    } else {
      throw new Error('_BOOK NO STATE');
    }

    let csyncs = getCSyncs(state.bid);
    this.srcbooks = books;
    this.sbooks = this.syncCnts(this.srcbooks, csyncs);
    this.drawCont();
    showSearchIcon();
    _header__WEBPACK_IMPORTED_MODULE_7__.header.ready();
    _lib_progress__WEBPACK_IMPORTED_MODULE_4__.progress.hide();
  },

  origin() {
    return this.sbooks.find(book => book.origin);
  },

  shown() {
    return this.sbooks.find(book => book.shown);
  },

  syncCnts(sbooks, csyncs) {
    sbooks = lodash__WEBPACK_IMPORTED_MODULE_1___default().cloneDeep(sbooks);
    sbooks.forEach(sbook => {
      let bsyncs = csyncs.filter(csync => csync.bid == sbook.bid);
      bsyncs.forEach(csync => {
        sbook.cnts = syncCnt(sbook.cnts, csync);
      });
    });
    return sbooks;
  },

  reSync(sync) {
    let sbook = this.sbooks.find(book => book.bid == sync.bid);
    sbook.cnts = syncCnt(sbook.cnts, sync);
    let origin = book.sbooks.find(sbook => sbook.origin);
    let csyncs = getCSyncs(origin.bid);
    csyncs.push(sync);
    csyncstore.set(dgl.bid, csyncs);
    let csyncs2 = getCSyncs(sbook.bid);
    _semaphore__WEBPACK_IMPORTED_MODULE_8__.semaphore.ready();
    this.drawCont();
  },

  undo() {
    let csyncs = getCSyncs(dgl.bid);
    csyncs = csyncs.slice(0, -1);
    this.sbooks = this.syncCnts(this.srcbooks, csyncs);
    csyncstore.set(dgl.bid, csyncs);
    _semaphore__WEBPACK_IMPORTED_MODULE_8__.semaphore.ready();
    this.drawCont();
  },

  drawCont() {
    let books = this.sbooks;
    let {
      osrc,
      otrn
    } = setPanes(books);
    const src = dgl.origin(books);

    let roots = lodash__WEBPACK_IMPORTED_MODULE_1___default().filter(src.cnts, doc => doc.level == 1);

    let oroots = (0,_lib_tree__WEBPACK_IMPORTED_MODULE_9__.createTree)(src.cnts, roots, [src]);
    oroots.forEach(oroot => osrc.appendChild(oroot));
    const trn = dgl.shown(books);
    if (!trn) return;

    let trnroots = lodash__WEBPACK_IMPORTED_MODULE_1___default().filter(trn.cnts, doc => doc.level == 1);

    const trns = dgl.trns(books);
    oroots = (0,_lib_tree__WEBPACK_IMPORTED_MODULE_9__.createTree)(trn.cnts, trnroots, trns);
    oroots.forEach(oroot => otrn.appendChild(oroot));
  }

};
function getCSyncs(bid) {
  let csyncs = csyncstore.get(bid);
  if (lodash__WEBPACK_IMPORTED_MODULE_1___default().isEmpty(csyncs)) csyncs = [];
  return csyncs;
}

function setPanes(books) {
  let {
    osrc,
    otrn
  } = getPanes();
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.empty)(osrc);
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.empty)(otrn);
  let opage = document.querySelector('.page');

  if (books.length == 1) {
    opage.classList.remove('grid-cols-2');
    otrn.classList.add('hidden');
  } else if (book.layout) {
    opage.classList.remove('grid-cols-2');

    if (book.layout == 'src') {
      osrc.classList.remove('hidden');
      otrn.classList.add('hidden');
    } else if (book.layout == 'trn') {
      osrc.classList.add('hidden');
      otrn.classList.remove('hidden');
    }
  } else {
    opage.classList.add('grid-cols-2');
    osrc.classList.remove('hidden');
    otrn.classList.remove('hidden');
  }

  return {
    osrc,
    otrn
  };
}

function getPanes() {
  let osrc = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('#src');
  let otrn = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('#trn');
  return {
    osrc,
    otrn
  };
} // todo: export - del


function syncCnt(cnts, sync) {
  let cnt = cnts.find(cnt => cnt.path == sync.path);
  if (!cnt) return cnts;
  let fakecnt, mess, next, prev;

  switch (sync.action) {
    case 'delete':
      cnts = cnts.filter(cnt => cnt.path != sync.path);
      break;

    case 'right':
      cnt.level += 1;
      break;

    case 'mergeNext':
      next = cnts[cnt.idx + 1];
      if (!next) return cnts;
      let md = [cnt.md, '.'].join('').replace('..', '.');
      cnt.md = [md, next.md].join(' ');
      cnt.size = cnt.size + next.size;
      cnts = cnts.filter(cnt => cnt.path != next.path);
      break;

    case 'insertAfter':
      fakecnt = lodash__WEBPACK_IMPORTED_MODULE_1___default().clone(cnt);
      fakecnt.md = 'x';
      fakecnt.size = 1;
      cnts.splice(cnt.idx + 1, 0, fakecnt);
      break;

    case 'insertBefore':
      fakecnt = lodash__WEBPACK_IMPORTED_MODULE_1___default().clone(cnt);
      fakecnt.md = 'x';
      fakecnt.size = 1;
      cnts.splice(cnt.idx, 0, fakecnt);
      break;

    case 'empty':
      cnt.size = 1;
      mess = ['s_ection', cnt.md, 'emptied'].join(' ');
      _lib_message__WEBPACK_IMPORTED_MODULE_5__.message.show(mess, 'darkgreen');
      break;

    case 'copy':
      fakecnt = lodash__WEBPACK_IMPORTED_MODULE_1___default().clone(cnt);
      fakecnt.md = 'x - copied s_ection';
      cnts.splice(cnt.idx + 1, 0, fakecnt);
      break;

    case 'action':
      break;

    case 'action':
      break;

    default:
  }

  cnts.forEach((cnt, idx) => cnt.idx = idx);
  return cnts;
} // router jump to page

document.addEventListener("click", ev => {
  if (dgl.route != 'book') return;
  if (dgl.editMode) return;
  let opar = ev.target.closest('p.tree-text');
  if (!opar) return;
  const idx = opar.getAttribute('idx') * 1;
  const state = {
    route: 'page',
    bid: dgl.bid,
    idx
  };
  (0,_app__WEBPACK_IMPORTED_MODULE_0__.router)(state); // to-page
}); // switch shown lang

document.addEventListener("wheel", function (ev) {
  if (!ev.shiftKey) return;
  if (dgl.route != 'book') return;
  let oblock = ev.target.closest('.block');
  if (!oblock) return;
  (0,_header__WEBPACK_IMPORTED_MODULE_7__.rotateBlock)(oblock);
  oblock = ev.target.closest('.header-cell.right .block'); // header block

  if (!oblock) return;
  let par = oblock.querySelector('p.headline:not(.hidden)');
  let bid = par.getAttribute('bid');

  for (let sbook of book.sbooks) {
    if (sbook.origin) continue;
    sbook.shown = false;
    if (sbook.bid == bid) sbook.shown = true;
  }

  book.drawCont();
});
mouse.bind('1', function (ev) {
  if (!book || book.sbooks.length <= 1) return;
  let opage = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('.page');
  if (!opage) return;
  let cols = opage.classList.contains('grid-cols-2'); // both panes shown

  if (cols) book.layout = 'src';else book.layout = false;
  if (dgl.route == 'book') book.drawCont();else if (dgl.route == 'page') _page__WEBPACK_IMPORTED_MODULE_6__.page.drawPage();
});
mouse.bind('2', function (ev) {
  if (!book || book.sbooks.length <= 1) return;
  let opage = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('.page');
  if (!opage) return;
  let cols = opage.classList.contains('grid-cols-2');
  if (cols) book.layout = 'trn';else book.layout = false;
  if (dgl.route == 'book') book.drawCont();else if (dgl.route == 'page') _page__WEBPACK_IMPORTED_MODULE_6__.page.drawPage();
});
mouse.bind('3', function (ev) {// todo: change page panes
  // _как 3 отразится на fts, exports, etc?_'
});

function showSearchIcon() {
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('#search-icon').classList.remove('hidden');
} // todo: del


mouse.bind('ctrl+i', function (ev) {
  console.clear();
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.log)('_B:', book.sbooks);
});

/***/ }),

/***/ "./src/bookmarks.js":
/*!**************************!*\
  !*** ./src/bookmarks.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bookmarks": () => (/* binding */ bookmarks)
/* harmony export */ });
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./book */ "./src/book.js");







const Store = __webpack_require__(/*! electron-store */ "electron-store");

const bmkstore = new Store({
  name: 'bookmarks'
});

const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");




let dgl = electron__WEBPACK_IMPORTED_MODULE_1__.remote.getGlobal('dgl');
const bookmarks = {
  async ready(state) {
    (0,_app__WEBPACK_IMPORTED_MODULE_3__.render)('bmks');
    if (state && state.bmk) this.newBmk(state.bmk);
    this.showBmks();
  },

  newBmk(bmk) {
    this.bmk = bmk;
    let orow = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#add-bmk .list-line');
    parseBmk(orow, bmk);
  },

  deleteBmk(key) {
    bmkstore.delete(key);
    this.ready();
  },

  saveBmk() {
    let key = [this.bmk.idx, this.bmk.blockid].join('-');
    key = [this.bmk.bid, key].join('.');
    bmkstore.set(key, this.bmk);
    delete this.bmk;
    this.ready();
  },

  showBmks() {
    let bmks = bmkstore.store;
    let obmks = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#bmks-list');
    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.empty)(obmks);

    for (const bid in bmks) {
      let bidbmks = bmks[bid];

      for (const key in bidbmks) {
        let bmk = bidbmks[key];
        let tmpl = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.tmpl');
        let orow = tmpl.cloneNode(true);
        orow = parseBmk(orow, bmk);
        obmks.appendChild(orow);
      }
    }
  }

};

function parseBmk(orow, bmk) {
  orow.classList.remove('tmpl');
  orow.classList.remove('hidden');
  orow.setAttribute('bid', bmk.bid);
  orow.setAttribute('idx', bmk.idx);
  orow.setAttribute('blockid', bmk.blockid);
  let ohead = orow.querySelector('.line-head');
  let oauthor = ohead.querySelector('.line-author');
  oauthor.textContent = bmk.descr.author;
  let otitle = ohead.querySelector('.line-title');
  otitle.textContent = bmk.descr.title;
  let osname = ohead.querySelector('.line-sname');
  osname.textContent = bmk.descr.sname;
  ohead.classList.add('truncate');
  let shown = true;
  let oblock = orow.querySelector('.block');
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.empty)(oblock);

  for (const doc of bmk.docs) {
    let opar = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.create)('p', 'ptext');
    opar.setAttribute('lang', doc.lang);
    opar.textContent = doc.md;
    if (shown) shown = false;else opar.classList.add('hidden');
    oblock.appendChild(opar);
  }

  return orow;
} // jump


document.addEventListener('click', ev => {
  if (dgl.route != 'bookmarks') return;
  const olistline = ev.target.closest('.list-line');
  if (!olistline) return;
  const bid = olistline.getAttribute('bid');
  const idx = olistline.getAttribute('idx');
  const blockid = olistline.getAttribute('blockid');

  if (ev.target.id == 'add-bmk-button') {
    bookmarks.saveBmk();
  } else if (ev.target.classList.contains('line-delete')) {
    const key = [bid, idx, blockid].join('.');
    bookmarks.deleteBmk(key);
  }

  const orow = ev.target.closest('.line-block');

  if (orow) {
    if (ev.target.classList.contains('ptext')) {
      let oblock = orow.querySelector('.block');
      oblock.classList.toggle('truncate');
    } else {
      const state = {
        route: 'page',
        bid,
        idx,
        blockid,
        jump: true
      };
      (0,_app__WEBPACK_IMPORTED_MODULE_3__.router)(state);
    }
  }
});
document.addEventListener("wheel", function (ev) {
  if (!ev.shiftKey) return;
  if (dgl.route != 'bookmarks') return;
  let oblock = ev.target.closest('.block');
  if (!oblock) return;
  let next = (0,_header__WEBPACK_IMPORTED_MODULE_4__.rotateBlock)(oblock);
}, false); // jump bookmarks

mouse.bind('ctrl+b', function (ev) {
  const state = {
    route: 'bookmarks'
  };
  const opar = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('p.ptext:hover');

  if (opar && dgl.idx) {
    const oblock = opar.closest('.block');
    const blockid = oblock.getAttribute('blockid');

    const origin = lodash__WEBPACK_IMPORTED_MODULE_2___default().find(_book__WEBPACK_IMPORTED_MODULE_5__.book.sbooks, book => book.origin);

    const descr = {
      title: origin.descr.title,
      author: origin.descr.author
    };
    descr.sname = origin.cnts[dgl.idx].md;
    let selector = ['.block[blockid="', blockid, '"] .ptext'].join('');
    let pars = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.qs)(selector);

    const docs = lodash__WEBPACK_IMPORTED_MODULE_2___default().map(pars, opar => {
      return {
        md: opar.textContent,
        lang: opar.getAttribute('lang')
      };
    });

    const bmk = {
      bid: dgl.bid,
      idx: dgl.idx,
      blockid,
      descr,
      docs
    };
    state.bmk = bmk;
  }

  (0,_app__WEBPACK_IMPORTED_MODULE_3__.router)(state);
});

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
//
const config = {
  host: 'http://diglossa.org',
  port: '5984',
  version: 'https://github.com/mbykov/diglossa.js/releases/latest',
  defstate: 'library',
  batch_size: 1000,
  pageSize: 25,
  splitSizes: [100, 0],
  langs: ['eng', 'deu', 'rus'],
  ldname: 'local',
  deflang: 'eng',
  extpath: './diglossa.export.fts'
};

/***/ }),

/***/ "./src/dicts.js":
/*!**********************!*\
  !*** ./src/dicts.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dictionary": () => (/* binding */ dictionary)
/* harmony export */ });
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _lib_pouch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/pouch */ "./src/lib/pouch.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");
/* harmony import */ var _lib_progress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/progress */ "./src/lib/progress.js");
/* harmony import */ var _lib_stemmer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/stemmer */ "./src/lib/stemmer.js");







const Store = __webpack_require__(/*! electron-store */ "electron-store");

const dictstore = new Store({
  name: 'dicts'
});
 // siblings
// const langs = require('langs')
// const stopword = require('stopword')

const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");




const dictionary = {
  async ready(state) {
    (0,_app__WEBPACK_IMPORTED_MODULE_3__.render)('dicts');
    this.dstore = dictstore.store;
    this.dicts = lodash__WEBPACK_IMPORTED_MODULE_2___default().values(dictstore.store);
    this.parseDictionary();
    _lib_progress__WEBPACK_IMPORTED_MODULE_6__.progress.hide();
  },

  parseDictionary() {
    const tbody = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#dict-table .tbody');
    let dicts = this.dicts;

    for (let ditem of dicts) {
      let dname = ditem.dname;

      let dict = lodash__WEBPACK_IMPORTED_MODULE_2___default().find(dicts, dict => dict.dname == dname);

      const tmpl = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.table-line.tmpl');
      const orow = tmpl.cloneNode(true);
      orow.classList.remove('tmpl');
      orow.setAttribute('dname', dname);
      let oname = orow.querySelector('.td-name');
      oname.textContent = dict.name;
      let otype = orow.querySelector('.td-type');
      otype.textContent = dict.type;
      let olang = orow.querySelector('.td-lang');
      olang.textContent = dict.lang;
      let osize = orow.querySelector('.td-size');
      osize.textContent = dict.size;
      tbody.appendChild(orow);
    }
  },

  async queryDict(wf, stem, dstore) {
    let rdicts = await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_4__.queryDB)(stem, dstore);
    firePopup(wf, rdicts);
  },

  //  τῆς δὲ ἀρχὴ τὰ
  async queryDictComplex(wf, qstems, dstore) {
    let {
      dictdocs,
      flsdocs,
      termdocs
    } = await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_4__.queryDBcomplex)(qstems, dstore);
    qstems = qstems.filter(qstem => !qstem.indecl);
    let synths = plugin.synthesize(qstems, dictdocs, flsdocs);
    synths.push(...termdocs);
    let dictkeys = {};
    synths.forEach(qdoc => {
      if (!dictkeys[qdoc.dname]) dictkeys[qdoc.dname] = [qdoc];else dictkeys[qdoc.dname].push(qdoc);
    });
    let rdicts = [];

    for (let dname in dictkeys) {
      let rdict = {
        wf,
        dname,
        dicts: dictkeys[dname]
      };
      rdicts.push(rdict);
    }

    if (rdicts.length) electron__WEBPACK_IMPORTED_MODULE_1__.ipcRenderer.send('show-popup-window', rdicts);else electron__WEBPACK_IMPORTED_MODULE_1__.ipcRenderer.send('hide-popup-window');
  }

};

function firePopup(wf, docs) {
  let dictkeys = {};
  docs.forEach(qdoc => {
    if (!dictkeys[qdoc.dname]) dictkeys[qdoc.dname] = [qdoc];else dictkeys[qdoc.dname].push(qdoc);
  });
  let rdicts = [];

  for (let dname in dictkeys) {
    let rdict = {
      wf,
      dname,
      dicts: dictkeys[dname]
    };
    rdicts.push(rdict);
  }

  if (rdicts.length) electron__WEBPACK_IMPORTED_MODULE_1__.ipcRenderer.send('show-popup-window', rdicts);else electron__WEBPACK_IMPORTED_MODULE_1__.ipcRenderer.send('hide-popup-window');
}

document.addEventListener("mouseover", function (ev) {
  if (!ev.altKey || !(0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.page')) return;
  let target = ev.target;
  if (target.nodeName != 'SPAN') return;
  let parent = target.closest('p.ptext');
  if (!parent) return;
  let lang = parent.getAttribute('lang');
  let wf = target.textContent;

  let dicts = lodash__WEBPACK_IMPORTED_MODULE_2___default().values(dictstore.store);

  if (!ev.shiftKey) dicts = lodash__WEBPACK_IMPORTED_MODULE_2___default().filter(dicts, dict => dict.lang == lang);

  if (!dicts.length) {
    let mess = ['dictionaries for the', lang, 'language are not installed'].join(' ');
    _lib_message__WEBPACK_IMPORTED_MODULE_5__.message.show(mess, 'darkgreen');
    return;
  }

  const stemmer = (0,_lib_stemmer__WEBPACK_IMPORTED_MODULE_7__.porter)(lang);
  const stem = stemmer ? stemmer(wf) : wf; // let siblings = getSiblings(target, lang)
  // todo: plugin

  dictionary.queryDict(wf, stem, dicts);

  if (lang == 'grc') {// const qstems = stemmerGrc(wf)
    // dictionary.queryDictComplex(wf, qstems, dicts)
  }
}); // todo: langs и stopword заменить на natural

function getSiblings(el, lang) {
  let lang2 = langs.where('3', lang);
  if (lang2) lang2 = lang2[1];
  const wfs = [];
  let prev, pprev, next, nnext;
  prev = el.previousElementSibling;
  if (prev) wfs.push(prev.textContent), pprev = prev.previousElementSibling;
  if (pprev) wfs.push(pprev.textContent);
  next = el.nextElementSibling;
  if (next) wfs.push(next.textContent), nnext = next.nextElementSibling;
  if (nnext) wfs.push(nnext.textContent);
  let siblings = stopword.removeStopwords(wfs, stopword[lang2]);
  siblings = siblings.map(wf => {
    return wf.toLowerCase();
  });
  return siblings;
}

document.addEventListener('click', ev => {
  const otable = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#dict-table');
  if (!otable) return;
  let odel = ev.target.closest('.td-delete');
  let oparent = ev.target.closest('.table-line');
  if (!oparent) return;
  let dname = oparent.getAttribute('dname');
  if (!dname) return;
  _lib_progress__WEBPACK_IMPORTED_MODULE_6__.progress.show();
  let direction = ev.ctrlKey && ev.altKey ? 'down' : ev.ctrlKey ? 'up' : null;
  if (odel) deleteDict(dname);else if (direction) moveRow(dname, direction);else toggleActive(dname);
});

async function deleteDict(dname) {
  const dicts = dictionary.dicts;
  if (!dicts.length) return;

  let current = lodash__WEBPACK_IMPORTED_MODULE_2___default().find(dicts, dict => dict.dname == dname);

  const others = lodash__WEBPACK_IMPORTED_MODULE_2___default().filter(dicts, dict => dict.dname != dname);

  await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_4__.deleteDB)(dname);
  others.forEach((dict, idx) => dict.idx = idx);
  dictionary.dicts = others;
  setDstore(others);
  let mess = ['dict', current.name, 'removed'].join(' ');
  _lib_message__WEBPACK_IMPORTED_MODULE_5__.message.show(mess, 'darkgreen');
}

function moveRow(dname, direction) {
  const dicts = dictionary.dicts;

  let current = lodash__WEBPACK_IMPORTED_MODULE_2___default().find(dicts, dict => dict.dname == dname);

  if (!current) return;
  let idx = current.idx;
  let step = direction == 'up' ? -1 : 1;

  let sibling = lodash__WEBPACK_IMPORTED_MODULE_2___default().find(dicts, dict => dict.idx == current.idx + step);

  if (sibling) current.idx = sibling.idx, sibling.idx = idx;
  setDstore(dicts);
}

function toggleActive(dname) {
  const dicts = dictionary.dicts;
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.log)('_A', dname);
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.log)('_Adicts', dicts);

  let current = lodash__WEBPACK_IMPORTED_MODULE_2___default().find(dicts, dict => dict.dname == dname);

  if (!current) return;
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.log)('_C', current);
  current.active = current.active ? false : true;
  setDstore(dicts);
}

function setDstore(dicts) {
  dicts = lodash__WEBPACK_IMPORTED_MODULE_2___default().sortBy(dicts, 'idx');
  dicts.forEach((dict, idx) => dict.idx = idx);
  dictionary.dicts = dicts;
  const dstore = {};
  dicts.forEach(dict => dstore[dict.dname] = dict);
  dictstore.clear();
  dictstore.set(dstore);
  dictionary.ready({
    dicts: dicts
  });
}

/***/ }),

/***/ "./src/exportBook.js":
/*!***************************!*\
  !*** ./src/exportBook.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getExportBook": () => (/* binding */ getExportBook),
/* harmony export */   "getSyncedDocs": () => (/* binding */ getSyncedDocs)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _lib_pouch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/pouch */ "./src/lib/pouch.js");
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./book */ "./src/book.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page */ "./src/page.js");
/* harmony import */ var _prefs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./prefs */ "./src/prefs.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var dgl_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! dgl-utils */ "dgl-utils");
/* harmony import */ var dgl_utils__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(dgl_utils__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _lib_progress__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/progress */ "./src/lib/progress.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");





const {
  app
} = __webpack_require__(/*! electron */ "electron").remote;

let apath = app.getAppPath();








const isZip = __webpack_require__(/*! is-zip */ "is-zip"); // const JSZip = require("jszip");
// import { compressDGL, uncompressDGL } from '../../b/dgl-utils'




const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const path = __webpack_require__(/*! path */ "path");

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const bkstore = new Store({
  name: 'libks'
});
const ftstore = new Store({
  name: 'fts'
});
const prefstore = new Store({
  name: 'prefs'
});
const syncstore = new Store({
  name: 'syncs'
});
const appstore = new Store({
  name: 'appstore'
});



let dgl = electron__WEBPACK_IMPORTED_MODULE_1__.remote.getGlobal('dgl');
const getExportBook = {}; // create book-DGL:

async function createDglPackage(prefs) {
  let exportpath = appstore.get('exportpath');
  fse.ensureDirSync(exportpath);
  let packname = prefs.name;
  let dirpath = path.resolve(exportpath, packname);
  fse.ensureDirSync(dirpath);
  let dgls = [];
  let origin = dgl.origin(_book__WEBPACK_IMPORTED_MODULE_5__.book.sbooks);
  let syncs = (0,_page__WEBPACK_IMPORTED_MODULE_6__.getSyncs)(origin.bid);

  for await (let sbook of _book__WEBPACK_IMPORTED_MODULE_5__.book.sbooks) {
    let bsyncs = syncs.filter(sync => sync.bid == sbook.bid);
    let sdocs = await getSyncedDocs(sbook, bsyncs);
    let mds = docs2md(sdocs);
    let mdstr = mds.join('\n\n');
    let bidname = [sbook.descr.author.slice(0, 25).replace(/ /g, ''), sbook.descr.title.slice(0, 25).replace(/ /g, '-')].join('-');
    let mdname = [bidname, sbook.lang, 'md'].join('.');
    let mdpath = path.resolve(dirpath, mdname);
    await fse.writeFileSync(mdpath, mdstr);
    let dgldescr = {
      lang: sbook.lang,
      author: sbook.descr.author,
      title: sbook.descr.title,
      type: 'md'
    };
    dgldescr.src = [packname, mdname].join(path.sep);
    if (sbook.origin) dgldescr.origin = true;
    dgls.push(dgldescr);
  }

  let dglpack = lodash__WEBPACK_IMPORTED_MODULE_0___default().cloneDeep(prefs);

  dglpack.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  dglpack.texts = dgls;
  let jsonname = [packname, 'json'].join('.');
  let jsonpath = path.resolve(exportpath, jsonname);

  try {
    fse.writeJsonSync(jsonpath, dglpack, {
      spaces: 2
    });
  } catch (err) {
    let mess = ['could not export', origin.descr.title].join(' ');
    _lib_message__WEBPACK_IMPORTED_MODULE_11__.message.show(mess, 'darkred');
  }

  let mess = [prefs.name, 'created', exportpath].join(' ');
  _lib_message__WEBPACK_IMPORTED_MODULE_11__.message.show(mess, 'darkgreen');
}

async function getSyncedDocs(book, syncs) {
  let cnts = book.cnts;
  let sdocs = [];

  for await (let cnt of cnts) {
    let query = {
      bid: book.bid,
      path: cnt.path,
      size: cnt.size
    };
    let chdocs = await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_4__.fetchChapter)(query);
    let chsyncs = syncs.filter(sync => sync.idx === cnt.idx);
    let syncdocs = _page__WEBPACK_IMPORTED_MODULE_6__.page.syncChapter(chsyncs, chdocs);
    sdocs.push(...syncdocs);
  }

  const fillsize = sdocs.length.toString().length;
  let doc;
  sdocs = sdocs.map(sdoc => {
    doc = {
      path: sdoc.path,
      _id: sdoc._id,
      idx: sdoc.idx,
      md: sdoc.md
    };
    if (sdoc.level) doc.level = sdoc.level;
    if (sdoc.type) doc.type = sdoc.type;
    if (sdoc.size) doc.size = sdoc.size;
    return doc;
  });
  return sdocs;
}

function docs2md(docs) {
  return docs.map(doc => {
    let md = '';
    if (doc.level) md = '#'.repeat(doc.level) + ' ';else if (doc.type == 'list') md = '-';
    md += doc.md;
    return md;
  });
}

async function compressPackage(prefs) {
  let exportpath = appstore.get('exportpath');
  let textsdir = path.resolve(exportpath, prefs.name);
  let jsonpath = [textsdir, 'json'].join('.');
  let dglpath = [textsdir, 'dgl'].join('.');
  let zip = await (0,dgl_utils__WEBPACK_IMPORTED_MODULE_9__.compressDGL)(jsonpath);
  if (zip.err) return _lib_message__WEBPACK_IMPORTED_MODULE_11__.message.show('can not read json file. Select a book', 'darkred');
  zip.generateNodeStream({
    type: 'nodebuffer',
    streamFiles: true
  }).pipe(fse.createWriteStream(dglpath)).on('finish', function () {
    fse.removeSync(jsonpath);
    fse.removeSync(textsdir);
    let mess = [prefs.name, 'compressed to', dglpath].join(' ');
    _lib_message__WEBPACK_IMPORTED_MODULE_11__.message.show(mess, 'darkgreen');
  }).on('error', function () {
    _lib_message__WEBPACK_IMPORTED_MODULE_11__.message.show('can not compress book. Select a book', 'darkred');
  });
}

async function uncompressPackage(prefs) {
  let exportpath = appstore.get('exportpath');
  fse.ensureDirSync(exportpath);
  let packname = prefs.name;
  let dirpath = path.resolve(exportpath, packname);
  let dglpath = [dirpath, 'dgl'].join('.');
  let jsonpath = [dirpath, 'json'].join('.');
  fse.ensureDirSync(dirpath);
  let pack = await (0,dgl_utils__WEBPACK_IMPORTED_MODULE_9__.uncompressDGL)(dglpath);
  if (!pack || !pack.texts) return;

  for await (let text of pack.texts) {
    let str = text.mds.join('\n');
    let filepath = [exportpath, text.src].join(path.sep);
    fse.writeFileSync(filepath, str);
    delete text.mds;
  }

  fse.writeJsonSync(jsonpath, pack, {
    spaces: 2
  });
  fse.removeSync(dglpath);
  let mess = [prefs.name, 'uncompressed to', dglpath].join(' ');
  _lib_message__WEBPACK_IMPORTED_MODULE_11__.message.show(mess, 'darkgreen');
}

document.addEventListener('click', async ev => {
  let oblock = ev.target.closest('#create-dgl-block');
  if (!oblock) return;
  if (!checkBooks()) return;
  _lib_progress__WEBPACK_IMPORTED_MODULE_10__.progress.show();
  let prefs = checkPrefs();
  let ocreate = ev.target.closest('#create-dgl');
  let ocmp = ev.target.closest('#compress-dgl');
  let ounc = ev.target.closest('#uncompress-dgl');

  try {
    if (ocreate) createDglPackage(prefs);else if (ocmp) compressPackage(prefs);else if (ounc) uncompressPackage(prefs);
  } catch (err) {
    let mess = 'can not create dgl package';
    _lib_message__WEBPACK_IMPORTED_MODULE_11__.message.show(mess, 'darkgred');
  }
});

function checkPrefs() {
  let origin = dgl.origin(_book__WEBPACK_IMPORTED_MODULE_5__.book.sbooks);
  let prefs = prefstore.get(origin.bid);
  let rows = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.qs)('.prefs-line');

  for (let orow of rows) {
    let prefname = orow.getAttribute('prefname');
    if (!prefname) continue;
    let value = orow.querySelector('.td-value').textContent.trim();
    prefs[prefname] = value;
  }

  prefstore.set(origin.bid, prefs);
  return prefs;
}

function checkBooks() {
  if (dgl.bid && _book__WEBPACK_IMPORTED_MODULE_5__.book.sbooks) return true;
  _lib_message__WEBPACK_IMPORTED_MODULE_11__.message.show('select a book', 'darkred');
}

/***/ }),

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "header": () => (/* binding */ header),
/* harmony export */   "rotateBlock": () => (/* binding */ rotateBlock)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./book */ "./src/book.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page */ "./src/page.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_5__);









const Store = __webpack_require__(/*! electron-store */ "electron-store");

const bkstore = new Store({
  name: 'libks'
});
let dgl = electron__WEBPACK_IMPORTED_MODULE_5__.remote.getGlobal('dgl');
let templates = electron__WEBPACK_IMPORTED_MODULE_5__.remote.getGlobal('templates');
const header = {
  async ready(idx) {
    setEmptyHeader();
    showLeftHeader();
    if (_book__WEBPACK_IMPORTED_MODULE_3__.book.sbooks.length > 1) showRightHeader(idx);else showSimpleHeader(idx);
  }

};

function setEmptyHeader() {
  let oheader = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.header');
  oheader.classList.add('grid-cols-2');
  oheader.innerHTML = templates.header;
  let estyle = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('#editStyle');
  if (estyle) estyle.innerHTML = '';
}

function showLeftHeader() {
  let oleft = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.header-cell.left');
  if (dgl.route == 'book') oleft.textContent = 'Library';else if (dgl.route == 'page') {
    let origin = dgl.origin(_book__WEBPACK_IMPORTED_MODULE_3__.book.sbooks);
    oleft.textContent = origin.descr.title; //.slice(0, 25)
  }
}

function showRightHeader(cntidx) {
  let oheader = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.header-cell.right');
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.empty)(oheader);
  let oul = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.create)('div', 'header-block');
  oul.classList.add('block');
  if (cntidx === undefined) cntidx = dgl.idx;
  _book__WEBPACK_IMPORTED_MODULE_3__.book.sbooks.forEach(sbook => {
    if (sbook.origin) return;
    let htext;
    if (dgl.route == 'book') htext = sbook.descr.title;else if (dgl.route == 'page') htext = sbook.cnts[cntidx].md;
    htext = [': ', htext].join('');
    let oli = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.create)('p');
    oul.appendChild(oli);
    oli.classList.add('headline');
    oli.setAttribute('lang', sbook.lang);
    oli.setAttribute('bid', sbook.bid);
    if (sbook.shown) oli.classList.remove('hidden');else oli.classList.add('hidden');
    let olang = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.span)(sbook.lang, 'head-lang');
    oli.appendChild(olang);
    let ohtext = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.span)(htext);
    oli.appendChild(ohtext);
  });
  oheader.appendChild(oul);
}

function showSimpleHeader(cntidx) {
  let oheader = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.header-cell.right');
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.empty)(oheader);
  let oul = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.create)('div', 'header-block');
  oul.classList.add('block');
  if (cntidx === undefined) cntidx = dgl.idx;
  let origin = dgl.origin(_book__WEBPACK_IMPORTED_MODULE_3__.book.sbooks);
  let oli = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.create)('p');
  oul.appendChild(oli);
  oli.classList.add('headline');
  oli.setAttribute('lang', origin.lang);
  oli.setAttribute('bid', origin.bid);
  oli.classList.remove('hidden');
  let htext;
  if (dgl.route == 'book') htext = origin.descr.title;else if (dgl.route == 'page') htext = origin.cnts[cntidx].md;
  oli.textContent = htext;
  oheader.appendChild(oul);
}

function rotateBlock(oblock) {
  const pars = lodash__WEBPACK_IMPORTED_MODULE_0___default().filter(oblock.children, child => child.nodeName == 'P');

  if (!pars.length) return false;
  let next = 0;

  lodash__WEBPACK_IMPORTED_MODULE_0___default().each(pars, (par, idx) => {
    if (par.classList.contains('hidden')) return;
    par.classList.add('hidden');
    next = idx + 1;
    if (next === pars.length) next = 0;
  });

  const nextpar = pars[next];
  nextpar.classList.remove('hidden');
  return next;
}
document.addEventListener("click", async ev => {
  if (dgl.editMode) return;
  if (!dgl.bid) return;
  let oleft = ev.target.closest('.header-cell.left');

  if (oleft) {
    if (dgl.route == 'book') (0,_app__WEBPACK_IMPORTED_MODULE_2__.router)({
      route: 'library'
    });else if (dgl.route == 'page') (0,_app__WEBPACK_IMPORTED_MODULE_2__.router)({
      route: 'book',
      bid: dgl.bid
    });
  }
});

/***/ }),

/***/ "./src/importBook.js":
/*!***************************!*\
  !*** ./src/importBook.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getImportBook": () => (/* binding */ getImportBook)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var dgl_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dgl-utils */ "dgl-utils");
/* harmony import */ var dgl_utils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dgl_utils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var book_md2json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! book-md2json */ "book-md2json");
/* harmony import */ var book_md2json__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(book_md2json__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_pouch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/pouch */ "./src/lib/pouch.js");
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./book */ "./src/book.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _lib_progress__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/progress */ "./src/lib/progress.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");





const {
  dialog
} = __webpack_require__(/*! electron */ "electron").remote;

 // import { compressDGL, uncompressDGL } from '../../b/dgl-utils'



 // import { preference } from './prefs'




const isZip = __webpack_require__(/*! is-zip */ "is-zip"); // const JSZip = require("jszip");


const franc = __webpack_require__(/*! franc */ "franc");

const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const path = __webpack_require__(/*! path */ "path");

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const bkstore = new Store({
  name: 'libks'
});
const ftstore = new Store({
  name: 'fts'
});
const prefstore = new Store({
  name: 'prefs'
});
const appstore = new Store({
  name: 'app'
});

const JSON5 = __webpack_require__(/*! json5 */ "json5");




let dgl = electron__WEBPACK_IMPORTED_MODULE_1__.remote.getGlobal('dgl');

const {
  app
} = __webpack_require__(/*! electron */ "electron").remote;

let homepath = app.getPath('home');
let exportpath = appstore.get('exportpath');

const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");

const ftsopts = electron__WEBPACK_IMPORTED_MODULE_1__.remote.getGlobal('ftsopts');
const getImportBook = {}; // todo: del ctrl+o

mouse.bind('ctrl+o', function (ev) {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{
      name: 'DGL, FB2, EPUB, HTML, MD',
      extensions: ['dgl', 'json', 'epub', 'pdf', 'md', 'fb2', 'fb2.zip']
    }]
  }).then(result => {
    const bpath = result.filePaths[0];

    if (!bpath) {
      _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show('can not locate book. Select a book', 'darkred');
      return;
    }

    let ext = path.extname(bpath);

    if (!ext) {
      _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show('can not locate book. Select a book', 'darkred');
      return;
    }

    _lib_progress__WEBPACK_IMPORTED_MODULE_8__.progress.show();
    if (ext == '.dgl') importDgl(bpath);else if (ext == '.json') importDglJson(bpath);else electron__WEBPACK_IMPORTED_MODULE_1__.ipcRenderer.send('importBook', {
      bpath
    });
  }).catch(err => {
    _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show('can not import book', 'darkred');
    console.log(err);
  });
});
electron__WEBPACK_IMPORTED_MODULE_1__.ipcRenderer.on('importBook', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{
      name: 'DGL, FB2, EPUB, HTML, MD',
      extensions: ['dgl', 'json', 'epub', 'pdf', 'md', 'fb2', 'fb2.zip']
    }]
  }).then(result => {
    const bpath = result.filePaths[0];

    if (!bpath) {
      _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show('can not locate book. Select a book', 'darkred');
      return;
    }

    let ext = path.extname(bpath);

    if (!ext) {
      _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show('can not locate book. Select a book', 'darkred');
      return;
    }

    _lib_progress__WEBPACK_IMPORTED_MODULE_8__.progress.show();
    if (ext == '.dgl') importDgl(bpath);else if (ext == '.json') importDglJson(bpath);else electron__WEBPACK_IMPORTED_MODULE_1__.ipcRenderer.send('importBook', {
      bpath
    });
  }).catch(err => {
    _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show('can not import book', 'darkred');
    console.log(err);
  });
});
electron__WEBPACK_IMPORTED_MODULE_1__.ipcRenderer.on('addParallelBook', function (event) {
  if (!checkBooks()) return;
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{
      name: 'PDF, FB2, EPUB, PDF, HTML, MD',
      extensions: ['epub', 'md', 'pdf', 'fb2', 'fb2.zip']
    }]
  }).then(result => {
    const bpath = result.filePaths[0];
    if (!bpath) return;

    if (!_book__WEBPACK_IMPORTED_MODULE_6__.book) {
      _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show('select book to add to', 'darkred');
      return;
    }

    _lib_progress__WEBPACK_IMPORTED_MODULE_8__.progress.show();
    let origin = dgl.origin(_book__WEBPACK_IMPORTED_MODULE_6__.book.sbooks);
    electron__WEBPACK_IMPORTED_MODULE_1__.ipcRenderer.send('importBook', {
      bpath,
      orbid: origin.bid
    });
  }).catch(err => {
    _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show('can not read book', 'darkred');
    console.log(err);
  });
});
electron__WEBPACK_IMPORTED_MODULE_1__.ipcRenderer.on('importBookResult', function (event, result) {
  if (!result.docs) {
    _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show('can not parse book', 'darkred');
    return;
  }

  importBook(result);
});

function checkBooks() {
  if (_book__WEBPACK_IMPORTED_MODULE_6__.book.sbooks) return true;else _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show('select a book', 'darkred');
}

function guessLang(docs) {
  let test = docs.map(doc => doc.md).join(' ');
  return franc(test);
}

async function importBook(result) {
  let {
    descr,
    docs,
    imgs
  } = result;
  let half = docs.length / 2;
  descr.lang = guessLang(docs.slice(half, half + 200));
  let newbook = parseBookInfo(descr);
  newbook.bpath = result.bpath;
  newbook.cnts = parseCnts(docs);
  setDocPath(docs);
  newbook.active = true;

  if (result.orbid) {
    // todo: add book
    _book__WEBPACK_IMPORTED_MODULE_6__.book.sbooks.push(newbook); // let origin = dgl.origin(book.sbooks)

    if (_book__WEBPACK_IMPORTED_MODULE_6__.book.sbooks[1]) _book__WEBPACK_IMPORTED_MODULE_6__.book.sbooks[1].shown = true;
    bkstore.set(result.orbid, _book__WEBPACK_IMPORTED_MODULE_6__.book.sbooks);
  } else {
    newbook.origin = true;
    bkstore.set(newbook.bid, [newbook]); // let prefs = preference.initPrefs(newbook)
    // prefstore.set(newbook.bid, prefs)
  }

  await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_5__.pushDocs)(newbook.bid, docs);
  if (imgs.length) await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_5__.pushImgs)(newbook.bid, imgs);
  (0,_app__WEBPACK_IMPORTED_MODULE_7__.router)({
    route: 'library'
  });
  let mess = ['book', newbook.author, newbook.title, 'loaded'].join(' ');
  _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show(mess, 'darkgreen');
} // import common book


function parseCnts(docs) {
  let cnts = docs.filter(doc => doc.level > -1);
  cnts.forEach((cnt, idx) => cnt.idx = idx);
  return cnts;
}

function setDocPath(docs) {
  const fillsize = docs.length.toString().length;
  let path = '',
      counter = 0,
      filled;
  let prevheader = {};
  let parent = {
    level: 0,
    path: ''
  };
  let chapternum = 0;
  let headers = docs.filter(doc => doc.level > -1);
  const chaptesize = headers.length.toString().length;

  for (let doc of docs) {
    if (doc.level > -1) {
      chapternum += 1;
      counter = 0;
      prevheader = doc;
      path = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.zerofill)(chapternum, chaptesize);
    }

    filled = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.zerofill)(counter, fillsize);

    if (doc.footnote) {// if (!doc._id) doc._id = ['ref', path, doc.ref].join('-')
    } else {
      doc.path = path;
      doc._id = [path, filled].join('-');
      counter++;
    }

    prevheader.size = counter;
  }
}

function parseBookInfo(info) {
  let bid = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cleanDname)(info);
  let lang = info.lang || 'unk';
  let descr = {
    author: info.author,
    title: info.title
  };
  let book = {
    bid,
    descr,
    lang
  };
  if (info.origin) book.origin = true;
  return book;
}

async function parseBookByType(bpath, type) {
  // now only md as text type
  let result;

  try {
    result = await (0,book_md2json__WEBPACK_IMPORTED_MODULE_4__.md2json)(bpath);
  } catch (err) {
    console.log('import ERR: can not import markdown');
    console.log('import ERR:', bpath);
    result = {
      descr: 'can not import book'
    };
  }

  return result;
}

async function importDglJson(bpath) {
  let dirpath = bpath.substring(0, bpath.lastIndexOf(path.sep));
  let pack, dgls;

  try {
    let dgljson = await fse.readFile(bpath, 'utf-8');
    pack = JSON5.parse(dgljson);
    dgls = pack.texts;
  } catch (err) {
    let mess = 'not a .dgl format';
    _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show(mess, 'darkred');
    return;
  }

  pack.bpath = bpath;
  let packages = [];

  for (const dgldescr of dgls) {
    if (dgldescr.skip) continue;
    if (!dgldescr.type) continue;
    let srcpath = dgldescr.src;
    let bpath = path.resolve(dirpath, srcpath);
    let {
      descr,
      docs,
      imgs
    } = await parseBookByType(bpath, dgldescr.type);

    if (!docs) {
      let mess = ['incorrect info.json, no book', dgldescr.src];
      _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show(mess, 'darkred');
      return;
    }

    if (dgldescr.type == 'md') descr = dgldescr;
    let pack = {
      descr,
      docs,
      imgs
    };
    packages.push(pack);
  } // for dgls


  saveDglBook(pack, packages);
} // import bare uncompressed dgl-json


async function importDgl(dglpath) {
  _lib_progress__WEBPACK_IMPORTED_MODULE_8__.progress.show();
  let iszip = isZip(fse.readFileSync(dglpath));

  if (!iszip) {
    let mess = 'not compressed file, not a .dgl format';
    _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show(mess, 'darkred');
    return;
  }

  let pack = await (0,dgl_utils__WEBPACK_IMPORTED_MODULE_3__.uncompressDGL)(dglpath);
  saveDglBook(pack);
  _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show('zip in progress', 'darkgreen');
} // import compressed dgl


async function saveDglBook(pack) {
  let books = [];

  for (const text of pack.texts) {
    // let { descr, docs, imgs } = text
    let book = parseBookInfo(text);
    book.active = true;
    let mess = [book.lang, '-', book.title, 'loading...'].join(' ');
    _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show(mess, 'darkgreen', true);
    let {
      descr,
      docs,
      imgs
    } = await (0,book_md2json__WEBPACK_IMPORTED_MODULE_4__.md2json)(text.mds);
    setDocPath(docs);
    book.cnts = parseCnts(docs); // dgl

    books.push(book);
    await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_5__.pushDocs)(book.bid, docs);
    if (imgs && imgs.length) await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_5__.pushImgs)(book.bid, imgs);
  } // for texts
  // todo: now: установить отметку synced ?


  let origin = books.find(book => book.origin);
  let nonorigin = books.find(book => !book.origin);
  if (nonorigin) nonorigin.shown = true;
  bkstore.set(origin.bid, books);
  let prefs = pack;
  delete prefs.texts;
  prefs.exportpath = appstore.get('exportpath');
  prefstore.set(origin.bid, prefs);
  (0,_app__WEBPACK_IMPORTED_MODULE_7__.router)({
    route: 'library'
  });
  let mess = ['book', origin.descr.author, origin.descr.title, 'loaded'].join(' ');
  _lib_message__WEBPACK_IMPORTED_MODULE_9__.message.show(mess, 'darkgreen');
}

/***/ }),

/***/ "./src/importDict.js":
/*!***************************!*\
  !*** ./src/importDict.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getimportDict": () => (/* binding */ getimportDict),
/* harmony export */   "importDSLDict": () => (/* binding */ importDSLDict)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var dict_sd2json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dict-sd2json */ "dict-sd2json");
/* harmony import */ var dict_sd2json__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dict_sd2json__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_pouch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/pouch */ "./src/lib/pouch.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");
/* harmony import */ var _lib_progress__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/progress */ "./src/lib/progress.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _lib_stemmer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/stemmer */ "./src/lib/stemmer.js");





const {
  dialog
} = __webpack_require__(/*! electron */ "electron").remote;

const path = __webpack_require__(/*! path */ "path");

 // import { sd2js } from '../../b/dict-sd2json'

 // import { importDSL as dsl2json } from 'dict-dsl2json'



const franc = __webpack_require__(/*! franc */ "franc");






const JSON5 = __webpack_require__(/*! json5 */ "json5");

const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const dictstore = new Store({
  name: 'dicts'
});
let dstore = dictstore.store;
const getimportDict = {};
electron__WEBPACK_IMPORTED_MODULE_1__.ipcRenderer.on('importDict', function (event) {
  // dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'IFO, DSL, JSON', extensions: ['ifo', 'dsl', 'json'] }]})
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{
      name: 'IFO, DSL, JSON',
      extensions: ['ifo']
    }]
  }).then(result => {
    const bpath = result.filePaths[0];
    if (!bpath) return;
    let ext = path.extname(bpath);
    if (ext == '.ifo') importStarDict(bpath);else if (ext == '.dsl') importDSLDict(bpath); // else if (ext == '.json') importJsonDict(bpath)
  }).catch(err => {
    console.log(err);
  });
});

async function importStarDict(bpath) {
  _lib_progress__WEBPACK_IMPORTED_MODULE_6__.progress.show();
  const result = await (0,dict_sd2json__WEBPACK_IMPORTED_MODULE_3__.sd2json)(bpath);
  let descr = result.descr;
  descr.lang = guessLang(result.docs.slice(1000, 2000));
  const stemmer = (0,_lib_stemmer__WEBPACK_IMPORTED_MODULE_8__.porter)(descr.lang);
  const sdocs = [];
  const skey = Object.create(null);
  let stem;
  result.docs.forEach(doc => {
    if (doc._id.split(' ').length == 1) {
      stem = stemmer ? stemmer(doc._id) : doc._id;
      if (!skey[stem]) skey[stem] = {
        _id: stem,
        docs: []
      };
      skey[stem].docs.push(doc);
    } else {
      if (!skey[doc._id]) skey[doc._id] = {
        _id: doc._id,
        docs: []
      };

      skey[doc._id].docs.push(doc);
    }
  });
  const stemmed = Object.values(skey);
  sdocs.push(...stemmed);
  saveDict(descr, sdocs);
}

async function importDSLDict(bpath) {
  _lib_progress__WEBPACK_IMPORTED_MODULE_6__.progress.show();
  const result = await dsl2json(bpath);
  let dict = result.descr;
  dict.lang = result.descr.src;
  saveDict(dict, result.docs);
}

async function saveDict(dict, docs) {
  _lib_progress__WEBPACK_IMPORTED_MODULE_6__.progress.show();
  dict.active = true;
  let dname = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cleanDname)(dict);
  dict.dname = dname;
  dict.idx = 0;
  dstore = dictstore.store;

  let olddict = lodash__WEBPACK_IMPORTED_MODULE_0___default().find(dstore, dict => dict.dname == dict.dname);

  if (olddict) dictstore.delete(olddict.dname);
  let idx = 0;

  for (const dname in dstore) {
    const dict = dstore[dname];
    idx++;
    dict.idx = idx;
  }

  dstore[dict.dname] = dict;
  dictstore.set(dstore);
  await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_4__.pushDocs)(dname, docs);
  let mess = ['dict', dict.name, 'installed'].join(' ');
  _lib_message__WEBPACK_IMPORTED_MODULE_5__.message.show(mess, 'darkgreen');
  (0,_app__WEBPACK_IMPORTED_MODULE_7__.router)({
    route: 'dictionary'
  });
}

function guessLang(docs) {
  let test = docs.map(doc => doc._id).join(' ');
  return franc(test);
}

async function importJsonDict(bpath) {
  let descr, mess, docs;

  try {
    descr = await fse.readFileSync(bpath, 'utf-8');
    descr = JSON5.parse(descr);
  } catch (err) {
    mess = ['not a dict description', bpath].join(' ');
  }

  if (!descr.src) mess = ['no dictionary source'].join(' ');

  try {
    const dirpath = path.dirname(bpath);
    let docspath = path.resolve(dirpath, descr.src);
    docs = await fse.readJsonSync(docspath);
  } catch (err) {
    mess = ['not a json dict file', bpath].join(' ');
  }

  if (mess) {
    _lib_message__WEBPACK_IMPORTED_MODULE_5__.message.show(mess, 'red');
    return;
  }

  if (!descr.lang) descr.lang = guessLang(docs.slice(1000, 2000));
  let stemmer = _lib_stemmer__WEBPACK_IMPORTED_MODULE_8__.porter[descr.lang];
  if (!stemmer) stemmer = defaultStemmer;
  const skey = Object.create(null);
  let stem, stemmed;
  let dicts = docs.filter(doc => doc.dict); // .dsl or .sd dicts

  let terms = docs.filter(doc => doc.term); // .dgl terms or flex dicts

  let jsons = docs.filter(doc => doc.stem); // ready stem - .dgl dicts

  dicts.forEach(doc => {
    stem = stemmer ? stemmer(doc.dict) : doc.dict;
    if (!skey[stem]) skey[stem] = {
      _id: stem,
      docs: []
    };
    skey[stem].docs.push(doc);
  });
  jsons.forEach(doc => {
    if (!skey[doc.stem]) skey[doc.stem] = {
      _id: doc.stem,
      docs: []
    };
    skey[doc.stem].docs.push(doc);
  });
  terms.forEach(doc => {
    if (!skey[doc.term]) skey[doc.term] = {
      _id: doc.term,
      docs: []
    };
    skey[doc.term].docs.push(doc);
  });
  stemmed = Object.values(skey);
  saveDict(descr, stemmed);
}

/***/ }),

/***/ "./src/lib/load-templates.js":
/*!***********************************!*\
  !*** ./src/lib/load-templates.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadTemplates": () => (/* binding */ loadTemplates),
/* harmony export */   "loadSection": () => (/* binding */ loadSection)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);


const log = console.log;

const _ = __webpack_require__(/*! lodash */ "lodash"); // const fs = require('fs')


const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const path = __webpack_require__(/*! path */ "path");

const marked = __webpack_require__(/*! marked */ "marked");





const {
  app
} = __webpack_require__(/*! electron */ "electron").remote;

let templates = electron__WEBPACK_IMPORTED_MODULE_2__.remote.getGlobal('templates');
let apath = app.getAppPath();
function loadTemplates() {
  appendFile('html');
}

function appendFile(ext) {
  let tmplpath = path.resolve(apath, 'src/templates');
  let tmpls = fse.readdirSync(tmplpath);
  let reExt = new RegExp('\.' + ext + '$');
  tmpls.forEach(sname => {
    let spath, html;

    try {
      spath = path.resolve(apath, 'src/templates', sname);
      if (!reExt.test(spath)) return;
      html = fse.readFileSync(spath).toString();
    } catch (err) {
      console.log('__ERR LOADING TMPL', err);
    }

    templates[sname.replace(/\.html$/, '')] = html;
  });
}

function loadSection(lang, sname) {
  const app = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.q)('#app');
  let md;
  let spath = path.resolve(apath, 'src/i18n', lang, [sname, 'md'].join('.'));

  try {
    md = fse.readFileSync(spath).toString();
  } catch (err) {
    lang = _config__WEBPACK_IMPORTED_MODULE_0__.config.deflang;
    let spath = path.resolve(apath, 'src/i18n', lang, [sname, 'md'].join('.'));
    console.log('_SECTION NAME-ERR', lang, sname, spath);
    md = fse.readFileSync(spath).toString();
  }

  let osec = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.create)('div', 'page');
  osec.classList.add('section');
  osec.innerHTML = marked(md);
  (0,_utils__WEBPACK_IMPORTED_MODULE_1__.empty)(app);
  app.appendChild(osec);
}

/***/ }),

/***/ "./src/lib/message.js":
/*!****************************!*\
  !*** ./src/lib/message.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "message": () => (/* binding */ message)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _progress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./progress */ "./src/lib/progress.js");



const omess = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#message');

let timer;
const message = {
  show(str, color, auto) {
    let omessage = omess.querySelector('#message-text');
    _progress__WEBPACK_IMPORTED_MODULE_1__.progress.hide();
    omess.classList.remove('hidden');
    omessage.classList.remove('darkred');
    omessage.classList.remove('darkgreen');
    omessage.textContent = str;
    omessage.classList.add(color);
    if (auto) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(wait, 10000);
  },

  hide() {
    omess.classList.add('hidden');
  }

};

function wait() {
  _progress__WEBPACK_IMPORTED_MODULE_1__.progress.hide();
  omess.classList.add('hidden');
}

/***/ }),

/***/ "./src/lib/pouch.js":
/*!**************************!*\
  !*** ./src/lib/pouch.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteDB": () => (/* binding */ deleteDB),
/* harmony export */   "queryDBcomplex": () => (/* binding */ queryDBcomplex),
/* harmony export */   "queryDB": () => (/* binding */ queryDB),
/* harmony export */   "fetchFN": () => (/* binding */ fetchFN),
/* harmony export */   "fetchBlock": () => (/* binding */ fetchBlock),
/* harmony export */   "fetchBook": () => (/* binding */ fetchBook),
/* harmony export */   "fetchChapter": () => (/* binding */ fetchChapter),
/* harmony export */   "pushDocs": () => (/* binding */ pushDocs),
/* harmony export */   "updateDocs": () => (/* binding */ updateDocs),
/* harmony export */   "pushImgs": () => (/* binding */ pushImgs),
/* harmony export */   "getImage": () => (/* binding */ getImage)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "./src/config.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_3__);



const {
  app
} = __webpack_require__(/*! electron */ "electron").remote;

const upath = app.getPath("userData"); // let apath = app.getAppPath()

const path = __webpack_require__(/*! path */ "path");

const fse = __webpack_require__(/*! fs-extra */ "fs-extra");




const mouse = __webpack_require__(/*! mousetrap */ "mousetrap"); // const PouchDB = require('pouchdb')
// import PouchDB from 'pouchdb'
// const PouchDB = require('pouchdb').default;


const PouchDB = __webpack_require__(/*! electron */ "electron").remote.require('pouchdb');

async function deleteDB(dname) {
  // const pouchpath = path.resolve(upath, 'pouch')
  const dpath = path.resolve(upath, 'pouch', dname);
  await fse.remove(dpath);
}

function newDB(dbdict) {
  const pouchpath = path.resolve(upath, 'pouch');
  const dname = dbdict.dname || dbdict.bid;
  if (!dname) return;
  const dpath = path.resolve(upath, 'pouch', dname);
  let pouch = new PouchDB(dpath);
  pouch.dname = dname;
  pouch.name = dbdict.name;
  return pouch;
}

async function queryDBcomplex(qstems, dicts) {
  let indecls = qstems.filter(qstem => qstem.indecl);
  qstems = qstems.filter(qstem => !qstem.indecl);

  let keys = lodash__WEBPACK_IMPORTED_MODULE_0___default().uniq(lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(qstems.map(qstem => qstem.stem)));

  let flskeys = lodash__WEBPACK_IMPORTED_MODULE_0___default().uniq(lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(qstems.map(qstem => qstem.term)));

  let termkeys = lodash__WEBPACK_IMPORTED_MODULE_0___default().uniq(lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(indecls.map(qstem => qstem.term)));

  let dbdicts = dicts.filter(dict => !dict.flex && !dict.indecl);
  let flsdicts = dicts.filter(dict => dict.flex);
  let termdicts = dicts.filter(dict => dict.indecl);
  let alldocs = await fetchDocs(keys, dbdicts);
  let dictdocs = alldocs.filter(doc => !doc.refstem);
  let refdocs = alldocs.filter(doc => doc.refstem);
  let refstems = refdocs.map(doc => doc.refstem);
  let lemmas = await fetchDocs(refstems, dbdicts); // ref - сменить stem на stem исходной формы, и добавить keys исходной формы
  // refdoc м.б. найден только в WKT, и только в verbs

  lemmas.forEach(refdict => {
    let refdoc = refdocs.find(doc => doc.refstem == refdict.stem);
    refdict.stem = refdoc.stem;
    refdict.keys = refdoc.keys;
    refdict.time = refdoc.time; // refdict.trns = refdoc.trns
  });
  dictdocs.push(...lemmas);
  let flsdocs = await fetchDocs(flskeys, flsdicts);
  let termdocs = await fetchDocs(termkeys, termdicts);
  return {
    dictdocs,
    flsdocs,
    termdocs
  };
}
async function queryDB(stem, dicts) {
  let keys = [stem];
  let dbdicts = dicts.filter(dict => !dict.flex);
  let dictdocs = await fetchDocs(keys, dbdicts); // exkey: surprise party

  let exkeys = lodash__WEBPACK_IMPORTED_MODULE_0___default().uniq(lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(lodash__WEBPACK_IMPORTED_MODULE_0___default().flatten(dictdocs.map(ddoc => ddoc.refs))));

  let examples = await fetchDocs(exkeys, dbdicts);
  examples.forEach(example => example.example = true);
  dictdocs.push(...examples);
  return dictdocs;
}

function fetchDocs(keys, dbdicts) {
  const dbs = dbdicts.map(dbdict => newDB(dbdict));
  return Promise.all(dbs.map(function (db) {
    return db.allDocs({
      keys: keys,
      include_docs: true
    }).then(function (res) {
      if (!res || !res.rows) throw new Error('no query dbs result');

      let rdocs = lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(lodash__WEBPACK_IMPORTED_MODULE_0___default().flatten(res.rows.map(row => row.doc)));

      let docs = lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(lodash__WEBPACK_IMPORTED_MODULE_0___default().flatten(rdocs.map(rdoc => rdoc.docs)));

      docs.forEach(doc => {
        doc.dname = db.name;
      });
      return docs;
    });
  })).then(docs => {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default().flatten(docs);
  }).catch(function (err) {
    console.log('ERR fetchDocs', err);
    return [];
  });
}

function fetchFN(keys, bids) {
  const dbs = bids.map(bid => newDBdname(bid));
  return Promise.all(dbs.map(function (db) {
    return db.allDocs({
      keys: keys,
      include_docs: true
    }).then(function (res) {
      if (!res || !res.rows) throw new Error('no query dbs result');

      let rdocs = lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(lodash__WEBPACK_IMPORTED_MODULE_0___default().flatten(res.rows.map(row => row.doc)));

      return rdocs;
    });
  })).then(docs => {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default().flatten(docs);
  }).catch(function (err) {
    console.log('ERR fetchFN', err);
    return [];
  });
}

function fetchRefs(keys, dbdicts) {
  const dbs = dbdicts.map(dbdict => newDB(dbdict));
  return Promise.all(dbs.map(function (db) {
    return db.allDocs({
      keys: keys,
      include_docs: true
    }).then(function (res) {
      if (!res || !res.rows) throw new Error('no query dbs result');

      let rdocs = lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(res.rows.map(row => {
        return row.doc;
      }));

      rdocs = lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(lodash__WEBPACK_IMPORTED_MODULE_0___default().flatten(rdocs));
      rdocs.forEach(rdoc => {
        rdoc.dname = db.dname;
      });
      return rdocs;
    }).catch(function (err) {
      console.log('ERR fetch_Refs', err);
    });
  }));
}

function showProgress(total, size) {
  let odprog = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.q)('#dict-progress');
  odprog.classList.remove('hidden');
  let percent = Math.round(size * 100 / total);
  odprog.textContent = [percent, '%'].join(' ');
  if (percent >= 100) odprog.textContent = '', odprog.classList.add('hidden');
}

async function fetchBlock(params) {
  const dbs = params.map(param => newDBdname(param.bid));
  dbs.forEach((db, idx) => {
    let opts = {
      include_docs: true,
      keys: [params[idx].id],
      lang: params[idx].lang,
      bid: params[idx].bid
    };
    db.options = opts;
  });
  return Promise.all(dbs.map(async function (db) {
    return db.allDocs(db.options).then(res => {
      if (!res.rows.length) return;
      let doc = res.rows[0].doc;
      if (!doc) return;
      doc.bid = db.options.bid;
      doc.lang = db.options.lang;
      return doc;
    });
  }));
}

function newDBdname(dname) {
  const pouchpath = path.resolve(upath, 'pouch');
  const dpath = path.resolve(upath, 'pouch', dname);
  let pouch = new PouchDB(dpath);
  pouch.dname = dname;
  return pouch;
}

async function fetchBook(bid) {
  const db = newDBdname(bid);
  return db.allDocs({
    include_docs: true
  }).then(res => {
    db.close();
    return res.rows.map(row => row.doc);
  }).catch(err => {
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.log)('_ERR fetch book docs', db.dname, err);
  });
}
async function fetchChapter(query) {
  const db = newDBdname(query.bid);
  let chpath, limit;
  chpath = query.path;
  limit = query.size;
  let startkey = [chpath, '-'].join('');
  db.options = {
    include_docs: true,
    startkey,
    limit
  };
  return db.allDocs(db.options).then(res => {
    const chdocs = res.rows.map(row => row.doc);
    return chdocs;
  }).catch(err => {
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.log)('_ERR fetchChapter:', db.dname, err);
  });
}
async function pushDocs(dname, docs, pouchpath) {
  if (!pouchpath) pouchpath = path.resolve(upath, 'pouch');
  await fse.ensureDirSync(pouchpath);
  const dpath = path.resolve(pouchpath, dname);
  let pouch = new PouchDB(dpath);
  await pouch.close();
  await fse.emptyDirSync(dpath);
  pouch = new PouchDB(dpath); // todo: wtf? but that's true

  pouch.dname = dname;
  let total = docs.length;
  let size = 0;

  const chunks = lodash__WEBPACK_IMPORTED_MODULE_0___default().chunk(docs, _config__WEBPACK_IMPORTED_MODULE_2__.config.batch_size);

  for await (let chunk of chunks) {
    size += _config__WEBPACK_IMPORTED_MODULE_2__.config.batch_size;
    showProgress(total, size);
    await pouch.bulkDocs(chunk).then(res => {
      let oks = res.filter(doc => doc.ok); // log('_chunk ok', res.length, oks.length, '=', res.length == oks.length)

      return true;
    });
  } // log('_pouch-docs pushed', docs.length)


  pouch.close();
}
async function updateDocs(dname, docs, pouchpath) {
  if (!pouchpath) pouchpath = path.resolve(upath, 'pouch');
  await fse.ensureDirSync(pouchpath);
  const dpath = path.resolve(pouchpath, dname);
  docs.forEach(doc => delete doc._rev);
  await fse.emptyDirSync(dpath);
  let pouch = new PouchDB(dpath);
  await Promise.all(docs.map(async function (doc) {
    return pouch.get(doc._id).then(function (orig) {
      if (doc.md && doc.md == orig.md) return false;
      doc._rev = orig._rev;
      return pouch.put(doc);
    }).catch(function (err) {
      if (err.name === 'not_found') {
        return pouch.put(doc);
      } else {
        // log('_not not-found-err', doc._id)
        throw err;
      }
    }).catch(function (err) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.log)('ERR: updating doc', err, 'doc:', doc);
    });
  })); // .then(res=> {
  // return 'updating docs: ok'
  // pouch.close()
  // })
  // log('_updated docs: ok')

  pouch.close();
}
async function pushImgs(dname, imgs) {
  const pouchpath = path.resolve(upath, 'pouch');
  return;
  await fse.ensureDirSync(pouchpath);
  const dpath = path.resolve(upath, 'pouch', dname);
  let pouch = new PouchDB(dpath);
  pouch.dname = dname;
  imgs = imgs.slice(-3);
  Promise.all(imgs.map(function (img) {
    let name = img.name;
    pouch.putAttachment(name, name, img.data, 'image/jpeg').then(function (res) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.log)('___IMG-RES:', res);
    }).catch(function (err) {
      console.log('ERR push Imgs', err);
    });
  }));
  return;
  let docs = imgs.map(img => {
    // let ctype = ['image', path.extname(img.name)].join('')
    let name = img.name;
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.log)('_pushing image_', name);
    let doc = {
      _id: name,
      _attachments: {}
    };
    let data = img.data.toString('base64');
    doc._attachments[name] = {
      content_type: 'text/plain',
      data: data
    };
    return doc;
  });
  await pouch.bulkDocs(docs).then(res => {
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.log)('_images pushed_', res);
    return true;
  }).catch(function (err) {
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.log)('IMG PUSH ERR:', err);
  });
}
async function getImage(imgname) {
  let dname = 'JK-Rowling-Harry-Potter-and-the-Orde';
  const dpath = path.resolve(upath, 'pouch', dname);
  let pouch = new PouchDB(dpath);
  pouch.get(imgname, {
    attachments: true
  }).then(function (doc) {
    console.log(doc);
  });
}
mouse.bind('ctrl+g', function (ev) {//
});

/***/ }),

/***/ "./src/lib/progress.js":
/*!*****************************!*\
  !*** ./src/lib/progress.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "progress": () => (/* binding */ progress)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");



const oprogress = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#progress');
const progress = {
  show() {
    oprogress.classList.remove('hidden');
  },

  hide() {
    oprogress.classList.add('hidden');
  }

};

function wait() {}

/***/ }),

/***/ "./src/lib/stemmer.js":
/*!****************************!*\
  !*** ./src/lib/stemmer.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "porter": () => (/* binding */ porter)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);





const natural = __webpack_require__(/*! natural */ "natural");

const german = __webpack_require__(/*! snowball-german */ "snowball-german");

const stemmer = {
  'nld': natural.PorterStemmerNl.stem,
  'eng': natural.PorterStemmer.stem,
  'faz': natural.PorterStemmerFa.stem,
  'fra': natural.PorterStemmerFr.stem,
  'ind': natural.StemmerId.stem,
  // indonesian
  'ita': natural.PorterStemmerIt.stem,
  'jpn': natural.StemmerJa.stem,
  'nor': natural.PorterStemmerNo.stem,
  'por': natural.PorterStemmerPt.stem,
  'rus': natural.PorterStemmerRu.stem,
  'spa': natural.PorterStemmerEs.stem,
  'swe': natural.PorterStemmerSv.stem
};
function porter(lang) {
  if (lang == 'deu') return german;else return stemmer[lang];
}

/***/ }),

/***/ "./src/lib/tree.js":
/*!*************************!*\
  !*** ./src/lib/tree.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTree": () => (/* binding */ createTree)
/* harmony export */ });
/* harmony import */ var _css_tree_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/tree.css */ "./src/css/tree.css");
/* harmony import */ var _css_tree_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_tree_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);




const marked = __webpack_require__(/*! marked */ "marked");

function createTree(cnts, roots, books) {
  let oroots = [];
  roots.forEach(root => {
    let oroot = treeBlock(root);
    oroots.push(oroot);
    books.forEach(book => {
      let doc = book.cnts[root.idx];
      if (!doc) return; // un-synchronized

      let opar = treePar(doc);
      if (!book.origin && !book.shown) opar.classList.add('hidden');
      oroot.appendChild(opar);
    });
    let nextroot = cnts.find(cnt => cnt.idx > root.idx && cnt.level == root.level);
    let chroots = cnts.filter(cnt => cnt.idx > root.idx);
    if (nextroot) chroots = chroots.filter(cnt => cnt.idx < nextroot.idx);
    chroots = chroots.filter(cnt => cnt.level == root.level + 1);

    if (chroots.length) {
      let osign = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.create)('span', 'tree-sign');
      osign.textContent = '▾';
      oroot.prepend(osign);
    }

    let ochildren = createTree(cnts, chroots, books);
    ochildren.forEach(ochild => oroot.appendChild(ochild));
  });
  return oroots;
}

function treeBlock(doc) {
  const oblock = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.create)('div', 'block');
  oblock.setAttribute('level', doc.level);
  oblock.classList.add('tree-block');
  let levstyle = ['lev', doc.level].join('-');
  oblock.classList.add(levstyle);
  return oblock;
}

function treePar(doc) {
  let opar = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.create)('p'); // opar.textContent = doc.md.replace(/#/g, '')

  if (!doc.md) doc.md = 'no text';
  opar.innerHTML = marked(doc.md);
  opar.setAttribute('path', doc.path);
  opar.setAttribute('size', doc.size);
  opar.setAttribute('idx', doc.idx);
  opar.classList.add('tree-text');
  opar.classList.add('ptext');
  return opar;
} // sign-collapse


document.addEventListener("click", ev => {
  if (!(0,_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.page')) return;
  let oblock = ev.target.closest('.block');
  if (!oblock) return;
  let osign = ev.target.closest('.tree-sign');
  if (!osign) return;
  oblock.classList.toggle('tree-collapse');
  if (oblock.classList.contains('tree-collapse')) osign.textContent = '▸';else osign.textContent = '▾';
  ev.stopPropagation();
});

/***/ }),

/***/ "./src/lib/utils.js":
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "hashCode": () => (/* binding */ hashCode),
/* harmony export */   "q": () => (/* binding */ q),
/* harmony export */   "qs": () => (/* binding */ qs),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "recreateDiv": () => (/* binding */ recreateDiv),
/* harmony export */   "recreate": () => (/* binding */ recreate),
/* harmony export */   "ctext": () => (/* binding */ ctext),
/* harmony export */   "span": () => (/* binding */ span),
/* harmony export */   "space": () => (/* binding */ space),
/* harmony export */   "br": () => (/* binding */ br),
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "p": () => (/* binding */ p),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "removeAll": () => (/* binding */ removeAll),
/* harmony export */   "findAncestor": () => (/* binding */ findAncestor),
/* harmony export */   "getCoords": () => (/* binding */ getCoords),
/* harmony export */   "placePopup": () => (/* binding */ placePopup),
/* harmony export */   "insertAfter": () => (/* binding */ insertAfter),
/* harmony export */   "zerofill": () => (/* binding */ zerofill),
/* harmony export */   "cleanStr": () => (/* binding */ cleanStr),
/* harmony export */   "ndash": () => (/* binding */ ndash),
/* harmony export */   "cleanDname": () => (/* binding */ cleanDname),
/* harmony export */   "replaceEl": () => (/* binding */ replaceEl),
/* harmony export */   "fromHTML": () => (/* binding */ fromHTML),
/* harmony export */   "previousSiblings": () => (/* binding */ previousSiblings),
/* harmony export */   "splitByPhrases": () => (/* binding */ splitByPhrases),
/* harmony export */   "scrollToPosition": () => (/* binding */ scrollToPosition),
/* harmony export */   "selectParallelBooks": () => (/* binding */ selectParallelBooks),
/* harmony export */   "tokenizer": () => (/* binding */ tokenizer)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
 // const natural = require('natural')
// let util = require('util')

const log = console.log; // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript

function hashCode(s) {
  return s.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
}
function q(sel) {
  return document.querySelector(sel);
}
function qs(sel) {
  return document.querySelectorAll(sel);
}
function create(tag, style) {
  let el = document.createElement(tag);
  if (style) el.classList.add(style);
  return el;
}
function recreateDiv(sel) {
  let el = document.querySelector(sel);
  if (el) el.parentElement.removeChild(el);
  el = document.createElement('div');
  el.classList.add(sel); // el.id = sel

  return el;
}
function recreate(element) {
  var newElement = element.cloneNode(true);
  element.parentNode.replaceChild(newElement, element);
}
function ctext(str) {
  return document.createTextNode(str);
}
function span(str, style) {
  let el = document.createElement('span');
  el.textContent = str;
  if (style) el.classList.add(style);
  return el;
}
function space() {
  return document.createTextNode(' ');
}
function br() {
  let oBR = document.createElement('br');
  return oBR;
}
function div(str, style) {
  let el = document.createElement('div');
  el.textContent = str;
  if (style) el.classList.add(style);
  return el;
}
function p(str, style) {
  let el = document.createElement('p');
  el.textContent = str;
  if (style) el.classList.add(style);
  return el;
}
function empty(el) {
  if (!el) return;

  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}
function remove(el) {
  if (!el) return;
  el.parentElement.removeChild(el);
}
function removeAll(els) {
  els.forEach(el => {
    el.parentElement.removeChild(el);
  });
}
function findAncestor(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls)) {
    return el;
  }
}
function getCoords(el) {
  let rect = el.getBoundingClientRect();
  return rect;
}
function placePopup(coords, el) {
  let top = [coords.top, 'px'].join('');
  let left = [coords.left, 'px'].join('');
  el.style.top = top;
  el.style.left = left;
} // https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function zerofill(number, size) {
  number = number.toString();

  while (number.length < size) number = "0" + number;

  return number;
}
function cleanStr(str) {
  return str.trim().replace(/\n+/g, '\n').replace(/↵+/, '\n').replace(/  +/, ' ').replace(/ /g, ''); // .replace(/\s+/, ' ')
}
function ndash(str) {
  return str.trim().replace(/^-/, '–').replace(/^—/, '–').replace(/ - /g, ' – '); // m-dash: —
}
function cleanDname(descr) {
  if (!descr.author) descr.author = 'author';
  if (!descr.title) descr.title = descr.name || 'title';
  let lang = descr.lang || ''; // let str = [descr.type || '', descr.lang || '', descr.author.slice(0,25), descr.title.slice(0,25)].join('-')

  let str = [descr.author.slice(0, 25), descr.title.slice(0, 25), lang].join('-');
  return str.replace(/[)(,\.]/g, '').replace(/\s+/g, '-').replace(/\//g, '_');
} // ev.preventDefault()
// ev.stopPropagation()

function replaceEl(el, html) {
  const parentElem = el.parentNode;
  let innerElem;

  while (innerElem = el.firstChild) {
    parentElem.insertBefore(innerElem, el);
  }

  parentElem.removeChild(el);
}
function fromHTML(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.firstChild;
}
function previousSiblings(elem) {
  let sibs = [];

  while (elem = elem.previousSibling) {
    if (elem.nodeName !== 'SPAN') continue;
    sibs.push(elem);
  }

  return sibs;
}
function splitByPhrases(str) {
  return str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
} // PAGE

function scrollToPosition(scrollTop) {
  let osec = q('.page');
  osec.scrollTop = scrollTop;
}
function selectParallelBooks(store, bid) {
  for (let libook in store) {
    for (let book of store[libook].books) {
      if (book.bid == bid) return store[libook].books;
    }
  }
}
function tokenizer(str) {
  return str.split(/[\p{P} ]+/ug).filter(Boolean);
}

/***/ }),

/***/ "./src/library.js":
/*!************************!*\
  !*** ./src/library.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "library": () => (/* binding */ library)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _lib_progress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/progress */ "./src/lib/progress.js");
/* harmony import */ var _lib_pouch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/pouch */ "./src/lib/pouch.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");









const Store = __webpack_require__(/*! electron-store */ "electron-store");

const libstore = new Store({
  name: 'library'
});
const bkstore = new Store({
  name: 'libks'
});
const bmkstore = new Store({
  name: 'bookmarks'
});
const csyncstore = new Store({
  name: 'csyncs'
});
const syncstore = new Store({
  name: 'syncs'
});
const prefstore = new Store({
  name: 'prefs'
});
const ftstore = new Store({
  name: 'fts'
});

const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");


let dgl = electron__WEBPACK_IMPORTED_MODULE_2__.remote.getGlobal('dgl');
let templates = electron__WEBPACK_IMPORTED_MODULE_2__.remote.getGlobal('templates'); // todo: del

mouse.bind(['v'], function (ev) {
  console.clear();
  let bks = {};

  for (let bid in libstore.store) {
    let store = libstore.store[bid];
    let books = store.books;
    let origin = books.find(book => book.origin);
    books.forEach(book => {
      delete book.csyncs;
      delete book.syncs;
      book.descr = {
        author: book.author,
        title: book.title
      };
      delete book.author;
      delete book.title;
      if (!book.origin) book.orbid = origin.bid;
    });
    books.libidx = store.idx;
    bks[bid] = books;
  }

  bkstore.clear();
  bkstore.set(bks); // let libidxs = []
  // for(let libbid in bks) {
  //   libidxs.push(bks[libbid].libidx)
  // }
});
const library = {
  async ready() {
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.render)('library');
    dgl.editMode = false;
    this.bks = bkstore.store;
    parseLib();
    this.stripes();
    _lib_progress__WEBPACK_IMPORTED_MODULE_4__.progress.hide();
  },

  isOrigin(bid) {
    return lodash__WEBPACK_IMPORTED_MODULE_1___default().keys(this.bks).includes(bid);
  },

  originBid(bid) {
    let orbid = bid;

    for (let libbid in this.bks) {
      let books = this.bks[libbid];

      for (let book of books) {
        if (book.bid == bid) orbid = dgl.origin(books).bid;
      }
    }

    return orbid;
  },

  expandBook(orbid) {
    let books = this.bks[orbid];
    let selector;
    books.forEach(book => {
      if (orbid == book.bid) return;
      selector = ['.table-line[bid="', book.bid, '"]'].join('');
      let row = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)(selector);
      if (!row) return;
      row.classList.toggle('hidden');
    });
    this.stripes();
  },

  stripes() {
    let orows = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.qs)('.table-line:not(.hidden)');
    let n = 0;

    for (let orow of orows) {
      if (n % 2 === 1) orow.classList.remove('odd'), orow.classList.add('even');else orow.classList.add('odd'), orow.classList.remove('even');
      n++;
    }
  },

  activate(bid) {
    let book, books, orbid;

    if (this.isOrigin(bid)) {
      books = this.bks[bid];
      orbid = dgl.origin(books).bid;

      for (const book of books) {
        book.active = true;
      }
    } else {
      orbid = this.originBid(bid);
      books = this.bks[orbid];
      let origin = books.find(book => book.bid == orbid);

      if (!origin.active) {
        let mess = ['the origin book -', origin.descr.title, 'should be activated first'].join(' ');
        _lib_message__WEBPACK_IMPORTED_MODULE_6__.message.show(mess, 'darkred');
        return;
      }

      book = books.find(book => book.bid == bid);
      book.active = true;
    }

    setStore(this.bks);
    parseLib(orbid);
  },

  deactivate(bid) {
    let book, books, orbid;

    if (this.isOrigin(bid)) {
      books = this.bks[bid];
      orbid = dgl.origin(books).bid;

      for (const book of books) {
        book.active = false;
      }
    } else {
      orbid = this.originBid(bid);
      books = this.bks[orbid];
      book = books.find(book => book.bid == bid);
      book.active = false;
    }

    setStore(this.bks);
    parseLib(orbid);
  },

  async deleteBook(bid) {
    _lib_progress__WEBPACK_IMPORTED_MODULE_4__.progress.show();
    let book, books;

    if (this.isOrigin(bid)) {
      books = this.bks[bid];

      for (const book of books) {
        await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_5__.deleteDB)(book.bid);
        let ftspath = [book.lang, bid].join('.');
        await ftstore.delete(ftspath);
        await bmkstore.delete(bid);
        await prefstore.delete(bid);
        await csyncstore.delete(bid);
        await syncstore.delete(bid);
      }

      delete this.bks[bid];
    } else {
      let libbid = this.originBid(bid);
      books = this.bks[libbid];
      if (!books) return;
      this.bks[libbid] = books.filter(book => book.bid != bid);
    }

    book = books.find(book => book.bid == bid);
    setStore(this.bks);
    this.ready();
    let mess = ['book -', book.descr.author, book.descr.title, 'deleted'].join(' ');
    _lib_message__WEBPACK_IMPORTED_MODULE_6__.message.show(mess, 'darkgreen');
  }

};

function setStore(bks) {
  let libidx = 0;

  for (let libbid in bks) {
    let books = bks[libbid];
    books.libidx = libidx;
    libidx++;
  }

  bkstore.clear();
  bkstore.set(bks);
}

document.addEventListener('click', ev => {
  let orow = ev.target.closest('#lib-table .table-line');
  if (!orow) return;
  let bid = orow.getAttribute('bid');
  let orbid = library.originBid(bid);
  let direction = ev.ctrlKey && ev.altKey ? 'down' : ev.ctrlKey ? 'up' : null;
  let olangs = ev.target.closest('.td-langs');
  let ocheck = ev.target.closest('svg');
  let oact = ev.target.closest('button.td-activate');
  let odel = ev.target.closest('button.td-delete');
  if (olangs) library.expandBook(orbid);else if (oact) library.activate(bid);else if (ocheck) library.deactivate(bid);else if (odel) library.deleteBook(bid);else {
    let books = bkstore.get(orbid);
    const origin = dgl.origin(books);

    if (orbid != bid) {
      const shown = dgl.shown(books);
      const book = books.find(book => book.bid == bid);

      if (shown.bid != bid && book.active) {
        book.shown = true;
        shown.shown = false;
        library.bks[orbid] = books;
        bkstore.clear();
        bkstore.set(library.bks);
      } else {
        let mess = [book.descr.title, 'should be activated first'].join(' ');
        _lib_message__WEBPACK_IMPORTED_MODULE_6__.message.show(mess, 'darkred');
      }
    } else {
      if (!origin.active) {
        let mess = 'no active books';
        _lib_message__WEBPACK_IMPORTED_MODULE_6__.message.show(mess, 'darkred');
        return;
      }
    }

    let state = {
      route: 'book',
      bid: orbid
    };
    dgl.bid = orbid;
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.router)(state);
  } // todo: else if (direction) moveRow(bid, direction)
});

function parseLib() {
  const tbody = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('#lib-table .tbody');
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.empty)(tbody);
  let books;

  for (let libbid in library.bks) {
    books = library.bks[libbid];

    for (let book of books) {
      let orow = parseRow(book);
      orow.setAttribute('bid', book.bid);

      if (book.origin) {
        let olangs = orow.querySelector('.td-langs');
        olangs.textContent = '';
        let oactlangs = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.create)('span');
        let actlangs = dgl.langs(books);
        oactlangs.textContent = actlangs;

        let passives = lodash__WEBPACK_IMPORTED_MODULE_1___default().difference(dgl.alllangs(books), actlangs);

        olangs.appendChild(oactlangs);

        if (passives.length) {
          let oalllangs = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.create)('span');
          oalllangs.textContent = [' (', passives, ')'].join('');
          oalllangs.classList.add('text-gray-400');
          olangs.appendChild(oalllangs);
        }
      }

      tbody.appendChild(orow);
    }
  }
}

function parseRow(book) {
  const tmpl = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('.table-line.tmpl');
  const orow = tmpl.cloneNode(true);
  orow.classList.remove('tmpl');
  let oauthor = orow.querySelector('.td-author');
  let otitle = orow.querySelector('.td-title');
  let olangs = orow.querySelector('.td-langs');
  let ocheck = orow.querySelector('svg');
  let oact = orow.querySelector('button.td-activate');
  otitle.textContent = book.descr.title;
  oauthor.textContent = book.descr.author;

  if (book.origin) {
    orow.classList.remove('hidden');
  } else {
    orow.classList.add('hidden');
    orow.classList.add('grey');
  }

  if (book.active) {
    ocheck.classList.remove('hidden');
    oact.classList.add('hidden');
  } else {
    ocheck.classList.add('hidden');
    oact.classList.remove('hidden');
  }

  olangs.textContent = book.lang;
  orow.setAttribute('bid', book.bid);
  return orow;
}

/***/ }),

/***/ "./src/lookup.js":
/*!***********************!*\
  !*** ./src/lookup.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lookup": () => (/* binding */ lookup)
/* harmony export */ });
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_progress__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/progress */ "./src/lib/progress.js");
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./book */ "./src/book.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");





const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const glob = __webpack_require__(/*! glob */ "glob");



const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");

const {
  app
} = __webpack_require__(/*! electron */ "electron").remote;



const {
  dialog
} = __webpack_require__(/*! electron */ "electron").remote;




let dgl = electron__WEBPACK_IMPORTED_MODULE_3__.remote.getGlobal('dgl');

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const appstore = new Store({
  name: 'appstore'
});

const lookup = {
  async ready() {
    (0,_app__WEBPACK_IMPORTED_MODULE_2__.render)('lookup');
    let heappath = appstore.get('heappath');

    if (!heappath) {
      _lib_message__WEBPACK_IMPORTED_MODULE_6__.message.show('set path to heap of the books', 'darkred');
    }

    const oheappath = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#heappath');
    oheappath.textContent = heappath;
    this.heappath = heappath;
    let oinput = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.lookupinput');
    oinput.focus();
  },

  addRow(type, name, value) {
    const tmpl = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.search-result-line.tmpl');
    const orow = tmpl.cloneNode(true);
    orow.classList.remove('tmpl');
    orow.setAttribute('type', type);
    orow.setAttribute('prefname', name);
    orow.setAttribute('contenteditable', true);
    let oname = orow.querySelector('.td-name');
    let ovalue = orow.querySelector('.td-value');
    oname.textContent = name;
    ovalue.textContent = value;
    this.tbody.appendChild(orow);
  },

  stripes() {
    let orows = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.qs)('.lookup-line');
    let n = 0;

    for (let orow of orows) {
      if (n % 2 === 1) orow.classList.remove('odd'), orow.classList.add('even');else orow.classList.add('odd'), orow.classList.remove('even');
      n++;
    }
  }

};
document.addEventListener('click', ev => {
  let olookup = ev.target.closest('#lookup');
  if (!olookup) return;
  ev.stopPropagation();
  let ohelp = ev.target.closest('#lookup-help-button');
  let oheap = ev.target.closest('#heap');
  let orow = ev.target.closest('.lookup-line');
  let oinput = ev.target.closest('.lookupinput');

  if (oheap && !oinput) {
    openHeappath();
  } else if (ohelp) {
    ohelp = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#lookup-help');
    ohelp.classList.toggle('hidden');
  } else if (orow) {
    let shift = ev.shiftKey ? true : false;
    fireImport(orow, shift);
  }
});

function fireImport(orow, shift) {
  let bpath = orow.textContent;
  if (!bpath) return;
  let sbooks = _book__WEBPACK_IMPORTED_MODULE_5__.book.sbooks;

  if (shift && _book__WEBPACK_IMPORTED_MODULE_5__.book) {
    let origin = dgl.origin(_book__WEBPACK_IMPORTED_MODULE_5__.book.sbooks);
    electron__WEBPACK_IMPORTED_MODULE_3__.ipcRenderer.send('importBook', {
      bpath,
      orbid: origin.bid
    });
  } else if (shift) {
    _lib_message__WEBPACK_IMPORTED_MODULE_6__.message.show('select book before', 'darkred');
    return;
  } else electron__WEBPACK_IMPORTED_MODULE_3__.ipcRenderer.send('importBook', {
    bpath
  });
}

function openHeappath() {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(result => {
    const bpath = result.filePaths[0];
    if (!bpath) return;
    appstore.set('heappath', bpath);
    lookup.ready();
  }).catch(err => {
    console.log(err);
  });
}

document.addEventListener('keydown', ev => {
  if (ev.key !== 'Enter') return;
  ev.preventDefault();
  let oinput = ev.target.closest('.lookupinput');
  if (!oinput) return;
  let query = oinput.value;
  if (!query) return;

  if (!lookup.heappath) {
    _lib_message__WEBPACK_IMPORTED_MODULE_6__.message.show('set path to heap of the books', 'darkred');
    return;
  }

  lookupBook(lookup.heappath, query);
});

function lookupBook(srcdir, query) {
  _lib_progress__WEBPACK_IMPORTED_MODULE_4__.progress.show();
  let restr = new RegExp(query, 'i');
  let pattern = [srcdir, '**/*'].join('/');
  glob(pattern, function (er, fns) {
    let qs = query.split(/ ,?/);
    qs.forEach(query => {
      let req = new RegExp(query, 'i');
      fns = fns.filter(fn => req.test(fn));
    });
    let oresults = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#search-list');
    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.empty)(oresults);

    for (let fn of fns) {
      const tmpl = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.lookup-line.tmpl');
      const orow = tmpl.cloneNode(true);
      orow.classList.remove('tmpl');
      orow.textContent = fn;
      oresults.appendChild(orow);
    }

    lookup.stripes();
    _lib_progress__WEBPACK_IMPORTED_MODULE_4__.progress.hide();
  });
}

/***/ }),

/***/ "./src/newtext.js":
/*!************************!*\
  !*** ./src/newtext.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newtext": () => (/* binding */ newtext)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_3__);







const franc = __webpack_require__(/*! franc */ "franc");

const newtext = {
  ready() {
    (0,_app__WEBPACK_IMPORTED_MODULE_2__.render)('newtext');
    let ocontainer = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('#newtext');
    let str = electron__WEBPACK_IMPORTED_MODULE_3__.clipboard.readText();
    let lang = franc(str);
    if (lang == 'ell') lang = 'grc'; // lang = 'grc'
    // todo: прокатать dicts

    let rows = str.trim().split('\n');
    rows.forEach(row => {
      let html = '';
      let orow = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.create)('p', 'ptext');
      html += row.replace(/([^\p{P} ]+)/ug, "<span class=\"wf\">$1</span>");
      orow.innerHTML = html;
      orow.setAttribute('lang', lang);
      ocontainer.appendChild(orow);
    });
  }

};

/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "page": () => (/* binding */ page),
/* harmony export */   "getSyncs": () => (/* binding */ getSyncs),
/* harmony export */   "syncDoc": () => (/* binding */ syncDoc),
/* harmony export */   "alignPars": () => (/* binding */ alignPars)
/* harmony export */ });
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _lib_pouch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/pouch */ "./src/lib/pouch.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _semaphore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./semaphore */ "./src/semaphore.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./book */ "./src/book.js");
/* harmony import */ var _lib_progress__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/progress */ "./src/lib/progress.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_9__);







const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");

const marked = __webpack_require__(/*! marked */ "marked"); // const stopword = require('stopword')







const Mark = __webpack_require__(/*! mark.js */ "mark.js");



const Store = __webpack_require__(/*! electron-store */ "electron-store");

const libstore = new Store({
  name: 'library'
});
const bkstore = new Store({
  name: 'libks'
});
const csyncstore = new Store({
  name: 'csyncs'
});
const syncstore = new Store({
  name: 'syncs'
});

let dgl = electron__WEBPACK_IMPORTED_MODULE_9__.remote.getGlobal('dgl');
const page = {
  async ready(state) {
    _lib_progress__WEBPACK_IMPORTED_MODULE_8__.progress.show();
    (0,_app__WEBPACK_IMPORTED_MODULE_2__.render)('book');
    if (!state || !state.bid) throw new Error('_PAGE NO STATE');
    let sbooks = bkstore.get(state.bid);
    sbooks = dgl.actives(sbooks);
    dgl.idx = state.idx;
    if (state.idx < 0) throw new Error('_PAGE NO CHAPTER IDX'); // todo: del

    let syncs = getSyncs(state.bid);
    syncs = syncs.filter(sync => sync.idx === dgl.idx);

    if (state.jump) {
      dgl.bid = state.bid;
      dgl.idx = state.idx; // переназвать cntidx?

      let csyncs = (0,_book__WEBPACK_IMPORTED_MODULE_7__.getCSyncs)(state.bid);
      _book__WEBPACK_IMPORTED_MODULE_7__.book.sbooks = _book__WEBPACK_IMPORTED_MODULE_7__.book.syncCnts(sbooks, csyncs);
    }

    this.copy = await this.getChapters(_book__WEBPACK_IMPORTED_MODULE_7__.book, state.idx);

    let chapters = lodash__WEBPACK_IMPORTED_MODULE_1___default().cloneDeep(this.copy);

    await this.syncChapters(chapters, syncs);
    drawPage(chapters);
    _header__WEBPACK_IMPORTED_MODULE_4__.header.ready(state.idx);
    this.localquery = '';
    if (state && state.blockid) this.scroll(state);
    showSearchIcon();
    _lib_progress__WEBPACK_IMPORTED_MODULE_8__.progress.hide();
    showPagePosition();
  },

  async getChapters(book, cntidx) {
    // hard copy - chapter for all langs
    let chapters = [];

    for await (let sbook of book.sbooks) {
      let chdocs = await this.getChapter(sbook, cntidx);
      let chapter = {
        bid: sbook.bid,
        lang: sbook.lang,
        idx: cntidx,
        chdocs: chdocs
      };
      if (sbook.active) chapter.active = true;
      if (sbook.origin) chapter.origin = true;
      if (sbook.shown) chapter.shown = true;
      chapters.push(chapter);
    }

    return chapters;
  },

  async syncChapters(chapters, syncs) {
    for await (let chapter of chapters) {
      let booksyncs = syncs.filter(sync => sync.bid == chapter.bid);
      chapter.chdocs = await this.syncChapter(booksyncs, chapter.chdocs);
    }

    this.chapters = chapters;
  },

  async getChapter(sbook, cntidx) {
    let cnt = sbook.cnts[cntidx];
    if (!cnt) return [];
    let query = {
      bid: sbook.bid,
      path: cnt.path,
      size: cnt.size
    };
    let chdocs = await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_3__.fetchChapter)(query);
    return chdocs;
  },

  syncChapter(syncs, chdocs) {
    syncs.forEach(sync => {
      chdocs = syncDoc(chdocs, sync);
    });
    return chdocs;
  },

  async undo() {
    let origin = _book__WEBPACK_IMPORTED_MODULE_7__.book.sbooks.find(sbook => sbook.origin);
    let syncs = getSyncs(origin.bid);
    syncs = syncs.slice(0, -1);
    syncstore.set(origin.bid, syncs);
    let chsyncs = syncs.filter(sync => sync.idx === dgl.idx);

    let chapters = lodash__WEBPACK_IMPORTED_MODULE_1___default().cloneDeep(this.copy);

    await this.syncChapters(chapters, chsyncs);
    drawPage(chapters);
    _semaphore__WEBPACK_IMPORTED_MODULE_5__.semaphore.ready();
  },

  reload() {
    drawPage(this.chapters);
  },

  reSync(sync) {
    let chapter = this.chapters.find(chapter => chapter.bid == sync.bid);
    chapter.chdocs = syncDoc(chapter.chdocs, sync);
    let origin = _book__WEBPACK_IMPORTED_MODULE_7__.book.sbooks.find(sbook => sbook.origin);
    let syncs = getSyncs(origin.bid);
    syncs.push(sync);
    syncstore.set(origin.bid, syncs);
    drawPage(this.chapters);
    _semaphore__WEBPACK_IMPORTED_MODULE_5__.semaphore.ready();
  },

  localSearch() {
    // let instance = this.markInstance
    let instance = new Mark((0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.page'));

    if (this.localquery.length < 2) {
      instance.unmark();
      return;
    }

    let query = this.localquery;
    instance.unmark({
      done: function () {
        instance.mark(query, {
          "element": "span",
          "className": "highlight"
        });
      }
    });
  },

  drawPage() {
    drawPage(this.chapters);
  },

  scroll(state) {
    let qblockid = state.blockid;

    if (state.context) {
      // todo: тоже изменить
      let recontext = new RegExp('^' + state.context);

      for (let book of this.sbooks) {
        let blockid = 0;

        for (let doc of book.chdocs) {
          if (doc.md.split(state.context).length == 2) qblockid = blockid;
          blockid++;
        }
      }
    }

    const selector = ['#src .block[blockid="', qblockid, '"]'].join('');
    const oblock = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)(selector);
    if (!oblock) return; // todo: state.stem ?

    if (state.query) {
      let markInstance = new Mark(oblock);
      markInstance.mark(state.query, {
        "element": "span",
        "className": "highlight"
      });
    }

    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.scrollToPosition)(oblock.offsetTop - 100);
  }

};

function drawPage(chapters) {
  const scrollTop = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.page').scrollTop;
  let {
    osrc,
    otrn
  } = setPanes(_book__WEBPACK_IMPORTED_MODULE_7__.book.sbooks);
  const src = dgl.origin(chapters);
  const trn = dgl.shown(chapters);
  if (!src) return;
  let trns = dgl.trns(chapters);
  let oBlock;
  src.chdocs.forEach((doc, blockid) => {
    const aligns = [];
    oBlock = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'block');
    oBlock.setAttribute('blockid', blockid);
    osrc.appendChild(oBlock);
    let opar = parsePar(doc, src.lang);
    oBlock.appendChild(opar);
    aligns.push(opar);
    if (!trn) return;
    let otrnBlock = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'block');
    otrnBlock.setAttribute('blockid', blockid);
    otrn.appendChild(otrnBlock);
    trns.forEach(trn => {
      let trndoc = trn.chdocs[blockid];
      if (!trndoc) return;
      let opar = parsePar(trndoc, trn.lang);
      if (!trn.shown) opar.setAttribute('hdn', true);
      otrnBlock.appendChild(opar);
      aligns.push(opar);
    });
    alignPars(aligns);
  });
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.scrollToPosition)(scrollTop);
}

function getSyncs(bid) {
  let syncs = syncstore.get(bid);
  if (lodash__WEBPACK_IMPORTED_MODULE_1___default().isEmpty(syncs)) syncs = [];
  return syncs;
} // todo: export - del - для create external package

function syncDoc(docs, sync) {
  let blockid = sync.blockid;
  let doc = docs[blockid];
  if (!doc) return docs;
  let newdoc, mess;

  switch (sync.action) {
    case 'delete':
      doc.skip = true;
      break;

    case 'empty':
      doc.md = 'x'; // mess = 'paragraph emptied'

      break;

    case 'copy':
      newdoc = lodash__WEBPACK_IMPORTED_MODULE_1___default().clone(doc);
      docs.splice(blockid + 1, 0, newdoc); // mess = 'paragraph copied'

      break;

    case 'mergeNext':
      let next = docs[blockid + 1];
      if (!next) return docs;
      doc.md = [doc.md, next.md].join(' ');
      next.skip = true; // mess = 'paragraphs merged'

      break;

    case 'breakParagraph':
      let md = doc.md.toString();
      let cindex = md.indexOf(sync.param.context);
      let context = md.slice(cindex);
      let index = context.indexOf(sync.param.text);
      let head = doc.md.slice(0, cindex + index);
      let tail = doc.md.slice(cindex + index);
      if (lodash__WEBPACK_IMPORTED_MODULE_1___default().last(head) == '‘') head = head.replace(/‘$/, ''), tail = ['‘', tail].join('');
      doc.md = head;
      newdoc = lodash__WEBPACK_IMPORTED_MODULE_1___default().clone(doc);
      newdoc.md = tail;
      docs.splice(blockid + 1, 0, newdoc); // mess = ['paragraph broken by \"', sync.param.text, '\"'].join(' ')

      break;

    case 'breakSection':
      // todo:
      break;

    case 'insertAfter':
      newdoc = lodash__WEBPACK_IMPORTED_MODULE_1___default().clone(doc);
      newdoc.md = 'x';
      newdoc.fake = true;
      docs.splice(blockid + 1, 0, newdoc); // mess = 'empty paragraph incerted'

      break;

    case 'insertBefore':
      newdoc = lodash__WEBPACK_IMPORTED_MODULE_1___default().clone(doc);
      newdoc.md = 'x';
      newdoc.fake = true;
      docs.splice(blockid, 0, newdoc); // mess = ''empty paragraph incerted'

      break;

    case 'action':
      break;

    case 'action':
      break;

    default:
      // todo: any key press:
      _lib_message__WEBPACK_IMPORTED_MODULE_6__.message.show('edit actions are d, e, c, m, ia, ib, b, & ctrl+z (undo)', 'darkred');
  }

  docs = lodash__WEBPACK_IMPORTED_MODULE_1___default().filter(docs, doc => !doc.skip);
  docs.forEach((doc, idx) => doc.idx = idx);
  return docs;
}
function alignPars(opars) {
  let heights = lodash__WEBPACK_IMPORTED_MODULE_1___default().map(opars, opar => {
    return opar.scrollHeight;
  });

  let max = lodash__WEBPACK_IMPORTED_MODULE_1___default().max(heights) + 'px';
  opars.forEach((opar, idx) => {
    opar.style.height = max;
    if (opar.getAttribute('hdn')) opar.classList.add('hidden');
  });
}

function parsePar(doc, lang) {
  let parent = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.create)('div');
  if (!doc.md) doc.md = '**empty paragraph**';
  let md = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.ndash)(doc.md);
  parent.innerHTML = marked(md);
  let opar = parent.firstChild;
  opar.classList.add('ptext');
  opar.setAttribute('_id', doc._id); // отсюда узнаю path при поиске ref

  opar.setAttribute('lang', lang);
  if (doc.refnotes) opar.setAttribute('refnotes', JSON.stringify(doc.refnotes));
  if (doc.imgsrc) opar.setAttribute('imgsrc', doc.imgsrc);
  if (doc.type == 'list') opar.classList.add('plist');else if (doc.type == 'ulist') opar.classList.add('plist'), opar.classList.add('ul');

  if (doc.level) {
    let levstyle = ['h', doc.level].join('');
    opar.classList.add(levstyle);
  }

  return opar;
}

function wrapSpan(opar) {
  opar.innerHTML = opar.innerHTML.replace(/(\[[^\]]{1,4}\])/g, "<span class=\"ref\">$1</span>");
  let nodes = opar.childNodes; // let names = _.map(nodes, node=> node.nodeName)

  let html = '';
  nodes.forEach(node => {
    if (node.nodeType == 3) {
      let text = node.nodeValue; // text = text.replace(/\'/g, '᾽').replace(/\’/g, '᾽') // apocope - todo: нужно включить для greek-plugin

      html += text.replace(/([^\p{P} ]+)/ug, "<span class=\"wf\">$1</span>");
    } else if (node.nodeName == 'EM') {
      html += ['<em>', wrapSpan(node), '</em>'].join('');
    } else {
      html += node.outerHTML;
    }
  });
  return html;
} // todo: mousetrap


let scrollByKey = function (ev) {
  const opage = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.page');
  if (!opage) return;
  let height = opage.clientHeight;

  if (ev.keyCode == 38) {
    // arrow up
    if (ev.ctrlKey) opage.scrollTop = 0;else opage.scrollTop = opage.scrollTop - 24;
  } else if (ev.keyCode == 40) {
    // arrow down
    opage.scrollTop = opage.scrollTop + 24;
  } else if (ev.keyCode == 33) {
    // pageUp
    opage.scrollTop = opage.scrollTop - height + 60;
  } else if (ev.keyCode == 34) {
    // pageDown
    opage.scrollTop = opage.scrollTop + height - 60;
  } else if (ev.keyCode == 36) {
    // home, ctrl-home
    opage.scrollTop = 0;
  } else if (ev.keyCode == 35) {
    // end, ctrl-end
    opage.scrollTop = opage.scrollHeight - opage.clientHeight;
  } // show position:


  let osrc = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#src');
  if (!osrc) return;
  let hidden = osrc.classList.contains('hidden');
  if (hidden) osrc = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#trn');
  let scrolltop = opage.scrollTop;
  height = osrc.clientHeight;
  let ohr = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.show-page-position');
  if (!ohr) return;
  ohr.style.width = scrolltop / height * 90 + '%';
  if (dgl.route == 'book') ohr.style.width = 0;
};

function getPanes() {
  let osrc = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#src');
  let otrn = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#trn');
  return {
    osrc,
    otrn
  };
}

function setPanes(books) {
  let {
    osrc,
    otrn
  } = getPanes();
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.empty)(osrc);
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.empty)(otrn);
  let opage = document.querySelector('.page');

  if (books.length == 1) {
    opage.classList.remove('grid-cols-2');
    otrn.classList.add('hidden');
  } else if (_book__WEBPACK_IMPORTED_MODULE_7__.book.layout) {
    opage.classList.remove('grid-cols-2');

    if (_book__WEBPACK_IMPORTED_MODULE_7__.book.layout == 'src') {
      osrc.classList.remove('hidden');
      otrn.classList.add('hidden');
    } else if (_book__WEBPACK_IMPORTED_MODULE_7__.book.layout == 'trn') {
      osrc.classList.add('hidden');
      otrn.classList.remove('hidden');
    }
  } else {
    opage.classList.add('grid-cols-2');
    osrc.classList.remove('hidden');
    otrn.classList.remove('hidden');
  }

  return {
    osrc,
    otrn
  };
}

document.addEventListener("keydown", scrollByKey); // wrap wf to span

document.addEventListener("mouseover", function (ev) {
  if (!(0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.book')) return;
  let target = ev.target;
  if (!target.classList.contains('ptext')) return;

  if (!target.getAttribute('ok')) {
    const html = wrapSpan(target);
    target.innerHTML = html;
    target.setAttribute('ok', true);
  }
}); // show footnote

document.addEventListener("click", async ev => {
  if (!dgl.bid || dgl.editMode) return;
  let owf = ev.target.closest('span.ref');
  if (!owf) return;
  let reftext = owf.textContent;
  if (!reftext) return;
  let bid = owf.closest('#src') ? dgl.origin(_book__WEBPACK_IMPORTED_MODULE_7__.book.sbooks).bid : dgl.shown(_book__WEBPACK_IMPORTED_MODULE_7__.book.sbooks).bid;
  if (!bid) return;
  let opar = ev.target.closest('p.ptext');
  let parid = opar.getAttribute('_id');
  let refnotes = opar.getAttribute('refnotes');
  if (!refnotes) return;

  let path = lodash__WEBPACK_IMPORTED_MODULE_1___default().first(parid.split('-'));

  let ref = reftext.replace(/[\[\]]/g, '');
  let notes = JSON.parse(refnotes);
  let ref_id = notes[ref];
  let res = await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_3__.fetchFN)([ref_id], [bid]);
  let fntext = '';
  if (!res[0]) fntext = 'not found';else fntext = res[0].md;
  let ofn = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#footnote') || (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.create)('div', 'footnote');
  ofn.id = 'footnote';
  ofn.textContent = fntext;
  document.body.appendChild(ofn);
  let coords = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.getCoords)(owf);
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.placePopup)(coords, ofn);
}); // hide footnote

document.addEventListener("click", async ev => {
  let ofn = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#footnote');
  if (ofn) (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.remove)(ofn);
});
document.addEventListener("wheel", function (ev) {
  if (!ev.shiftKey) return;
  if (dgl.route != 'page') return;
  let oblock = ev.target.closest('.block');
  if (!oblock) return;
  (0,_header__WEBPACK_IMPORTED_MODULE_4__.rotateBlock)(oblock);
  oblock = ev.target.closest('.header-cell.right .block');
  if (!oblock) return;
  let par = oblock.querySelector('p.headline:not(.hidden)');
  let bid = par.getAttribute('bid');

  for (let chapter of page.chapters) {
    if (chapter.origin) continue;
    chapter.shown = false;
    if (chapter.bid == bid) chapter.shown = true;
  }

  page.reload();
}, false); // ===============

let localSearch = function (ev) {
  if (dgl.editMode) return;
  if (dgl.route != 'page') return;
  if (ev.which == 8) page.localquery = page.localquery.slice(0, -1);else if (ev.which == 27) page.localquery = '';else if (ev.key.length > 1) return;else if (ev.ctrlKey) return;else page.localquery += ev.key;
  page.localSearch();
};

document.addEventListener("keydown", localSearch);

async function exitEditMode(ev) {
  // ESC
  if (ev.which != 27) return;
  if (!(0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.header') || !dgl.editMode) return;
  _lib_progress__WEBPACK_IMPORTED_MODULE_8__.progress.show();
  dgl.editMode = false;
  (0,_semaphore__WEBPACK_IMPORTED_MODULE_5__.removeEditStyle)();
  let origin = _book__WEBPACK_IMPORTED_MODULE_7__.book.sbooks.find(sbook => sbook.origin);
  let syncs = getSyncs(origin.bid);
  syncs = syncs.filter(sync => !sync.tmp);
  syncstore.set(origin.bid, syncs);

  if (dgl.idx > -1) {
    let chapters = lodash__WEBPACK_IMPORTED_MODULE_1___default().cloneDeep(page.copy);

    let chsyncs = syncs.filter(sync => sync.idx === dgl.idx);
    await page.syncChapters(chapters, chsyncs);
    drawPage(chapters);
  }

  _header__WEBPACK_IMPORTED_MODULE_4__.header.ready();
  let omarks = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.qs)('.synchroMark');
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.removeAll)(omarks);
  _lib_message__WEBPACK_IMPORTED_MODULE_6__.message.show('all last changes lost', 'darkgreen'); // todo: book.reload()
}

document.addEventListener("keydown", exitEditMode);
mouse.bind('ctrl+s', async function (ev) {
  saveEditChanges();
});
document.addEventListener("click", ev => {
  let osave = ev.target.closest('.em-save');
  if (!osave) return;
  saveEditChanges();
});

async function saveEditChanges() {
  if (!(0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.header') || !dgl.editMode) return;
  _lib_progress__WEBPACK_IMPORTED_MODULE_8__.progress.show();
  dgl.editMode = false;
  (0,_semaphore__WEBPACK_IMPORTED_MODULE_5__.removeEditStyle)();
  _lib_message__WEBPACK_IMPORTED_MODULE_6__.message.hide();
  let origin = _book__WEBPACK_IMPORTED_MODULE_7__.book.sbooks.find(sbook => sbook.origin);
  let syncs = getSyncs(origin.bid); // if (dgl.idx) {
  //   let syncs = getSyncs(origin.bid)
  //   // syncs = syncs.map(sync=> {
  //   //   let newsync = {bid: sync.bid, action: sync.action, idx: sync.idx, blockid: sync.blockid}
  //   //   if (sync.param) newsync.param = sync.param
  //   //   return newsync
  //   // })
  //   syncs.forEach(sync=> delete sync.tmp)
  //   syncstore.set(dgl.bid, syncs)
  // }

  syncs.forEach(sync => delete sync.tmp);
  syncstore.set(dgl.bid, syncs);
  _header__WEBPACK_IMPORTED_MODULE_4__.header.ready();
  _lib_message__WEBPACK_IMPORTED_MODULE_6__.message.show('changes saved', 'darkgreen');
  let omarks = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.qs)('.synchroMark');
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.removeAll)(omarks);
}

function showSearchIcon() {
  (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#search-icon').classList.remove('hidden');
}

function showPagePosition() {
  let obody = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('body');
  let opos = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.create)('hr', 'show-page-position');
  obody.appendChild(opos);
}

/***/ }),

/***/ "./src/prefs.js":
/*!**********************!*\
  !*** ./src/prefs.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "preference": () => (/* binding */ preference)
/* harmony export */ });
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./book */ "./src/book.js");
/* harmony import */ var _lib_progress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/progress */ "./src/lib/progress.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");






const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");

const {
  app
} = __webpack_require__(/*! electron */ "electron").remote;


let dgl = electron__WEBPACK_IMPORTED_MODULE_3__.remote.getGlobal('dgl');

const {
  dialog
} = __webpack_require__(/*! electron */ "electron").remote;





const Store = __webpack_require__(/*! electron-store */ "electron-store");

const prefstore = new Store({
  name: 'prefs'
});
const appstore = new Store({
  name: 'appstore'
});
let homepath = app.getPath('home');
let exportpath = appstore.get('exportpath');

if (!exportpath) {
  exportpath = homepath;
  appstore.set('exportpath', exportpath);
}

const preference = {
  async ready() {
    if (!checkBooks()) return;
    (0,_app__WEBPACK_IMPORTED_MODULE_2__.render)('prefs');
    this.tbody = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#prefs-table .tbody');
    const odata = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#pref-package-data');
    let origin = dgl.origin(_book__WEBPACK_IMPORTED_MODULE_4__.book.sbooks);
    let oauthor = odata.querySelector('#pref-book-author');
    oauthor.textContent = origin.descr.author;
    let otitle = odata.querySelector('#pref-book-title');
    otitle.textContent = origin.descr.title;
    this.origin = origin;
    let prefs = prefstore.get(origin.bid) || this.initPrefs(origin);
    this.prefs = prefs;
    const oexportpath = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('#exportpath');
    oexportpath.textContent = exportpath;

    for (let name in prefs) {
      if (name == 'exportpath') continue;
      if (name == 'bpath') continue;

      if (name == 'files') {
        let files = prefs.files;

        for (let fn in files) {// let value = files[fn]
          // this.addRow('file', fn, value)
        }
      } else {
        this.addRow('str', name, prefs[name]);
      }
    }

    this.stripes();
  },

  initPrefs(origin) {
    let defaults = {
      name: '',
      version: '1.0.0',
      'editor': 'John Doe',
      email: 'john.doe@example.com',
      homepage: 'http://example.com',
      license: 'CC BY-SA',
      keywords: 'diglossa, bilingua, dgl' // 'exportpath': exportpath,
      // files: {
      //   css: 'path-to-file',
      //   images: 'path-to-file',
      //   info: 'path-to-file',
      //   annotation: 'path-to-file',
      //   license: 'path-to-file',
      //   acknowledgements: 'path-to-file'
      // },

    };
    defaults.name = [origin.descr.author, origin.descr.title].join(' ').replace(/ +/g, '-');
    prefstore.set(origin.bid, defaults);
    return defaults;
  },

  addRow(type, name, value) {
    const tmpl = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.q)('.prefs-line.tmpl');
    const orow = tmpl.cloneNode(true);
    orow.classList.remove('tmpl');
    orow.setAttribute('type', type);
    orow.setAttribute('prefname', name);
    let oname = orow.querySelector('.td-name');
    let ovalue = orow.querySelector('.td-value');
    ovalue.setAttribute('contenteditable', true);
    oname.textContent = name;
    ovalue.textContent = value;
    this.tbody.appendChild(orow);
  },

  stripes() {
    let orows = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_0__.qs)('.prefs-line:not(.hidden)');
    let n = 0;

    for (let orow of orows) {
      if (n % 2 === 1) orow.classList.remove('odd'), orow.classList.add('even');else orow.classList.add('odd'), orow.classList.remove('even');
      n++;
    }
  }

};
document.addEventListener('click', ev => {
  let opack = ev.target.closest('#package');
  if (opack) openDialogExportPath();
});

function openDialogExportPath() {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(result => {
    const bpath = result.filePaths[0];
    if (!bpath) return;
    exportpath = bpath;
    appstore.set('exportpath', bpath);
    preference.ready();
  }).catch(err => {
    console.log(err);
  });
}

document.addEventListener('keydown', ev => {
  if (ev.key !== 'Enter') return;
  ev.preventDefault();
  if (!checkBooks()) return;
  let orow = ev.target.closest('.prefs-line');
  if (!orow) return;
  let origin = dgl.origin(_book__WEBPACK_IMPORTED_MODULE_4__.book.sbooks);
  let prefs = prefstore.get(origin.bid);
  let name = orow.querySelector('.td-name').textContent.trim();
  let value = orow.querySelector('.td-value').textContent.trim();
  let prefname = [preference.origin.bid, name].join('.');
  prefstore.set(prefname, value);
  prefstore.set(origin.bid, prefs);
  preference.ready();
});
mouse.bind('ctrl+p', function (ev) {
  const state = {
    route: 'preference'
  };
  (0,_app__WEBPACK_IMPORTED_MODULE_2__.router)(state);
});

function checkBooks() {
  if (dgl.bid && _book__WEBPACK_IMPORTED_MODULE_4__.book.sbooks) return true;
  _lib_message__WEBPACK_IMPORTED_MODULE_6__.message.show('select a book', 'darkred');
}

/***/ }),

/***/ "./src/search.js":
/*!***********************!*\
  !*** ./src/search.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "search": () => (/* binding */ search),
/* harmony export */   "hideSearchInput": () => (/* binding */ hideSearchInput)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _lib_pouch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/pouch */ "./src/lib/pouch.js");
/* harmony import */ var _lib_progress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/progress */ "./src/lib/progress.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page */ "./src/page.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./book */ "./src/book.js");
/* harmony import */ var _lib_stemmer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/stemmer */ "./src/lib/stemmer.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _exportBook__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./exportBook */ "./src/exportBook.js");








const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");

const FlexSearch = __webpack_require__(/*! flexsearch */ "flexsearch");



const Mark = __webpack_require__(/*! mark.js */ "mark.js");








let dgl = electron__WEBPACK_IMPORTED_MODULE_1__.remote.getGlobal('dgl');
let templates = electron__WEBPACK_IMPORTED_MODULE_1__.remote.getGlobal('templates');

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const ftstore = new Store({
  name: 'fts'
});
const bkstore = new Store({
  name: 'libks'
});
const syncstore = new Store({
  name: 'syncs'
});
const ftsopts = {
  depth: 3,
  doc: {
    id: 'idx',
    field: 'md',
    store: 'ids'
  },
  tokenize: function (str) {
    return str.split(/[\p{P} ]+/ug).filter(Boolean);
  }
};
let fts = importFts();

function importFts() {
  let fts = [];

  for (let lang in ftstore.store) {
    let langfts = ftstore.store[lang];

    for (let bid in langfts) {
      let bidfts = langfts[bid];

      for (let cntidx in bidfts) {
        let json = bidfts[cntidx];
        let ftsidx = new FlexSearch(ftsopts);
        ftsidx.import(json);
        ftsidx.bid = bid;
        ftsidx.lang = lang;
        ftsidx.cntidx = cntidx;
        fts.push(ftsidx);
      }
    }
  }

  return fts;
}

electron__WEBPACK_IMPORTED_MODULE_1__.ipcRenderer.on('generateFTS', function (event) {
  generateFTS();
}); // todo: remove generateFTS

mouse.bind('ctrl+g', function (ev) {
  generateFTS();
});

async function generateFTS() {
  if (!dgl.bid) {
    _lib_message__WEBPACK_IMPORTED_MODULE_7__.message.show('select a book', 'darkred');
    return;
  }

  _lib_progress__WEBPACK_IMPORTED_MODULE_5__.progress.show();
  let oprocent = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('#dict-progress');
  let originbid = dgl.origin(_book__WEBPACK_IMPORTED_MODULE_8__.book.sbooks).bid;
  let origin = dgl.origin(_book__WEBPACK_IMPORTED_MODULE_8__.book.sbooks);
  let csyncs = (0,_book__WEBPACK_IMPORTED_MODULE_8__.getCSyncs)(origin.bid);
  let syncs = (0,_page__WEBPACK_IMPORTED_MODULE_6__.getSyncs)(origin.bid);
  let sbooks = dgl.actives(_book__WEBPACK_IMPORTED_MODULE_8__.book.sbooks);
  _book__WEBPACK_IMPORTED_MODULE_8__.book.sbooks = _book__WEBPACK_IMPORTED_MODULE_8__.book.syncCnts(sbooks, csyncs);

  for await (let sbook of _book__WEBPACK_IMPORTED_MODULE_8__.book.sbooks) {
    let mess = ['indexing', sbook.lang, sbook.descr.title, '...'].join(' - ');
    _lib_message__WEBPACK_IMPORTED_MODULE_7__.message.show(mess, 'darkgreen', true);
    let total = sbook.cnts.length;
    const stemmer = (0,_lib_stemmer__WEBPACK_IMPORTED_MODULE_9__.porter)(sbook.lang);

    for await (let cnt of sbook.cnts) {
      showProgress(oprocent, total, cnt.idx + 1);
      await sleep(1000);
      let queries = _book__WEBPACK_IMPORTED_MODULE_8__.book.sbooks.map(sbook => {
        let qcnt = sbook.cnts[cnt.idx];
        if (!qcnt) return false;
        return {
          bid: sbook.bid,
          path: qcnt.path,
          size: qcnt.size,
          lang: sbook.lang
        };
      });
      queries = lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(queries);
      let chapters = await _page__WEBPACK_IMPORTED_MODULE_6__.page.getChapters(_book__WEBPACK_IMPORTED_MODULE_8__.book, cnt.idx);
      chapters = await syncChapters(chapters, syncs);
      let chapter = chapters.find(chapter => chapter.bid == sbook.bid);
      let chdocs = chapter.chdocs;
      let clean, doc;
      let cleans = chdocs.map((chdoc, idx) => {
        // if (!chdoc.md) log('_NO MD', idx, chdoc)
        let ids = chapters.map((chapter, idy) => {
          doc = chapter.chdocs[idx];
          if (!doc) return false;
          return {
            bid: idy,
            id: doc._id
          };
        });
        ids = lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(ids);
        clean = {
          idx,
          ids
        };

        try {
          if (stemmer) clean.md = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.tokenizer)(chdoc.md).map(wf => stemmer(wf)).join(' ');else clean.md = chdoc.md;
        } catch (err) {
          console.log('_ERR TOKEN:', err);
          return null;
        }

        return clean;
      });
      cleans = lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(cleans);
      let ftspath = [sbook.lang, originbid, cnt.idx].join('.');
      let ftsidx = new FlexSearch(ftsopts);
      ftsidx.add(cleans);
      let json = ftsidx.export();
      ftstore.set(ftspath, json);
    } // for sbook.cnts

  }

  fts = importFts();
  oprocent.classList.add('hidden');
  let mess = 'full text search index generated';
  _lib_message__WEBPACK_IMPORTED_MODULE_7__.message.show(mess, 'darkgreen');
} // // todo: через export getSyncs, del
// function getSyncs(bid) {
//   let syncs = syncstore.get(bid)
//   if (_.isEmpty(syncs)) syncs = []
//   return syncs
// }
// это почти копия из page


async function syncChapters(chapters, syncs) {
  for await (let chapter of chapters) {
    let booksyncs = syncs.filter(sync => sync.bid == chapter.bid);
    chapter.chdocs = await _page__WEBPACK_IMPORTED_MODULE_6__.page.syncChapter(booksyncs, chapter.chdocs);
  }

  return chapters;
}

const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
};

function showProgress(oprocent, total, size) {
  oprocent.classList.remove('hidden');
  let percent = Math.round(size * 100 / total);
  if (percent < 100) oprocent.textContent = [percent, '%'].join(' ');else oprocent.textContent = '', oprocent.classList.add('hidden');
}

const search = {
  async ready(state) {
    _lib_progress__WEBPACK_IMPORTED_MODULE_5__.progress.show();
    (0,_app__WEBPACK_IMPORTED_MODULE_3__.render)('search');
    const oquery = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('#search-query');
    oquery.textContent = state.query;
    this.query(state);
  },

  async query(state) {
    let results = [];

    for await (let ftsidx of fts) {
      const stemmer = (0,_lib_stemmer__WEBPACK_IMPORTED_MODULE_9__.porter)(ftsidx.lang);
      let rstem;

      try {
        rstem = state.query.split(' ').map(st => stemmer(st));
      } catch (err) {
        // log('_ERR: bad stemmer')
        continue;
      }

      if (!rstem.length) continue;
      rstem = rstem.join(' '); // let ftsres = ftsidx.search(stem, { limit: 5 })

      let ftsres = ftsidx.search(rstem);
      if (!ftsres.length) continue;

      for (let res of ftsres) {
        results.push({
          bid: ftsidx.bid,
          cntidx: ftsidx.cntidx,
          lang: ftsidx.lang,
          ids: res.ids,
          rstem
        });
      }
    }

    let randoms = lodash__WEBPACK_IMPORTED_MODULE_0___default().shuffle(results);

    let oresults = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('#search-list');
    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.empty)(oresults);
    mark((0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('.search-query'), state.query);
    let orow;

    for await (let ftsres of randoms) {
      orow = await this.parseBlock(ftsres);
      if (!orow) return;
      oresults.appendChild(orow);
      mark(orow, ftsres.rstem);
    }

    _lib_progress__WEBPACK_IMPORTED_MODULE_5__.progress.hide();
  },

  async parseBlock(ftsres) {
    let books = bkstore.get(ftsres.bid);
    if (!books) return;
    let params = ftsres.ids.map((param, idx) => {
      param.bid = books[idx].bid;
      param.lang = books[idx].lang;
      return param;
    });
    let dbdocs = await (0,_lib_pouch__WEBPACK_IMPORTED_MODULE_4__.fetchBlock)(params);
    dbdocs = lodash__WEBPACK_IMPORTED_MODULE_0___default().compact(dbdocs);
    let mds = dbdocs.map(doc => doc.md);
    let origin = dgl.origin(books);
    let sname = origin.cnts[ftsres.cntidx].md;
    const tmpl = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('.list-line.tmpl');
    const orow = tmpl.cloneNode(true);
    orow.classList.remove('tmpl');
    orow.classList.remove('hidden');
    orow.setAttribute('bid', ftsres.bid);
    orow.setAttribute('idx', ftsres.cntidx);
    orow.setAttribute('blockid', ftsres.blockid);
    let ohead = orow.querySelector('.line-head');
    let oauthor = ohead.querySelector('.line-author');
    oauthor.textContent = origin.descr.author;
    let otitle = ohead.querySelector('.line-title');
    otitle.textContent = origin.descr.title;
    let osname = ohead.querySelector('.line-sname');
    osname.textContent = sname;
    ohead.classList.add('truncate');
    let oblock = orow.querySelector('.block');
    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.empty)(oblock);
    let shown = true;

    for (const dbdoc of dbdocs) {
      let opar = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.create)('p', 'ptext');
      opar.setAttribute('lang', dbdoc.lang);
      opar.textContent = dbdoc.md;
      if (shown) shown = false;else opar.classList.add('hidden');
      oblock.appendChild(opar);
    }

    return orow;
  }

};

function mark(el, query) {
  let markInstance = new Mark(el);
  markInstance.mark(query, {
    "element": "span",
    "className": "highlight"
  });
}

mouse.bind('ctrl+c', function (ev) {
  const owf = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('span.wf:hover');
  if (!owf) return;
  const text = owf.textContent;
  electron__WEBPACK_IMPORTED_MODULE_1__.clipboard.writeText(text);
});
document.addEventListener("click", ev => {
  if (dgl.route != 'search') return;
  const oheader = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('.header-active');
  if (!oheader) return;
  let oinput = ev.target.closest('input.search-input');
  if (!oinput) return;

  if (oheader.classList.contains('hidden')) {
    hideSearchInput();
  } else {
    showSearchInput();
  }
});

function showSearchInput(query) {
  const oheader = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('.header-active');
  if (!oheader) return;
  let oinput = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('input.search-input');
  const osearch = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('#search');
  oheader.classList.add('hidden');
  osearch.classList.add('search-full');
  oinput.classList.add('search-input-full');
  oinput.placeholder = 'search...';
  if (query) oinput.value = query;
}

function hideSearchInput() {
  const oheader = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('.header-active');
  if (!oheader) return;
  let oinput = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('input.search-input');
  const osearch = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('#search');
  oheader.classList.remove('hidden');
  osearch.classList.remove('search-full');
  oinput.classList.remove('search-input-full');
  oinput.placeholder = '';
  oinput.value = '';
} // todo: восстановить showSearchInput()

mouse.bind('ctrl+f', function (ev) {
  const owf = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('span.wf:hover');
  if (!owf) return;
  const query = owf.textContent;
  const opar = owf.closest('p.ptext');
  const lang = opar.getAttribute('lang');
  const oblock = owf.closest('.block');
  const blockid = oblock.getAttribute('blockid') * 1; // const books = bkstore.get(dgl.bid)

  const origin = dgl.origin(_book__WEBPACK_IMPORTED_MODULE_8__.book.sbooks);
  const state = {
    route: 'search',
    bid: dgl.bid,
    idx: dgl.idx,
    blockid,
    query,
    lang,
    descr: origin.descr
  }; // search.query(state)

  (0,_app__WEBPACK_IMPORTED_MODULE_3__.router)(state);
}); // jump to search result

document.addEventListener("click", ev => {
  if (dgl.route != 'search') return;
  let oblock = ev.target.closest('.block');
  if (oblock) return;
  const oline = ev.target.closest('.list-line');
  if (!oline) return;
  const bid = oline.getAttribute('bid');
  const idx = oline.getAttribute('idx') * 1;
  const context = oline.getAttribute('context');
  let oquery = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('#search-query');
  let query = oquery.textContent;
  const state = {
    route: 'page',
    bid,
    idx,
    query,
    context,
    jump: true
  };
  (0,_app__WEBPACK_IMPORTED_MODULE_3__.router)(state);
});
document.addEventListener("wheel", function (ev) {
  if (!ev.shiftKey) return;
  if (dgl.route != 'search') return;
  let oblock = ev.target.closest('.block');
  if (!oblock) return;
  (0,_header__WEBPACK_IMPORTED_MODULE_10__.rotateBlock)(oblock);
}, false);
document.addEventListener("click", ev => {
  if (dgl.route != 'search') return;
  let oblock = ev.target.closest('.block');
  if (!oblock) return;
  oblock.classList.toggle('truncate');
});

document.getElementById('search-icon').onclick = function () {
  _page__WEBPACK_IMPORTED_MODULE_6__.page.localquery = '';
  let oicon = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('#search-icon');
  oicon.classList.add('hidden');
  let oinput = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('#search-input');
  oinput.classList.remove('hidden');
  oinput = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('.searchinput');
  oinput.value = '';
  oinput.focus();
};

let escInput = function (ev) {
  if (ev.which == 27) hideSearchField();else if (ev.which == 13) fireFTSearch();
};

document.addEventListener('keydown', escInput, true);

function hideSearchField() {
  let oinput = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('.searchinput');
  oinput.blur();
  oinput = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('#search-input');
  oinput.classList.add('hidden');
  let oicon = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('#search-icon');
  oicon.classList.remove('hidden');
}

function fireFTSearch() {
  let oinput = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.q)('.searchinput');
  let query = oinput.value;
  if (!query) return;
  const state = {
    route: 'search',
    query
  }; // search.query(state)

  (0,_app__WEBPACK_IMPORTED_MODULE_3__.router)(state);
  hideSearchField();
}

/***/ }),

/***/ "./src/semaphore.js":
/*!**************************!*\
  !*** ./src/semaphore.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "removeEditStyle": () => (/* binding */ removeEditStyle),
/* harmony export */   "semaphore": () => (/* binding */ semaphore)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _lib_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/message */ "./src/lib/message.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _autosync__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./autosync */ "./src/autosync.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page */ "./src/page.js");
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./book */ "./src/book.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_8__);






const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");





const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const syncstore = new Store({
  name: 'syncs'
});

const natural = __webpack_require__(/*! natural */ "natural");

const tokenizer = new natural.WordTokenizer();

const sw = __webpack_require__(/*! stopword */ "stopword");

const langs = __webpack_require__(/*! langs */ "langs"); // const a = require('debug')('cycle')
// const d = require('debug')('sync')




let style = document.createElement('style');
style.type = 'text/css';
style.id = 'editStyle';
document.getElementsByTagName('head')[0].appendChild(style);

let dgl = electron__WEBPACK_IMPORTED_MODULE_8__.remote.getGlobal('dgl');
let templates = electron__WEBPACK_IMPORTED_MODULE_8__.remote.getGlobal('templates');

function addEditStyle() {
  style.innerHTML = 'p.ptext:hover {background-color: #eefddd; }';
}

function removeEditStyle() {
  style.innerHTML = '';
  let oed = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.editable');
  if (oed) oed.classList.remove('editable');
  oed = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.editable-wf');
  if (oed) oed.classList.remove('editable-wf');
}
mouse.bind('ctrl+e', function (ev) {
  if (!(0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.header') || dgl.editMode) return;
  dgl.editMode = true;
  _lib_message__WEBPACK_IMPORTED_MODULE_3__.message.hide();
  semaphore.ready();
}); // что тут происхоит при смене языка ?

const semaphore = {
  async ready() {
    setEmptyHeader();
    setSemaphore();
    if (!dgl.idx) setCntSynchroMarks();
  }

};

async function setSemaphore() {
  if (!_book__WEBPACK_IMPORTED_MODULE_7__.book.shown()) return;
  let ocircle = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('svg #em-big-circle');
  let oleft = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('#em-src-size');
  let oright = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('#em-trn-size');
  let osrc = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('#em-lang-origin');
  let otrn = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('#em-lang-shown');

  if (dgl.idx && _page__WEBPACK_IMPORTED_MODULE_6__.page) {
    // let chapters = await page.getChapters(book, dgl.idx)
    let chapters = await _page__WEBPACK_IMPORTED_MODULE_6__.page.chapters;
    let origin = dgl.origin(chapters);
    let shown = dgl.shown(chapters);
    if (origin.chdocs.length == shown.chdocs.length) ocircle.setAttribute('fill', 'green');
    oleft.textContent = origin.chdocs.length;
    oright.textContent = shown.chdocs.length;
    osrc.textContent = origin.lang;
    otrn.textContent = shown.lang;
  } else if (_book__WEBPACK_IMPORTED_MODULE_7__.book) {
    let origin = _book__WEBPACK_IMPORTED_MODULE_7__.book.origin();
    let shown = _book__WEBPACK_IMPORTED_MODULE_7__.book.shown();
    if (origin.cnts.length == shown.cnts.length) ocircle.setAttribute('fill', 'green');
    oleft.textContent = origin.cnts.length;
    oright.textContent = shown.cnts.length;
    osrc.textContent = origin.lang;
    otrn.textContent = shown.lang;
  }
}

function setCntSynchroMarks() {
  let osvg = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('svg.svg-circle');
  if (!osvg) return;
  let oapp = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('#app');
  let osrcs = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.qs)('#src p.tree-text:not(.hidden)');

  for (let osrc of osrcs) {
    let idx = osrc.getAttribute('idx');
    let srcsize = osrc.getAttribute('size');
    let selector = ['#trn p.tree-text:not(.hidden)[idx="', idx, '"]'].join('');
    let otrn = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)(selector);
    if (!otrn) continue;
    let oblock = otrn.closest('.block');
    let trnsize = otrn.getAttribute('size');
    const omark = osvg.cloneNode(true);
    omark.classList.add('synchroMark');
    oblock.parentNode.insertBefore(omark, oblock);
    let title = [srcsize, trnsize].join('/');
    let ocircle = omark.querySelector('circle');
    if (srcsize == trnsize) ocircle.setAttribute('fill', 'green');else ocircle.setAttribute('fill', 'red');
    let otitle = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.create)('title');
    otitle.textContent = title;
    ocircle.appendChild(otitle);
  }
}

function setEmptyHeader() {
  let oheader = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.header');
  oheader.innerHTML = templates.semaphore;
  oheader.classList.remove('grid-cols-2');
  addEditStyle();
}

function synchronize(action, param) {
  if (!dgl.editMode) return;
  const oblock = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.block:hover');

  if (!oblock) {
    _lib_message__WEBPACK_IMPORTED_MODULE_3__.message.show('select chapter / paragraph to synchronize', 'darkred');
    return;
  }

  let bid = oblock.closest('#src') ? _book__WEBPACK_IMPORTED_MODULE_7__.book.origin().bid : _book__WEBPACK_IMPORTED_MODULE_7__.book.shown().bid;
  let sync = {
    bid,
    action,
    tmp: true
  }; // idx не нужен, bid только для origin/shown

  if (dgl.idx > -1) {
    const blockid = oblock.getAttribute('blockid') * 1;
    sync.blockid = blockid;
    sync.idx = dgl.idx;
    if (param) sync.param = param;
    _page__WEBPACK_IMPORTED_MODULE_6__.page.reSync(sync);
  } else {
    const opar = oblock.querySelector('p.tree-text:hover:not(.hidden)');
    if (!opar) return;
    const path = opar.getAttribute('path');
    sync.path = path;
    _book__WEBPACK_IMPORTED_MODULE_7__.book.reSync(sync);
  }
}

mouse.bind('ctrl+z', function (ev) {
  if (!dgl.editMode) return;
  if (dgl.idx > -1) _page__WEBPACK_IMPORTED_MODULE_6__.page.undo();else _book__WEBPACK_IMPORTED_MODULE_7__.book.undo();
});
mouse.bind('d', function (ev) {
  synchronize('delete');
});
mouse.bind('b', function (ev) {
  let oed = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.editable-wf');

  if (!oed) {
    _lib_message__WEBPACK_IMPORTED_MODULE_3__.message.show('choose wordform to break paragraph', 'darkred');
    return;
  }

  let text = oed.textContent;
  let prev, pprev, next, nnext;
  prev = oed.previousSibling.textContent;
  if (prev) pprev = oed.previousSibling.previousSibling;
  if (pprev) pprev = pprev.textContent;
  next = oed.nextSibling.textContent;
  if (next) nnext = oed.nextSibling.nextSibling;
  if (nnext) nnext = nnext.textContent;
  let context = [pprev, prev, text, next, nnext].join(''); // quotation marks and dashes placed afte wf:

  let restricted = ['–', '\"'];

  if (oed.previousSibling && oed.previousElementSibling != oed.previousSibling && restricted.includes(oed.previousSibling.textContent.trim())) {
    text = [oed.previousSibling.textContent, text].join('');
    let re = new RegExp(oed.previousSibling.textContent + '$');
    prev = prev.replace(re, '');
    context = [pprev, prev, text, next, nnext].join('');
  }

  let param = {
    context,
    text
  };
  synchronize('breakParagraph', param);
});
mouse.bind('m', function (ev) {
  synchronize('mergeNext');
});
mouse.bind('i a', function (ev) {
  synchronize('insertAfter');
});
mouse.bind('i b', function (ev) {
  synchronize('insertBefore');
});
mouse.bind('e', function (ev) {
  synchronize('empty');
});
mouse.bind('c', function (ev) {
  synchronize('copy');
});
mouse.bind('right', function (ev) {
  synchronize('right');
}); // set editable block and wf

document.addEventListener("click", ev => {
  if (!dgl.editMode) return;
  let owf = ev.target.closest('span.wf');
  if (!owf) return;
  let oblock = ev.target.closest('.block');
  if (!oblock) return;
  let oed = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.editable');
  if (oed) oed.classList.remove('editable');
  oblock.classList.add('editable');
  oed = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.editable-wf');
  if (oed) oed.classList.remove('editable-wf');
  owf.classList.add('editable-wf');
});
mouse.bind('ctrl+t', function (ev) {
  if (!dgl.editMode) return;
  if (!dgl.idx) return;
  let oblocks = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.qs)('.page .block');
  let oblock = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.q)('.page .block[blockid="0"]');
  let trnk = oblock.classList.contains('truncate') ? true : false;

  lodash__WEBPACK_IMPORTED_MODULE_0___default().each(oblocks, oblock => {
    if (trnk) oblock.classList.remove('truncate'), oblock.classList.remove('truncated');else oblock.classList.add('truncate'), oblock.classList.add('truncated');
  }); // todo: ??? а будет ли работать align pars без пересчета?

});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/compiled.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/compiled.css ***!
  \********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "/*! tailwindcss v2.1.2 | MIT License | https://tailwindcss.com */\n\n/*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */\n\n/*\nDocument\n========\n*/\n\n/**\nUse a better box model (opinionated).\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box;\n}\n\n/**\nUse a more readable tab size (opinionated).\n*/\n\nhtml {\n  -moz-tab-size: 4;\n  tab-size: 4;\n}\n\n/**\n1. Correct the line height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n*/\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/*\nSections\n========\n*/\n\n/**\nRemove the margin in all browsers.\n*/\n\nbody {\n  margin: 0;\n}\n\n/**\nImprove consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)\n*/\n\nbody {\n  font-family:\n\t\tsystem-ui,\n\t\t-apple-system, /* Firefox supports this but not yet `system-ui` */\n\t\t'Segoe UI',\n\t\tRoboto,\n\t\tHelvetica,\n\t\tArial,\n\t\tsans-serif,\n\t\t'Apple Color Emoji',\n\t\t'Segoe UI Emoji';\n}\n\n/*\nGrouping content\n================\n*/\n\n/**\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n}\n\n/*\nText-level semantics\n====================\n*/\n\n/**\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr[title] {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/**\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)\n2. Correct the odd 'em' font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family:\n\t\tui-monospace,\n\t\tSFMono-Regular,\n\t\tConsolas,\n\t\t'Liberation Mono',\n\t\tMenlo,\n\t\tmonospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/**\nPrevent 'sub' and 'sup' elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\nTabular data\n============\n*/\n\n/**\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n}\n\n/*\nForms\n=====\n*/\n\n/**\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\nRemove the inheritance of text transform in Edge and Firefox.\n1. Remove the inheritance of text transform in Firefox.\n*/\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\nCorrect the inability to style clickable types in iOS and Safari.\n*/\n\nbutton,\n[type='button'] {\n  -webkit-appearance: button;\n}\n\n/**\nRemove the inner border and padding in Firefox.\n*/\n\n/**\nRestore the focus styles unset by the previous rule.\n*/\n\n/**\nRemove the additional ':invalid' styles in Firefox.\nSee: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737\n*/\n\n/**\nRemove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.\n*/\n\nlegend {\n  padding: 0;\n}\n\n/**\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n/**\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n/**\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to 'inherit' in Safari.\n*/\n\n/*\nInteractive\n===========\n*/\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/**\n * Manually forked from SUIT CSS Base: https://github.com/suitcss/base\n * A thin layer on top of normalize.css that provides a starting point more\n * suitable for web applications.\n */\n\n/**\n * Removes the default spacing and border for appropriate elements.\n */\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nbutton {\n  background-color: transparent;\n  background-image: none;\n}\n\n/**\n * Work around a Firefox/IE bug where the transparent `button` background\n * results in a loss of the default `button` focus styles.\n */\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nol,\nul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/**\n * Tailwind custom reset styles\n */\n\n/**\n * 1. Use the user's configured `sans` font-family (with Tailwind's default\n *    sans-serif font stack as a fallback) as a sane default.\n * 2. Use Tailwind's default \"normal\" line-height so the user isn't forced\n *    to override it to ensure consistency even when using the default theme.\n */\n\nhtml {\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 1 */\n  line-height: 1.5; /* 2 */\n}\n\n/**\n * Inherit font-family and line-height from `html` so users can set them as\n * a class directly on the `html` element.\n */\n\nbody {\n  font-family: inherit;\n  line-height: inherit;\n}\n\n/**\n * 1. Prevent padding and border from affecting element width.\n *\n *    We used to set this in the html element and inherit from\n *    the parent element for everything else. This caused issues\n *    in shadow-dom-enhanced elements like <details> where the content\n *    is wrapped by a div with box-sizing set to `content-box`.\n *\n *    https://github.com/mozdevs/cssremedy/issues/4\n *\n *\n * 2. Allow adding a border to an element by just adding a border-width.\n *\n *    By default, the way the browser specifies that an element should have no\n *    border is by setting it's border-style to `none` in the user-agent\n *    stylesheet.\n *\n *    In order to easily add borders to elements by just setting the `border-width`\n *    property, we change the default border-style for all elements to `solid`, and\n *    use border-width to hide them instead. This way our `border` utilities only\n *    need to set the `border-width` property instead of the entire `border`\n *    shorthand, making our border utilities much more straightforward to compose.\n *\n *    https://github.com/tailwindcss/tailwindcss/pull/116\n */\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n\n/*\n * Ensure horizontal rules are visible by default\n */\n\nhr {\n  border-top-width: 1px;\n}\n\n/**\n * Undo the `border-style: none` reset that Normalize applies to images so that\n * our `border-{width}` utilities have the expected effect.\n *\n * The Normalize reset is unnecessary for us since we default the border-width\n * to 0 on all elements.\n *\n * https://github.com/tailwindcss/tailwindcss/issues/362\n */\n\nimg {\n  border-style: solid;\n}\n\ntextarea {\n  resize: vertical;\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1;\n  color: #9ca3af;\n}\n\nbutton {\n  cursor: pointer;\n}\n\ntable {\n  border-collapse: collapse;\n}\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/**\n * Reset links to optimize for opt-in styling instead of\n * opt-out.\n */\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/**\n * Reset form element properties that are easy to forget to\n * style explicitly so you don't inadvertently introduce\n * styles that deviate from your design system. These styles\n * supplement a partial reset that is already applied by\n * normalize.css.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  padding: 0;\n  line-height: inherit;\n  color: inherit;\n}\n\n/**\n * Use the configured 'mono' font family for elements that\n * are expected to be rendered with a monospace font, falling\n * back to the system monospace stack if there is no configured\n * 'mono' font family.\n */\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\n/**\n * Make replaced elements `display: block` by default as that's\n * the behavior you want almost all of the time. Inspired by\n * CSS Remedy, with `svg` added as well.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block;\n  vertical-align: middle;\n}\n\n/**\n * Constrain images and videos to the parent width and preserve\n * their intrinsic aspect ratio.\n *\n * https://github.com/mozdevs/cssremedy/issues/14\n */\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));\n}\n\n.bg-gray-100 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));\n}\n\n.bg-gray-200 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));\n}\n\n.bg-red-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(239, 68, 68, var(--tw-bg-opacity));\n}\n\n.bg-green-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(16, 185, 129, var(--tw-bg-opacity));\n}\n\n.bg-blue-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgba(59, 130, 246, var(--tw-bg-opacity));\n}\n\n.hover\\:bg-red-700:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(185, 28, 28, var(--tw-bg-opacity));\n}\n\n.hover\\:bg-green-700:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(4, 120, 87, var(--tw-bg-opacity));\n}\n\n.hover\\:bg-blue-700:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(29, 78, 216, var(--tw-bg-opacity));\n}\n\n.border-gray-300 {\n  --tw-border-opacity: 1;\n  border-color: rgba(209, 213, 219, var(--tw-border-opacity));\n}\n\n.rounded {\n  border-radius: 0.25rem;\n}\n\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n\n.border {\n  border-width: 1px;\n}\n\n.border-b {\n  border-bottom-width: 1px;\n}\n\n.block {\n  display: block;\n}\n\n.flex {\n  display: flex;\n}\n\n.table {\n  display: table;\n}\n\n.grid {\n  display: grid;\n}\n\n.hidden {\n  display: none;\n}\n\n.flex-row {\n  flex-direction: row;\n}\n\n.flex-col {\n  flex-direction: column;\n}\n\n.flex-nowrap {\n  flex-wrap: nowrap;\n}\n\n.items-start {\n  align-items: flex-start;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-end {\n  justify-content: flex-end;\n}\n\n.justify-center {\n  justify-content: center;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.flex-grow-0 {\n  flex-grow: 0;\n}\n\n.flex-grow {\n  flex-grow: 1;\n}\n\n.font-semibold {\n  font-weight: 600;\n}\n\n.font-bold {\n  font-weight: 700;\n}\n\n.h-5 {\n  height: 1.25rem;\n}\n\n.h-6 {\n  height: 1.5rem;\n}\n\n.h-8 {\n  height: 2rem;\n}\n\n.h-full {\n  height: 100%;\n}\n\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n\n.text-lg {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n\n.text-3xl {\n  font-size: 1.875rem;\n  line-height: 2.25rem;\n}\n\n.m-4 {\n  margin: 1rem;\n}\n\n.m-8 {\n  margin: 2rem;\n}\n\n.m-auto {\n  margin: auto;\n}\n\n.mb-1 {\n  margin-bottom: 0.25rem;\n}\n\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n\n.ml-2 {\n  margin-left: 0.5rem;\n}\n\n.mr-3 {\n  margin-right: 0.75rem;\n}\n\n.mb-4 {\n  margin-bottom: 1rem;\n}\n\n.mr-6 {\n  margin-right: 1.5rem;\n}\n\n.mt-8 {\n  margin-top: 2rem;\n}\n\n.mb-10 {\n  margin-bottom: 2.5rem;\n}\n\n.focus\\:outline-none:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n\n.overflow-hidden {\n  overflow: hidden;\n}\n\n.p-2 {\n  padding: 0.5rem;\n}\n\n.p-3 {\n  padding: 0.75rem;\n}\n\n.p-4 {\n  padding: 1rem;\n}\n\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n\n.px-1 {\n  padding-left: 0.25rem;\n  padding-right: 0.25rem;\n}\n\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\n.px-5 {\n  padding-left: 1.25rem;\n  padding-right: 1.25rem;\n}\n\n.py-6 {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n\n.px-10 {\n  padding-left: 2.5rem;\n  padding-right: 2.5rem;\n}\n\n.pb-4 {\n  padding-bottom: 1rem;\n}\n\n.pt-12 {\n  padding-top: 3rem;\n}\n\n* {\n  --tw-shadow: 0 0 #0000;\n}\n\n.shadow-md {\n  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-lg {\n  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n.shadow-xl {\n  --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n* {\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgba(59, 130, 246, 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n}\n\n.text-left {\n  text-align: left;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\n}\n\n.text-gray-500 {\n  --tw-text-opacity: 1;\n  color: rgba(107, 114, 128, var(--tw-text-opacity));\n}\n\n.text-gray-900 {\n  --tw-text-opacity: 1;\n  color: rgba(17, 24, 39, var(--tw-text-opacity));\n}\n\n.text-red-500 {\n  --tw-text-opacity: 1;\n  color: rgba(239, 68, 68, var(--tw-text-opacity));\n}\n\n.text-green-500 {\n  --tw-text-opacity: 1;\n  color: rgba(16, 185, 129, var(--tw-text-opacity));\n}\n\n.truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.w-5 {\n  width: 1.25rem;\n}\n\n.w-6 {\n  width: 1.5rem;\n}\n\n.w-8 {\n  width: 2rem;\n}\n\n.w-20 {\n  width: 5rem;\n}\n\n.w-32 {\n  width: 8rem;\n}\n\n.w-40 {\n  width: 10rem;\n}\n\n.w-48 {\n  width: 12rem;\n}\n\n.w-full {\n  width: 100%;\n}\n\n.grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes ping {\n  75%, 100% {\n    transform: scale(2);\n    opacity: 0;\n  }\n}\n\n@keyframes pulse {\n  50% {\n    opacity: .5;\n  }\n}\n\n@keyframes bounce {\n  0%, 100% {\n    transform: translateY(-25%);\n    animation-timing-function: cubic-bezier(0.8,0,1,1);\n  }\n\n  50% {\n    transform: none;\n    animation-timing-function: cubic-bezier(0,0,0.2,1);\n  }\n}\n\n@media (min-width: 640px) {\n}\n\n@media (min-width: 768px) {\n}\n\n@media (min-width: 1024px) {\n}\n\n@media (min-width: 1280px) {\n}\n\n@media (min-width: 1536px) {\n}\n    ", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/index.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/index.css ***!
  \*****************************************************************/
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "/* @tailwind base; */\n/* @tailwind components; */\n/* .section { */\n/*     @apply p-4 text-gray-900 w-full bg-gray-200 shadow-md rounded m-4 */\n/* } */\n/* .header { */\n/*     @apply py-2 mb-1 text-left text-gray-900 w-full bg-gray-100 shadow-md rounded */\n/* } */\n/* .header-cell { */\n/*     @apply px-12 */\n/* } */\n/* @tailwind utilities; */\n\n/* @import \"tailwindcss/base\"; */\n/* @import \"tailwindcss/components\"; */\n/* @import \"tailwindcss/utilities\"; */\n\n/* @apply p-4 text-gray-900 w-full bg-gray-200 shadow-md rounded m-4 */\n.section {\n\tmargin: 1rem;\n  padding: 1rem;\n  color: #1a202c;\n  width: 100%;\n  background-color: #edf2f7;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n  border-radius: 0.25rem;\n  height: 100%;\n  overflow-y: hidden;\n  padding-bottom: 50px;\n}\n\n.section p {\n  padding-top: 0.5rem;\n}\n\n.section ul {\n  margin-left: 1rem;\n  list-style: disc;\n}\n\n/* @apply py-2 mb-1 text-left text-gray-900 w-full bg-gray-100 shadow-md rounded */\n.header {\n  padding-top: 0.5rem; padding-bottom: 0.5rem;\n  text-align: left;\n  color: #1a202c;\n  width: 100%;\n  background-color: #f7fafc;\n  cursor: pointer;\n  color: maroon;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n  border-radius: 0.25rem;\n}\n\n/* @apply px-12 */\n.header-cell {\n  padding-left: 3rem; padding-right: 3rem;\n}\n\n\n\n.hidden {\n  display: none!important;\n}\n\nhtml {\n    height: 100%;\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\nbody {\n    height: 100%;\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n    margin: 0;\n    padding: 2rem;\n    padding-top: 0;\n}\n\n#app {\n    height: 100%;\n    overflow: hidden;\n}\n\n#progress {\n    height: 20px;\n    width: 100px;\n    position: absolute;\n    top: 5px;\n    right: 25px;\n    margin-right: 25px;\n    z-index: 100;\n}\n\n#ok {\n    position: absolute;\n    top: 55px;\n    right: 55px;\n    z-index: 100;\n}\n\np.ptext {\n    padding-top: 0.5rem;\n    text-indent: 1rem;\n}\n\np.plist {\n  padding-top: 0;\n  text-indent: 1rem;\n  height: 1rem;\n}\n\n.ul {\n  margin-top: 1rem;\n}\n\n\n.book {\n  height: 100%;\n  padding-bottom: 50px;\n}\n\n.page {\n    margin-top: 25px;\n    height: 100%;\n    overflow-y: hidden;\n}\n\n#message {\n    /* height: 20px; */\n    width: 80%;\n    white-space: nowrap;\n    position: absolute;\n    top: 0;\n    left: 25px;\n    z-index: 10;\n    background: white;\n}\n\n/* == text == */\n\nspan.wf:hover {\n    background-color: #eee8aa;\n}\n\nspan.ref:hover {\n    background-color: #eee8aa;\n    cursor: pointer;\n}\n\nh1, .h1 {\n    margin-top: 50px;\n    color: maroon;\n    font-size: 24px;\n    font-weight: bold;\n}\n\nh2, .h2 {\n    margin-top: 50px;\n    color: maroon;\n    font-size: 16px;\n    font-weight: bold;\n}\n\nh3, .h3 {\n    margin-top: 25px;\n    color: maroon;\n    font-size: 16px;\n}\n\nh4, .h4 {\n    color: maroon;\n    margin-top: 20px;\n    font-size: 16px;\n}\n\na {\n    cursor: pointer;\n}\n\nem {\n    color: #2f4f4f;\n}\n\n.nowrap {\n    white-space: nowrap;\n}\n\n/* .line-par { */\n/*     /\\* width: auto; *\\/ */\n/* } */\n\n/* .line-block { */\n/*     overflow: hidden; */\n/* } */\n\n.list-line .ptext {\n    text-indent: 0;\n}\n\n.line-head {\n    cursor: pointer;\n}\n\n/* =========== COLORS =============== */\n\n.maroon {\n    color: maroon;\n}\n\n.bold {\n    font-weight: bold;\n}\n\n.darkgreen {\n    color: darkgreen;\n}\n\n.darkred {\n    color: darkred;\n}\n\n.grey {\n    color: grey;\n}\n\n\n/* =========== TABLE =============== */\n\ntr:nth-child(even):not(.hidden) {\n    background-color: #edf2f7;\n}\n\ntr:nth-child(odd):not(.hidden) {\n    background-color: #f7fafc;\n}\n\n.odd {\n    background-color: #f7fafc;\n}\n\n.even {\n    background-color: #edf2f7;\n}\n\n.table-line {\n    cursor: pointer;\n}\n\n.table-line:hover {\n    background-color: #eee8aa!important;\n}\n\n.tmpl {\n    display: none!important;\n}\n\n/* == bmk ==  */\n\n\n.tree-block p {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.synchroMark {\n  width: 0.5rem;\n  height: 0.5rem;\n  float: right;\n  position: relative;\n  z-index: 100;\n  top: 1rem;\n}\n\n#dict-progress {\n  height: 20px;\n  width: auto;\n  position: absolute;\n  top: 5px;\n  right: 150px;\n  font-weight: bold;\n  z-index: 20;\n  margin-left: 25px;\n}\n\n.highlight {\n  background: orange;\n  color: black;\n}\n\n/* === search === */\n#search-input {\n  position: absolute;\n  top: 0;\n  padding: 4px;\n  right: 25px;\n  margin-right: 25px;\n  cursor: pointer;\n}\n\n#search-icon {\n  position: absolute;\n  top: 12px;\n  right: 25px;\n  margin-right: 25px;\n  cursor: pointer;\n}\n\n/* .searchinput { */\n/*   width: 100%; */\n/* } */\n\n/* auto-sync */\n\n.em-red-circle::before {\n  content: '';\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  border-radius: 5px;\n  margin-top: 6px;\n  background-color: indianred;\n  float: right;\n  margin-right: -20px;\n}\n\n.em-green-circle::before {\n  content: '';\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  border-radius: 5px;\n  margin-top: 6px;\n  background-color: #bada55;\n  float: right;\n  margin-right: -20px;\n}\n\n/* .editable { */\n/*   border-style: dotted; */\n/*   border-width: 2px; */\n/*   border-color: eee8dd; */\n/* } */\n\n.truncated {\n  height: 2rem;\n}\n\n.external {\n  cursor: pointer;\n  color: maroon;\n}\n\n.show-page-position {\n  position: absolute;\n  top: 45px;\n  margin-right: 25px;\n  z-index: 100;\n  width: 0;\n  border-style: solid;\n  border-width: 2px;\n  border-top: 1px;\n}\n\n.footnote {\n    cursor: pointer;\n    position: absolute;\n    width: 400px;\n    padding: 15px;\n    z-index: 100;\n    font-size: 90%;\n    background-color: #f7fafc;\n    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n}\n\n.version {\n    cursor: pointer;\n}\n\n.export-to-block {\n    cursor: pointer;\n}\n\n#heap {\n    cursor: pointer;\n}\n\n.lookup-line {\n    cursor: pointer;\n}\n\n#lookup-help-button {\n    cursor: pointer;\n    color: maroon;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/tree.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/tree.css ***!
  \****************************************************************/
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, ".somestyle {\n    /* */\n}\n\n.tree-branch {\n    /* margin-left: 15px; */\n    /* padding-left: 10px; */\n}\n\n.tree-branch::before {\n    content: '▾';\n    padding-right: 5px;\n    /* display: inline-block; */\n    /* width: 20px; */\n    /* height: 20px; */\n    float: left;\n    color: maroon;\n    font-size: larger;\n}\n\n.tree-branch.tree-collapse::before {\n    content: '▸';\n    padding-right: 5px;\n}\n\n.tree-sign {\n  float: left;\n  padding-right: 10px;\n  color: maroon;\n  font-size: large;\n  display: inline-block;\n  width: 10px;\n}\n\n.tree-block {\n  white-space: nowrap;\n  cursor: pointer;\n  /* margin-bottom: 3px; */\n}\n\n\n.tree-block p {\n  /* margin-bottom: 6px; */\n}\n\n.tree-text {\n    white-space: nowrap;\n    padding-bottom: 5px;\n    padding-left: 10px;\n}\n\n.tree-text:hover {\n    background-color: #eee8aa;\n    cursor: pointer;\n}\n\n.tree-collapse > div {\n    display: none;\n}\n\n.lev-1 {\n    /* padding-left: 0 */\n}\n\n.lev-2 {\n    /* padding-left: 15px; */\n    margin-left: 10px;\n}\n\n.lev-3 {\n    /* padding-left: 30px; */\n  margin-left: 20px;\n}\n\n.lev-4 {\n    /* padding-left: 45px; */\n  margin-left: 30px;\n}\n\n.lev-5 {\n    /* padding-left: 60px; */\n  margin-left: 40px;\n}\n\n.lev-6 {\n  /* padding-left: 75px; */\n  margin-left: 50px;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./src/css/compiled.css":
/*!******************************!*\
  !*** ./src/css/compiled.css ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./compiled.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/compiled.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/index.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/css/tree.css":
/*!**************************!*\
  !*** ./src/css/tree.css ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./tree.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/tree.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "book-md2json":
/*!*******************************!*\
  !*** external "book-md2json" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("book-md2json");;

/***/ }),

/***/ "dgl-utils":
/*!****************************!*\
  !*** external "dgl-utils" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("dgl-utils");;

/***/ }),

/***/ "dict-sd2json":
/*!*******************************!*\
  !*** external "dict-sd2json" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("dict-sd2json");;

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");;

/***/ }),

/***/ "electron-store":
/*!*********************************!*\
  !*** external "electron-store" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron-store");;

/***/ }),

/***/ "flexsearch":
/*!*****************************!*\
  !*** external "flexsearch" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("flexsearch");;

/***/ }),

/***/ "franc":
/*!************************!*\
  !*** external "franc" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("franc");;

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs-extra");;

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("glob");;

/***/ }),

/***/ "is-zip":
/*!*************************!*\
  !*** external "is-zip" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("is-zip");;

/***/ }),

/***/ "json5":
/*!************************!*\
  !*** external "json5" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("json5");;

/***/ }),

/***/ "langs":
/*!************************!*\
  !*** external "langs" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("langs");;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash");;

/***/ }),

/***/ "mark.js":
/*!**************************!*\
  !*** external "mark.js" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("mark.js");;

/***/ }),

/***/ "marked":
/*!*************************!*\
  !*** external "marked" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("marked");;

/***/ }),

/***/ "mousetrap":
/*!****************************!*\
  !*** external "mousetrap" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("mousetrap");;

/***/ }),

/***/ "natural":
/*!**************************!*\
  !*** external "natural" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("natural");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ "snowball-german":
/*!**********************************!*\
  !*** external "snowball-german" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("snowball-german");;

/***/ }),

/***/ "stopword":
/*!***************************!*\
  !*** external "stopword" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("stopword");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map