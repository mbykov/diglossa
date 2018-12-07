/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! exports provided: navigate, getText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigate", function() { return navigate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getText", function() { return getText; });
/* harmony import */ var _lib_context_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/context_menu.js */ "./src/lib/context_menu.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! split.js */ "split.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(split_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _lib_book__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/book */ "./src/lib/book.js");
/* harmony import */ var _lib_getfiles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/getfiles */ "./src/lib/getfiles.js");
/* harmony import */ var _lib_search__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/search */ "./src/lib/search.js");
//
// import "./stylesheets/app.css";
// import "./stylesheets/main.css";











const JSON = __webpack_require__(/*! json5 */ "json5");

const Mousetrap = __webpack_require__(/*! mousetrap */ "mousetrap");

const axios = __webpack_require__(/*! axios */ "axios");

let fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const slash = __webpack_require__(/*! slash */ "slash");

const log = console.log; // const Store = require('electron-store')
// const store = new Store()

const path = __webpack_require__(/*! path */ "path");

const clipboard = __webpack_require__(/*! electron-clipboard-extended */ "electron-clipboard-extended");

const {
  dialog,
  getCurrentWindow
} = __webpack_require__(/*! electron */ "electron").remote; // const isDev = require('electron-is-dev')
// const isDev = false


const isDev = true;
const app = electron__WEBPACK_IMPORTED_MODULE_3__["remote"].app;
const apath = app.getAppPath();
let upath = app.getPath("userData"); // const watch = require('node-watch')

let dbPath = path.resolve(upath, 'pouch');
fse.ensureDirSync(dbPath);

const PouchDB = __webpack_require__(/*! pouchdb */ "pouchdb");

PouchDB.plugin(__webpack_require__(/*! pouchdb-find */ "pouchdb-find"));
let ftdbPath = path.resolve(upath, 'pouch/fulltext');
let ftdb = new PouchDB(ftdbPath);
let libPath = path.resolve(upath, 'pouch/library');
let libdb = new PouchDB(libPath);
let current, info;
let limit = 20; // let uf = '\ufff0'

window.onbeforeunload = function (ev) {
  libdb.get('_local/current').then(function (doc) {
    current._id = '_local/current';
    current._rev = doc._rev;
    libdb.put(current).then(function () {
      ev.returnValue = false;
    });
  }).catch(function (err) {
    libdb.put({
      _id: '_local/current',
      section: 'lib'
    }).then(function () {
      navigate({
        section: 'lib'
      });
    });
  });
};

electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].on('reload', function (event) {
  getCurrentWindow().reload();
});
electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].on('parseDir', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{
      name: 'JSON',
      extensions: ['json']
    }]
  }, getInfoFile);
}); // ipcRenderer.on('home', function (event) {
//   navigate({section: 'lib'})
// })

electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].on('reread', function (event) {
  libdb.get('_local/current').then(function (current) {
    if (!current.infoid) return;
    libdb.get(current.infoid).then(function (info) {
      getDir(info);
    });
  }).catch(function (err) {
    log('ERR GET INFO DIR');
  });
});
electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].on('action', function (event, action) {
  if (action == 'goleft') goLeft();else if (action == 'goright') goRight();else if (action == 'cleanup') showCleanup();else navigate({
    section: action
  });
});
electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].on('version', function (event, oldver) {
  axios.get('https://api.github.com/repos/mbykov/diglossa.js/releases/latest').then(function (response) {
    if (!response || !response.data) return;
    let newver = response.data.name;

    if (oldver && newver && newver > oldver) {
      let over = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])("#new-version");
      let verTxt = ['new version available:', newver].join(' ');
      over.textContent = verTxt;
    }
  }).catch(function (error) {
    console.log('VERSION ERR');
  });
});
let hstates = [];
let hstate = -1;
window.split = twoPages();
getState();

function getState() {
  libdb.get('_local/current').then(function (navpath) {
    current = navpath;
    navigate(current);
  }).catch(function (err) {
    if (err.name === 'not_found') {
      libdb.put({
        _id: '_local/current',
        section: 'lib'
      }).then(function () {
        navigate({
          section: 'lib'
        });
      });
    } else throw err;
  });
}

function twoPages() {
  // var sizes = store.get('split-sizes')
  // if (sizes) sizes = JSON.parse(sizes)
  // else
  let sizes = [50, 50];
  let split = split_js__WEBPACK_IMPORTED_MODULE_2___default()(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {}
  });
  let obook = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#book');
  obook.addEventListener("wheel", _lib_book__WEBPACK_IMPORTED_MODULE_5__["scrollPanes"], false);
  document.addEventListener("keydown", _lib_book__WEBPACK_IMPORTED_MODULE_5__["keyPanes"], false);
  return split;
}

function goLib() {
  getLib().then(function (result) {
    let infos = result.rows.map(row => {
      return row.doc;
    });
    Object(_lib_book__WEBPACK_IMPORTED_MODULE_5__["parseLib"])(infos);
  }).catch(function (err) {
    log('getLibErr', err);
  });
}

function getTitle() {
  libdb.get(current.infoid).then(function (curinfo) {
    info = curinfo;
    current.bpath = info.bpath;
    Object(_lib_book__WEBPACK_IMPORTED_MODULE_5__["parseTitle"])(info);
  }).catch(function (err) {
    log('getTitleErr', err);
  });
}

function getBook() {
  libdb.get(current.infoid).then(function (curinfo) {
    getText(current).then(function (res) {
      let pars = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.compact(res.docs);

      Object(_lib_book__WEBPACK_IMPORTED_MODULE_5__["parseBook"])(curinfo, pars);
    });
  }).catch(function (err) {
    log('getTitleErr', err);
  });
}

