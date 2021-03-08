/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
//
const config = {
  host: 'http://diglossa.org',
  port: '5984',
  version: 'https://github.com/mbykov/diglossa.js/releases/latest',
  defstate: 'library',
  batch_size: 1000,
  pageSize: 25,
  splitSizes: [100, 0],
  langs: ['eng', 'deu', 'rus'],
  ldname: 'local',
  deflang: 'eng',
  extpath: './diglossa.export.fts'
};

/***/ }),

/***/ "./src/i18n/about_menu_template.js":
/*!*****************************************!*\
  !*** ./src/i18n/about_menu_template.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aboutMenuTemplate": () => (/* binding */ aboutMenuTemplate)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "./src/i18n/i18n.js");


let log = console.log;
function aboutMenuTemplate() {
  let menu = {
    label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('about'),
    submenu: [{
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('essence '),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'essence');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('about'),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'about');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('acknowledgements'),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'acknowledgements');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('code'),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'code');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('contacts'),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'contacts');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)('license'),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'license');
      }
    }]
  };
  return menu;
}

/***/ }),

/***/ "./src/i18n/book_menu_template.js":
/*!****************************************!*\
  !*** ./src/i18n/book_menu_template.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bookMenuTemplate": () => (/* binding */ bookMenuTemplate)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "./src/i18n/i18n.js");


let log = console.log;
function bookMenuTemplate() {
  let menu = {
    label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("book"),
    submenu: [{
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("library"),
      accelerator: "CmdOrCtrl+L",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'library');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("bookmarks"),
      // accelerator: "CmdOrCtrl+B",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'bookmarks');
      }
    }, {
      type: "separator"
    }, {
      label: "Import book",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('importBook');
      }
    }, {
      label: "Add parallel book",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('addParallelBook');
      }
    }, {
      label: "Generate FTS",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('generateFTS');
      }
    }, {
      type: "separator"
    }, // { label: "Book package preferences", click: () => { BrowserWindow.getFocusedWindow().webContents.send('route', 'prefs') } },
    {
      label: "Export to .dgl package",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'preference');
      }
    }, // { type: "separator" },
    {
      label: "Compress package",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('compress');
      }
    }, {
      label: "Uncompress package",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('uncompress');
      }
    } // { label: "Publish", click: () => { BrowserWindow.getFocusedWindow().webContents.send('publishDGL') } },
    ]
  };
  return menu;
}

/***/ }),

/***/ "./src/i18n/dict_menu_template.js":
/*!****************************************!*\
  !*** ./src/i18n/dict_menu_template.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dictMenuTemplate": () => (/* binding */ dictMenuTemplate)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "./src/i18n/i18n.js");


let log = console.log;
function dictMenuTemplate() {
  let menu = {
    label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("dictionary"),
    submenu: [{
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("dictionary list"),
      // accelerator: "CmdOrCtrl+D", ======= ли то, либо это
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'dictionary');
      }
    }, {
      type: "separator"
    }, {
      label: "Import StarDict .ifo",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('importDict');
      }
    }, {
      label: "Import DSL .ifo",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('importDict');
      }
    }, {
      type: "separator"
    }, {
      label: "Export  .dgl-dict",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('exportDGL-dict');
      }
    }]
  };
  return menu;
}

/***/ }),

/***/ "./src/i18n/file_menu_template.js":
/*!****************************************!*\
  !*** ./src/i18n/file_menu_template.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fileMenuTemplate": () => (/* binding */ fileMenuTemplate)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "./src/i18n/i18n.js");


let log = console.log;
function fileMenuTemplate() {
  let menu = {
    label: "File",
    submenu: [{
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("home"),
      accelerator: "CmdOrCtrl+H",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'home');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("sign in"),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'signin');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("sign up"),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'signup');
      }
    }, {
      type: "separator"
    }, {
      type: "separator"
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Preferences"),
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('route', 'prefsapp');
      }
    }, {
      type: "separator"
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Quit"),
      accelerator: "CmdOrCtrl+Q",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();
      }
    }]
  };
  return menu;
}

/***/ }),

/***/ "./src/i18n/help_menu_template.js":
/*!****************************************!*\
  !*** ./src/i18n/help_menu_template.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "helpMenuTemplate": () => (/* binding */ helpMenuTemplate)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n */ "./src/i18n/i18n.js");



