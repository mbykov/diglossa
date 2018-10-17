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

let lib;

try {
  lib = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["getStore"])('lib');
} catch (err) {
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["setStore"])('lib', {});
}

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
      if (!res) return; // parseBook()

      oprg.style.display = "none";
    });else {
    // let bookpath = '../../texts/Thrax'
    let bookpath = '../../texts/Aristotle/deAnima'; // log('= OTHER THEN ODS =', bookpath)

    Object(_lib_getfiles__WEBPACK_IMPORTED_MODULE_5__["openDir"])(bookpath, res => {
      if (!res) return;
      Object(_lib_book__WEBPACK_IMPORTED_MODULE_4__["parseBook"])(); // showSection('main')

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

/***/ "./src/lib/book.js":
/*!*************************!*\
  !*** ./src/lib/book.js ***!
  \*************************/
/*! exports provided: parseTitle, parseBook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTitle", function() { return parseTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBook", function() { return parseBook; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! split.js */ "split.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(split_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");




let fse = __webpack_require__(/*! fs-extra */ "fs-extra");

let path = __webpack_require__(/*! path */ "path");

const log = console.log;
function parseTitle() {
  log('========= parse title =============');
  let lib = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getStore"])('lib');
  let cur = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getStore"])('current');
  let book = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["getStore"])(cur.title);
  log('LIB', lib);
  log('CUR', cur);
  log('BOOK', book);
  let oleft = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  let obookTitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])('');
  obookTitle.classList.add('bookTitle');
  oleft.appendChild(obookTitle);
  let oauth = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])(''); // let oauth = q('#author')

  let info = lib[cur.title];

  let auth = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(info.auths, auth => {
    return auth.author;
  });

  oauth.textContent = auth.name;
  oauth.classList.add('author');
  obookTitle.appendChild(oauth);
  let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])('');
  otitle.textContent = info.book.title;
  otitle.classList.add('title');
  obookTitle.appendChild(otitle);
  info.nics.forEach(nic => {
    let auth = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(info.auths, auth => {
      return auth.ext == nic;
    });

    let onicdiv = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])();
    let oname = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["span"])(auth.name);
    onicdiv.appendChild(oname);
    obookTitle.appendChild(onicdiv);
  });
}
function parseBook() {
  var sizes = localStorage.getItem('split-sizes');
  if (sizes) sizes = JSON.parse(sizes);else sizes = [50, 50];
  split_js__WEBPACK_IMPORTED_MODULE_1___default()(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      reSetBook();
    }
  }); // createRightHeader()
  // setBookText()
}

function setBookText() {
  let auths = localStorage.getItem('auths');
  if (!auths) return;
  auths = JSON.parse(auths);
  log('setBT==>Auths', auths);
  let otext = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let ores = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(otext);
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(ores);

  let author = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(auths, auth => {
    return auth.author;
  });

  let trns = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(auths, auth => {
    return !auth.author && !auth.com;
  });

  let nics = trns.map(auth => {
    return auth.nic;
  });
  log('==>NICS', nics);
  let current = localStorage.getItem('current');
  if (!current || !nics.includes(current)) current = nics[0];
  log('==>CUR', current);
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  author.rows.forEach((astr, idx) => {
    let oleft = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["p"])(astr);
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
      if (idx == 1) log('AuthNIC', auth.nic, current);
      if (auth.nic == current) oright.setAttribute('active', true);
      orights.push(oright);
    });
    alignPars(idx, oleft, orights);
  });
  otrns.addEventListener("wheel", cyclePar, false);
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
  let book = localStorage.getItem('book');
  if (!book) return;
  book = JSON.parse(book);
  let nics = book.nics;
  if (nics.length < 2) return;
  let selector = '#trns [idx="' + idx + '"]';
  let pars = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])(selector);

  let cur = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(pars, par => {
    return !par.classList.contains('hidden');
  });

  let nic = cur.getAttribute('nic');
  let nicidx = nics.indexOf(nic);
  let nextnic = nicidx + 1 == nics.length ? nics[0] : nics[nicidx + 1];

  let next = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(pars, par => {
    return par.getAttribute('nic') == nextnic;
  });

  next.classList.remove('hidden');
  cur.classList.add('hidden');
}

function reSetBook() {
  let auths = localStorage.getItem('auths');
  if (!auths) return;
  auths = JSON.parse(auths);
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  let scrollTop = osource.scrollTop;
  setBookText(auths);
  osource.scrollTop = scrollTop;
  otrns.scrollTop = scrollTop;
}

function parseLeftHeader() {
  let anchor = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#hleft'); // oheader.textContent = '========================'
}

function changeRightHeader(ev) {
  let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('.hright');
  oright.classList.add('header');
  let json = localStorage.getItem('book');
  if (!json) return;
  let book = JSON.parse(json);

  let nics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(book.nics);

  createNicList(nics);
}

function selectCurrent(ev) {
  let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('.hright');
  let current = ev.target.textContent;
  localStorage.setItem('current', current);
  let cnics = [current];
  createNicList(cnics);
  oright.classList.remove('header');
  reSetBook();
}

