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
/* harmony import */ var _lib_getfiles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/getfiles */ "./src/lib/getfiles.js");
/* harmony import */ var _lib_nav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/nav */ "./src/lib/nav.js");
/* harmony import */ var _lib_pouch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/pouch */ "./src/lib/pouch.js");
//
// import "./stylesheets/app.css";
// import "./stylesheets/main.css";

 // import Split from 'split.js'




 // import { bookData, scrollPanes, keyPanes, parseLib, parseTitle, parseBook } from './lib/book'
// import { parseInfo, parseDir, parseODS } from './lib/getfiles'
// import { parseQuery } from './lib/search';



 // require('./lib/nav')

const settings = __webpack_require__(/*! electron */ "electron").remote.require('electron-settings');

const JSON = __webpack_require__(/*! json5 */ "json5"); // const Mousetrap = require('mousetrap')


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
const app = electron__WEBPACK_IMPORTED_MODULE_2__["remote"].app;
const apath = app.getAppPath();
let upath = app.getPath("userData"); // const watch = require('node-watch')

let container = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["q"])('#container');
let imports = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_3__["qs"])('link[rel="import"]');
imports.forEach(link => {
  let content = link.import;
  let section = content.querySelector('.section');
  container.appendChild(section.cloneNode(true));
}); // let home = q('#home')
// home.classList.add('is-shown')

Object(_lib_nav__WEBPACK_IMPORTED_MODULE_5__["navigate"])({
  section: 'home'
});
document.body.addEventListener('click', event => {
  // log('CLICK-DOC', event.target.dataset)
  if (event.target.dataset.section) {
    const section = event.target.dataset.section; // log('CLICK', section)
    // TODO:
    // let fn = '/home/michael/diglossa.texts/Xuanzang/datangxiyuji.json'

    let fn = '/home/michael/diglossa.texts/Plato/dialogues.json';
    let fns = [fn];

    if (section == 'readInfo') {
      Object(_lib_getfiles__WEBPACK_IMPORTED_MODULE_4__["getInfoFiles"])(fns, function (res) {
        // log('APP BOOK PUSHED')
        Object(_lib_nav__WEBPACK_IMPORTED_MODULE_5__["navigate"])({
          section: 'home'
        });
      });
    } else Object(_lib_nav__WEBPACK_IMPORTED_MODULE_5__["navigate"])({
      section: section
    });
  } else if (event.target.id == 'cleanupdb') {
    log('DESTROYED CLICKED');
    Object(_lib_pouch__WEBPACK_IMPORTED_MODULE_6__["cleanup"])().then(function () {
      log('DB DESTROYED');
      getCurrentWindow().reload();
    }).catch(function (err) {
      log('DESTROY ERR:', err);
    });
  }
});
electron__WEBPACK_IMPORTED_MODULE_2__["ipcRenderer"].on('action', function (event, action) {
  // if (action == 'cleanup') showCleanup()
  // else
  Object(_lib_nav__WEBPACK_IMPORTED_MODULE_5__["navigate"])({
    section: action
  });
}); // function showCleanup() {
//   showSection('cleanup')
//   let ocleanup = q('#cleanup')
//   ocleanup.addEventListener("click", goCleanup, false)
// }

/***/ }),

/***/ "./src/lib/book.js":
/*!*************************!*\
  !*** ./src/lib/book.js ***!
  \*************************/
/*! exports provided: parseLib, parseTitle, parseBook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseLib", function() { return parseLib; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTitle", function() { return parseTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBook", function() { return parseBook; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tree */ "./src/lib/tree.js");
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nav */ "./src/lib/nav.js");
 // import Split from 'split.js'





const settings = __webpack_require__(/*! electron */ "electron").remote.require('electron-settings');

const path = __webpack_require__(/*! path */ "path");

const log = console.log;

const clipboard = __webpack_require__(/*! electron-clipboard-extended */ "electron-clipboard-extended");

let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)';
let rePunct = new RegExp(punct, 'g');
function parseLib(infos) {
  log('==>> LIB INFOs', infos);
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#home');
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["empty"])(osource);
  let oul = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["create"])('ul');
  osource.appendChild(oul);
  if (!infos.length) oul.textContent = 'your library is empty';
  infos.forEach(info => {
    let ostr = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["create"])('li', 'libauth');
    ostr.infoid = info._id;
    oul.appendChild(ostr);
    let author = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["span"])(info.book.author);
    let title = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["span"])(info.book.title);
    author.classList.add('lib-auth');
    title.classList.add('lib-title');
    ostr.appendChild(author);
    ostr.appendChild(title);
  });
  oul.addEventListener('click', goTitleEvent, false);
  hideProgress();
}

