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
/* harmony import */ var _menu_dev_menu_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./menu/dev_menu_template */ "./src/menu/dev_menu_template.js");
/* harmony import */ var _menu_edit_menu_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./menu/edit_menu_template */ "./src/menu/edit_menu_template.js");
/* harmony import */ var _menu_lib_menu_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./menu/lib_menu_template */ "./src/menu/lib_menu_template.js");
/* harmony import */ var _menu_file_menu_template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./menu/file_menu_template */ "./src/menu/file_menu_template.js");
/* harmony import */ var _menu_about_menu_template__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./menu/about_menu_template */ "./src/menu/about_menu_template.js");
/* harmony import */ var _menu_help_menu_template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./menu/help_menu_template */ "./src/menu/help_menu_template.js");
/* harmony import */ var _menu_auth_menu_template__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./menu/auth_menu_template */ "./src/menu/auth_menu_template.js");
/* harmony import */ var _menu_left_menu_template__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./menu/left_menu_template */ "./src/menu/left_menu_template.js");
/* harmony import */ var _menu_right_menu_template__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./menu/right_menu_template */ "./src/menu/right_menu_template.js");
/* harmony import */ var env__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! env */ "./config/env_development.json");
var env__WEBPACK_IMPORTED_MODULE_12___namespace = /*#__PURE__*/__webpack_require__.t(/*! env */ "./config/env_development.json", 1);
// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.











 // import createWindow from "./lib/window";

const windowStateKeeper = __webpack_require__(/*! electron-window-state */ "electron-window-state");

const Store = __webpack_require__(/*! electron-store */ "electron-store");

const store = new Store(); // Special module holding environment variables which you declared
// in config/env_xxx.json file.



const setApplicationMenu = () => {
  const menus = [_menu_left_menu_template__WEBPACK_IMPORTED_MODULE_10__["leftMenuTemplate"], _menu_right_menu_template__WEBPACK_IMPORTED_MODULE_11__["rightMenuTemplate"], _menu_lib_menu_template__WEBPACK_IMPORTED_MODULE_5__["libMenuTemplate"], _menu_file_menu_template__WEBPACK_IMPORTED_MODULE_6__["fileMenuTemplate"], _menu_about_menu_template__WEBPACK_IMPORTED_MODULE_7__["aboutMenuTemplate"], _menu_auth_menu_template__WEBPACK_IMPORTED_MODULE_9__["authMenuTemplate"], _menu_help_menu_template__WEBPACK_IMPORTED_MODULE_8__["helpMenuTemplate"]];

  if (env__WEBPACK_IMPORTED_MODULE_12__.name !== "production") {
    menus.push(_menu_dev_menu_template__WEBPACK_IMPORTED_MODULE_3__["devMenuTemplate"]);
  }

  electron__WEBPACK_IMPORTED_MODULE_2__["Menu"].setApplicationMenu(electron__WEBPACK_IMPORTED_MODULE_2__["Menu"].buildFromTemplate(menus));
}; // Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.


if (env__WEBPACK_IMPORTED_MODULE_12__.name !== "production") {
  const userDataPath = electron__WEBPACK_IMPORTED_MODULE_2__["app"].getPath("userData");
  electron__WEBPACK_IMPORTED_MODULE_2__["app"].setPath("userData", `${userDataPath} (${env__WEBPACK_IMPORTED_MODULE_12__.name})`);
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
    'height': mainWindowState.height
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

  if (env__WEBPACK_IMPORTED_MODULE_12__.name === "development") {
    win.openDevTools();
  } // win.onbeforeunload = (ev) => {
  //   console.log('I do not want to be closed')
  //   ev.returnValue = true
  //   // ev.returnValue = false
  // }


  let evt;
  win.on('close', ev => {
    console.log('APP BEFORE QUIT');
    ev.preventDefault();
    evt = ev;
    win.webContents.send('save-state', 'xxx');
  });
  electron__WEBPACK_IMPORTED_MODULE_2__["ipcMain"].on('state-saved', (event, navpath) => {
    console.log('DATA-SAVED', navpath);
    evt.defaultPrevented = false;
    win.destroy();
  });
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
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'about');
    }
  }, {
    label: "Code and Download",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'code');
    }
  }, {
    label: "License",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'license');
    }
  }, {
    label: "Acknowledgements",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'acknowledgements');
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
  label: "Authentication",
  submenu: [{
    label: "sign in",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'signin');
    }
  }, {
    label: "sign up",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'signup');
    }
  }]
};

/***/ }),

/***/ "./src/menu/dev_menu_template.js":
/*!***************************************!*\
  !*** ./src/menu/dev_menu_template.js ***!
  \***************************************/
/*! exports provided: devMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "devMenuTemplate", function() { return devMenuTemplate; });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const devMenuTemplate = {
  label: "Development",
  submenu: [{
    label: "Reload",
    accelerator: "CmdOrCtrl+R",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.reloadIgnoringCache();
    }
  }, {
    label: "Toggle DevTools",
    accelerator: "Alt+CmdOrCtrl+I",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().toggleDevTools();
    }
  }, {
    label: "Quit",
    accelerator: "CmdOrCtrl+Q",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["app"].quit();
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
    label: "Import from ODS",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'readODS');
    }
  }, {
    label: "Import from TXT",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('parseDir', 'readTXT');
    }
  }, {
    label: "Clone from Github",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'cloneGithub');
    }
  }, {
    type: "separator"
  }, {
    label: "Publish",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'publish');
    }
  }, {
    type: "separator"
  }, {
    label: "Export to TXT",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'exportTXT');
    }
  }, {
    label: "Export to PDF",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'exportPDF');
    }
  }, {
    label: "Export to HTML",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'exportHTML');
    }
  }, {
    type: "separator"
  }, {
    label: "Create dictionary for book",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'createDict');
    }
  }, {
    type: "separator"
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
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'howto-create');
    }
  }, {
    label: "how to publish the result",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'howto-publish');
    }
  }, {
    label: "how to create a dictionary",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'howto-dict');
    }
  }, {
    label: "hot keys",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('section', 'hotkeys');
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

/***/ "./src/menu/left_menu_template.js":
/*!****************************************!*\
  !*** ./src/menu/left_menu_template.js ***!
  \****************************************/
/*! exports provided: leftMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leftMenuTemplate", function() { return leftMenuTemplate; });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const leftMenuTemplate = {
  label: "<--",
  click: () => {
    console.log('LEFT');
  }
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
 // export const libMenuTemplate = {
//   label: "Home",
//   submenu: [
//     { label: "Library", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'library') } }
//   ]
// };

const libMenuTemplate = {
  label: "Home",
  accelerator: "CmdOrCtrl+L",
  click: () => {
    electron__WEBPACK_IMPORTED_MODULE_0__["BrowserWindow"].getFocusedWindow().webContents.send('home');
  }
};

/***/ }),

/***/ "./src/menu/right_menu_template.js":
/*!*****************************************!*\
  !*** ./src/menu/right_menu_template.js ***!
  \*****************************************/
/*! exports provided: rightMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rightMenuTemplate", function() { return rightMenuTemplate; });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const rightMenuTemplate = {
  label: "-->",
  click: () => {
    console.log('RIGHT');
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

/***/ "electron-store":
/*!*********************************!*\
  !*** external "electron-store" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-store");

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