const os = __webpack_require__(/*! os */ "os");

let href;
function helpMenuTemplate() {
  let menu = {
    label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Help"),
    submenu: [{
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Website"),
      click: () => {
        href = 'http://diglossa.org/diglossa.js';
        electron__WEBPACK_IMPORTED_MODULE_0__.shell.openExternal(href);
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Source Code"),
      click: () => {
        href = 'https://github.com/mbykov/diglossa.js/';
        electron__WEBPACK_IMPORTED_MODULE_0__.shell.openExternal(href);
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Report an Issue…"),
      click: () => {
        href = 'https://github.com/mbykov/diglossa.js/issues/new/';
        console.log('INFO', debugInfo());
        let body = debugInfo();
        href = [href, body].join('?body=');
        electron__WEBPACK_IMPORTED_MODULE_0__.shell.openExternal(href);
      }
    }, {
      label: 'Show App Data',

      click() {
        electron__WEBPACK_IMPORTED_MODULE_0__.shell.openItem(electron__WEBPACK_IMPORTED_MODULE_0__.app.getPath('userData'));
      }

    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("hot keys"),
      accelerator: "CmdOrCtrl+H",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('section', 'help');
      }
    }, {
      label: "Reload",
      accelerator: "CmdOrCtrl+R",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
      }
    }, {
      label: "Re-Read",
      accelerator: "Shift+CmdOrCtrl+R",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('action', 're-read-file');
      }
    }, {
      label: (0,_i18n__WEBPACK_IMPORTED_MODULE_1__.i18n)("Toggle devTools"),
      accelerator: "Alt+CmdOrCtrl+I",
      click: () => {
        electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().toggleDevTools();
      }
    }]
  };
  return menu;
}

function debugInfo() {
  let debugInfo = `${electron__WEBPACK_IMPORTED_MODULE_0__.app.getName()} ${electron__WEBPACK_IMPORTED_MODULE_0__.app.getVersion()}
            ${process.platform} ${os.release()}
            Locale: ${electron__WEBPACK_IMPORTED_MODULE_0__.app.getLocale()}
            `.trim();
  return debugInfo;
}

/***/ }),

/***/ "./src/i18n/i18n.js":
/*!**************************!*\
  !*** ./src/i18n/i18n.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i18n": () => (/* binding */ i18n)
/* harmony export */ });


const path = __webpack_require__(/*! path */ "path");

const electron = __webpack_require__(/*! electron */ "electron");

const fse = __webpack_require__(/*! fs-extra */ "fs-extra");

const config = __webpack_require__(/*! ../config */ "./src/config.js");

const {
  ipcMain
} = __webpack_require__(/*! electron */ "electron");

const log = console.log;
let app = electron.app ? electron.app : electron.remote.app;
let apath = app.getAppPath();
let content = {};
let lang = config.deflang;
ipcMain.on('lang', (event, newlang) => {
  lang = newlang;
});
let loadedLanguage;
function i18n(phrase) {
  if (!content[lang]) {
    let langFile = lang + '.js';
    let localePath = path.resolve(apath, 'src/i18n', langFile);

    if (fse.pathExistsSync(localePath)) {
      loadedLanguage = fse.readJsonSync(localePath);
    } else {
      let enPath = path.resolve(apath, 'src/i18n/eng.js');
      loadedLanguage = fse.readJsonSync(enPath);
    }

    content[lang] = loadedLanguage;
  }

  let dcased = uncap(phrase);
  let caped = capitalize(content[lang][dcased]) || capitalize(phrase);
  return caped;
}

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const uncap = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toLowerCase() + s.slice(1);
};

/***/ }),

/***/ "./src/i18n/lang_deu_menu_template.js":
/*!********************************************!*\
  !*** ./src/i18n/lang_deu_menu_template.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deuMenuTemplate": () => (/* binding */ deuMenuTemplate)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const deuMenuTemplate = {
  label: "DEU",
  submenu: [{
    label: "ENG",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'eng');
    }
  }, {
    label: "RUS",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'rus');
    }
  } // {
  //   label: "TIB",
  //   click: () => {
  //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'tib')
  //   }
  // },
  // {
  //   label: "ZHO",
  //   click: () => {
  //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'zho')
  //   }
  // }
  ]
};

