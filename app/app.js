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
/*! exports provided: navigate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigate", function() { return navigate; });
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
//
// import "./stylesheets/app.css";
// import "./stylesheets/main.css";










const Mousetrap = __webpack_require__(/*! mousetrap */ "mousetrap");

let fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const log = console.log;

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const store = new Store(); // const elasticlunr = require('elasticlunr')

const path = __webpack_require__(/*! path */ "path");

const clipboard = __webpack_require__(/*! electron-clipboard-extended */ "electron-clipboard-extended");

const {
  dialog
} = __webpack_require__(/*! electron */ "electron").remote; // const isDev = require('electron-is-dev')
// const isDev = false


const isDev = true;
const app = electron__WEBPACK_IMPORTED_MODULE_3__["remote"].app;
const apath = app.getAppPath();
let upath = app.getPath("userData"); // const watch = require('node-watch')

let libPath = path.resolve(upath, 'library');

const PouchDB = __webpack_require__(/*! pouchdb */ "pouchdb");

PouchDB.plugin(__webpack_require__(/*! pouchdb-find */ "pouchdb-find"));
let pouch = new PouchDB(libPath);
pouch.createIndex({
  index: {
    fields: ['fpath', 'idx']
  }
});
let current, info;
let limit = 20;
let uf = '\ufff0';

window.onbeforeunload = function (ev) {
  // log('SAVE:')
  pouch.get('_local/current').then(function (doc) {
    // let current = window.navpath
    current._id = '_local/current';
    current._rev = doc._rev;
    pouch.put(current).then(function () {
      // log('SEND:', current)
      // ipcRenderer.send('state-saved', current)
      ev.returnValue = false;
    });
  }).catch(function (err) {
    // log('SAVE ERR', err)
    pouch.put({
      _id: '_local/current',
      section: 'lib'
    }).then(function () {
      navigate({
        section: 'lib'
      });
    });
  });
};

electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].on('home', function (event) {
  navigate({
    section: 'lib'
  });
});
electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].on('section', function (event, name) {
  log('SEC NAME', name);
  navigate({
    section: name
  });
});
electron__WEBPACK_IMPORTED_MODULE_3__["ipcRenderer"].on('parseDir', function (event, name) {
  log('PARSE DIR', name); // dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'book', extensions: ['ods'] }]}, showBook)

  dialog.showOpenDialog({
    properties: ['openDirectory']
  }, getFNS);
}); // let hstates =   store.get('hstates') || []
// let hstate = store.get('hstate') || -1

let hstates = [];
let hstate = -1; // log('HSTATE=>', hstate)
// log('HSTATES=>', hstates)
// let position = hstates[hstate] || {section: 'lib'}
// log('HSTATES=>POS', position)

window.split = Object(_lib_book__WEBPACK_IMPORTED_MODULE_5__["twoPages"])(); // window.split.setSizes([50,50])

getState();

function getState() {
  pouch.get('_local/current').then(function (navpath) {
    current = navpath;
    log('INIT CURRENT:', current);
    if (current.section == 'lib') navigate({
      section: 'lib'
    });else if (current.section == 'search') parseQuery();else getDir(current);
  }).catch(function (err) {
    pouch.put({
      _id: '_local/current',
      section: 'lib'
    }).then(function () {
      navigate({
        section: 'lib'
      });
    });
  });
}

function getLib() {
  let options = {
    include_docs: true,
    startkey: 'info',
    endkey: 'info\ufff0'
  };
  pouch.allDocs(options).then(function (result) {
    let docs = result.rows.map(row => {
      return row.doc;
    });
    log('GETLIB', docs);
    hstate = 0;
    parseLib(docs);
  }).catch(function (err) {
    log('getLibErr:', err);
  });
}

