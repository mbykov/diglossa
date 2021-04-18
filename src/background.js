import path from "path";
import url from "url";
import { app, BrowserWindow, ipcMain, shell } from "electron";

import { config } from "./config";

// import { fb2json } from '../../b/book-fb2json'
// import { epub2json } from '../../b/book-epub2json'
// import { md2json } from '../../b/book-md2json'
// import { pdf2json } from '../../b/book-pdf2json'
import { fb2json } from 'book-fb2json'
import { epub2json } from 'book-epub2json'
import { md2json } from 'book-md2json'
import { pdf2json } from 'book-pdf2json'

const Store = require('electron-store')
const positionstore = new Store({name: 'bounds'})
import { MenuFactory } from "./i18n/menu-factory"

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
// import env from "env";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      nodeIntegration: true
    }
  });

  let winBounds = positionstore.get('main') || mainWindow.getBounds()
  mainWindow.setBounds(winBounds)

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "app.html"),
      protocol: "file:",
      slashes: true
    })
  );

  mainWindow.webContents.on('will-navigate', (event) => {
    event.preventDefault()
  })

  // mainWindow.webContents.openDevTools();
  global.templates = {}
  global.dgl = {}

  mainWindow.on('close', () => {
    positionstore.set('main', mainWindow.getBounds())
  })
  // mainWindow.on('resize', () => {
  //   positionstore.set('main', mainWindow.getBounds())
  // })

  mainWindow.webContents.on('did-finish-load', () => {
    let pckg = require('../package.json')
    let name = pckg.name
    let version = pckg.version
    mainWindow.webContents.send('version', version )
    mainWindow.setTitle([name, 'v.', version].join(' '))
  })

  ipcMain.on('importBook', async (event, data) => {
    let bpath = data.bpath
    let ext = path.extname(data.bpath)
    if (!ext) return false
    let type = ext.replace(/^\./, '')
    if (type == 'zip') type = bpath.split('.').slice(-2).join('.')

    let action
    if (type == 'epub') action = epub2json
    else if (type == 'fb2') action = fb2json
    else if (type == 'fb2.zip') action = fb2json
    else if (type == 'pdf') action = pdf2json
    // else if (type == 'html') action = html2json
    else if (type == 'md') action = md2json
    else return {descr: 'book extension should be .epub, .fb2, .fb2.zip, .md or .dgl'}

    let result = await action(bpath)
    result.type = type
    result.bpath = bpath
    if (data.orbid) result.orbid = data.orbid
    mainWindow.webContents.send('importBookResult', result)
  })
}


const createPopup = () => {

  const popupWindow = new BrowserWindow({
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

  let popupBounds = positionstore.get('popup') || popupWindow.getBounds()
  popupWindow.setBounds(popupBounds)

  // and load the index.html of the app.
  popupWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "popup.html"),
      protocol: "file:",
      slashes: true
    })
  );

  // Open the DevTools.
  // popupWindow.webContents.openDevTools();

  popupWindow.webContents.on('will-navigate', (event) => {
    event.preventDefault()
  })

  ipcMain.on('show-popup-window', (event, data) => {
    popupWindow.show()
    popupWindow.webContents.send('data', data)
  })

  ipcMain.on('hide-popup-window', (event) => {
    popupWindow.hide()
  })

  popupWindow.on('close', () => {
    positionstore.set('popup', popupWindow.getBounds())
  })
  // popupWindow.on('resize', () => {
  //   positionstore.set('popup', popupWindow.getBounds())
  // })
}


app.on("window-all-closed", () => {
  app.quit();
});

app.on("ready", () => {
  let lang = config.deflang
  MenuFactory(lang)
})

app.on('ready', createPopup);
app.on('ready', createWindow);

ipcMain.on('lang', (event, lang) => {
  MenuFactory(lang)
})

const handleError = (title, error) => {
  console.log('_Back handleError', title)
  console.log('_Back handleError', error)
}

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