function goTitleEvent(ev) {
  if (ev.target.parentNode.nodeName != 'LI') return;
  let infoid = ev.target.parentNode.infoid;
  Object(_nav__WEBPACK_IMPORTED_MODULE_3__["navigate"])({
    section: 'title',
    infoid: infoid
  });
}

function parseTitle(state, info) {
  // log('TITLE INFO', info.tree)
  // let osource = q('#title > #source')
  // let otrns = q('#title > #trns')
  let srcsel = ['#', state.section, '> #source'].join('');
  let trnsel = ['#', state.section, '> #trns'].join('');
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])(srcsel);
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])(trnsel);
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["empty"])(osource);
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["empty"])(otrns);
  let obookTitle = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["div"])('');
  obookTitle.classList.add('bookTitle');
  osource.appendChild(obookTitle);
  let oauthor = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["div"])(info.book.author, 'author');
  let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["div"])(info.book.title, 'title');
  obookTitle.appendChild(oauthor);
  obookTitle.appendChild(otitle);
  let onics = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["create"])('ul');

  for (let nic in info.nicnames) {
    let name = info.nicnames[nic];
    let onicli = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["create"])('li');
    let ocheck = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["create"])('input');
    ocheck.type = 'checkbox';
    ocheck.checked = true;
    let oname = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["span"])(name);
    oname.classList.add('check-name');
    onicli.appendChild(ocheck);
    onicli.appendChild(oname);
    onics.appendChild(onicli);
  }

  obookTitle.appendChild(onics);
  let obookCont = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["div"])('');
  obookCont.classList.add('bookTitle');
  otrns.appendChild(obookCont);
  let ocontent = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["create"])('div', 'book-content');
  ocontent.id = 'book-content';
  ocontent.textContent = 'Content:';
  otrns.appendChild(ocontent);
  ocontent.setAttribute('infoid', info._id);
  let otree = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["create"])('div', 'tree');
  otree.id = 'tree';
  let tbody = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["create"])('div', 'tbody');
  otree.appendChild(tbody);
  otrns.appendChild(otree);
  Object(_tree__WEBPACK_IMPORTED_MODULE_2__["tree"])(info.tree, otree);
  otree.addEventListener('click', goBookEvent, false);
  hideProgress();
}

function goBookEvent(ev) {
  let fpath = ev.target.getAttribute('fpath');
  if (!fpath) return;
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#book-content');
  let infoid = osource.getAttribute('infoid');
  Object(_nav__WEBPACK_IMPORTED_MODULE_3__["navigate"])({
    section: 'book',
    infoid: infoid,
    fpath: fpath
  });
}

function parseBook(state, info, pars) {
  // log('parseBOOK', pars.length)
  if (!pars.length) return; // let osource = q('#source')
  // let otrns = q('#trns')

  let srcsel = ['#', state.section, '> #source'].join('');
  let trnsel = ['#', state.section, '> #trns'].join('');
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])(srcsel);
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])(trnsel);
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["empty"])(osource);
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["empty"])(otrns);

  let cnics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(pars.map(auth => {
    if (!auth.author) return auth.nic;
  })));

  let nic = state.nic;
  if (!nic) nic = cnics[0];else if (!cnics.includes(nic)) nic = cnics[0];
  state.nic = nic;
  state.cnics = cnics;
  setChunk(state, pars);
  createRightHeader(state, info);
  createLeftHeader(state, info); // osource.addEventListener("mouseover", copyToClipboard, false)
  // otrns.addEventListener("wheel", cyclePar, false)

  hideProgress();
}