/***/ }),

/***/ "./src/i18n/lang_eng_menu_template.js":
/*!********************************************!*\
  !*** ./src/i18n/lang_eng_menu_template.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "engMenuTemplate": () => (/* binding */ engMenuTemplate)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const engMenuTemplate = {
  label: "ENG",
  submenu: [{
    label: "DEU",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'deu');
    }
  }, {
    label: "RUS",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'rus');
    }
  } // {
  //   label: "TIB",
  //   click: () => {
  //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'tib')
  //   }
  // },
  // {
  //   label: "ZHO",
  //   click: () => {
  //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'zho')
  //   }
  // }
  ]
};

/***/ }),

/***/ "./src/i18n/lang_rus_menu_template.js":
/*!********************************************!*\
  !*** ./src/i18n/lang_rus_menu_template.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rusMenuTemplate": () => (/* binding */ rusMenuTemplate)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const rusMenuTemplate = {
  label: "RUS",
  submenu: [{
    label: "DEU",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'deu');
    }
  }, {
    label: "ENG",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'eng');
    }
  } // {
  //   label: "TIB",
  //   click: () => {
  //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'tib')
  //   }
  // },
  // {
  //   label: "ZHO",
  //   click: () => {
  //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'zho')
  //   }
  // }
  ]
};

/***/ }),

/***/ "./src/i18n/lang_zho_menu_template.js":
/*!********************************************!*\
  !*** ./src/i18n/lang_zho_menu_template.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zhoMenuTemplate": () => (/* binding */ zhoMenuTemplate)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);

const zhoMenuTemplate = {
  label: "ZHO",
  submenu: [{
    label: "ENG",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'eng');
    }
  }, {
    label: "DEU",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'deu');
    }
  }, {
    label: "RUS",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'rus');
    }
  }, {
    label: "TIB",
    click: () => {
      electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.getFocusedWindow().webContents.send('lang', 'tib');
    }
  }]
};

/***/ }),

/***/ "./src/i18n/menu-factory.js":
/*!**********************************!*\
  !*** ./src/i18n/menu-factory.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MenuFactory": () => (/* binding */ MenuFactory)
/* harmony export */ });
/* harmony import */ var _file_menu_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file_menu_template */ "./src/i18n/file_menu_template.js");
/* harmony import */ var _book_menu_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./book_menu_template */ "./src/i18n/book_menu_template.js");
/* harmony import */ var _dict_menu_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dict_menu_template */ "./src/i18n/dict_menu_template.js");
/* harmony import */ var _about_menu_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./about_menu_template */ "./src/i18n/about_menu_template.js");
/* harmony import */ var _help_menu_template__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./help_menu_template */ "./src/i18n/help_menu_template.js");
/* harmony import */ var _lang_deu_menu_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lang_deu_menu_template */ "./src/i18n/lang_deu_menu_template.js");
/* harmony import */ var _lang_eng_menu_template__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lang_eng_menu_template */ "./src/i18n/lang_eng_menu_template.js");
/* harmony import */ var _lang_rus_menu_template__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lang_rus_menu_template */ "./src/i18n/lang_rus_menu_template.js");
/* harmony import */ var _lang_zho_menu_template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lang_zho_menu_template */ "./src/i18n/lang_zho_menu_template.js");
const Menu = __webpack_require__(/*! electron */ "electron").Menu; // import env from "env";


const log = console.log;



 // import { editMenuTemplate } from "./edit_menu_template";





 // const menu = null;
// const platform = process.platform;