function navigate(navpath) {
  let osource = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#source');
  let otrns = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#trns');
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["empty"])(osource);
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["empty"])(otrns);
  let ohleft = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('.hleft');
  let ohright = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('.hright');
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["remove"])(ohleft);
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["remove"])(ohright);
  current = navpath;

  if (!current.old) {
    hstates.push(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.clone(current));
    hstate = hstates.length - 1;
  }

  delete current.old;
  Object(_lib_book__WEBPACK_IMPORTED_MODULE_5__["bookData"])(current);
  let sec = current.section;
  if (sec == 'lib') goLib();else if (sec == 'title') getTitle();else if (sec == 'book') getBook();else if (sec == 'search') Object(_lib_search__WEBPACK_IMPORTED_MODULE_7__["parseQuery"])(libdb, current);else showSection(sec);
  let progress = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#progress');
  progress.style.display = 'none';
} // arrows

Mousetrap.bind(['alt+left', 'alt+right'], function (ev) {
  if (ev.which == 37) goLeft();else if (ev.which == 39) goRight();
});

function goLeft() {
  if (current) delete current.query;
  if (hstate - 1 <= -1) return;
  if (hstate - 1 > -1) hstate--;
  let state = hstates[hstate];
  state.old = true;
  navigate(state);
}

function goRight() {
  if (current) delete current.query;
  if (hstate + 1 >= hstates.length) return;
  if (hstate + 1 < hstates.length) hstate++;
  let state = hstates[hstate];
  state.old = true;
  navigate(state);
} // MAP


Mousetrap.bind(['f'], function (ev) {
  let query = clipboard.readText();
  ftdb.get(query).then(function (wfdoc) {
    let opts = {
      include_docs: true,
      keys: wfdoc.parids
    };
    libdb.allDocs(opts).then(function (result) {
      let qdocs = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.compact(result.rows.map(row => {
        return row.doc;
      }));

      let qinfos = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.groupBy(qdocs, 'infoid');

      current = {
        _id: '_local/current',
        section: 'search',
        qinfos: qinfos,
        query: query
      };
      navigate(current);
    });
  }).catch(function (err) {
    log('SEARCH ERR:', err);
  });
});

function showSection(name) {
  window.split.setSizes([100, 0]);
  let osource = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#source');
  let otrns = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#trns');
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["empty"])(osource);
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["empty"])(otrns);
  let ohleft = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('.hleft');
  let ohright = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('.hright');
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["remove"])(ohleft);
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["remove"])(ohright);
  let secpath = path.resolve(apath, 'src/sections', [name, 'html'].join('.'));

  try {
    const section = fse.readFileSync(secpath);
    osource.innerHTML = section;
  } catch (e) {
    osource.innerHTML = 'this feature will be realized in future version';
    log('NO SECTION ERR');
  }
}

function pushInfo(ndoc) {
  return libdb.get(ndoc._id).catch(function (err) {
    if (err.name === 'not_found') return;else throw err;
  }).then(function (doc) {
    if (doc) {
      let testdoc = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.clone(doc);

      delete testdoc._rev;
      if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEqual(ndoc, testdoc)) return;else {
        ndoc._rev = doc._rev;
        return libdb.put(ndoc);
      }
    } else {
      return libdb.put(ndoc);
    }
  });
}

function pushTexts(newdocs) {
  return libdb.allDocs({
    include_docs: true
  }).then(function (res) {
    let docs = res.rows.map(row => {
      return row.doc;
    });
    let cleandocs = [];
    let hdoc = {};
    docs.forEach(doc => {
      hdoc[doc._id] = doc;
    });
    newdocs.forEach(newdoc => {
      let doc = hdoc[newdoc._id];

      if (doc) {
        if (newdoc.text == doc.text) return;else doc.text = newdoc.text, cleandocs.push(doc);
      } else {
        cleandocs.push(newdoc);
      }
    });
    return libdb.bulkDocs(cleandocs);
  });
} // MAP


function pushMap(ndocs) {
  return ftdb.allDocs({
    include_docs: true
  }).then(function (res) {
    let docs = res.rows.map(row => {
      return row.doc;
    });
    let hdoc = {};
    docs.forEach(doc => {
      hdoc[doc._id] = doc;
    });
    let cleandocs = [];
    ndocs.forEach(ndoc => {
      let doc = hdoc[ndoc._id];

      if (doc) {
        let testdoc = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.clone(doc);

        delete testdoc._rev;
        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEqual(ndoc, testdoc)) return;else {
          // неверно - нужны только уникальные значения, uniq не катит
          doc.docs = ndoc.docs; //  _.uniq(doc.docs.concat(ndoc.docs))

          cleandocs.push(doc);
        }
      } else {
        cleandocs.push(ndoc);
      }
    });
    return ftdb.bulkDocs(cleandocs);
  });
}

function getInfoFile(fns) {
  if (!fns) return;
  let infopath = fns[0];
  if (!infopath) return;

  try {
    let progress = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#progress');
    progress.style.display = 'inline-block';
    let json = fse.readFileSync(infopath);
    let info = JSON.parse(json);
    info = Object(_lib_getfiles__WEBPACK_IMPORTED_MODULE_6__["parseInfo"])(info);
    let dir = path.parse(infopath).dir;
    let bpath = path.resolve(dir, info.book.path);
    info.bpath = slash(bpath);
    getDir(info);
  } catch (err) {
    log('INFO JSON ERR:', err);
  }
}

function getDir(info) {
  if (!info || !info.bpath) return;

  if (path.extname(info.bpath) == '.ods') {
    Object(_lib_getfiles__WEBPACK_IMPORTED_MODULE_6__["parseODS"])(info, book => {
      pushBook(info, book);
    });
  } else {
    Object(_lib_getfiles__WEBPACK_IMPORTED_MODULE_6__["parseDir"])(info, book => {
      pushBook(info, book);
    });
  }
}

