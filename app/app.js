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
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! split.js */ "split.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(split_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _lib_getfiles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/getfiles */ "./src/lib/getfiles.js");
/* harmony import */ var _lib_nav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/nav */ "./src/lib/nav.js");
//
// import "./stylesheets/app.css";
// import "./stylesheets/main.css";






 // import { bookData, scrollPanes, keyPanes, parseLib, parseTitle, parseBook } from './lib/book'
// import { parseInfo, parseDir, parseODS } from './lib/getfiles'
// import { parseQuery } from './lib/search';


 // require('./lib/nav')

const settings = __webpack_require__(/*! electron */ "electron").remote.require('electron-settings');

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

let container = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#container');
let imports = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["qs"])('link[rel="import"]');
imports.forEach(link => {
  let content = link.import;
  let section = content.querySelector('.section');
  container.appendChild(section.cloneNode(true));
});
let home = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#home');
home.classList.add('is-shown');
document.body.addEventListener('click', event => {
  // log('CLICK-DOC', event.target.dataset)
  if (event.target.dataset.section) {
    const section = event.target.dataset.section; // log('CLICK', section)
    // TODO:
    // let fn = '/home/michael/diglossa.texts/Xuanzang/datangxiyuji.json'

    let fn = '/home/michael/diglossa.texts/Plato/dialogues.json';
    let fns = [fn];
    if (section == 'readInfo') Object(_lib_getfiles__WEBPACK_IMPORTED_MODULE_5__["getInfoFiles"])(fns);else Object(_lib_nav__WEBPACK_IMPORTED_MODULE_6__["navigate"])({
      section: section
    });
  }
});

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
/*! exports provided: getInfoFiles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInfoFiles", function() { return getInfoFiles; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");

 // import {nav} from '../app';

const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const JSON = __webpack_require__(/*! json5 */ "json5");

const path = __webpack_require__(/*! path */ "path");

const slash = __webpack_require__(/*! slash */ "slash");

const glob = __webpack_require__(/*! glob */ "glob");

const dirTree = __webpack_require__(/*! directory-tree */ "directory-tree");

const textract = __webpack_require__(/*! textract */ "textract");

const log = console.log;
function getInfoFiles(fns) {
  if (!fns || !fns.length) return;
  let infopath = fns[0];
  let info;

  try {
    let progress = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#progress');
    progress.classList.add('is-shown');
    let json = fse.readFileSync(infopath);
    let info = JSON.parse(json);
    info = parseInfo(info);
    let dir = path.parse(infopath).dir;
    let bpath = path.resolve(dir, info.book.path);
    info.bpath = slash(bpath);
    log('INFO', info);
    getDir(info);
  } catch (err) {
    log('INFO JSON ERR:', err);
  }

  return;
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

function walk(children) {
  let dirs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(children, child => {
    return child.type == 'directory';
  });

  let files = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(children, child => {
    return child.type == 'file';
  });

  log('D', dirs);
  log('F', files);
  let grDirs = [];
  dirs.forEach(dir => {
    if (!dir.children.length) return;
    let grDir = walk(dir.children);
    grDirs.push({
      text: dir.name,
      children: grDir
    });
  });
  let fileGrs = groupByName(files);
  children = [];
  if (grDirs.length) children.push(grDirs);
  if (fileGrs.length) children.push(fileGrs);
  return children;
}

function groupByName(fns) {
  let children = [];
  let names = fns.map(fn => {
    return {
      name: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.first(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(fn.path.split('/')).split('.')),
      fn: fn
    };
  });

  let grouped = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.groupBy(names, 'name'); // log('GR', grouped)


  for (let name in grouped) {
    let child = {
      text: name,
      children: grouped[name].map(obj => {
        return obj.fn.path;
      }),
      file: true
    };
    children.push(child);
  }

  return children;
}

function getDir(info) {
  const dtree = dirTree(info.bpath);
  log('T', dtree);
  let tree = walk(dtree.children);
  log('T1', tree);
  return; // log('BPATH', info.bpath)
  // let strs = glob.sync('**', {
  //   cwd: info.bpath,
  //   dot: true,
  //   mark: true,
  //   strict: true
  // })
  // log('GLOB', strs)
  // let tree = []
  // let dir = {text: null, children: []}
  // strs.forEach(str=> {
  //   if (_.last(str) == '/') {
  //     if (dir.children.length) {
  //       tree.push(_.clone(dir))
  //       dir = {text: null, children: []}
  //     }
  //     dir.text = str.slice(0,-1)
  //   } else {
  //     dir.children.push(str)
  //   }
  // })
  // if (dir.children.length) {
  //   if (!dir.text) {
  //     let last = _.last(info.bpath.split('/'))
  //     dir.text = last
  //   }
  //   dir.children = groupByName(dir.children)
  // }
  // // let hasFiles = false
  // // dir.children.forEach(child=> {
  // //   if (_.last(child.fn) == '/') hasFiles = true
  // // })
  // // dir.hasFiles = hasFiles
  // tree.push(_.clone(dir))
  // log('TREE', tree)
}

/***/ }),