function MenuFactory(lang) {
  const menus = [(0,_file_menu_template__WEBPACK_IMPORTED_MODULE_0__.fileMenuTemplate)(), (0,_book_menu_template__WEBPACK_IMPORTED_MODULE_1__.bookMenuTemplate)(), (0,_dict_menu_template__WEBPACK_IMPORTED_MODULE_2__.dictMenuTemplate)(), (0,_about_menu_template__WEBPACK_IMPORTED_MODULE_3__.aboutMenuTemplate)(), (0,_help_menu_template__WEBPACK_IMPORTED_MODULE_4__.helpMenuTemplate)()]; // if (env.name !== "production") {
  //   menus.push(devMenuTemplate);
  // }
  // menus.push(langMenuTemplate);

  switch (lang) {
    case 'eng':
      menus.push(_lang_eng_menu_template__WEBPACK_IMPORTED_MODULE_6__.engMenuTemplate);
      break;

    case 'deu':
      menus.push(_lang_deu_menu_template__WEBPACK_IMPORTED_MODULE_5__.deuMenuTemplate);
      break;

    case 'rus':
      menus.push(_lang_rus_menu_template__WEBPACK_IMPORTED_MODULE_7__.rusMenuTemplate);
      break;

    case 'zho':
      menus.push(_lang_zho_menu_template__WEBPACK_IMPORTED_MODULE_8__.zhoMenuTemplate);
      break;

    default:
      menus.push(_lang_eng_menu_template__WEBPACK_IMPORTED_MODULE_6__.engMenuTemplate);
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
}

/***/ }),

/***/ "book-epub2json":
/*!*********************************!*\
  !*** external "book-epub2json" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("book-epub2json");;

/***/ }),

/***/ "book-fb2json":
/*!*******************************!*\
  !*** external "book-fb2json" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("book-fb2json");;

/***/ }),

/***/ "book-md2json":
/*!*******************************!*\
  !*** external "book-md2json" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("book-md2json");;

/***/ }),

/***/ "book-pdf2json":
/*!********************************!*\
  !*** external "book-pdf2json" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("book-pdf2json");;

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");;

/***/ }),

/***/ "electron-store":
/*!*********************************!*\
  !*** external "electron-store" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("electron-store");;

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("fs-extra");;

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");;

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var book_fb2json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! book-fb2json */ "book-fb2json");
/* harmony import */ var book_fb2json__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(book_fb2json__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var book_epub2json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! book-epub2json */ "book-epub2json");
/* harmony import */ var book_epub2json__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(book_epub2json__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var book_md2json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! book-md2json */ "book-md2json");
/* harmony import */ var book_md2json__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(book_md2json__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var book_pdf2json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! book-pdf2json */ "book-pdf2json");
/* harmony import */ var book_pdf2json__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(book_pdf2json__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _i18n_menu_factory__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./i18n/menu-factory */ "./src/i18n/menu-factory.js");



 // import { fb2json } from '../../b/book-fb2json'

 // import { epub2json } from '../../b/book-epub2json'

 // import { md2json } from '../../b/book-md2json'

 // import { pdf2json } from '../../b/book-pdf2json'



const Store = __webpack_require__(/*! electron-store */ "electron-store");

const positionstore = new Store({
  name: 'bounds'
});
 // Special module holding environment variables which you declared
// in config/env_xxx.json file.
// import env from "env";

const createWindow = () => {
  const mainWindow = new electron__WEBPACK_IMPORTED_MODULE_2__.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      nodeIntegration: true
    }
  });
  let winBounds = positionstore.get('main') || mainWindow.getBounds();
  mainWindow.setBounds(winBounds);
  mainWindow.loadURL(url__WEBPACK_IMPORTED_MODULE_1___default().format({
    pathname: path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, "app.html"),
    protocol: "file:",
    slashes: true
  }));
  mainWindow.webContents.on('will-navigate', event => {
    event.preventDefault();
  });
  mainWindow.webContents.openDevTools();
  global.templates = {};
  global.dgl = {};
  mainWindow.on('close', () => {
    positionstore.set('main', mainWindow.getBounds());
  }); // mainWindow.on('resize', () => {
  //   positionstore.set('main', mainWindow.getBounds())
  // })

  electron__WEBPACK_IMPORTED_MODULE_2__.ipcMain.on('importBook', async (event, data) => {
    let bpath = data.bpath;
    let ext = path__WEBPACK_IMPORTED_MODULE_0___default().extname(data.bpath);
    if (!ext) return false;
    let type = ext.replace(/^\./, '');
    if (type == 'zip') type = bpath.split('.').slice(-2).join('.');
    let action;
    if (type == 'epub') action = book_epub2json__WEBPACK_IMPORTED_MODULE_5__.epub2json;else if (type == 'fb2') action = book_fb2json__WEBPACK_IMPORTED_MODULE_4__.fb2json;else if (type == 'fb2.zip') action = book_fb2json__WEBPACK_IMPORTED_MODULE_4__.fb2json;else if (type == 'pdf') action = book_pdf2json__WEBPACK_IMPORTED_MODULE_7__.pdf2json; // else if (type == 'html') action = html2json
    else if (type == 'md') action = book_md2json__WEBPACK_IMPORTED_MODULE_6__.md2json;else return {
        descr: 'book extension should be .epub, .fb2, .fb2.zip, .md or .dgl'
      };
    let result = await action(bpath);
    result.type = type;
    result.bpath = bpath;
    if (data.orbid) result.orbid = data.orbid;
    mainWindow.webContents.send('importBookResult', result);
  });
};