function getTitle() {
  // log('getTitle cur:', current)
  let options = {
    include_docs: true,
    // key: navpath.book_id
    key: current.book_id
  };
  pouch.allDocs(options).then(function (result) {
    let docs = result.rows.map(row => {
      return row.doc;
    }); // log('GETTITLEINFO', docs)

    info = docs[0];
    Object(_lib_book__WEBPACK_IMPORTED_MODULE_5__["parseTitle"])(docs[0], current);
  }).catch(function (err) {
    log('getTitleErr', err);
  });
}

function getBook() {
  // log('GB info', info)
  let endkey = [info.tpath, '\ufff0'].join('');
  let opts = {
    include_docs: true,
    startkey: info.tpath,
    endkey: endkey
  };
  pouch.allDocs(opts).then(function (result) {
    let texts = result.rows.map(row => {
      return row.doc;
    }); // log('GBTxs', texts.length)

    Object(_lib_book__WEBPACK_IMPORTED_MODULE_5__["parseBook"])(current, info, texts);
  }).catch(function (err) {
    log('getBookErr', err);
  });
} // отдельные pars по


function getText() {
  log('GB info', info);
  log('GB cur', current); // let parid = ['text', info.book.author, info.book.title, fpath, idx, nic].join('-')

  let start = current.pos || 20; // let finish = start + 20
  // let startstr = [start, ''].join('-')

  let startstr = '20-nic'; // let endstr = [start+limit, '\ufff0'].join('-')
  // let endstr = [40, '\ufff0'].join('-')

  let endstr = '40-nic\ufff0';
  log('S1', startstr);
  log('S2', endstr);
  let startkey = ['text', info.book.author, info.book.title, current.fpath, startstr].join('-');
  let endkey = ['text', info.book.author, info.book.title, current.fpath, endstr].join('-');
  let opts = {
    include_docs: true,
    startkey: startkey,
    endkey: endkey
  };
  let selector = {
    fpath: 'Dialogues/Parmenides',
    idx: {
      $gte: 20,
      $lt: 40
    }
  };
  pouch.find({
    selector: selector
  }) // sort: ['idx'], , limit: 20
  .then(function (res) {
    log('FIND', res);
  }); // pouch.allDocs(opts).then(function (result) {
  //   let texts = result.rows.map(row=> { return row.doc})
  //   log('GBTxs', texts)
  //   // parseBook(current, info, texts)
  // }).catch(function (err) {
  //   log('getBookErr', err);
  // })
}

function parseLib(infos) {
  window.split.setSizes([100, 0]);
  let osource = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#source');
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["empty"])(osource);
  let oul = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["create"])('ul');
  osource.appendChild(oul);
  if (!infos.length) oul.textContent = 'no book in lib';
  infos.forEach(info => {
    let ostr = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["create"])('li', 'libauth');
    ostr.book_id = info._id;
    oul.appendChild(ostr);
    let author = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["span"])(info.book.author);
    let title = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["span"])(info.book.title);
    author.classList.add('lib-auth');
    title.classList.add('lib-title');
    ostr.appendChild(author);
    ostr.appendChild(title);
  });
  oul.addEventListener('click', goTitleEvent, false);
}

