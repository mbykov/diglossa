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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_context_menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/context_menu.js */ "./src/lib/context_menu.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _lib_book__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/book */ "./src/lib/book.js");
/* harmony import */ var _lib_getfiles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/getfiles */ "./src/lib/getfiles.js");
//
// import "./stylesheets/app.css";
// import "./stylesheets/main.css";
 // import { readCfg, writeCfg, recreateDBs, addDB } from "./lib/databases.js";
// import { getPos, getMorphs, rDict, rMorph, rTrns } from "./lib/results.js";



 // import sband from "./lib/clean-greek";






const Store = __webpack_require__(/*! electron-store */ "electron-store");

const store = new Store();

const Apstore = __webpack_require__(/*! ./lib/apstore */ "./src/lib/apstore.js");

const apstore = new Apstore();

let fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const log = console.log;

const Mousetrap = __webpack_require__(/*! mousetrap */ "mousetrap"); // const axios = require('axios')


const path = __webpack_require__(/*! path */ "path"); // const mustache = require('mustache')


const clipboard = __webpack_require__(/*! electron-clipboard-extended */ "electron-clipboard-extended");

const {
  dialog
} = __webpack_require__(/*! electron */ "electron").remote; // const isDev = require('electron-is-dev')
// const isDev = false


const isDev = true;
const app = electron__WEBPACK_IMPORTED_MODULE_2__["remote"].app;
const appPath = app.getAppPath();
let userDataPath = app.getPath("userData"); // enableDBs(userDataPath, appPath, isDev)
// тут persisit

let lib = apstore.get('lib');
if (!lib) apstore.set('lib', {});
showSection('lib');

function showSection(name) {
  let oapp = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["q"])('#app');
  let secpath = path.resolve(appPath, 'src/sections', [name, 'html'].join('.'));
  const section = fse.readFileSync(secpath);
  oapp.innerHTML = section;
}

function showBook(fns) {
  showSection('main');
  let oprg = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["q"])('#progress');
  oprg.style.display = "inline-block";
  let fpath = fns[0]; // log('SHOWBOOK', fpath)

  if (/\.ods/.test(fpath)) // это убрать
    Object(_lib_getfiles__WEBPACK_IMPORTED_MODULE_5__["openODS"])(fpath, res => {
      log('ODS END JSON', res);
      if (!res) return; // twoPages()

      oprg.style.display = "none";
    });else {
    // let bookpath = '../../texts/Thrax'
    // let bookpath = '../../texts/Aristotle/deAnima'
    // let bookpath = '../../texts/Plato/Letters'
    let bookpath = '../../texts/Plato'; // log('= OTHER THEN ODS =', bookpath)

    Object(_lib_getfiles__WEBPACK_IMPORTED_MODULE_5__["openDir"])(bookpath, res => {
      if (!res) return;
      Object(_lib_book__WEBPACK_IMPORTED_MODULE_4__["twoPages"])();
      Object(_lib_book__WEBPACK_IMPORTED_MODULE_4__["parseTitle"])();
      oprg.style.display = "none";
    });
  }
}

document.addEventListener("click", go, false);
document.addEventListener("wheel", scrollPanes, false);
document.addEventListener("keydown", keyGo, false);

function scrollPanes(ev) {
  if (ev.shiftKey == true) return;
  let delta = ev.deltaY > 0 ? 24 : -24;
  let source = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["q"])('#source');
  let trns = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["q"])('#trns');
  source.scrollTop += delta;
  trns.scrollTop = source.scrollTop;
}

function go(ev) {
  let data = ev.target.dataset; // log('go DATAset', ev.target.dataset)

  if (data.section) {
    showSection(data.section);
  } else if (data.book) {
    showBook(data.book);
  } else if (data.ods) {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{
        name: 'book',
        extensions: ['ods']
      }]
    }, showBook);
  }
}

function keyGo(ev) {
  let source = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["q"])('#source');
  let trns = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["q"])('#trns');
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
  }

  trns.scrollTop = source.scrollTop;
}