function pushBook(info, book) {
  if (!book || !book.pars || !book.pars.length) return;
  Promise.all([pushInfo(info), pushTexts(book.pars), pushMap(book.mapdocs)]).then(function (res) {
    if (res[1].length) {
      libdb.createIndex({
        index: {
          fields: ['fpath', 'pos']
        },
        name: 'fpathindex'
      }).then(function (res) {// log('INDEX CREATED')
      });
    }

    navigate(current);
  }).catch(function (err) {
    log('ALL RES ERR', err);
  });
}

function showCleanup() {
  showSection('cleanup');
  let ocleanup = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#cleanup');
  ocleanup.addEventListener("click", goCleanup, false);
}

function goCleanup() {
  // let fsee = require('fs-extra')
  fse.emptyDirSync(dbPath);
  getCurrentWindow().reload();
  getState();
}

function getText(current, endpos) {
  let fpath = current.fpath;
  let start = current.pos * 1 || 0;
  let end = endpos * 1 || start * 1 + limit * 1;
  let selector = {
    fpath: fpath,
    pos: {
      $gte: start,
      $lt: end
    }
  };
  return libdb.find({
    selector: selector
  }); // sort: ['idx'], , limit: 20
  // return libdb.explain({selector: selector})
}

function getLib() {
  let options = {
    include_docs: true,
    startkey: 'info',
    endkey: 'info\ufff0'
  };
  return libdb.allDocs(options);
}

/***/ }),

/***/ "./src/lib/book.js":
/*!*************************!*\
  !*** ./src/lib/book.js ***!
  \*************************/
/*! exports provided: bookData, scrollPanes, keyPanes, parseLib, parseTitle, parseBook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bookData", function() { return bookData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollPanes", function() { return scrollPanes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyPanes", function() { return keyPanes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseLib", function() { return parseLib; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTitle", function() { return parseTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBook", function() { return parseBook; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! split.js */ "split.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(split_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tree */ "./src/lib/tree.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app */ "./src/app.js");






const path = __webpack_require__(/*! path */ "path");

const log = console.log; // const Store = require('electron-store')
// const store = new Store()

const clipboard = __webpack_require__(/*! electron-clipboard-extended */ "electron-clipboard-extended");

let current, info;
let limit = 20;
function bookData(newcurrent) {
  current = newcurrent;
}
let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)';
let rePunct = new RegExp(punct, 'g');
function scrollPanes(ev) {
  if (ev.shiftKey == true) return;
  let delta = ev.deltaY > 0 ? 24 : -24;
  let source = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let trns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  source.scrollTop += delta;
  trns.scrollTop = source.scrollTop;
  if (!current || current.section != 'book') return;
  let sTop = source.scrollTop;
  let spars = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#source > p');

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(spars, el => {
    let off = sTop - el.offsetTop;

    if (off < 0) {
      current.pos = el.getAttribute('pos');
      return false;
    }
  });

  addChunk();
}

function addChunk() {
  if (current && current.section != 'book') return;
  let source = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');

  if (source.scrollTop == 0) {
    let start = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#source > p')[0];
    if (!start) return;
    let startpos = start.getAttribute('pos');

    if (startpos > 0) {
      let start = startpos - limit > 0 ? startpos - limit : 0;
      current.pos = start;
      Object(_app__WEBPACK_IMPORTED_MODULE_4__["getText"])(current, startpos).then(function (res) {
        setChunk(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.reverse(res.docs), true);
      });
    }
  }

  if (source.scrollHeight - source.scrollTop - source.clientHeight <= 3.0) {
    let start = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#source > p').length;
    current.pos = start;
    Object(_app__WEBPACK_IMPORTED_MODULE_4__["getText"])(current).then(function (res) {
      setChunk(res.docs);
    });
  }
}

function keyPanes(ev) {
  let source = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let trns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  if (!source || !trns) return;
  trns.scrollTop = source.scrollTop;

  if (ev.keyCode == 38) {
    source.scrollTop = source.scrollTop - 24;
  } else if (ev.keyCode == 40) {
    source.scrollTop = source.scrollTop + 24;
  } else if (ev.keyCode == 33) {
    let height = source.clientHeight;
    source.scrollTop = source.scrollTop - height + 60;
  } else if (ev.keyCode == 34) {
    let height = source.clientHeight;
    source.scrollTop = source.scrollTop + height - 60;
  } else return;

  trns.scrollTop = source.scrollTop;
  if (!current || current.section != 'book') return;
  addChunk();
}
function parseLib(infos) {
  window.split.setSizes([100, 0]);
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(osource);
  let oul = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('ul');
  osource.appendChild(oul);
  if (!infos.length) oul.textContent = 'your library is empty';
  infos.forEach(info => {
    let ostr = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('li', 'libauth');
    ostr.infoid = info._id;
    oul.appendChild(ostr);
    let author = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["span"])(info.book.author);
    let title = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["span"])(info.book.title);
    author.classList.add('lib-auth');
    title.classList.add('lib-title');
    ostr.appendChild(author);
    ostr.appendChild(title);
  });
  oul.addEventListener('click', goTitleEvent, false);
}

function goTitleEvent(ev) {
  if (ev.target.parentNode.nodeName != 'LI') return;
  let infoid = ev.target.parentNode.infoid;
  Object(_app__WEBPACK_IMPORTED_MODULE_4__["navigate"])({
    section: 'title',
    infoid: infoid
  });
}

