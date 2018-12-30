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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/env_development.json":
/*!*************************************!*\
  !*** ./config/env_development.json ***!
  \*************************************/
/*! exports provided: name, description, default */
/***/ (function(module) {

module.exports = {"name":"development","description":"Add here any environment specific stuff you like."};

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, productName, version, description, author, copyright, license, homepage, main, build, scripts, dependencies, devDependencies, repository, bugs, default */
/***/ (function(module) {

module.exports = {"name":"diglossa.js","productName":"Diglossa.js","version":"0.4.3","description":"Bilingual Reader - an application for creating, distributing and reading bi-(many) lingual texts","author":"Michael  Bykov <m.bykov@gmail.com>","copyright":"© 2018, Michael Bykov","license":"GPL-3.0","homepage":"http://diglossa.org/diglossa.js","main":"app/background.js","build":{"appId":"org.diglossa.diglossa.js","files":["app/**/*","src/**/*","resources/**/*","package.json"],"directories":{"buildResources":"resources"},"dmg":{"contents":[{"x":410,"y":150,"type":"link","path":"/Applications"},{"x":130,"y":150,"type":"file"}]},"mac":{"icon":"resources/icon.icns"},"win":{"icon":"resources/icon.ico","publisherName":"Michael Bykov","publish":["github"]},"linux":{"category":"Educational software","target":["deb"],"icon":"resources/icons"},"publish":"github"},"scripts":{"postinstall":"electron-builder install-app-deps","preunit":"webpack --config=build/webpack.unit.config.js --env=test --display=none","unit":"electron-mocha temp/specs.js --renderer --require source-map-support/register","pree2e":"webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none","e2e":"mocha temp/e2e.js --require source-map-support/register","test":"npm run unit && npm run e2e","start":"node build/start.js","release":"webpack --config=build/webpack.app.config.js --env=production && electron-builder"},"dependencies":{"axios":"^0.18.0","directory-tree":"^2.1.0","electron-clipboard-extended":"^1.1.1","electron-settings":"^3.2.0","electron-window-state":"^5.0.2","file-loader":"^2.0.0","franc-all":"^5.0.0","fs-extra":"^7.0.1","fs-jetpack":"^2.2.0","git-clone":"^0.1.0","glob":"^7.1.3","json5":"^2.1.0","lodash":"^4.17.11","mousetrap":"^1.6.2","pouchdb":"^7.0.0","pouchdb-find":"^7.0.0","slash":"^2.0.0","split.js":"^1.4.0","textract":"^2.4.0"},"devDependencies":{"@babel/core":"^7.1.2","@babel/preset-env":"^7.1.0","babel-loader":"^8.0.4","babel-plugin-transform-object-rest-spread":"^7.0.0-beta.3","chai":"^4.2.0","css-loader":"^0.28.7","electron":"4.0.0","electron-builder":"^20.28.4","electron-mocha":"^6.0.4","friendly-errors-webpack-plugin":"^1.7.0","mocha":"^5.2.0","source-map-support":"^0.5.9","spectron":"^4.0.0","style-loader":"^0.23.0","webpack":"^4.20.2","webpack-cli":"^3.1.2","webpack-merge":"^4.1.4","webpack-node-externals":"^1.7.2"},"repository":{"type":"git","url":"git+https://github.com/mbykov/diglossa.js.git"},"bugs":{"url":"https://github.com/mbykov/diglossa.js/issues"}};

/***/ }),

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _menu_edit_menu_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu/edit_menu_template */ "./src/menu/edit_menu_template.js");
/* harmony import */ var _menu_lib_menu_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu/lib_menu_template */ "./src/menu/lib_menu_template.js");
/* harmony import */ var _menu_file_menu_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menu/file_menu_template */ "./src/menu/file_menu_template.js");
/* harmony import */ var _menu_about_menu_template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./menu/about_menu_template */ "./src/menu/about_menu_template.js");
/* harmony import */ var _menu_help_menu_template__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./menu/help_menu_template */ "./src/menu/help_menu_template.js");
/* harmony import */ var _menu_auth_menu_template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./menu/auth_menu_template */ "./src/menu/auth_menu_template.js");
/* harmony import */ var env__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! env */ "./config/env_development.json");
var env__WEBPACK_IMPORTED_MODULE_9___namespace = /*#__PURE__*/__webpack_require__.t(/*! env */ "./config/env_development.json", 1);
// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.


 // import { devMenuTemplate } from "./menu/dev_menu_template";






 // import { leftMenuTemplate } from "./menu/left_menu_template";