function createRightHeader() {
  let oapp = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#book');
  let arect = oapp.getBoundingClientRect();
  let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])();
  oright.classList.add('hright');
  oright.style.left = arect.width * 0.70 + 'px';
  let current = localStorage.getItem('current');

  if (!current) {
    let json = localStorage.getItem('book');
    if (!json) return;
    let book = JSON.parse(json);

    let nics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(book.nics);

    current = nics[0];
    localStorage.setItem('current', current);
  }

  let cnics = [current];
  let oul = createNicList(cnics);
  oright.appendChild(oul);
  oapp.appendChild(oright);
}

function createNicList(nics) {
  let oul = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#oul');

  if (!oul) {
    oul = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('ul');
    oul.id = 'oul';
  }

  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(oul);
  nics.forEach(nic => {
    let oli = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create"])('li');
    if (nics.length == 1) oli.addEventListener("click", changeRightHeader, false);else oli.addEventListener("click", selectCurrent, false);
    oli.textContent = nic;
    oul.appendChild(oli);
  });
  return oul;
}

function closeHeaders() {// let oright = q('#hright')
  // oright.classList.remove('header')
  // oright.dataset.header = 'right'
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

const log = console.log;

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

function walk(dname, dtree, tree) {
  let name = dtree.path.split(dname)[1];
  tree.name = name;
  if (!dtree.children) return;
  dtree.children.forEach((child, idx) => {
    if (child.type != 'directory') return;
    if (!tree.children) tree.children = [];
    tree.children.push({});
    walk(dname, child, tree.children[idx]);
  });
}

function parseDir(bookname) {
  let bpath = path.resolve(__dirname, bookname);
  let dname = bookname.split('/').slice(-1)[0]; // + '/'

  const dtree = dirTree(bpath);
  let tree = {};
  walk(dname, dtree, tree);
  let fns = glob.sync('**/*', {
    cwd: bpath
  });

  let ipath = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(fns, fn => {
    return /info.json/.test(fn);
  });

  ipath = path.resolve(bpath, ipath);
  if (!ipath) return;
  let info = parseInfo(ipath); // log('INFO', info)

  fns = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(fns, fn => {
    return fn != ipath;
  }); // log('FNS', fns.length)

  let book = {
    panes: [],
    coms: [] // let panes = []
    // let titles = []

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
    });

    if (!auth) return;
    let txt = fse.readFileSync(path.resolve(bpath, fn), 'utf8'); //.toString()

    let clean = txt.trim().replace(/\n+/, '\n').replace(/\s+/, ' ');

    let rows = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(clean.split('\n')); // log('R', rows)


    let pane = {
      lang: auth.lang,
      title: info.book.title,
      nic: nic,
      fn: fn,
      rows: rows
    };
    if (auth.author) book.author = pane;else if (comment) book.coms.push(pane);else book.panes.push(pane);
    if (auth.author) book.map = bookWFMap(clean, info.book.title, fn);
  });
  book.title = info.book.title;
  info.nics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(book.panes.map(auth => {
    return auth.nic;
  }));
  info.tree = tree;
  let lib = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getStore"])('lib');
  lib[book.title] = info;
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["setStore"])('lib', lib);
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["setStore"])(book.title, book);
  let current = {
    title: book.title
  };
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["setStore"])('current', current);
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

  return info;
}

function getFiles_(bookname) {
  let bpath = path.resolve(__dirname, bookname);
  let dir = bpath.split('/')[bpath.split('/').length - 1];
  let fns = glob.sync('**/*', {
    cwd: bpath
  });

  let info = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(fns, fn => {
    return path.extname == '.info';
  });

  fns = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(fns, fn => {
    return path.extname != '.info';
  });
  let book = {
    nics: []
  };
  let auths = [];
  let author;
  let titles = [];
  fns.forEach(fn => {
    let comment = false;
    let com = fn.split('-')[1];
    if (com && com == 'com') comment = true, fn = fn.replace('-com', '');
    let parts = fn.split('.');
    if (parts.length != 3) return;
    let title = parts[0];
    titles.push(title);
    let lang = parts[1];
    let nic = parts[2];
    let txt = fse.readFileSync(path.resolve(bpath, fn)).toString(); // no txt ?

    let rows = txt.split(/\n+/);
    let auth = {
      lang: lang,
      title: title,
      nic: nic,
      fn: fn,
      rows: rows
    };
    if (dir.toLowerCase() == nic.toLowerCase()) auth.author = true, book.author = nic, book.lang = lang;else if (comment) auth.com = true;
    if (!comment && !auth.author) book.nics.push(nic);
    auths.push(auth);
  }); // if (_.uniq(titles).length != 1) return { err: 'different titles' } // тут нужно хитрее, неясно как

  localStorage.setItem('auths', JSON.stringify(auths));
  localStorage.setItem('book', JSON.stringify(book));
  return auths;
}

/***/ }),

/***/ "./src/lib/utils.js":
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/*! exports provided: q, qs, create, recreateDiv, recreate, span, br, div, p, empty, remove, removeAll, findAncestor, placePopup, log, plog, enclitic, getStore, setStore */
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
  let json = localStorage.getItem(name);
  return JSON.parse(json);
}
function setStore(name, obj) {
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