function parseTitle(bookinfo) {
  window.split.setSizes([50, 50]);
  info = bookinfo;
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  let obookTitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])('');
  obookTitle.classList.add('bookTitle');
  osource.appendChild(obookTitle);
  let oauthor = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])(info.book.author, 'author');
  let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])(info.book.title, 'title');
  obookTitle.appendChild(oauthor);
  obookTitle.appendChild(otitle);
  let onics = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('ul');

  for (let nic in info.nicnames) {
    let name = info.nicnames[nic];
    let onicli = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('li');
    let ocheck = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('input');
    ocheck.type = 'checkbox';
    ocheck.checked = true;
    let oname = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["span"])(name);
    oname.classList.add('check-name');
    onicli.appendChild(ocheck);
    onicli.appendChild(oname);
    onics.appendChild(onicli);
  }

  obookTitle.appendChild(onics);
  let obookCont = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])('');
  obookCont.classList.add('bookTitle');
  otrns.appendChild(obookCont);
  let otree = Object(_tree__WEBPACK_IMPORTED_MODULE_3__["default"])(info.tree, info.book.title);
  obookCont.appendChild(otree);
  let otbody = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#tree-body');
  otree.addEventListener('click', goBookEvent, false);
}

function goBookEvent(ev) {
  if (!ev.target.classList.contains('tree-node-text')) return;
  let fpath = ev.target.getAttribute('fpath');
  current.fpath = fpath;
  current.section = 'book';
  Object(_app__WEBPACK_IMPORTED_MODULE_4__["navigate"])(current);
}

function parseBook(bookinfo, pars) {
  info = bookinfo; // current = bookcurrent

  if (!pars.length) return;
  window.split.setSizes([50, 50]);
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(osource);
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(otrns);

  let cnics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(pars.map(auth => {
    if (!auth.author) return auth.nic;
  })));

  let nic = current.nic;
  if (!nic) nic = cnics[0];else if (!cnics.includes(nic)) nic = cnics[0];
  current.nic = nic;
  setChunk(pars);
  createRightHeader(cnics);
  createLeftHeader();
  osource.addEventListener("mouseover", copyToClipboard, false);
  otrns.addEventListener("wheel", cyclePar, false);
}

function setChunk(pars, direction) {
  let nic = current.nic;
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');

  let apars = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(pars, par => {
    return par.author;
  });

  let tpars = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(pars, par => {
    return !par.author;
  });

  apars.forEach(apar => {
    let html = apar.text.replace(rePunct, "<span class=\"active\">$1<\/span>");

    if (current.query) {
      let requery = new RegExp(current.query, 'g');
      html = html.replace(requery, "<span class=\"query\">" + current.query + "<\/span>");
    }

    let oleft = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["p"])();
    oleft.innerHTML = html;
    oleft.setAttribute('pos', apar.pos);
    oleft.setAttribute('nic', apar.nic);
    if (!direction) osource.appendChild(oleft);else osource.prepend(oleft);
    let aligns = [oleft];

    let pars = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(tpars, par => {
      return par.pos == apar.pos;
    });

    pars.forEach(par => {
      let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["p"])(par.text);
      oright.setAttribute('pos', apar.pos);
      oright.setAttribute('nic', par.nic);
      if (par.nic == nic) oright.classList.add('active');else oright.classList.add('hidden');
      if (!direction) otrns.appendChild(oright);else otrns.prepend(oright);
      aligns.push(oright);
    });
    alignPars(aligns);
  }); // position before adding upper chunk:

  if (direction) {
    let firstpos = apars[0].pos;
    let firstel = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#source [pos="' + firstpos + '"]')[0];
    let offset = firstel.offsetTop;
    otrns.scrollTop = osource.scrollTop = offset;
  }
}

function alignPars(pars) {
  let heights = pars.map(par => {
    return par.scrollHeight;
  });
  let max = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.max(heights) + 12;
  pars.forEach(par => {
    par.style.height = max + 'px';
  });
}

function copyToClipboard(ev) {
  if (ev.shiftKey == true) return;
  if (ev.ctrlKey == true) return;
  if (ev.target.nodeName != 'SPAN') return;
  let wf = ev.target.textContent;
  clipboard.writeText(wf);
}

function cyclePar(ev) {
  if (ev.shiftKey != true) return;
  let idx = ev.target.getAttribute('pos');
  let selector = '#trns [pos="' + idx + '"]';
  let pars = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])(selector);

  let nics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(pars, par => {
    return par.getAttribute('nic');
  });

  if (nics.length == 1) return;

  let curpar = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(pars, par => {
    return !par.classList.contains('hidden');
  });

  let nic = curpar.getAttribute('nic');
  let nicidx = nics.indexOf(nic);
  let nextnic = nicidx + 1 == nics.length ? nics[0] : nics[nicidx + 1];

  let next = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(pars, par => {
    return par.getAttribute('nic') == nextnic;
  });

  next.classList.remove('hidden');
  curpar.classList.add('hidden');
}

function createLeftHeader() {
  let obook = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#book');
  let arect = obook.getBoundingClientRect();
  let ohleft = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])();
  obook.appendChild(ohleft);
  ohleft.classList.add('hleft');
  ohleft.style.left = arect.width * 0.15 + 'px';
  ohleft.addEventListener("click", clickLeftHeader, false);
  let otree = Object(_tree__WEBPACK_IMPORTED_MODULE_3__["default"])(info.tree, info.book.title);
  ohleft.appendChild(otree);
  let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#tree-title');
  let otbody = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#tree-body');

  if (current.fpath) {
    otitle.textContent = current.fpath;
    otbody.classList.add('tree-collapse');
  } else {
    otitle.textContent = info.book.title;
    Object(_utils__WEBPACK_IMPORTED_MODULE_2__["remove"])(otbody);
  }
}

