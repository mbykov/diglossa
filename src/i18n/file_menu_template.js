import { app, BrowserWindow } from "electron";
import { i18n as t } from "./i18n";
let log  = console.log

export function fileMenuTemplate() {
  let menu =  {
    label: "File",
    submenu: [
      {  label: t("home"),
         accelerator: "CmdOrCtrl+H",
         click: () => { BrowserWindow.getFocusedWindow().webContents.send('route', 'home') } },

      {  label: t("sign in"),
         click: () => { BrowserWindow.getFocusedWindow().webContents.send('route', 'signin') } },

      {  label: t("sign up"),
         click: () => { BrowserWindow.getFocusedWindow().webContents.send('route', 'signup') } },

      { type: "separator" },

      { type: "separator" },

      {  label: t("Preferences"),
         click: () => { BrowserWindow.getFocusedWindow().webContents.send('route', 'prefsapp') } },

      { type: "separator" },

      { label: t("Quit"),
        accelerator: "CmdOrCtrl+Q",
        click: () => {
          app.quit();
        }
      }
    ]
  }
  return menu
}
