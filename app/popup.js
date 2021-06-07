/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/popup.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/popup.css ***!
  \*****************************************************************/
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "/*  */\n\n@tailwind base;\n@tailwind components;\n\n.section {\n    @apply p-4 text-gray-900 w-full bg-gray-200 shadow-md rounded m-4\n}\n\n.header {\n    @apply py-2 mb-1 text-left text-gray-900 w-full bg-gray-100 shadow-md rounded\n}\n\n.header-cell {\n    @apply px-12\n}\n\n@tailwind utilities;\n\n.tmpl {\n    display: none!important;\n}\n\nbody {\n    margin: 0;\n    height: 100%;\n    font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\nhtml {\n    margin: 0;\n    height: 100%;\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\nh4 {\n    color: maroon;\n}\n\n#popup {\n    padding: 1em;\n    background-color: #ffffcc;\n    border-style: solid;\n    border-width: 1px;\n    font-size: smaller;\n    border-color: #cacd58;\n    /* box-shadow: 0.15em 0.15em 1em rgba(0, 0, 0, 0.75); */\n    height: 100%;\n    line-height: 1.1;\n    /* height: 400px; */\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\n.dict-container {\n  background-color: #fffddd;\n  margin-bottom: 25px;\n}\n\n.dict-header {\n  padding: 10px;\n  background-color: #ffe;\n  display: flex;\n  justify-content: space-between;\n}\n\n.dict-query {\n    color: maroon;\n    font-weight: bold;\n    /* background-color: #eee; */\n}\n\n.dict-dname {\n    /* float: right; */\n    color: green;\n}\n\n\n\ndt {\n  font-weight: bold;\n  cursor: pointer;\n}\n\ndl,\ndd {\n    /* font-size: .9em; */\n    margin-left: 1em;\n    margin-top: 5px;\n}\n\ndd:before {\n    content:  \"- \";\n}\n\ndd.morph {\n  background-color: white;\n  padding: 5px;\n}\n\n\n.hidden {\n    display: none!important;\n}\n\n\n.ellipsis::after {\n    content: '...'\n}\n\nabr {\n    color: green;\n    font-weight: bold;\n}\n\n.morestr {\n  color: maroon;\n}\n\nfont {\n  color: darkgreen;\n  font-weight: bold;\n}\n\nb {\n  font-weight: bold;\n}\n\ni {\n  font-weight: italic;\n}\n\n.green {\n  color: green;\n}\n\n.darkgreen {\n  color: darkgreen;\n}\n\n.red {\n  color: red;\n}\n\n.darkred {\n  color: darkred;\n}\n\n.blue {\n  color: red;\n}\n\n.darkblue {\n  color: darkred;\n}\n\n.grey {\n  color: grey;\n}\n\n.maroon {\n  color: maroon;\n}\n", ""]);
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

/***/ "./src/css/popup.css":
/*!***************************!*\
  !*** ./src/css/popup.css ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./popup.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/popup.css");

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

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");;

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("lodash");;

/***/ }),

/***/ "mousetrap":
/*!****************************!*\
  !*** external "mousetrap" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("mousetrap");;

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Popup": () => (/* binding */ Popup)
/* harmony export */ });
/* harmony import */ var _css_popup_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/popup.css */ "./src/css/popup.css");
/* harmony import */ var _css_popup_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_popup_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");






const mouse = __webpack_require__(/*! mousetrap */ "mousetrap");


const log = console.log;

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

}

class Popup extends History {
  constructor() {
    super();
  }

  back() {
    if (this.index) this.index--;
    this.render();
  }

  forward() {
    if (this.index < this.store.length - 1) this.index++;
    this.render();
  }

  log() {
    log('popup', this);
  }

  render() {
    let rdicts = this.state;
    if (!rdicts) return;
    const opopup = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('#popup');
    (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.empty)(opopup);
    rdicts.forEach(rdict => {
      let odict = drawRdict(rdict);
      opopup.appendChild(odict);
    });
  }

}

function createDict() {
  const otmpl = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('.dict-container.tmpl');
  const odict = otmpl.cloneNode(true);
  odict.classList.remove('tmpl');
  return odict;
}

function drawRdict(rdict) {
  let odict = createDict();
  let odname = odict.querySelector('.dict-dname');
  odname.textContent = rdict.dname;
  let oquery = odict.querySelector('.dict-query');
  oquery.textContent = rdict.wf; // rdict.dicts = rdict.dicts.filter(dict=> dict.trns)

  let dicts = rdict.dicts.filter(dict => !dict.example);
  let examples = rdict.dicts.filter(dict => dict.example);
  dicts.forEach(dict => {
    let odl = drawDict(dict);
    odict.appendChild(odl);
  });
  examples.forEach(dict => {
    let odl = drawDict(dict);
    odl.classList.add('dict-example');
    odict.appendChild(odl);
  });
  return odict;
}