function clickLeftHeader(ev) {
  let fpath = ev.target.getAttribute('fpath');
  let otbody = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#tree-body');
  if (!otbody) return;

  if (fpath) {
    if (ev.target.classList.contains('tree-node-empty')) return;
    let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#tree-title');
    current.fpath = fpath;
    current.pos = 0;
    otitle.textContent = current.fpath;
    otbody.classList.add('tree-collapse');
    Object(_app__WEBPACK_IMPORTED_MODULE_4__["navigate"])(current);
  } else {
    otbody.classList.remove('tree-collapse');
    let ohleft = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('.hleft');
    ohleft.classList.add('header');
  }
}

function createRightHeader(nics) {
  let obook = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#book');
  let arect = obook.getBoundingClientRect();
  let ohright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])();
  ohright.classList.add('hright');
  ohright.style.left = arect.width * 0.70 + 'px';
  let oul = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('ul');
  oul.setAttribute('id', 'namelist');
  oul.addEventListener("click", clickRightHeader, false);
  ohright.appendChild(oul);
  obook.appendChild(ohright);
  createNameList(nics);
  let nic = current.nic;
  collapseRightHeader(nic);
}

function createNameList(nics) {
  let nicnames = info.nicnames;
  let oul = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#namelist');
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(oul);
  oul.setAttribute('nics', nics);
  nics.forEach(nic => {
    let oli = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('li');
    let name = nicnames[nic] ? nicnames[nic] : nic;
    oli.textContent = name;
    oli.setAttribute('nic', nic);
    oul.appendChild(oli);
  });
}

function clickRightHeader(ev) {
  if (ev.target.classList.contains('active')) {
    expandRightHeader();
  } else {
    let nic = ev.target.getAttribute('nic');
    current.nic = nic;
    if (!nic) return;
    collapseRightHeader(nic);
    otherNic(nic);
  }
}

function otherNic(nic) {
  let pars = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#trns > p');
  pars.forEach((par, idx) => {
    if (par.getAttribute('nic') == nic) par.setAttribute('active', true), par.classList.remove('hidden');else par.classList.add('hidden');
  });
}

function collapseRightHeader(nic) {
  let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('.hright');
  oright.classList.remove('header');
  let olis = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#namelist > li');

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(olis, oli => {
    if (oli.getAttribute('nic') == nic) oli.classList.add('active');else oli.classList.add('hidden');
  });
}

function expandRightHeader() {
  let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('.hright');
  oright.classList.add('header');
  let olis = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#namelist > li');

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(olis, oli => {
    oli.classList.remove('hidden');
    oli.classList.remove('active');
  });
}

/***/ }),

/***/ "./src/lib/context_menu.js":
/*!*********************************!*\
  !*** ./src/lib/context_menu.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
// This gives you default context menu (cut, copy, paste)
// in all input fields and textareas across your app.

const Menu = electron__WEBPACK_IMPORTED_MODULE_0__["remote"].Menu;
const MenuItem = electron__WEBPACK_IMPORTED_MODULE_0__["remote"].MenuItem;

const isAnyTextSelected = () => {
  return window.getSelection().toString() !== "";
};

const cut = new MenuItem({
  label: "Cut",
  click: () => {
    document.execCommand("cut");
  }
});
const copy = new MenuItem({
  label: "Copy",
  click: () => {
    document.execCommand("copy");
  }
});
const paste = new MenuItem({
  label: "Paste",
  click: () => {
    document.execCommand("paste");
  }
});
const normalMenu = new Menu();
normalMenu.append(copy);
const textEditingMenu = new Menu();
textEditingMenu.append(cut);
textEditingMenu.append(copy);
textEditingMenu.append(paste);
document.addEventListener("contextmenu", event => {
  switch (event.target.nodeName) {
    case "TEXTAREA":
    case "INPUT":
      event.preventDefault();
      textEditingMenu.popup(electron__WEBPACK_IMPORTED_MODULE_0__["remote"].getCurrentWindow());
      break;

    default:
      if (isAnyTextSelected()) {
        event.preventDefault();
        normalMenu.popup(electron__WEBPACK_IMPORTED_MODULE_0__["remote"].getCurrentWindow());
      }

  }
}, false);

/***/ }),

/***/ "./src/lib/getfiles.js":
/*!*****************************!*\
  !*** ./src/lib/getfiles.js ***!
  \*****************************/
/*! exports provided: parseODS, parseDir, parseInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseODS", function() { return parseODS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseDir", function() { return parseDir; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseInfo", function() { return parseInfo; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app */ "./src/app.js");




const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const path = __webpack_require__(/*! path */ "path");

const slash = __webpack_require__(/*! slash */ "slash");

const glob = __webpack_require__(/*! glob */ "glob");

const dirTree = __webpack_require__(/*! directory-tree */ "directory-tree");

const textract = __webpack_require__(/*! textract */ "textract");

const log = console.log;
function parseODS(info, cb) {
  let bpath = info.bpath;
  if (bpath === undefined) return;

  try {
    textract.fromFileWithPath(bpath, {
      preserveLineBreaks: true,
      delimiter: '|'
    }, function (err, str) {
      let book = parseCSV(info, str);
      cb(book);
    });
  } catch (err) {
    if (err) log('ODS ERR', err);
    cb(false);
  }
}