function setChunk(state, pars, direction) {
  let nic = state.nic; // let osource = q('#source')
  // let otrns = q('#trns')

  let srcsel = ['#', state.section, '> #source'].join('');
  let trnsel = ['#', state.section, '> #trns'].join('');
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])(srcsel);
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])(trnsel);

  let apars = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(pars, par => {
    return par.author;
  });

  let tpars = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(pars, par => {
    return !par.author;
  });

  apars.forEach(apar => {
    let html = apar.text.replace(rePunct, "<span class=\"active\">$1<\/span>");

    if (state.query) {
      let requery = new RegExp(state.query, 'g');
      html = html.replace(requery, "<span class=\"query\">" + state.query + "<\/span>");
    }

    let oleft = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["p"])();
    oleft.innerHTML = html;
    oleft.setAttribute('pos', apar.pos);
    oleft.setAttribute('nic', apar.nic);
    if (!direction) osource.appendChild(oleft);else osource.prepend(oleft);
    let aligns = [oleft];

    let pars = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(tpars, par => {
      return par.pos == apar.pos;
    });

    pars.forEach(par => {
      let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["p"])(par.text);
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
    let firstel = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["qs"])('#source [pos="' + firstpos + '"]')[0];
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

function hideProgress() {
  let progress = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#progress');
  progress.classList.remove('is-shown');
}

function createRightHeader(state, info) {
  let obook = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#book');
  let arect = obook.getBoundingClientRect();
  let ohright = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["div"])();
  ohright.classList.add('hright');
  ohright.style.left = arect.width * 0.70 + 'px'; // log('HEADER', state)

  settings.set('state', state);
  let oul = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["create"])('ul');
  oul.setAttribute('id', 'namelist');
  oul.addEventListener("click", clickRightHeader, false);
  ohright.appendChild(oul);
  obook.appendChild(ohright);
  createNameList(state, info);
  collapseRightHeader(state.nic);
}

function createNameList(state, info) {
  let nicnames = info.nicnames;
  let oul = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#namelist');
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["empty"])(oul);
  oul.setAttribute('nics', state.cnics);
  state.cnics.forEach(nic => {
    let oli = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["create"])('li');
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
    if (!nic) return;
    let state = settings.get('state');
    state.nic = nic;
    settings.set('state', state);
    collapseRightHeader(nic);
    otherNic(nic);
  }
}

function otherNic(nic) {
  let pars = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["qs"])('#trns > p');
  pars.forEach((par, idx) => {
    if (par.getAttribute('nic') == nic) par.setAttribute('active', true), par.classList.remove('hidden');else par.classList.add('hidden');
  });
}

function collapseRightHeader(nic) {
  let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('.hright');
  oright.classList.remove('header');
  let olis = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["qs"])('#namelist > li');

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(olis, oli => {
    if (oli.getAttribute('nic') == nic) oli.classList.add('active');else oli.classList.add('hidden');
  });
}

function expandRightHeader() {
  let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('.hright');
  oright.classList.add('header');
  let olis = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["qs"])('#namelist > li');

  lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(olis, oli => {
    oli.classList.remove('hidden');
    oli.classList.remove('active');
  });
}

function createLeftHeader(state, info) {
  let obook = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#book');
  let arect = obook.getBoundingClientRect();
  let ohleft = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["div"])();
  obook.appendChild(ohleft);
  ohleft.classList.add('hleft');
  ohleft.style.left = arect.width * 0.15 + 'px';
  ohleft.addEventListener("click", clickLeftHeader, false);
  let otree = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["create"])('div', 'tree');
  otree.id = 'tree';
  let tbody = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["create"])('div', 'tbody');
  otree.appendChild(tbody);
  ohleft.appendChild(otree);
  Object(_tree__WEBPACK_IMPORTED_MODULE_2__["tree"])(info.tree, otree); // let otitle = q('#tree-title')
  // let otbody = q('#tree-body')
  // if (state.fpath) {
  //   otitle.textContent = state.fpath
  //   otbody.classList.add('tree-collapse')
  // } else {
  //   otitle.textContent = info.book.title
  //   remove(otbody)
  // }
}

function clickLeftHeader(ev) {
  let fpath = ev.target.getAttribute('fpath');
  let otbody = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#tree-body');
  if (!otbody) return;

  if (fpath) {
    if (ev.target.classList.contains('tree-node-empty')) return;
    let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#tree-title');
    current.fpath = fpath;
    current.pos = 0;
    otitle.textContent = current.fpath;
    otbody.classList.add('tree-collapse');
    Object(_nav__WEBPACK_IMPORTED_MODULE_3__["navigate"])(current);
  } else {
    otbody.classList.remove('tree-collapse');
    let ohleft = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('.hleft');
    ohleft.classList.add('header');
  }
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
/*! exports provided: getInfoFiles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInfoFiles", function() { return getInfoFiles; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nav */ "./src/lib/nav.js");
/* harmony import */ var _pouch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pouch */ "./src/lib/pouch.js");





const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const JSON = __webpack_require__(/*! json5 */ "json5");

const path = __webpack_require__(/*! path */ "path");

const slash = __webpack_require__(/*! slash */ "slash");

const glob = __webpack_require__(/*! glob */ "glob");

const dirTree = __webpack_require__(/*! directory-tree */ "directory-tree");