/***/ }),

/***/ "./src/lib/apstore.js":
/*!****************************!*\
  !*** ./src/lib/apstore.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// import { q, qs, empty, create, span, p, div, remove } from './utils'
class Apstore {
  constructor() {
    this.app = document.querySelector('#app');
  }

  get(key) {
    return JSON.parse(this.app.getAttribute(key));
  }

  set(key, value) {
    return this.app.setAttribute(key, JSON.stringify(value));
  }

} // const john = new Apstore()
// john.set('key', 'JOHN')
// console.log('APSTORE', john.get('key'))
// export default Apstore
// export Apstore


module.exports = Apstore;

/***/ }),

/***/ "./src/lib/book.js":
/*!*************************!*\
  !*** ./src/lib/book.js ***!
  \*************************/
/*! exports provided: twoPages, parseTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "twoPages", function() { return twoPages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTitle", function() { return parseTitle; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! split.js */ "split.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(split_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tree */ "./src/lib/tree.js");





const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const path = __webpack_require__(/*! path */ "path");

const log = console.log; // const Store = require('electron-store')
// const store = new Store()

const Apstore = __webpack_require__(/*! ./apstore */ "./src/lib/apstore.js");

const store = new Apstore();
function twoPages() {
  var sizes = store.get('split-sizes');
  if (sizes) sizes = JSON.parse(sizes);else sizes = [50, 50];
  split_js__WEBPACK_IMPORTED_MODULE_1___default()(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      reSetBook();
    }
  });
}
function parseTitle() {
  // log('========= parse title =============')
  // let lib = store.get('lib')
  // let lib = store.get('lib')
  let cur = store.get('current');
  let info = cur.info; // log('LIB', lib)
  // log('CUR', cur)
  // log('BOOK', book)
  // log('INFO', info)

  let oleft = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  let obookCont = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])('');
  obookCont.classList.add('bookTitle');
  oright.appendChild(obookCont);
  let otree = Object(_tree__WEBPACK_IMPORTED_MODULE_3__["default"])(info.tree);
  obookCont.appendChild(otree);
  otree.addEventListener('click', goNode, false);
}

function goNode(ev) {
  let cur = store.get('current'); // let info = lib[cur.title]
  // if (!cur.nic) cur.nic = info.nics[0]

  let fpath = ev.target.getAttribute('fpath');
  let obook = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  obook.dataset.fpath = JSON.stringify(fpath);
  cur.fpath = fpath;
  store.set('current', cur);
  setBookText();
  createRightHeader(); // createLeftHeader()
}

function setBookText(nic) {
  let obook = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(osource);
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(otrns); // let lib = store.get('lib')

  let cur = store.get('current');
  let texts = store.get('curtexts'); // let book = lib[cur.title]

  let info = cur.info;
  let nicnames = info.nicnames; // log('BB', book.panes)

  let panes = texts.panes;
  let coms = texts.coms;
  let fpath = obook.dataset.fpath;

  let author = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(panes, auth => {
    return auth.author && auth.fpath == cur.fpath;
  })[0];

  let trns = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(panes, auth => {
    return !auth.author && auth.fpath == cur.fpath;
  }); // log('TRNS', author)


  let cnics = trns.map(auth => {
    return auth.nic;
  });
  store.set('cnics', cnics);
  if (!nic) nic = cnics[0];
  let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)';
  let rePunct = new RegExp(punct, 'g');
  let htmls = [];
  author.rows.forEach((str, idx) => {
    // if (idx != 2) return
    let html = str.replace(rePunct, " <span class=\"active\">$1</span>"); // log('H', html)

    htmls.push(html);
  }); // author.rows.forEach((astr, idx) => {

  htmls.forEach((html, idx) => {
    // let oleft = p(astr)
    let oleft = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["p"])();
    oleft.innerHTML = html;
    oleft.setAttribute('idx', idx);
    oleft.setAttribute('nic', author.nic);
    osource.appendChild(oleft);
    let orights = [];
    trns.forEach(auth => {
      let rstr = auth.rows[idx];
      let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["p"])(rstr);
      oright.setAttribute('idx', idx);
      oright.setAttribute('nic', auth.nic);
      otrns.appendChild(oright);
      if (auth.nic == nic) oright.setAttribute('active', true); // else

      orights.push(oright);
    });
    alignPars(idx, oleft, orights);
  });
  osource.addEventListener("mouseover", fireActive, false);
  otrns.addEventListener("wheel", cyclePar, false);
}