function parseCSV(info, str) {
  let nics = [];
  let pars = [];
  let map = {};
  let rows = str.split('\n');
  let size = rows[0].length;
  let fpath = info.bpath.split('/')[info.bpath.split('/').length - 2];
  rows.forEach((row, idx) => {
    if (row[0] == '#') return;
    if (row == ',,') return;
    let strs;
    if (/","|,"|",/.test(row)) strs = row.split(/","|,"|",/);else strs = row.split(',');
    strs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(strs);
    strs.forEach((str, idy) => {
      let auth = info.auths[idy];
      if (!auth) return;
      let nic = auth.nic;
      nics.push(nic);
      let lang = auth.lang;
      let text = str.replace(/"/g, '');
      let groupid = ['text', info.book.author, info.book.title, fpath, idx].join('-');
      let parid = [groupid, nic].join('-');
      let par = {
        _id: parid,
        infoid: info._id,
        pos: idx,
        nic: nic,
        fpath: fpath,
        lang: lang,
        text: text
      };

      if (auth.author) {
        par.author = true;
        bookWFMap(map, text, groupid);
      }

      pars.push(par);
    });
  });
  let tree = {
    text: info.book.title,
    fpath: fpath
  };
  info.tree = tree;
  info.info = true;
  nics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(nics);
  let mapnics = {};

  for (let wf in map) {
    map[wf].forEach(groupid => {
      nics.forEach(nic => {
        let parid = [groupid, nic].join('-');
        if (!mapnics[wf]) mapnics[wf] = [];
        mapnics[wf].push(parid);
      });
    });
  }

  let mapdocs = [];

  for (let wf in mapnics) {
    let mapdoc = {
      _id: wf,
      parids: mapnics[wf]
    };
    mapdocs.push(mapdoc);
  }

  return {
    pars: pars,
    mapdocs: mapdocs
  };
}

function walk(dname, dtree, tree) {
  let dpath = slash(dtree.path);
  log('____w:', dname, dtree, tree);
  let fpath = dpath.split(dname)[1];
  log('wdpath:', dpath);
  log('wfpath:', fpath);
  log('wtree:', tree);
  tree.text = fpath.split('/').slice(-1)[0];
  tree.fpath = fpath.replace(/^\//, '');
  if (!dtree.children) return;
  let hasFiles = false;
  dtree.children.forEach(child => {
    if (child.type == 'file') hasFiles = true;
  });
  tree.hasFiles = hasFiles;

  let dchildren = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(dtree.children, child => {
    return child.type == 'directory';
  });

  if (!dchildren.length) return;
  dchildren.forEach((child, idx) => {
    // if (child.type != 'directory') return
    if (!tree.children) tree.children = [];
    if (!tree.children[idx]) tree.children.push({}); // if (!tree.children[idx]) log('NOCH!', idx, 'tree', tree, 'dt', dtree)

    walk(dname, child, tree.children[idx]);
  });
}

function parseDir(info, cb) {
  let bpath = info.bpath;
  const dtree = dirTree(bpath, {
    normalizePath: true
  });
  log('INFO', info);
  log('DTREE', dtree);
  if (!dtree) return;
  let dname = info.bpath.split('/').slice(0, -1).join('/');
  log('DNAME', dname);
  let tree = {};
  walk(dname, dtree, tree);
  log('TREE', tree);
  info.tree = tree;
  info.info = true;
  let fns = glob.sync('**/*', {
    cwd: bpath
  }); // .txt ?

  fns = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(fns, fn => {
    return path.extname(fn) != '.json';
  });
  let nics = [];
  let pars = [];
  let map = {};
  info.sections = [];
  fns.forEach(fn => {
    let comment = false;
    let com = fn.split('-')[1];
    if (com && com == 'com') comment = true, fn = fn.replace('-com', '');
    let ext = path.extname(fn);
    if (!ext) return;
    if (ext == '.info') return;
    if (ext == '.json') return;
    let nic = ext.replace(/^\./, '');
    nics.push(nic);

    let auth = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(info.auths, auth => {
      return auth.nic == nic;
    });

    let fullpath = path.resolve(bpath, fn);
    let txt = fse.readFileSync(fullpath, 'utf8');
    let clean = txt.trim().replace(/\n+/, '\n').replace(/\s+/, ' ');

    let rows = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(clean.split('\n'));

    let fpath = path.dirname(fullpath).split(dname)[1];
    fpath = fpath.replace(/^\//, '');
    info.sections.push(fpath);
    let lang;
    if (auth) lang = auth.lang;
    rows.forEach((row, idx) => {
      let groupid = ['text', info.book.author, info.book.title, fpath, idx].join('-');
      let parid = [groupid, nic].join('-');
      let par = {
        _id: parid,
        infoid: info._id,
        pos: idx,
        nic: nic,
        fpath: fpath,
        lang: lang,
        text: row
      };

      if (auth.author) {
        par.author = true;
        bookWFMap(map, row, groupid);
      } // if (comment) coms.push(par)
      // else pars.push(par)


      if (!comment) pars.push(par);
    });
  });
  nics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(nics);
  let mapnics = {};

  for (let wf in map) {
    // вариант для бедных - сохраняю только первое вхождение в параграфе:
    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(map[wf]).forEach(groupid => {
      nics.forEach(nic => {
        let parid = [groupid, nic].join('-');
        if (!mapnics[wf]) mapnics[wf] = [];
        mapnics[wf].push(parid);
      });
    });
  }

  let mapdocs = [];

  for (let wf in mapnics) {
    let mapdoc = {
      _id: wf,
      parids: mapnics[wf]
    };
    mapdocs.push(mapdoc);
  }

  let book = {
    pars: pars,
    mapdocs: mapdocs
  };
  cb(book);
}

function bookWFMap(map, row, groupid) {
  let punctless = row.replace(/[.,\/#!$%\^&\*;:{}«»=\|\-+_`~()a-zA-Z0-9'"<>\[\]]/g, '');

  let wfs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(punctless.split(' '));

  wfs.forEach(wf => {
    if (!map[wf]) map[wf] = [];
    map[wf].push(groupid);
  });
} // mango-find can not use indexes with $or


function bookWFMap_(map, row, fpath, pos) {
  let punctless = row.replace(/[.,\/#!$%\^&\*;:{}«»=\|\-+_`~()a-zA-Z0-9'"<>\[\]]/g, '');

  let wfs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(punctless.split(' '));

  wfs.forEach(wf => {
    if (!map[wf]) map[wf] = [];
    let mdoc = {
      fpath: fpath,
      pos: pos
    };
    map[wf].push(mdoc);
  });
}

function parseInfo(info) {
  let nicnames = {};
  info.auths.forEach(auth => {
    if (auth.author) {
      info.book.author = auth.name;
      return;
    }

    nicnames[auth.nic] = auth.name;
  });
  info.nicnames = nicnames;
  let infoid = ['info', info.book.author, info.book.title].join('-');
  info._id = infoid;
  return info;
}

/***/ }),

/***/ "./src/lib/search.js":
/*!***************************!*\
  !*** ./src/lib/search.js ***!
  \***************************/
/*! exports provided: parseQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseQuery", function() { return parseQuery; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app */ "./src/app.js");


 // const path = require('path')

const log = console.log;
let current;
function parseQuery(libdb, curcurrent) {
  current = curcurrent;
  window.split.setSizes([100, 0]);
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#source'); // let otrns = q('#trns')

  let oquery = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["div"])('', '');
  oquery.id = 'qresults';
  let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["div"])(current.query, 'qtitle');
  oquery.appendChild(otitle);
  osource.appendChild(oquery); // унести в help

  let disclaimer = 'Scroll with Shift, but note: the correspondence between a place of the query in the source and in the translations within the paragraph is very approximate';
  let odisc = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["p"])(disclaimer, 'disclaimer');
  oquery.appendChild(odisc);

  for (let infoid in current.qinfos) {
    libdb.get(infoid).then(function (info) {
      let qinfo = current.qinfos[infoid];
      parseQbook(info, qinfo);
    }).catch(function (err) {
      log('getTitleErr', err);
    });
  }

  oquery.addEventListener("wheel", scrollQueries, false);
}

function parseQbook(info, qinfo) {
  let qgroups = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.groupBy(qinfo, 'fpath');

  for (let fpath in qgroups) {
    let qgroup = qgroups[fpath];

    let qpos = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.groupBy(qgroup, 'pos');

    for (let pos in qpos) {
      let qlines = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.cloneDeep(qpos[pos]);

      let qauths = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(qlines, par => {
        return par.author;
      });

      qauths.forEach((qauth, idx) => {
        let {
          html,
          percent
        } = aroundQuery(qauth.text, current.query, idx);
        qauth.text = html;
        qlines.forEach(par => {
          if (par.author) return;else par.text = textAround(par.text, percent);
        });
        parseGroup(info._id, fpath, pos, qlines);
      });
    }
  }
}

function parseGroup(infoid, fpath, pos, lines) {
  let oresults = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#qresults');
  let postxt = ['par:', pos].join(' ');
  let linktxt = [fpath, postxt].join(' - ');
  let ogroup = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["div"])('', '');
  let olink = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["div"])(linktxt, 'qlink');
  olink.setAttribute('infoid', infoid);
  olink.setAttribute('fpath', fpath);
  olink.setAttribute('pos', pos);
  let otext = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["div"])('', 'qtext');
  lines.forEach(par => {
    let oline = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["p"])(par.text, 'qline');
    oline.setAttribute('nic', par.nic);
    oline.setAttribute('pos', par.pos);
    if (par.author) oline.innerHTML = par.text;else oline.classList.add('hidden');
    otext.appendChild(oline);
  });
  ogroup.appendChild(olink);
  ogroup.appendChild(otext);
  oresults.appendChild(ogroup);
  olink.addEventListener('click', jumpPos, false);
}