function drawDict(dict) {
  let otmpl = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('.dict-dl.tmpl');
  const odl = otmpl.cloneNode(true);
  odl.classList.remove('tmpl');
  let odt = odl.querySelector('.dict-dt');
  odt.textContent = dict._id; // rdict || dict.term /// <<< ==================== here greek

  odl.appendChild(odt);
  otmpl = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('.dict-dd.tmpl');

  if (dict.pos) {
    const odd = otmpl.cloneNode(true);
    odd.classList.remove('tmpl');
    odd.classList.add('morph');
    const opos = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.create)('span');
    opos.textContent = dict.pos;
    opos.classList.add('green');
    odd.appendChild(opos);

    if (dict.morphs) {
      const omorph = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.create)('span');
      omorph.classList.add('maroon');
      let morphs;
      if (!dict.pos) dict.pos = 'verb';
      if (dict.pos == 'verb') morphs = dict.morphs.map(m => [m.tense, m.numper].join('.'));else morphs = dict.morphs.map(m => [m.gend, m.numcase].join('.'));
      morphs = lodash__WEBPACK_IMPORTED_MODULE_1___default().uniq(morphs);
      omorph.textContent = ': ' + morphs.join(', ');
      odd.appendChild(omorph);
    }

    odl.appendChild(odd);
  }

  dict.trns = lodash__WEBPACK_IMPORTED_MODULE_1___default().flatten(dict.trns); // это нужно поправить в словаре

  dict.trns.forEach(trn => {
    if (trn == dict._id) return;
    const odd = otmpl.cloneNode(true);
    odd.classList.remove('tmpl'); // odd.textContent = trn

    odd.innerHTML = trn;
    odl.appendChild(odd);
  });
  return odl;
}

let popup = new Popup();
electron__WEBPACK_IMPORTED_MODULE_2__.ipcRenderer.on('data', function (event, qresult) {
  popup.state = qresult;
  popup.render();
});
mouse.bind('esc', function (ev) {
  electron__WEBPACK_IMPORTED_MODULE_2__.ipcRenderer.send('hide-popup-window');
});
mouse.bind(['alt+left'], function (ev) {
  popup.back();
});
mouse.bind(['alt+right'], function (ev) {
  popup.forward();
}); // mouse.bind(['ctrl+v'], function(ev) {
//   popup.log()
// })

mouse.bind('space', function (ev) {
  const ddfirst = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('.dict-dd');
  const dds = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.qs)('.dict-dd');
  let show = ddfirst.classList.contains('hidden') ? true : false;
  if (show) showResults(dds);else hideResults(dds);
});

function showResults(dds) {
  dds.forEach(dl => {
    dl.classList.remove('hidden');
  });
}

function hideResults(dds) {
  dds.forEach(dl => {
    dl.classList.add('hidden');
  });
}

function toggleResults(dds, show) {
  if (show) showResults(dds);else hideResults(dds);
}

mouse.bind('tab', function (ev) {
  let ddl;
  let opened = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('.dict-dd:not(.hidden)');

  if (!opened) {
    openFirstResult();
    return;
  }

  ddl = opened.closest('.dict-dl');
  let dds = ddl.querySelectorAll('.dict-dd');
  hideResults(dds);
  let nextddl = ddl.nextSibling;

  if (!nextddl) {
    let ddc = opened.closest('.dict-container');
    let nextddc = ddc.nextSibling;
    if (nextddc) nextddl = nextddc.querySelector('.dict-dl');else {
      openFirstResult();
      return;
    }
  }

  let ndds = nextddl.querySelectorAll('.dict-dd');
  showResults(ndds);
});

function openFirstResult() {
  let ddl = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.q)('.dict-dl');
  let dds = ddl.querySelectorAll('.dict-dd');
  showResults(dds);
}

document.addEventListener('click', ev => {
  let ddl = ev.target.closest('.dict-dl');
  if (!ddl) return;
  let ddfirst = ddl.querySelector('.dict-dd');
  let show = ddfirst.classList.contains('hidden') ? true : false;
  let dds = ddl.querySelectorAll('.dict-dd');
  if (show) showResults(dds);else hideResults(dds);
});

function getNextSiblings(elem) {
  var sibs = [];

  while (elem = elem.nextSibling) {
    sibs.push(elem);
  }

  return sibs;
}

document.addEventListener("wheel", function (ev) {
  if (ev.shiftKey == true) return;
  scrollPopup(ev);
}, false);

function scrollPopup(ev) {
  let ocurrent = ev.target.closest('#popup');
  let delta = ev.deltaY > 0 ? 32 : -32;
  ocurrent.scrollTop += delta;
}
})();

/******/ })()
;
//# sourceMappingURL=popup.js.map