function fireActive(ev) {
  if (ev.target.nodeName != 'SPAN') return;
  log('A', ev.target.textContent);
}

function alignPars(idx, oleft, orights) {
  orights.push(oleft);
  let heights = orights.map(par => {
    return par.scrollHeight;
  });

  let max = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.max(heights);

  orights.forEach(par => {
    par.style.height = max + 'px';
    if (!par.getAttribute('active')) par.classList.add('hidden');
  });
}

function cyclePar(ev) {
  if (ev.shiftKey != true) return;
  let idx = ev.target.getAttribute('idx');
  let selector = '#trns [idx="' + idx + '"]';
  let pars = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])(selector); // log('PS', pars)

  let nics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(pars, par => {
    return par.getAttribute('nic');
  }); // log('nics', nics)


  let curpar = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(pars, par => {
    return !par.classList.contains('hidden');
  }); // log('CP', curpar)


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
  ohleft.classList.add('hright');
  ohleft.style.left = arect.width * 0.15 + 'px';
  ohleft.classList.add('header');
  log('LEFT HEADER', ohleft);
  ohleft.addEventListener("click", clickLeftHeader, false);
  let oact = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])();
  oact.textContent = 'active';
  let cur = store.get('current');
  let otree = Object(_tree__WEBPACK_IMPORTED_MODULE_3__["default"])(cur.info.tree);
  ohleft.appendChild(oact);
  ohleft.appendChild(otree); // ohleft.textContent = 'LEFT HEADER'
}

function clickLeftHeader(ev) {
  let fpath = ev.target.getAttribute('fpath');
  let text = ev.target.textContent;
  if (fpath) log('LEFT', text);
}

function createRightHeader() {
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
  createNameList();
  collapseRightHeader();
}

function createNameList() {
  let nics = store.get('cnics');
  let cur = store.get('current');
  let nicnames = cur.info.nicnames;
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
    collapseRightHeader(nic);
    reSetBook(nic);
  }
}