const textract = __webpack_require__(/*! textract */ "textract");

const log = console.log;
function getInfoFiles(fns, cb) {
  if (!fns || !fns.length) return;
  let info;
  let book;
  let progress = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#progress');
  progress.classList.add('is-shown');
  let infopath = fns[0];

  try {
    let json = fse.readFileSync(infopath);
    info = JSON.parse(json);
    info = parseInfo(info);
  } catch (err) {
    log('INFO JSON ERR:', err);
  }

  let dir = path.parse(infopath).dir;
  let bpath = path.resolve(dir, info.book.path);
  info.bpath = slash(bpath); // info.sections = []

  info.nics = []; // log('INFO', info)

  book = getDir(info);
  Object(_pouch__WEBPACK_IMPORTED_MODULE_3__["pushBook"])(info, book).then(function (res) {
    // log('PUSH BOOK OK')
    cb(true);
  }).catch(function (err) {
    log('PUSH BOOK ERR:', err);
  }); // log('BOOK', book.pars[10])
  // let aups = _.filter(book.pars, par=> { return par.author })
  // log('AUPS', aups[100])
  // log('INFO', info)

  return;
}

function getDir(info) {
  // TODO: здесь тип файла
  const dtree = dirTree(info.bpath); // log('TD', dtree)

  let fulltree = walk(dtree.children);
  let pars = [];
  let map = {};
  let book = walkRead(info, fulltree, pars);

  let children = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.clone(fulltree);

  let tree = shortTree(children, info.bpath);
  info.tree = tree; // log('TREE', tree)

  return book;
}

function shortTree(children, bpath) {
  children.forEach(child => {
    if (child.children && child.file) {
      let fpath = child.children[0].split(bpath)[1].split('.')[0];
      child.fpath = fpath.replace(/^\//, '');
      child.children = child.children.length;
    } else if (child.children) {
      shortTree(child.children, bpath);
      child.children.forEach(child => {}); // } else {
      // log('CANT BE')
    }
  });
  return children;
}

function walkRead(info, children, pars) {
  children.forEach(child => {
    if (child.file) {
      child.children.forEach(fn => {
        readFile(info, fn, pars);
      });
    } else {
      walkRead(info, child.children, pars);
    }
  });
  info.nics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(info.nics); // let book = {pars: pars, mapdocs: mapdocs}

  let book = {
    pars: pars
  };
  return book;
}

function readFile(info, fn, pars) {
  let ext = path.extname(fn);
  if (!ext) return;
  if (['.info', '.json', '.txt'].includes(ext)) return;
  let nic = ext.replace(/^\./, '');
  info.nics.push(nic);

  let auth = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(info.auths, auth => {
    return auth.nic == nic;
  });

  let lang = auth && auth.lang ? auth.lang : 'lang';
  let txt;

  try {
    txt = fse.readFileSync(fn, 'utf8');
  } catch (err) {
    txt = ['can not read file:', fn].join(' ');
    log('TXT ERR:', txt);
  }

  let dirname = path.dirname(fn);
  dirname = slash(dirname);
  let fpath = fn.split(info.bpath)[1].split('.')[0];
  fpath = slash(fpath);
  fpath = fpath.replace(/^\//, ''); // info.sections.push(fpath)

  let clean = txt.trim().replace(/\n+/, '\n'); //.replace(/\s+/, ' ')

  let rows = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(clean.split('\n'));

  rows.forEach((row, idx) => {
    if (idx == 0) log('ROW', row);
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

    if (auth && auth.author) {
      par.author = true; // bookWFMap(map, row, groupid)
    }

    pars.push(par);
  });
}

function walk(children) {
  let dirs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(children, child => {
    return child.type == 'directory';
  });

  let files = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(children, child => {
    return child.type == 'file';
  });

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
  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.flatten(children);
}

function groupByName(fns) {
  let children = [];
  let names = fns.map(fn => {
    return {
      name: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.first(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(fn.path.split('/')).split('.')),
      fn: fn
    };
  });

  let grouped = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.groupBy(names, 'name');

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

/***/ "./src/lib/nav.js":
/*!************************!*\
  !*** ./src/lib/nav.js ***!
  \************************/
/*! exports provided: navigate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigate", function() { return navigate; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! split.js */ "split.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(split_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _pouch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pouch */ "./src/lib/pouch.js");
//


 // import { bookData, scrollPanes, keyPanes, parseLib, parseTitle, parseBook } from './lib/book'
// import { parseLib, parseTitle } from './book'


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
let hstate = 0;

function goLeft() {
  // log('<<=== LEFT', hstate)
  if (hstate - 1 < 0) return;
  if (hstate - 1 >= 0) hstate--;
  let state = history[hstate];
  state.old = true;
  navigate(state);
}

function goRight() {
  // log('===>> RIGHT', hstate)
  if (hstate + 1 >= history.length) return;
  if (hstate + 1 < history.length) hstate++;
  let state = history[hstate];
  state.old = true;
  navigate(state);
} // function twoPageTitle() {
//   let osource = q('#book-title')
//   let otrns = q('#book-contents')
//   empty(osource)
//   empty(otrns)
//   let ogutter = q('#title > .gutter')
//   if (ogutter) return
//   let sizes = [50, 50]
//   let split = Split(['#book-title', '#book-contents'], {
//     sizes: sizes,
//     gutterSize: 5,
//     // cursor: 'col-resize',
//     minSize: [0, 0]
//   })
//   return split
// }


function twoPage(state) {
  let srcsel = ['#', state.section, '> #source'].join('');
  let trnsel = ['#', state.section, '> #trns'].join('');
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])(srcsel);
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])(trnsel); // let osource = q('#source')
  // let otrns = q('#trns')

  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["empty"])(osource);
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["empty"])(otrns);
  let gutsel = ['#', state.section, '> .gutter'].join('');
  let ogutter = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])(gutsel); // let ogutter = q('#book > .gutter')

  if (ogutter) return;
  let sizes = settings.get('split-sizes');
  if (!sizes) sizes = [50, 50]; // let split = Split(['#source', '#trns'], {

  let split = split_js__WEBPACK_IMPORTED_MODULE_2___default()([srcsel, trnsel], {
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
Mousetrap.bind(['alt+1', 'alt+2'], function (ev) {
  if (ev.which == 49) log('----1');else if (ev.which == 50) log('----2');
});

function hideAll() {
  const sections = document.querySelectorAll('.section.is-shown');
  Array.prototype.forEach.call(sections, section => {
    section.classList.remove('is-shown');
  });
}

function sectionTrigger(section) {
  hideAll();
  const sectionId = ['#', section].join('');
  Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])(sectionId).classList.add('is-shown');
}