function goTitleEvent(ev) {
  if (ev.target.parentNode.nodeName != 'LI') return;
  let book_id = ev.target.parentNode.book_id;
  navigate({
    section: 'title',
    book_id: book_id
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
  let already = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.findIndex(hstates, current) + 1;

  if (!already) {
    hstates.push(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.clone(current));
    hstate = hstates.length - 1;
  }

  log('HSTATES', hstates);
  log('Navigate:', current);
  let sec = current.section;
  if (sec == 'lib') getLib();else if (sec == 'title') getTitle(); // else if (sec == 'book') getBook()
  else if (sec == 'book') getText();else if (sec == 'search') parseQuery();else showSection(sec);
}
Mousetrap.bind(['alt+left', 'alt+right'], function (ev) {
  // log('EV', ev.which, hstate, hstates)
  if (ev.which == 37 && hstate - 1 <= -1) return;
  if (ev.which == 37 && hstate - 1 > -1) hstate--;
  if (ev.which == 39 && hstate + 1 >= hstates.length) return;
  if (ev.which == 39 && hstate + 1 < hstates.length) hstate++;
  let state = hstates[hstate];
  navigate(state);
});
Mousetrap.bind(['ctrl+f'], function (ev) {
  let query = clipboard.readText(); // log('WF', query)

  let key = ['wf', query].join('-');
  let options = {
    include_docs: true,
    key: key
  };
  pouch.allDocs(options).then(function (result) {
    let wfdocs = result.rows.map(row => {
      return row.doc;
    });
    log('WFdocs', wfdocs);
    let textids = wfdocs.map(wf => {
      return wf.textid;
    });
    let tpaths = textids.map(textid => {
      return textid.split('.')[0];
    });

    let tpath = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.uniq(tpaths)[0];

    log('TPATH', tpath);
    let endkey = [tpath, '\ufff0'].join('');
    let opts = {
      include_docs: true,
      startkey: tpath,
      endkey: endkey
    };
    pouch.allDocs(opts).then(function (result) {
      let tts = result.rows.map(row => {
        return row.doc;
      });
      log('TTS', tts);
      let qresults = {
        query: query,
        qbooks: []
      };
      wfdocs.forEach(wfdoc => {
        wfdoc.idxs.forEach(idx => {
          let qbook = {
            title: info.book.title,
            tpath: tpath,
            idx: idx,
            texts: []
          };

          let tauth = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(tts, tobj => {
            return tobj.author;
          });

          let row = tauth.rows[idx];
          let textauth = textAround(tauth, row, query); // qres.auth = textauth

          qbook.texts.push(textauth); // procent

          let start = textauth.text.split(query)[0].length; // log('START', start)

          let tttrn = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(tts, tobj => {
            return !tobj.author;
          });

          tttrn.forEach(tobj => {
            let row = tobj.rows[idx];
            let textrn = textAround(tobj, row, query, start);
            qbook.texts.push(textrn);
          });
          qresults.qbooks.push(qbook);
        });
      });
      log('QRs', qresults);
      current = {
        _id: '_local/current',
        section: 'search',
        qresults: qresults
      };
      navigate(current);
    }); // parseBook(current, info, texts)
  }).catch(function (err) {
    log('getWFSErr', err);
  });
});

function parseQuery() {
  window.split.setSizes([100, 0]);
  let osource = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#source');
  let otrns = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#trns'); // log('Q-current', current)

  let res = current.qresults;
  let oquery = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["div"])(res.query, 'title');
  osource.appendChild(oquery);
  res.qbooks.forEach(qbook => {
    log('Q-book', qbook);
    let obook = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["div"])();
    let otitle = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["span"])(qbook.title, 'qtitle');
    let oidx = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["span"])('par: ' + qbook.idx, 'qtitle');
    obook.appendChild(otitle);
    obook.appendChild(oidx);
    osource.appendChild(obook);
    let otext = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["div"])('', 'qtext');
    qbook.texts.forEach(tobj => {
      let oline = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["p"])(tobj.text, 'qline');
      oline.setAttribute('nic', tobj.nic);
      if (!tobj.author) oline.classList.add('hidden');
      otext.appendChild(oline);
    });
    osource.appendChild(otext);
  });
  let oline = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["div"])('json', 'title');
  let otxt = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["div"])(JSON.stringify(current.qresults));
  osource.appendChild(oline);
  osource.appendChild(otxt);
}

function textAround(tobj, row, query, start) {
  let line = {
    nic: tobj.nic,
    lang: tobj.lang
  };

  if (tobj.author) {
    line.author = true;
    line.text = aroundA(row, query);
  } else {
    line.text = row.slice(start, start + 150);
  }

  return line;
}

function aroundA(str, wf) {
  let limit = 50;
  let arr = str.split(wf);
  let head = arr[0].slice(-limit);
  let tail = arr[1].slice(0, limit); // let qspan = ['<span class="query">', wf, '</span>'].join('')
  // html = [head, query, tail] .join('')

  let text = [head, wf, tail].join(''); // log('AROUND', wf, text)

  return text;
}