const createPopup = () => {
  const popupWindow = new electron__WEBPACK_IMPORTED_MODULE_2__.BrowserWindow({
    width: 200,
    height: 300,
    frame: false,
    hasShadow: true,
    show: false,
    webPreferences: {
      // enableRemoteModule: true,
      nodeIntegration: true
    }
  });
  let popupBounds = positionstore.get('popup') || popupWindow.getBounds();
  popupWindow.setBounds(popupBounds); // and load the index.html of the app.

  popupWindow.loadURL(url__WEBPACK_IMPORTED_MODULE_1___default().format({
    pathname: path__WEBPACK_IMPORTED_MODULE_0___default().join(__dirname, "popup.html"),
    protocol: "file:",
    slashes: true
  })); // Open the DevTools.
  // popupWindow.webContents.openDevTools();

  popupWindow.webContents.on('will-navigate', event => {
    event.preventDefault();
  });
  electron__WEBPACK_IMPORTED_MODULE_2__.ipcMain.on('show-popup-window', (event, data) => {
    popupWindow.show();
    popupWindow.webContents.send('data', data);
  });
  electron__WEBPACK_IMPORTED_MODULE_2__.ipcMain.on('hide-popup-window', event => {
    popupWindow.hide();
  });
  popupWindow.on('close', () => {
    positionstore.set('popup', popupWindow.getBounds());
  }); // popupWindow.on('resize', () => {
  //   positionstore.set('popup', popupWindow.getBounds())
  // })
};

electron__WEBPACK_IMPORTED_MODULE_2__.app.on("window-all-closed", () => {
  electron__WEBPACK_IMPORTED_MODULE_2__.app.quit();
});
electron__WEBPACK_IMPORTED_MODULE_2__.app.on("ready", () => {
  let lang = _config__WEBPACK_IMPORTED_MODULE_3__.config.deflang;
  (0,_i18n_menu_factory__WEBPACK_IMPORTED_MODULE_8__.MenuFactory)(lang);
});
electron__WEBPACK_IMPORTED_MODULE_2__.app.on('ready', createPopup);
electron__WEBPACK_IMPORTED_MODULE_2__.app.on('ready', createWindow);
electron__WEBPACK_IMPORTED_MODULE_2__.ipcMain.on('lang', (event, lang) => {
  console.log('_LANG', lang);
  (0,_i18n_menu_factory__WEBPACK_IMPORTED_MODULE_8__.MenuFactory)(lang);
});

const handleError = (title, error) => {
  console.log('_B HE title', title);
  console.log('_B HE ERR', error);
};

console.log('_TYPE ', process.type);

if (process.type === 'renderer') {
  const errorHandler = _.debounce(error => {
    handleError('Unhandled Error', error);
  }, 200);

  window.addEventListener('error', event => {
    event.preventDefault();
    errorHandler(event.error || event);
  });

  const rejectionHandler = _.debounce(reason => {
    handleError('Unhandled Promise Rejection', reason);
  }, 200);

  window.addEventListener('unhandledrejection', event => {
    event.preventDefault();
    rejectionHandler(event.reason);
  });
} else {
  process.on('uncaughtException', error => {
    handleError('Unhandled Error', error);
  });
  process.on('unhandledRejection', error => {
    handleError('Unhandled Promise Rejection', error);
  });
}
})();

/******/ })()
;
//# sourceMappingURL=background.js.map