function jumpPos(ev) {
  let el = ev.target;
  let infoid = el.getAttribute('infoid');
  let fpath = el.getAttribute('fpath');
  let pos = el.getAttribute('pos');
  let newcur = {
    section: "book",
    infoid: infoid,
    fpath: fpath,
    pos: pos,
    query: current.query
  };
  Object(_app__WEBPACK_IMPORTED_MODULE_2__["navigate"])(newcur);
}

function scrollQueries(ev) {
  if (ev.shiftKey != true) return;
  let el = ev.target;
  let parent = el.closest('.qtext');
  if (!parent) return;
  let pars = parent.children;

  let nics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(pars, par => {
    return par.getAttribute('nic');
  });

  let curpar = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(pars, par => {
    return !par.classList.contains('hidden');
  });

  let nic = curpar.getAttribute('nic');
  let nicidx = nics.indexOf(nic);
  let nextnic = nicidx + 1 == nics.length ? nics[0] : nics[nicidx + 1];

  let next = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(pars, par => {
    return par.getAttribute('nic') == nextnic;
  });

  next.classList.remove('hidden');
  curpar.classList.add('hidden');
}

function aroundQuery(str, wf, idx) {
  let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)';
  let rePunct = new RegExp(punct, 'g');
  let limit = 100;
  let arr = str.split(wf);
  let head = arr.slice(0, idx + 1).join('').slice(-limit);
  let percent = head.length / str.length;
  head = head.replace(rePunct, "<span class=\"active\">$1<\/span>");
  let tail = arr.slice(idx + 1).join('').slice(0, limit);
  tail = tail.replace(rePunct, "<span class=\"active\">$1<\/span>");
  let qspan = ['<span class="query">', wf, '</span>'].join('');
  let html = [head, qspan, tail].join('');
  return {
    html: html,
    percent: percent
  };
}

function textAround(str, percent) {
  let center = str.length * percent;
  let start = center - 100;
  let head = str.substr(start, 100);
  let tail = str.substr(center, 100);
  let line = [head, tail].join('');
  return line;
}

/***/ }),