/***/ "./src/lib/nav.js":
/*!************************!*\
  !*** ./src/lib/nav.js ***!
  \************************/
/*! exports provided: navigate, parseInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigate", function() { return navigate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseInfo", function() { return parseInfo; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! split.js */ "split.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(split_js__WEBPACK_IMPORTED_MODULE_2__);
//



const log = console.log;

const settings = __webpack_require__(/*! electron */ "electron").remote.require('electron-settings');

const Mousetrap = __webpack_require__(/*! mousetrap */ "mousetrap");

const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const path = __webpack_require__(/*! path */ "path");

const slash = __webpack_require__(/*! slash */ "slash"); // let current = {section: 'title'}


let init = {
  section: 'home'
};
let history = [init];
let hstate = 0; // document.body.addEventListener('click', (event) => {
//   // log('CLICK-DOC', event.target.dataset)
//   if (event.target.dataset.section) {
//     const section = event.target.dataset.section
//     // log('CLICK', event.target.dataset)
//     // TODO:
//     let fn = '/home/michael/diglossa.texts/Xuanzang/datangxiyuji.json'
//     let fns = [fn]
//     if (section == 'readInfo') getInfoFile(fns)
//     else
//       navigate({section: section})
//   }
// })

function hideAll() {
  const sections = document.querySelectorAll('.section.is-shown');
  Array.prototype.forEach.call(sections, section => {
    section.classList.remove('is-shown');
  });
}

function goLeft() {
  // if (current) delete current.query
  log('<<=== LEFT', hstate);
  if (hstate - 1 < 0) return;
  if (hstate - 1 >= 0) hstate--;
  let state = history[hstate];
  state.old = true;
  navigate(state);
}

function goRight() {
  log('===>> RIGHT', hstate); // if (current) delete current.query

  if (hstate + 1 >= history.length) return;
  if (hstate + 1 < history.length) hstate++;
  let state = history[hstate];
  state.old = true;
  navigate(state);
}

function twoPages() {
  // log('TWO PAGES')
  let gutter = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('.gutter'); // log('GUTTER', gutter)

  if (gutter) return;
  let sizes = settings.get('split-sizes');
  if (!sizes) sizes = [50, 50]; // log('SIZES', sizes)

  let split = split_js__WEBPACK_IMPORTED_MODULE_2___default()(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      // log('RESIZED', sizes)
      settings.set('split-sizes', sizes);
    }
  }); // let obook = q('#book')
  // obook.addEventListener("wheel", scrollPanes, false)
  // document.addEventListener("keydown", keyPanes, false)

  return split;
} // arrows


Mousetrap.bind(['alt+left', 'alt+right'], function (ev) {
  if (ev.which == 37) goLeft();else if (ev.which == 39) goRight();
});
function navigate(state) {
  log('NAV-state', state);
  let section = state.section;
  sectionTrigger(section); // current.section = section

  if (!state.old) {
    history.push(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.clone(state));
    hstate = history.length - 1;
  }

  delete state.old; // log('STATES', hstate, history)
  // bookData(current)

  if (section == 'title') twoPages(); // if (sec == 'lib') goLib()
  // else if (sec == 'title') getTitle()
  // else if (sec == 'book') getBook()
  // else if (sec == 'search') parseQuery(libdb, current)
  // else showSection(sec)

  let progress = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#progress'); // progress.style.display = 'none'
}

function sectionTrigger(section) {
  log('TRIG', section);
  hideAll();
  const sectionId = ['#', section].join('');
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])(sectionId).classList.add('is-shown');
}

function getInfoFile(fns) {
  if (!fns) return;
  let infopath = fns[0];
  if (!infopath) return;

  try {
    let progress = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#progress');
    progress.style.display = 'inline-block';
    let json = fse.readFileSync(infopath);
    let info = JSON.parse(json);
    info = parseInfo(info);
    let dir = path.parse(infopath).dir;
    let bpath = path.resolve(dir, info.book.path);
    info.bpath = slash(bpath); // getDir(info)
  } catch (err) {
    log('INFO JSON ERR:', err);
  }
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