// import { rightMenuTemplate } from "./menu/right_menu_template";
// import createWindow from "./lib/window";

const windowStateKeeper = __webpack_require__(/*! electron-window-state */ "electron-window-state");

const settings = __webpack_require__(/*! electron-settings */ "electron-settings"); // const Store = require('electron-store')
// const store = new Store()
// Special module holding environment variables which you declared
// in config/env_xxx.json file.




const setApplicationMenu = () => {
  const menus = [_menu_lib_menu_template__WEBPACK_IMPORTED_MODULE_4__["libMenuTemplate"], _menu_file_menu_template__WEBPACK_IMPORTED_MODULE_5__["fileMenuTemplate"], _menu_about_menu_template__WEBPACK_IMPORTED_MODULE_6__["aboutMenuTemplate"], _menu_auth_menu_template__WEBPACK_IMPORTED_MODULE_8__["authMenuTemplate"], _menu_help_menu_template__WEBPACK_IMPORTED_MODULE_7__["helpMenuTemplate"]];

  if (env__WEBPACK_IMPORTED_MODULE_9__.name !== "production") {// menus.push(devMenuTemplate);
  }

  electron__WEBPACK_IMPORTED_MODULE_2__["Menu"].setApplicationMenu(electron__WEBPACK_IMPORTED_MODULE_2__["Menu"].buildFromTemplate(menus));
}; // Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.


if (env__WEBPACK_IMPORTED_MODULE_9__.name !== "production") {
  const userDataPath = electron__WEBPACK_IMPORTED_MODULE_2__["app"].getPath("userData");
  electron__WEBPACK_IMPORTED_MODULE_2__["app"].setPath("userData", `${userDataPath} (${env__WEBPACK_IMPORTED_MODULE_9__.name})`);
}

electron__WEBPACK_IMPORTED_MODULE_2__["app"].on("ready", () => {
  setApplicationMenu(); // Load the previous state with fallback to defaults

  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  }); // Create the window using the state information

  const win = new electron__WEBPACK_IMPORTED_MODULE_2__["BrowserWindow"]({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height,
    webPreferences: {
      nodeIntegration: true
    }
  }); // Let us register listeners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen state

  mainWindowState.manage(win); // const mainWindow = createWindow("main", {
  //   width: 1000,
  //   height: 600
  // });

  win.loadURL(url__WEBPACK_IMPORTED_MODULE_1___default.a.format({
    pathname: path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, "app.html"),
    protocol: "file:",
    slashes: true
  }));

  if (env__WEBPACK_IMPORTED_MODULE_9__.name === "development") {
    win.openDevTools();
  }

  win.webContents.on('did-finish-load', () => {
    let pckg = __webpack_require__(/*! ../package.json */ "./package.json");

    let name = pckg.name;
    let version = pckg.version; // let aversion = pckg.dependencies.antrax.replace('^', '')

    win.webContents.send('version', {
      version: version
    });
    win.setTitle([name, 'v.', version].join(' '));
  });
  electron__WEBPACK_IMPORTED_MODULE_2__["globalShortcut"].register('Ctrl+R', () => win.reload());
});
electron__WEBPACK_IMPORTED_MODULE_2__["app"].on("window-all-closed", () => {
  electron__WEBPACK_IMPORTED_MODULE_2__["app"].quit();
}); // app.on('before-quit', (ev) => {
//   console.log('APP BEFORE QUIT')
//   win.webContents.send('save-state', 'whoooooooh!')
//   ev.preventDefault()
// })

/***/ }),

/***/ "./src/menu/about_menu_template.js":
/*!*****************************************!*\
  !*** ./src/menu/about_menu_template.js ***!
  \*****************************************/
/*! exports provided: aboutMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aboutMenuTemplate", function() { return aboutMenuTemplate; });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const aboutMenuTemplate = {
  label: "About",
  submenu: [{
    label: "What does this program do?",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'about');
    }
  }, {
    label: "Code and Download",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'code');
    }
  }, {
    label: "License",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'license');
    }
  }, {
    label: "Acknowledgements",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'acknowledgements');
    }
  }]
};

/***/ }),

/***/ "./src/menu/auth_menu_template.js":
/*!****************************************!*\
  !*** ./src/menu/auth_menu_template.js ***!
  \****************************************/
