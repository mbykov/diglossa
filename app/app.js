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

/***/ "./node_modules/css-loader/index.js!./src/stylesheets/app.css":
/*!***********************************************************!*\
  !*** ./node_modules/css-loader!./src/stylesheets/app.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html,\nbody {\n  /* width: 100%; */\n  height: 100%;\n  padding-left: 10px;\n  margin: 0;\n  line-height: 1.5;\n  background: none repeat scroll 0 0 #ffffee;\n  font-family: 'Source Sans Pro', sans-serif;\n}\n\n#app {\n  margin: 0;\n  height: 100%;\n  overflow-y: hidden;\n  overflow-x: hidden;\n}\n\n/* .container { */\n/*     height: 100%; */\n/*     width: 100%; */\n/*     margin-left: 0; */\n/* } */\n\nh2 {\n    color: maroon;\n}\n\nb {\n    color: maroon;\n}\n\n#bookImg {\n    float: left;\n    padding: 25px;\n}\n\nul {\n    list-style: none;\n}\n\nul.about li:before {\n    content:  \"\\2014\";\n    position: relative;\n    left:     -5px;\n}\n\n.external {\n    color: maroon;\n    cursor: pointer;\n}\n\n#new-version {\n    /* float: right; */\n    position: absolute;\n    left: 0;\n    right: 0;\n    padding-left: 10px;\n    color: maroon;\n    cursor: pointer;\n}\n\n#arrows {\n    position: absolute;\n    left: 0;\n    right: 0;\n    margin-left: auto;\n    margin-right: auto;\n    width: 100px; /* Need a specific value to work */\n}\n\n.arrow {\n    width: 35px;\n    cursor: pointer;\n}\n\n.progress {\n    display: none;\n    width: 100px;\n    padding-bottom: 10px\n}\n\n\n/* body_ { */\n/*   display: flex; */\n/*   justify-content: center; */\n/*   align-items: center; */\n/*   font-family: sans-serif; */\n/*   color: #525252; */\n/* } */\n\n/* a_ { */\n/*   text-decoration: none; */\n/*   color: #cb3837; */\n/* } */\n\n/* .container_ { */\n/*   text-align: center; */\n/* } */\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/stylesheets/main.css":
/*!************************************************************!*\
  !*** ./node_modules/css-loader!./src/stylesheets/main.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#main {\n    margin: 0;\n    padding: 10px;\n    height: 100%;\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\n.split {\n    overflow-y: auto;\n    overflow-x: hidden;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.gutter {\n    background-color: #eee;\n    background-repeat: no-repeat;\n    background-position: 50%;\n    height: 100%;\n    width: 5px;\n}\n\n.gutter.gutter-horizontal {\n    background-image: url(" + escape(__webpack_require__(/*! ../../resources/vertical.png */ "./resources/vertical.png")) + ");\n    cursor: ew-resize;\n}\n\n.split, .gutter.gutter-horizontal {\n    height: 100%;\n    float: left;\n}\n\n#source {\n    font-family: \"Helvetica Neue\", Helvetica, Arial;\n    font-size: 14px;\n    padding-left: 15px;\n    padding-top: 25px;\n    padding-bottom: 25px;\n    /* -webkit-app-region: drag; */\n    overflow-y: hidden;\n    /* overflow-x: hidden; */\n}\n\n#trns {\n    font-family: \"Helvetica Neue\", Helvetica, Arial;\n    font-size: 14px;\n    padding-left: 15px;\n    padding-top: 25px;\n    padding-bottom: 25px;\n    /* margin-top: -50px; */\n    overflow-y: hidden;\n    overflow-x: hidden;\n}\n\n\n#hsource_ {\n  font-family: \"Helvetica Neue\", Helvetica, Arial;\n  font-size: 16px;\n  /* padding: 15px; */\n  margin-top: 15px;\n  margin-bottom: 25px;\n  /* padding: 50px; */\n  padding-top: 15px;\n  padding-bottom: 25px;\n  /* -webkit-app-region: drag; */\n  overflow-y: hidden;\n  /* overflow-x: hidden; */\n}\n\n#thrns_ {\n  font-family: \"Helvetica Neue\", Helvetica, Arial;\n  font-size: 14px;\n  padding-left: 15px;\n  padding-top: 25px;\n  padding-bottom: 25px;\n  /* margin-top: -50px; */\n  overflow-y: hidden;\n  overflow-x: hidden;\n}\n\n.link {\n    cursor: pointer;\n}\n\n.clause {\n    background-color: #eee;\n}\n\n\nspan {\n    padding-right: 5px;\n}\n\nspan.space {\n    padding-right: 0;\n}\n\nspan.greek {\n    padding-right: 0;\n}\n\nspan.term {\n    padding-right: 0;\n}\n\nspan.greek:hover {\n    background-color: #eee8aa;\n}\n\n\n\n.grey {\n    color: grey;\n}\n\n.hidden {\n    display: 'none';\n}\n\ninput[type='file'] {\n    color: transparent;\n}\n\n.maroon {\n    color: maroon;\n}\n\n/* span.clear { clear: left; display: block; } */\n\n#book {\n  padding-top: 0;\n  margin: 0;\n  height: 100%;\n  overflow-y: hidden;\n  overflow-x: hidden;\n}\n\n#headers {\n  margin: 0;\n  height: 25px;\n}\n\n#headers > p {\n  margin: 0;\n  -webkit-margin-before: 0;\n}\n\n#hleft {\n  float: left;\n  padding-left: 50px;\n}\n\n#hright {\n  float: right;\n  padding-right: 50px;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./resources/vertical.png":