function showSection(name) {
  window.split.setSizes([100, 0]);
  let osource = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_4__["q"])('#source');
  let secpath = path.resolve(apath, 'src/sections', [name, 'html'].join('.'));
  const section = fse.readFileSync(secpath);
  osource.innerHTML = section;
} // let lunr = elasticlunr(function () {
//   this.addField('nic')
//   this.addField('lang')
//   this.addField('fpath')
//   this.addField('text')
//   this.setRef('id')
// })
// унести в getFile, и грязно пока


function getFNS(fns) {
  if (!fns) return;
  let bpath = fns[0]; // log('NAV BEFORE GET', current)

  let book_id = ['info', bpath].join('-');
  let cur = {
    book_id: book_id
  };
  getDir(cur);
}

function getDir(current) {
  log('GETDIR', current);
  let bpath = current.book_id.split('-')[1];
  if (!bpath) return;
  Object(_lib_getfiles__WEBPACK_IMPORTED_MODULE_6__["openDir"])(bpath, book => {
    if (!book) return;
    log('DIR-INFO::', book.info);
    Promise.all([pushInfo(book.info), // pushTexts(book.texts),
    pushTexts(book.pars)]).then(function (res) {
      log('PUSH ALL RES', res);
      if (current.section) info = book.info, navigate(current);else navigate({
        section: 'lib'
      }); // navigate({section: 'lib'})
    }).catch(function (err) {
      log('ALL RES ERR', err);
    });
  });
}

function pushInfo(ndoc) {
  // log('NDOCinfo', ndoc)
  return pouch.get(ndoc._id).catch(function (err) {
    if (err.name === 'not_found') return;else throw err;
  }).then(function (doc) {
    // log('DOC-old', doc)
    if (doc) {
      // log('DOC-old', doc)
      let testdoc = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.clone(doc);

      delete testdoc._rev;
      if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEqual(ndoc, testdoc)) return;else {
        ndoc._rev = doc._rev; // log('NDOC-rev', ndoc)

        return pouch.put(ndoc);
      }
    } else {
      return pouch.put(ndoc);
    }
  });
}

function pushTexts(newdocs) {
  let options = {
    include_docs: true,
    startkey: 'text',
    endkey: 'text\ufff0'
  };
  return pouch.allDocs({
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
    log('CLD', cleandocs);
    return pouch.bulkDocs(cleandocs);
  });
}

function pushMap(info) {
  let options = {
    include_docs: true,
    startkey: 'wf',
    endkey: 'wf\ufff0'
  };
  return pouch.allDocs(options).then(function (res) {
    let docs = res.rows.map(row => {
      return row.doc;
    }); // log('ODOCS', docs)

    let cleandocs = [];
    let hdoc = {};
    docs.forEach(doc => {
      hdoc[doc._id] = doc;
    }); // log('NDOCS', info.map)

    info.map.forEach(ndoc => {
      let doc = hdoc[ndoc._id];

      if (doc) {
        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEqual(doc.fns, ndoc.fns)) return;else doc.fns = doc.fns.concat(ndoc.fns), cleandocs.push(doc);
      } else {
        cleandocs.push(ndoc);
      }
    }); // log('CMAP', cleandocs)

    return pouch.bulkDocs(cleandocs);
  });
}

function setSearch_(bkey, texts) {
  texts.forEach(text => {
    if (!text.author) return;
    let id = [bkey, text.fpath].join('/');
    let panee = {
      id: id,
      lang: text.lang,
      nic: text.nic,
      fpath: text.fpath,
      text: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.flatten(text.rows)[0] // lunr.addDoc(panee)

    };
  });
}