function collapseRightHeader(nic) {
  if (!nic) {
    let nics = store.get('cnics');
    nic = nics[0];
  }

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

function reSetBook(nic) {
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  let scrollTop = osource.scrollTop;
  setBookText(nic);
  osource.scrollTop = scrollTop;
  otrns.scrollTop = scrollTop;
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
/*! exports provided: openODS, openDir */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openODS", function() { return openODS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openDir", function() { return openDir; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");



const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const path = __webpack_require__(/*! path */ "path");

const glob = __webpack_require__(/*! glob */ "glob");

const dirTree = __webpack_require__(/*! directory-tree */ "directory-tree");

const textract = __webpack_require__(/*! textract */ "textract");

const log = console.log; // const Store = require('electron-store')
// const store = new Store()

const Apstore = __webpack_require__(/*! ./apstore */ "./src/lib/apstore.js");

const apstore = new Apstore(); // const yuno = require('../../../yunodb')

const Datastore = __webpack_require__(/*! nedb */ "nedb");

let textdb = new Datastore({
  filename: 'nedbs/ne_texts'
});
textdb.loadDatabase();

function extractAllText(str) {
  const re = /"(.*?)"/g;
  const results = [];
  let current;

  while (current = re.exec(str)) {
    results.push(current.pop());
  }

  return results;
}

function openODS(fpath, cb) {
  if (fpath === undefined) return;

  try {
    textract.fromFileWithPath(fpath, {
      preserveLineBreaks: true,
      delimiter: '|'
    }, function (err, str) {
      // parseCSV(str)
      cb(true);
    });
  } catch (err) {
    if (err) log('ODS ERR', err);
    cb(false);
  }
}

function parseCSV(str) {
  let rows = str.split('\n');
  let size = rows[0].length;
  let book = {};
  rows.slice(0, 2).forEach((row, idx) => {
    if (row[0] != '#') return;
    if (/title/.test(row)) book.title = row.split(',')[0].split(':')[1].trim();else book.nics = row.split(',');
  });
  let nics = ['name_a', 'name_b', 'name_c'];
  if (!book.nics) book.nics = nics.slice(1);
  book.author = nics[0];
  let auths = [];
  nics.forEach((nic, idx) => {
    let auth = {
      idx: idx,
      nic: nic,
      rows: []
    };
    if (nic == book.author) auth.author = true;
    auths.push(auth);
  });
  rows.forEach((row, idx) => {
    if (row[0] == '#') return;
    if (row == ',,') return;
    let matches = extractAllText(row);
    matches.forEach(str => {
      let corr = str.split(',').join('COMMA');
      row = row.replace(str, corr);
    });
    let cols = row.split(',');
    cols.forEach((col, idy) => {
      col = col.split('COMMA').join(',');
      if (col == ',') return; // if (!auths[idy]) log('ERR', idy, row)

      auths[idy].rows.push(col);
    });
  });
  localStorage.setItem('auths', JSON.stringify(auths));
  localStorage.setItem('book', JSON.stringify(book));
}

function openDir(bookname, cb) {
  try {
    parseDir(bookname);
    cb(true);
  } catch (err) {
    if (err) log('DIR ERR', err);
    cb(false);
  }
}

function walk(fns, dname, dtree, tree) {
  let fpath = dtree.path.split(dname)[1];
  tree.text = fpath.split('/').slice(-1)[0];
  tree.fpath = fpath.replace(/^\//, '');
  if (!dtree.children) return;
  dtree.children.forEach((child, idx) => {
    fns.push(dtree.path);
    if (child.type != 'directory') return;
    if (!tree.children) tree.children = [];
    tree.children.push({});
    walk(fns, dname, child, tree.children[idx]);
  });
}

function parseDir(bookname) {
  let bpath = path.resolve(__dirname, bookname);
  let dname = bookname.split('/').slice(-1)[0]; // + '/'

  const dtree = dirTree(bpath); // log('=DTREE', dtree)

  let fns = [];
  let tree = {};
  walk(fns, dname, dtree, tree); // log('=TREE', tree)

  fns = glob.sync('**/*', {
    cwd: bpath
  }); // log('FNS', fns.length)

  let ipath = path.resolve(bpath, 'info.json'); // log('IPATH', ipath)
  // if (!ipath) return

  let info = parseInfo(ipath); // log('_INFO_', info)

  fns = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(fns, fn => {
    return fn != ipath;
  }); // log('FNS', fns.length)

  let cpanes = {
    panes: [],
    coms: []
  };
  fns.forEach(fn => {
    let comment = false;
    let com = fn.split('-')[1];
    if (com && com == 'com') comment = true, fn = fn.replace('-com', '');
    let ext = path.extname(fn);
    if (!ext) return;
    let nic = ext.replace(/^\./, '');

    let auth = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(info.auths, auth => {
      return auth.ext == nic;
    }); // if (!auth) return


    let txt = fse.readFileSync(path.resolve(bpath, fn), 'utf8');
    let clean = txt.trim().replace(/\n+/, '\n').replace(/\s+/, ' ');

    let rows = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(clean.split('\n')); // log('R', fn, rows.length)


    let fparts = fn.split('/');
    let fname = fparts.pop();
    let fpath = fparts.join('/');
    let lang;
    if (auth) lang = auth.lang;
    let pane = {
      lang: lang,
      nic: nic,
      fpath: fpath,
      rows: rows // fname: fname,

    };
    if (auth && auth.author) pane.author = true; // if (auth.author) book.author = pane

    if (comment) cpanes.coms.push(pane);else cpanes.panes.push(pane); // if (auth.author) book.map = bookWFMap(clean, info.book.title, fn)
  });
  info.tree = tree.children;
  let cur = {
    title: info.book.title
  };
  let lib = apstore.get('lib'); // lib[book.title] = apbook ???
  // apstore.set('lib', lib)
  // let book = {}

  cur.info = info; // cur.panes = cpanes
  // current.book = book

  apstore.set('current', cur);
  apstore.set('curtexts', cpanes);
  textdb.insert(cpanes, (err, newDocs) => {
    log('NEDB insert', newDocs.length);
    textdb.loadDatabase();
    textdb.persistence.compactDatafile();
  });
}

function done(err) {
  if (err) throw err;
  console.log('successfully added documents');
}

function bookWFMap(text, title, fn) {
  let map = {};
  let pless = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9'"<>\[\]]/g, '');
  let rows = pless.split('\n');
  rows.forEach((row, idx) => {
    let wfs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(row.split(' '));

    wfs.forEach(wf => {
      if (!map[wf]) map[wf] = [];
      map[wf].push({
        title: title,
        fn: fn,
        idx: idx
      });
    });
  });
  return map;
}

function parseInfo(ipath) {
  let info;

  try {
    info = fse.readJsonSync(ipath);
  } catch (err) {
    log('ERR INFO', err);
    throw new Error();
  }

  let nicnames = {};
  info.auths.forEach(auth => {
    if (auth.author) return; // let nic = {nic: auth.ext, name: auth.name}

    nicnames[auth.ext] = auth.name;
  });
  info.nicnames = nicnames;
  return info;
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
function tree(data) {
  // log('TREEDATA', data)
  let otree = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree');
  data.forEach(node => {
    let onode = createNode(node);
    otree.appendChild(onode);
  });
  return otree;
}

function createNode(node) {
  // log('NODE', node)
  let onode = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree-text');
  let osign = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', 'tree-branch');
  osign.textContent = '▾'; // osign.addEventListener('click', toggleNode, false)

  let otext = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', 'tree-node-text');
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
} // function goNode(ev) {
//   log('EV', ev.target.textContent)
// }
// function toggleNode(ev) {
//   let parent = ev.target.parentNode
//   parent.classList.toggle('tree-collapse')
// }

/***/ }),

/***/ "./src/lib/utils.js":
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/*! exports provided: q, qs, create, recreateDiv, recreate, span, br, div, p, empty, remove, removeAll, findAncestor, placePopup, log, plog, enclitic, getStore, setStore, getStore_, setStore_ */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plog", function() { return plog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enclitic", function() { return enclitic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStore", function() { return getStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStore", function() { return setStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStore_", function() { return getStore_; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStore_", function() { return setStore_; });
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

function span(str) {
  var oSpan = document.createElement('span');
  oSpan.textContent = str;
  return oSpan;
}
function br() {
  var oBR = document.createElement('br');
  return oBR;
}
function div(str) {
  var oDiv = document.createElement('div');
  oDiv.textContent = str;
  return oDiv;
}
function p(str) {
  var oDiv = document.createElement('p');
  oDiv.textContent = str;
  return oDiv;
}
function empty(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}
function remove(el) {
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
function log() {
  console.log.apply(console, arguments);
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
function getStore_(name) {
  let json, obj;

  try {
    json = localStorage.getItem(name);
    obj = JSON.parse(json);
  } catch (err) {
    log('GET ERR', err);
  }

  return obj;
}
function setStore_(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj));
}

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

/***/ "electron-store":
/*!*********************************!*\
  !*** external "electron-store" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-store");

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

/***/ "nedb":
/*!***********************!*\
  !*** external "nedb" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nedb");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

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