/*!********************************!*\
  !*** ./resources/vertical.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "aeed77a8b9081818ddf762cf8f7e2829.png";

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stylesheets_app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stylesheets/app.css */ "./src/stylesheets/app.css");
/* harmony import */ var _stylesheets_app_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylesheets_app_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stylesheets_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stylesheets/main.css */ "./src/stylesheets/main.css");
/* harmony import */ var _stylesheets_main_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stylesheets_main_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_context_menu_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/context_menu.js */ "./src/lib/context_menu.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/utils */ "./src/lib/utils.js");
/* harmony import */ var _lib_book__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/book */ "./src/lib/book.js");
//


 // import { readCfg, writeCfg, recreateDBs, addDB } from "./lib/databases.js";
// import { getPos, getMorphs, rDict, rMorph, rTrns } from "./lib/results.js";



 // import sband from "./lib/clean-greek";





let fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const log = console.log;

const Mousetrap = __webpack_require__(/*! mousetrap */ "mousetrap"); // const axios = require('axios')


const path = __webpack_require__(/*! path */ "path"); // const mustache = require('mustache')


const clipboard = __webpack_require__(/*! electron-clipboard-extended */ "electron-clipboard-extended");

let hterms = {};
let hstate = -1;
let hstates = []; // const isDev = require('electron-is-dev')
// const isDev = false

const isDev = true;
const app = electron__WEBPACK_IMPORTED_MODULE_4__["remote"].app;
const appPath = app.getAppPath();
let userDataPath = app.getPath("userData"); // enableDBs(userDataPath, appPath, isDev)

showSection('title');
electron__WEBPACK_IMPORTED_MODULE_4__["ipcRenderer"].on('section', function (event, name) {
  if (name == 'dicts') showDicts();else if (name == 'cleanup') showCleanup();else if (name == 'install') showInstall();else showSection(name);
});

function orthoPars(pars) {
  pars.forEach(spans => {
    spans.forEach(spn => {
      if (spn.gr) spn.text = comb(spn.text);
    });
  });
}

clipboard.on('text-changed', () => {// showText ([])
}).startWatching();

function showSection(name) {
  let oapp = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#app');
  let secpath = path.resolve(appPath, 'src/sections', [name, 'html'].join('.'));
  const section = fse.readFileSync(secpath);
  oapp.innerHTML = section;
}

function showBook(book) {
  showSection('main');
  let oprg = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#progress');
  oprg.style.display = "inline-block";
  Object(_lib_book__WEBPACK_IMPORTED_MODULE_6__["parseBook"])(book);
  oprg.style.display = "none";
} // document.addEventListener("mouseover", checkGreek, false)


document.addEventListener("click", go, false);
document.addEventListener("wheel", scrollPanes, false);

function scrollPanes(event) {
  let delta = event.deltaY > 0 ? 24 : -24;
  let source = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#source');
  let trns = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#trns');
  source.scrollTop += delta;
  trns.scrollTop = source.scrollTop;
}

function go(event) {
  if (event.target.dataset.section) {
    showSection(event.target.dataset.section);
  } else if (event.target.dataset.book) {
    showBook(event.target.dataset.book);
  }
}