function navigate(state) {
  log('NAV-state', state);
  let progress = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["q"])('#progress');
  progress.classList.add('is-shown');
  let section = state.section;
  sectionTrigger(section); // current.section = section

  if (!state.old) {
    history.push(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.clone(state));
    hstate = history.length - 1;
  }

  delete state.old; // log('STATES', hstate, history)
  // if (section == 'title') twoPageTitle(state)
  // else if (section == 'book') twoPage(state)

  if (['title', 'book'].includes(state.section)) twoPage(state);
  if (section == 'home') Object(_pouch__WEBPACK_IMPORTED_MODULE_3__["getLib"])();else if (section == 'title') Object(_pouch__WEBPACK_IMPORTED_MODULE_3__["getTitle"])(state);else if (section == 'book') Object(_pouch__WEBPACK_IMPORTED_MODULE_3__["getBook"])(state); // else if (section == 'cleanup') goCleanup(state)
  // else if (section == 'search') parseQuery(libdb, current)
  // else showSection(section)

  settings.set('state', state);
}

/***/ }),

/***/ "./src/lib/pouch.js":
/*!**************************!*\
  !*** ./src/lib/pouch.js ***!
  \**************************/
/*! exports provided: pushBook, getLib, getTitle, getBook, getText, cleanup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushBook", function() { return pushBook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLib", function() { return getLib; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTitle", function() { return getTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBook", function() { return getBook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getText", function() { return getText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanup", function() { return cleanup; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _book__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./book */ "./src/lib/book.js");
//





const {
  getCurrentWindow
} = __webpack_require__(/*! electron */ "electron").remote;

const log = console.log;

const path = __webpack_require__(/*! path */ "path");

let fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const isDev = __webpack_require__(/*! electron-is-dev */ "electron-is-dev"); // const isDev = false
// const isDev = true


log('=====IS-DEV', isDev);
const limit = 20;
const app = electron__WEBPACK_IMPORTED_MODULE_1__["remote"].app;
const apath = app.getAppPath();
const upath = app.getPath("userData");
let dbPath = path.resolve(upath, 'pouch');
fse.ensureDirSync(dbPath);

const PouchDB = __webpack_require__(/*! pouchdb */ "pouchdb");