/*! exports provided: authMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authMenuTemplate", function() { return authMenuTemplate; });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const authMenuTemplate = {
  label: "Sign in",
  submenu: [{
    label: "sign in",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'signin');
    }
  }, {
    label: "sign up",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'signup');
    }
  }]
};

/***/ }),

/***/ "./src/menu/edit_menu_template.js":
/*!****************************************!*\
  !*** ./src/menu/edit_menu_template.js ***!
  \****************************************/
/*! exports provided: editMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editMenuTemplate", function() { return editMenuTemplate; });
const editMenuTemplate = {
  label: "Edit",
  submenu: [{
    label: "Undo",
    accelerator: "CmdOrCtrl+Z",
    selector: "undo:"
  }, {
    label: "Redo",
    accelerator: "Shift+CmdOrCtrl+Z",
    selector: "redo:"
  }, {
    type: "separator"
  }, {
    label: "Cut",
    accelerator: "CmdOrCtrl+X",
    selector: "cut:"
  }, {
    label: "Copy",
    accelerator: "CmdOrCtrl+C",
    selector: "copy:"
  }, {
    label: "Paste",
    accelerator: "CmdOrCtrl+V",
    selector: "paste:"
  }, {
    label: "Select All",
    accelerator: "CmdOrCtrl+A",
    selector: "selectAll:"
  }]
};

/***/ }),

/***/ "./src/menu/file_menu_template.js":
/*!****************************************!*\
  !*** ./src/menu/file_menu_template.js ***!
  \****************************************/
/*! exports provided: fileMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fileMenuTemplate", function() { return fileMenuTemplate; });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const fileMenuTemplate = {
  label: "File",
  submenu: [{
    label: "Import from file",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('parseDir');
    }
  }, {
    label: "Clone from Github",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'cloneGithub');
    }
  }, {
    type: "separator"
  }, // { label: "Reload app", accelerator: "CommandOrControl+Shift+R", click: () => { BrowserWindow.getFocusedWindow().webContents.send('reload') } },
  // { label: "Re-read Files", accelerator: "CommandOrControl+R", click: () => { BrowserWindow.getFocusedWindow().webContents.send('reread') } },
  {
    type: "separator"
  }, {
    label: "Publish",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'publish');
    }
  }, {
    type: "separator"
  }, {
    label: "Export to TXT",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'exportTXT');
    }
  }, {
    label: "Export to PDF",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'exportPDF');
    }
  }, {
    label: "Export to HTML",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'exportHTML');
    }
  }, {
    type: "separator"
  }, {
    label: "Create dictionary for book",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'createDict');
    }
  }, {
    type: "separator"
  }, {
    label: "Clean up DB",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'cleanup');
    }
  }, {
    type: "separator"
  }, {
    role: 'reload'
  }, {
    role: 'forcereload'
  }, {
    label: "Quit",
    accelerator: "CmdOrCtrl+Q",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["app"].quit();
    }
  }]
};

/***/ }),

/***/ "./src/menu/help_menu_template.js":
/*!****************************************!*\
  !*** ./src/menu/help_menu_template.js ***!
  \****************************************/
/*! exports provided: helpMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "helpMenuTemplate", function() { return helpMenuTemplate; });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const helpMenuTemplate = {
  label: "Help",
  submenu: [{
    label: "how to create a book",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'howto-create');
    }
  }, {
    label: "how to create a dictionary",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'howto-dict');
    }
  }, {
    label: "hot keys",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'hotkeys');
    }
  }, {
    label: "Toggle DevTools",
    accelerator: "Alt+CmdOrCtrl+I",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().toggleDevTools();
    }
  }]
};

/***/ }),

/***/ "./src/menu/lib_menu_template.js":
/*!***************************************!*\
  !*** ./src/menu/lib_menu_template.js ***!
  \***************************************/
/*! exports provided: libMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "libMenuTemplate", function() { return libMenuTemplate; });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const libMenuTemplate = {
  label: "Home",
  accelerator: "CmdOrCtrl+L",
  click: () => {
    electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('action', 'lib');
  }
};

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "electron-settings":
/*!************************************!*\
  !*** external "electron-settings" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-settings");

/***/ }),

/***/ "electron-window-state":
/*!****************************************!*\
  !*** external "electron-window-state" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-window-state");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=background.js.map