function showText(pars) {
  if (!pars) return;
  showSection('main');
  let oprg = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#progress');
  oprg.style.display = "inline-block"; // Split(['#text', '#results'], {
  //   sizes: [50, 50],
  //   gutterSize: 5,
  //   cursor: 'col-resize',
  //   minSize: [0, 0]
  // })

  let otext = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#text');
  Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["empty"])(otext);
  let wfs = [];
  pars.forEach(spans => {
    let opar = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["p"])();
    opar.classList.add('greek');
    spans.forEach(spn => {
      let ospan = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["span"])(spn.text);
      if (spn.gr) ospan.classList.add('greek'), wfs.push(spn.text);
      if (spn.text == ' ') ospan.classList.add('space');
      opar.appendChild(ospan);
    });
    otext.appendChild(opar);
  });
  oprg.style.display = "none";
}

function showNoRes() {
  let nores = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["span"])('no result');
  let ores = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#results');
  ores.appendChild(nores);
}

const historyMode = event => {
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
};

const checkGreek = event => {
  if (event.shiftKey) return;

  const checkDomElement = element => {
    if (element.nodeName !== "SPAN") return;

    if (element.classList.contains("greek")) {
      let query = element.textContent;
      if (!query) return; // showResults(query)
    }
  };

  checkDomElement(event.target);
};

Mousetrap.bind(['command+p', 'ctrl+p'], function () {
  let el = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('span.greek:hover');
  if (!el) return;
  let query = el.textContent;
  let href1 = 'http://www.perseus.tufts.edu/hopper/morph?l=';
  let href2 = '&la=greek#lexicon';
  let href = [href1, query, href2].join('');
  electron__WEBPACK_IMPORTED_MODULE_4__["shell"].openExternal(href);
  return false;
});
Mousetrap.bind(['alt+left', 'alt+right'], function (ev) {
  if (ev.which == 37 && hstate - 1 > -1) hstate--;
  if (ev.which == 39 && hstate + 1 < hstates.length) hstate++; // showText(hstates[hstate])

  return false;
});

function showDicts() {
  showSection('dicts');
  let cfg = readCfg();
  let hiddens = ['flex', 'specs'];

  let mins = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.filter(cfg, db => {
    return !hiddens.includes(db.name);
  });

  let obj = {
    dbs: mins
  };
  const tablePath = path.resolve(appPath, 'src/sections/dictTable.mustache');
  const tmpl = fse.readFileSync(tablePath).toString();
  let html = mustache.render(tmpl, obj);
  let otbody = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#tbody');
  otbody.innerHTML = html;
  let rows = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["qs"])('.active-dict');
  rows.forEach(row => {
    let cf = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.find(cfg, db => {
      return db.name == row.name;
    });

    if (!cf) return;
    row.checked = cf.active ? true : false;
  });
  let oorder = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#order');
  otbody.addEventListener("click", activeCfg, false);
  oorder.addEventListener("click", reorderCfg, false);
}

function reorderCfg(ev) {
  let cfg = readCfg();

  let clicked = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.find(cfg, db => {
    return db.name == ev.target.id;
  });

  if (!clicked) return;
  cfg = cfg.filter(db => db.name !== ev.target.id);
  cfg.unshift(clicked);
  cfg.forEach((cf, idx) => {
    cf.idx = idx;
  });
  writeCfg(cfg);
  showDicts();
}

function activeCfg(ev) {
  if (ev.target.type != 'checkbox') return;
  let cfg = readCfg();

  let clicked = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.find(cfg, db => {
    return db.name == ev.target.name;
  });

  if (!clicked) return;
  let chk = ev.target.checked;
  clicked.active = chk ? true : false; // погасить галочку

  let row = ev.target.parentNode.parentNode;
  let img = row.getElementsByTagName('img')[0]; // if (chk) img.style.display = 'block'
  // else img.style.display = 'none'

  writeCfg(cfg);
  showDicts();
}

function showCleanup() {
  showSection('cleanup');
  let ocleanup = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#cleanup');
  ocleanup.addEventListener("click", cleanupDBs, false);
}

function cleanupDBs() {
  recreateDBs();
  showDicts();
}

function showInstall() {
  showSection('install');
  let oinputfile = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#inputfile');

  oinputfile.onchange = function (ev) {
    let fileList = oinputfile.files;
    let fname = fileList[0].name;
    let fpath = fileList[0].path;
    let ofn = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#filename');
    ofn.textContent = fname;
    ofn.setAttribute('fpath', fpath);
  };

  let oinstall = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#dbinstall');
  oinstall.addEventListener("click", installDB, false);
}