const historyMode_ = event => {
  const checkArrow = element => {
    // if (!element.classList.contains("arrow")) return
    if (element.id === "new-version") {// log('NEW VERS CLICKED')
    }

    if (element.id === "arrow-left") {
      if (hstate - 1 > -1) hstate--; // showText(hstates[hstate])
    } else if (element.id === "arrow-right") {
      if (hstate + 1 < hstates.length) hstate++; // showText(hstates[hstate])
    }
  };

  checkArrow(event.target);
}; // document.addEventListener("click", historyMode, false)
// не работает - почему?
// function startWatcher(bpath) {
//   watch(bpath, { recursive: true }, function(evt, name) {
//     log('%s changed.', name);
//     // navigate(current)
//     navigate({section: 'lib'})
//   })
// }

/***/ }),

/***/ "./src/lib/book.js":
/*!*************************!*\
  !*** ./src/lib/book.js ***!
  \*************************/
/*! exports provided: twoPages, parseTitle, parseBook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "twoPages", function() { return twoPages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseTitle", function() { return parseTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBook", function() { return parseBook; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! split.js */ "split.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(split_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _tree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tree */ "./src/lib/tree.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../app */ "./src/app.js");






const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const path = __webpack_require__(/*! path */ "path");

const log = console.log;

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const store = new Store(); // const Apstore = require('./apstore')
// const store = new Apstore()
// const elasticlunr = require('elasticlunr');

const clipboard = __webpack_require__(/*! electron-clipboard-extended */ "electron-clipboard-extended");

let current, info;
let apars = [];
let tpars = [];
function twoPages() {
  var sizes = store.get('split-sizes');
  if (sizes) sizes = JSON.parse(sizes);else sizes = [50, 50];
  let split = split_js__WEBPACK_IMPORTED_MODULE_1___default()(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {// reSetBook()
    }
  });
  let obook = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#book');
  obook.addEventListener("wheel", scrollPanes, false);
  document.addEventListener("keydown", keyScroll, false);
  return split;
}

function scrollPanes(ev) {
  if (ev.shiftKey == true) return;
  let delta = ev.deltaY > 0 ? 24 : -24;
  let source = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let trns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  source.scrollTop += delta;
  trns.scrollTop = source.scrollTop;
  if (!current || current.section != 'book') return;
  let el = ev.target;
  let oapp = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#app');
  let book = oapp.book;

  if (source.scrollHeight - source.scrollTop - source.clientHeight <= 3.0) {
    let start = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#source > p').length;
    log('___START', start); // s_etChunk(start, book)
  }
}

function keyScroll(ev) {
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
  }

  trns.scrollTop = source.scrollTop;
  if (!current || current.section != 'book') return;
  let book = window.book;

  if (source.scrollHeight - source.scrollTop - source.clientHeight <= 3.0) {
    let start = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#source > p').length; // log('___KEY START', start)
    // ошибка при прокрутке всегда
    // s_etChunk(start, book)
  }
}

function parseTitle(bookinfo, bookcurrent) {
  // log('========= parse title =============')
  window.split.setSizes([50, 50]);
  info = bookinfo;
  current = bookcurrent;
  log('TITLEinfo', info);
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  let obookTitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])('');
  obookTitle.classList.add('bookTitle');
  osource.appendChild(obookTitle);
  let oauthor = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])(info.book.author, 'author');
  let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["div"])(info.book.title, 'title');
  obookTitle.appendChild(oauthor);
  obookTitle.appendChild(otitle); // problem if not all names in nics list ?

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

function parseBook(bookcurrent, bookinfo, texts) {
  info = bookinfo;
  current = bookcurrent; // log('parseBook_ info', info)
  // log('parseBook_ cur', current)

  if (!texts.length) return;
  window.split.setSizes([50, 50]);
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(osource);
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(otrns);
  let start = 0;
  setBookText(texts, start);
  osource.addEventListener("mouseover", copyToClipboard, false);
  otrns.addEventListener("wheel", cyclePar, false);
}

