import { app, BrowserWindow, shell } from "electron"
import { i18n as t } from "./i18n"
const os = require('os')

let href

export function helpMenuTemplate() {
  let menu =  {
    label: t("Help"),
    submenu: [
      { label: t("Website"), click: () => {
        href = 'http://diglossa.org/help'
        shell.openExternal(href)
      } },
      { label: t("Source Code"), click: () => {
        href = 'https://github.com/mbykov/diglossa'
        shell.openExternal(href)
      } },
      { label: t("Download"), click: () => {
        href = 'https://github.com/mbykov/diglossa/releases/latest'
        shell.openExternal(href)
      } },
      { label: t("Report an Issue…"), click: () => {
        href = 'https://github.com/mbykov/diglossa/issues/new/'
        // console.log('INFO', debugInfo())
        let body = debugInfo()
        href = [href, body].join('?body=')
        shell.openExternal(href)
      } },
	    // { label: 'Show App Data',
		  //   click() {
			//     shell.openItem(app.getPath('userData'));
		  //   }
	    // },
      { label: t("hot keys"), accelerator: "CmdOrCtrl+H", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'help') } },
      { label: "Reload", accelerator: "CmdOrCtrl+R", click: () => { BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache(); }  },
      // { label: "Re-Read", accelerator: "Shift+CmdOrCtrl+R", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 're-read-file') }  },
      { label: t("Toggle devTools"),
        accelerator: "Alt+CmdOrCtrl+I",
        click: () => {
          BrowserWindow.getFocusedWindow().toggleDevTools();
        }
      }
    ]
  }
  return menu
}

function debugInfo() {
  let debugInfo = `${app.getName()} ${app.getVersion()}
            ${process.platform} ${os.release()}
            Locale: ${app.getLocale()}
            `.trim()
  return debugInfo
}