PouchDB.plugin(__webpack_require__(/*! pouchdb-find */ "pouchdb-find"));
let ftdbPath = path.resolve(upath, 'pouch/fulltext');
let ftdb = new PouchDB(ftdbPath);
let libPath = path.resolve(upath, 'pouch/library');
let libdb = new PouchDB(libPath);
function pushBook(info, book) {
  return Promise.all([pushInfo(info), pushTexts(book.pars)]).then(function (res) {
    // if (res[1].length) {
    libdb.createIndex({
      index: {
        fields: ['fpath', 'pos']
      },
      name: 'fpathindex'
    }); // }
  });
}

function pushInfo(ndoc) {
  return libdb.get(ndoc._id).catch(function (err) {
    if (err.name === 'not_found') return;else throw err;
  }).then(function (doc) {
    if (doc) {
      let testdoc = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.clone(doc);

      delete testdoc._rev;
      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual(ndoc, testdoc)) return;else {
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
    }); // log('========= DOCS', docs[0])

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
    }); // log('========= CLEANDOCS', cleandocs)

    return libdb.bulkDocs(cleandocs);
  });
}

function getLib() {
  let options = {
    include_docs: true,
    startkey: 'info',
    endkey: 'info\ufff0'
  };
  libdb.allDocs(options).then(function (result) {
    let infos = result.rows.map(row => {
      return row.doc;
    });
    Object(_book__WEBPACK_IMPORTED_MODULE_3__["parseLib"])(infos);
  }).catch(function (err) {
    log('getLibErr', err);
  });
}
function getTitle(state) {
  if (!state.infoid) return;
  libdb.get(state.infoid).then(function (info) {
    Object(_book__WEBPACK_IMPORTED_MODULE_3__["parseTitle"])(state, info);
  }).catch(function (err) {
    log('getTitleErr', err);
  });
}
function getBook(state) {
  // log('PARS GOT BEFORE')
  libdb.get(state.infoid).then(function (info) {
    getText(state).then(function (res) {
      let pars = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(res.docs); // log('PARS.LENGTH', pars.length)


      Object(_book__WEBPACK_IMPORTED_MODULE_3__["parseBook"])(state, info, pars);
    });
  }).catch(function (err) {
    log('getBookErr', err);
  });
}
function getText(state, endpos) {
  let fpath = state.fpath;
  let start = state.pos * 1 || 0;
  let end = endpos * 1 || start * 1 + limit * 1;
  let selector = {
    fpath: fpath,
    pos: {
      $gte: start,
      $lt: end
    } // log('SELECTOR', selector)

  };
  return libdb.find({
    selector: selector
  }); // sort: ['idx'], , limit: 20
  // return libdb.explain({selector: selector})
}
function cleanup() {
  log('before destroy');
  return Promise.all([libdb.destroy(), ftdb.destroy()]);
}

/***/ }),

/***/ "./src/lib/tree.js":
/*!*************************!*\
  !*** ./src/lib/tree.js ***!
  \*************************/
/*! exports provided: default, tree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return treeTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tree", function() { return tree; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
//

let log = console.log;
function treeTitle(deftitle) {}
function tree(children, otree) {
  let tbody = otree.lastChild;
  children.forEach(node => {
    if (node.fpath) {
      let onode = createNode(node);
      tbody.appendChild(onode);
    } else {
      let obranch = createBranch(node);
      tbody.appendChild(obranch);
      tree(node.children, obranch);
    }
  }); // otree.addEventListener('click', goNode, false)

  return otree;
}

function createNode(node) {
  let onode = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree-text');
  let otext = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', 'tree-node-text');
  otext.textContent = node.text;
  otext.setAttribute('fpath', node.fpath);
  onode.appendChild(otext);
  return onode;
}

function createBranch(node) {
  let onode = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tree-branch');
  let osign = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', 'tree-sign');
  osign.textContent = '▾';
  osign.addEventListener('click', toggleNode, false);
  onode.appendChild(osign);
  let otext = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('span', 'tree-node-branch');
  otext.textContent = node.text;
  otext.setAttribute('fpath', node.fpath);
  onode.appendChild(otext);
  let tbody = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["create"])('div', 'tbody');
  onode.appendChild(tbody);
  return onode;
}

function toggleNode(ev) {
  let parent = ev.target.parentNode;
  parent.classList.toggle('tree-collapse');
}

function goNode(ev) {
  log('GONODE', ev.target);
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

/***/ "electron-is-dev":
/*!**********************************!*\
  !*** external "electron-is-dev" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-is-dev");

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