function setBookText(texts, start) {
  // log('setBookText-TEXTS', texts)
  let fpath = current.fpath; // log('BCUR', current)

  let pars = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(texts, text => {
    return !text.com;
  });

  let coms = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(texts, text => {
    return text.com;
  }); // log('Pars', pars)


  apars = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(pars, par => {
    return par.author && par.fpath == fpath;
  });
  tpars = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(pars, par => {
    return !par.author && par.fpath == fpath;
  }); // log('A', apars)
  // log('T', tpars)

  let cnics = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(tpars.map(auth => {
    return auth.nic;
  })); // log('CNICS', cnics)


  let nic = current.nic;
  if (!nic) nic = cnics[0];
  if (!cnics.includes(nic)) nic = cnics[0];
  current.nic = nic;
  setChunk(start);
  createRightHeader(cnics);
  createLeftHeader();
}

function setChunk(start) {
  let limit = 20;
  let author = apars[0];
  let anic = author.nic;
  let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)';
  let rePunct = new RegExp(punct, 'g');
  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  let nic = current.nic;
  let arows = author.rows.slice(start, start + limit);
  arows.forEach((astr, idx) => {
    let pars = [];
    let oleft = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["p"])();
    let html = astr.replace(rePunct, " <span class=\"active\">$1</span>");
    oleft.innerHTML = html;
    oleft.setAttribute('idx', start + idx);
    oleft.setAttribute('nic', anic);
    osource.appendChild(oleft);
    pars.push(oleft);
    let prights = tpars.map(tpar => {
      let trows = tpar.rows.slice(start, start + limit);

      let text = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(trows, (par, idy) => {
        return idy == idx;
      });

      return {
        idx: idx,
        nic: tpar.nic,
        text: text
      };
    });
    prights.forEach(tpar => {
      let rstr = tpar.text;
      let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["p"])(rstr);
      oright.setAttribute('idx', start + tpar.idx);
      oright.setAttribute('nic', tpar.nic);
      if (tpar.nic == nic) oright.setAttribute('active', true);
      pars.push(oright);
      otrns.appendChild(oright);
    });
    alignPars(pars);
  });
}