function installDB() {
  let ofn = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["q"])('#filename');
  let fpath = ofn.getAttribute('fpath');
  addDB(fpath);
  ofn.textContent = 'done'; // showDicts()
}

function cleanStr(str) {
  str = str.replace(/·/, '');
  return str;
}

const links = document.querySelectorAll('link[rel="import"]');
log('LINKS', links); // Import and add each page to the DOM

Array.prototype.forEach.call(links, link => {
  let template = link.import.querySelector('.task-template');
  let clone = document.importNode(template.content, true);
  document.querySelector('.container').appendChild(clone);
});

/***/ }),

/***/ "./src/lib/book.js":
/*!*************************!*\
  !*** ./src/lib/book.js ***!
  \*************************/
/*! exports provided: parseBook */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBook", function() { return parseBook; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! split.js */ "split.js");
/* harmony import */ var split_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(split_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/lib/utils.js");




let fse = __webpack_require__(/*! fs-extra */ "fs-extra");

let path = __webpack_require__(/*! path */ "path");

const log = console.log;

const glob = __webpack_require__(/*! glob */ "glob");

let split;
function parseBook(book) {
  var sizes = localStorage.getItem('split-sizes');
  if (sizes) sizes = JSON.parse(sizes);else sizes = [50, 50];
  split = split_js__WEBPACK_IMPORTED_MODULE_1___default()(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      alignPanes();
    }
  });
  let otext = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let ores = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(otext);
  Object(_utils__WEBPACK_IMPORTED_MODULE_2__["empty"])(ores);
  let bookpath = '../../texts/Thrax';
  getFiles(bookpath);
}

function getFiles(book) {
  let bookpath = path.resolve(__dirname, book); // log('__dirname', __dirname)
  // log('bookpath', bookpath)

  let dir = bookpath.split('/')[bookpath.split('/').length - 1];
  let fns = glob.sync('**/*', {
    cwd: bookpath
  }); // log('FNs', fns)

  let info = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(fns, fn => {
    return path.extname == '.info';
  });

  fns = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(fns, fn => {
    return path.extname != '.info';
  });
  let trns = [];
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
    let txt = fse.readFileSync(path.resolve(bookpath, fn)).toString();
    let auth = {
      lang: lang,
      title: title,
      nic: nic,
      fn: fn,
      txt: txt
    };
    if (dir.toLowerCase() == nic.toLowerCase()) author = auth;else {
      if (comment) auth.com = true;
      trns.push(auth);
    }
  });
  if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(titles).length != 1) return {
    err: 'different titles'
  };

  let rus = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(trns, auth => {
    return auth.lang == 'ru';
  });

  parsePars(author, rus);
}

function parsePars(author, rus) {
  let astrs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(author.txt.split('\n'));

  let tstrs = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.compact(rus.txt.split('\n'));

  let osource = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#source');
  let otrns = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["q"])('#trns');
  astrs.forEach((astr, idx) => {
    let oleft = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["p"])(astr);
    osource.appendChild(oleft);
    let tstr = tstrs[idx];
    let oright = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["p"])(tstr);
    otrns.appendChild(oright);
    alignPar(oleft, oright);
  });
}

function alignPar(oleft, oright) {
  // oright.style.marginBottom = '12px';
  // oleft.style.marginBottom = '12px';
  let aheight = oleft.offsetHeight;
  let rheight = oright.offsetHeight;

  let max = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.max([aheight, rheight]);

  let bottom;

  if (rheight == max) {
    oleft.style.height = max + 'px';
  } else {
    oright.style.height = max + 'px';
  }
}

function alignPanes() {
  let leftPars = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#source p');
  let rightPars = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["qs"])('#trns p');
  leftPars.forEach((oleft, idx) => {
    let oright = rightPars[idx];
    alignPar(oleft, oright);
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

/***/ "./src/lib/utils.js":
/*!**************************!*\
  !*** ./src/lib/utils.js ***!
  \**************************/
/*! exports provided: q, qs, create, recreateDiv, recreate, span, br, div, p, empty, remove, removeAll, findAncestor, placePopup, log, plog, enclitic */
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

/***/ }),

/***/ "./src/stylesheets/app.css":
/*!*********************************!*\
  !*** ./src/stylesheets/app.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./app.css */ "./node_modules/css-loader/index.js!./src/stylesheets/app.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/stylesheets/main.css":
/*!**********************************!*\
  !*** ./src/stylesheets/main.css ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!./main.css */ "./node_modules/css-loader/index.js!./src/stylesheets/main.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

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