/***/ "./src/lib/tree.js":
/*!*************************!*\
  !*** ./src/lib/tree.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return tree; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
//

let log = console.log;
function tree(data, deftitle) {
  let otree = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree');
  let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree-title');
  otitle.id = 'tree-title';
  otitle.textContent = 'content';
  otree.appendChild(otitle);
  let otbody = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree-body');
  otbody.id = 'tree-body';
  otree.appendChild(otbody);
  let children = data.children;

  if (!children) {
    let onode = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree-text');
    let osign = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', 'tree-branch');
    osign.textContent = '▾';
    onode.appendChild(osign);
    let otext = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', 'tree-node-text');
    otext.textContent = deftitle;
    otext.setAttribute('fpath', data.fpath);
    onode.appendChild(otext);
    otbody.appendChild(onode);
    return otree;
  }

  children.forEach(node => {
    let onode = createNode(node);
    otbody.appendChild(onode);
  });
  return otree;
}

function createNode(node) {
  let onode = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree-text');
  let osign = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', 'tree-branch');
  osign.textContent = '▾';
  osign.addEventListener('click', toggleNode, false);
  let navclass = node.hasFiles ? 'tree-node-text' : 'tree-node-empty';
  let otext = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', navclass);
  otext.textContent = node.text;
  otext.setAttribute('fpath', node.fpath); // otext.addEventListener('click', goNode, false)

  if (node.children) onode.appendChild(osign);
  onode.appendChild(otext);

  if (node.children) {
    node.children.forEach(child => {
      let ochild = createNode(child);
      onode.appendChild(ochild);
    });
  } // let texts = qs('.tree-text')


  return onode;
}

function toggleNode(ev) {
  let parent = ev.target.parentNode;
  parent.classList.toggle('tree-collapse');
}

/***/ }),

/***/ "./src/lib/utils.js":
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/*! exports provided: q, qs, create, recreateDiv, recreate, span, br, div, p, empty, remove, removeAll, findAncestor, placePopup, plog, enclitic, getStore, setStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "qs", function() { return qs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recreateDiv", function() { return recreateDiv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recreate", function() { return recreate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "span", function() { return span; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "br", function() { return br; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "div", function() { return div; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return empty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAll", function() { return removeAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findAncestor", function() { return findAncestor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "placePopup", function() { return placePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plog", function() { return plog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enclitic", function() { return enclitic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStore", function() { return getStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStore", function() { return setStore; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);


let util = __webpack_require__(/*! util */ "util");

function q(sel) {
  return document.querySelector(sel);
}
function qs(sel) {
  return document.querySelectorAll(sel);
}
function create(tag, style) {
  let el = document.createElement(tag);
  if (style) el.classList.add(style);
  if (style) el.id = style;
  return el;
}
function recreateDiv(sel) {
  let el = document.querySelector(sel);
  if (el) el.parentElement.removeChild(el);
  el = document.createElement('div');
  el.classList.add(sel);
  el.id = sel;
  return el;
}
function recreate(element) {
  var newElement = element.cloneNode(true);
  element.parentNode.replaceChild(newElement, element);
} // function cret (str) {
//   return document.createTextNode(str)
// }

function span(str, style) {
  let el = document.createElement('span');
  el.textContent = str;
  if (style) el.classList.add(style);
  return el;
}
function br() {
  let oBR = document.createElement('br');
  return oBR;
}
function div(str, style) {
  let el = document.createElement('div');
  el.textContent = str;
  if (style) el.classList.add(style); // if (style) el.id = style

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
function removeAll(sel) {
  let els = document.querySelectorAll(sel);
  els.forEach(el => {
    el.parentElement.removeChild(el);
  });
} // function closeAll() {
//     words = null
//     // window.close()
//     ipcRenderer.send('sync', 'window-hide')
// }

function findAncestor(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls)) {
    return el;
  }
}
function placePopup(coords, el) {
  var top = [coords.top, 'px'].join('');
  var left = [coords.left, 'px'].join('');
  el.style.top = top;
  el.style.left = left;
}
function plog() {
  var vs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.values(arguments);

  if (vs.length === 1) vs = vs[0]; // console.log(util.inspect(vs, {showHidden: false, depth: null}))

  console.log(util.inspect(vs, {
    showHidden: false,
    depth: 3
  }));
}
function enclitic(str) {
  let syms = str.split('');
  let stress = false;
  let clean = [];
  let stresses = [ac.oxia, ac.varia, ac.peris];
  syms.forEach(sym => {
    if (!stresses.includes(sym)) clean.push(sym);else if (!stress) clean.push(sym), stress = true;
  });
  return clean.join('');
}
function getStore(name) {
  let json, obj;
  return obj;
}
function setStore(name, obj) {
  let oapp = q('#app');
  q('#app').setAttribute();
}

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "directory-tree":
/*!*********************************!*\
  !*** external "directory-tree" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("directory-tree");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "electron-clipboard-extended":
/*!**********************************************!*\
  !*** external "electron-clipboard-extended" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-clipboard-extended");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),

/***/ "json5":
/*!************************!*\
  !*** external "json5" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("json5");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "mousetrap":
/*!****************************!*\
  !*** external "mousetrap" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mousetrap");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "pouchdb":
/*!**************************!*\
  !*** external "pouchdb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pouchdb");

/***/ }),

/***/ "pouchdb-find":
/*!*******************************!*\
  !*** external "pouchdb-find" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pouchdb-find");

/***/ }),

/***/ "slash":
/*!************************!*\
  !*** external "slash" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("slash");

/***/ }),

/***/ "split.js":
/*!***************************!*\
  !*** external "split.js" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("split.js");

/***/ }),

/***/ "textract":
/*!***************************!*\
  !*** external "textract" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("textract");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
//# sourceMappingURL=app.js.map