function alignPars(pars) {
  let heights = pars.map(par => {
    return par.scrollHeight;
  });

  let max = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.max(heights);

  pars.forEach(par => {
    par.style.height = max + 'px';
    if (!par.getAttribute('active')) par.classList.add('hidden');
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
  let idx = ev.target.getAttribute('idx');
  let selector = '#trns [idx="' + idx + '"]';
  let pars = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])(selector);

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
  let fpath = ev.target.getAttribute('fpath'); // log('LEFT', ev.target)

  let otbody = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#tree-body');
  if (!otbody) return;

  if (fpath) {
    if (ev.target.classList.contains('tree-node-empty')) return;
    let otitle = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#tree-title');
    current.fpath = fpath;
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
/*! exports provided: openODS, openDir */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openODS", function() { return openODS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openDir", function() { return openDir; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app */ "./src/app.js");




const md5 = __webpack_require__(/*! md5 */ "md5");

const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const path = __webpack_require__(/*! path */ "path");

const glob = __webpack_require__(/*! glob */ "glob");

const dirTree = __webpack_require__(/*! directory-tree */ "directory-tree");

const textract = __webpack_require__(/*! textract */ "textract");

const log = console.log; // const Store = require('electron-store')
// const store = new Store()
// const Apstore = require('./apstore')
// const apstore = new Apstore()
// const yuno = require('../../../yunodb')
// const storage = require('electron-json-storage')

function extractAllText(str) {
  const re = /"(.*?)"/g;
  const results = [];
  let current;

  while (current == re.exec(str)) {
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
  }); // localStorage.setItem('auths', JSON.stringify(auths))
  // localStorage.setItem('book', JSON.stringify(book))
}

function openDir(bookpath, cb) {
  if (!bookpath) return;

  try {
    let book = parseDir(bookpath);
    cb(book);
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
  let hasFiles = false;
  dtree.children.forEach(child => {
    if (child.type == 'file') hasFiles = true;
  });
  tree.hasFiles = hasFiles;
  dtree.children.forEach((child, idx) => {
    fns.push(dtree.path);
    if (child.type != 'directory') return;
    if (!tree.children) tree.children = [];
    tree.children.push({});
    walk(fns, dname, child, tree.children[idx]);
  });
}

function parseDir(bookpath) {
  let bpath = path.resolve(__dirname, bookpath);
  let dname = bookpath.split('/').slice(-1)[0]; // + '/'

  const dtree = dirTree(bpath); // log('=DTREE', dtree)

  let fns = [];
  let tree = {};
  walk(fns, dname, dtree, tree); // log('=TREE', tree)

  fns = glob.sync('**/*', {
    cwd: bpath
  });
  let ipath = path.resolve(bpath, 'info.json'); // log('IPATH', ipath)

  let info = parseInfo(ipath); // log('_INFO_', info)

  fns = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(fns, fn => {
    return fn != ipath;
  }); // log('FNS', fns.length)

  let tpath = ['text', info.book.author, info.book.title].join('-');
  let texts = [];
  let coms = [];
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
    let auth = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(info.auths, auth => {
      return auth.ext == nic;
    }) || nic;
    let txt = fse.readFileSync(path.resolve(bpath, fn), 'utf8');
    let clean = txt.trim().replace(/\n+/, '\n').replace(/\s+/, ' ');

    let rows = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(clean.split('\n'));

    let fparts = fn.split('/');
    let fname = fparts.pop();
    let fpath = fparts.join('/');
    if (!fpath) fpath = info.book.title;
    info.sections.push(fpath);
    let lang;
    if (auth) lang = auth.lang;
    let textid = ['text', info.book.author, info.book.title, fpath, nic].join('-');
    let pane = {
      _id: textid,
      lang: lang,
      nic: nic,
      fpath: fpath,
      rows: rows // fname: fname, text: clean,

    };
    if (auth.author) pane.author = true; // , info.book.author = auth.name

    if (comment) coms.push(pane);else texts.push(pane);
    rows.forEach((row, idx) => {
      let parid = ['text', info.book.author, info.book.title, fpath, idx, 'nic', nic].join('-'); // let secid = ['text', info.book.author, info.book.title, fpath].join('-')

      let par = {
        _id: parid,
        idx: idx,
        lang: lang,
        nic: nic,
        fpath: fpath,
        text: row
      };
      if (auth.author) par.author = true;
      if (comment) coms.push(par);else pars.push(par);
    }); // if (auth.author) bookWFMap(map, rows, textid)
  }); // info.tpath = ['text', info.book.author, info.book.title].join('-')

  let id = ['info', tpath].join('-');
  info._id = id;
  info.tree = tree; // info.bpath = bpath

  let book = {
    bkey: bpath,
    info: info,
    texts: texts,
    coms: coms,
    map: map,
    pars: pars
  };
  log('BOOK FROM GET', book);
  return book;
}

function bookWFMap(map, rows, textid) {
  rows.forEach((row, idx) => {
    let punctless = row.replace(/[.,\/#!$%\^&\*;:{}«»=\|\-+_`~()a-zA-Z0-9'"<>\[\]]/g, '');

    let wfs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(punctless.split(' '));

    wfs.forEach(wf => {
      if (!map[wf]) map[wf] = {};
      if (!map[wf][textid]) map[wf][textid] = [];
      map[wf][textid].push(idx);
    });
  }); // let ndocs = []
  // for (let wf in map) {
  //   let idxs = map[wf]
  //   let ndoc = {wf: wf, idxs: idxs, textid: textid}
  //   ndoc._id = ['wf', wf].join('-')
  //   ndocs.push(ndoc)
  // }

  return;
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
    if (auth.author) {
      info.book.author = auth.name;
      return;
    }

    nicnames[auth.ext] = auth.name;
  });
  info.nicnames = nicnames;
  return info;
}

function done(err) {
  if (err) throw err;
  console.log('successfully added documents');
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
  // log('TREEDATA', data)
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
    otext.setAttribute('fpath', '');
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
  // log('NODE', node)
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
  if (style) el.classList.add(style);
  if (style) el.id = style;
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

/***/ "md5":
/*!**********************!*\
  !*** external "md5" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("md5");

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