import { app, BrowserWindow } from "electron";
import { i18n as t } from "./i18n";
let log  = console.log

export function bmksMenuTemplate() {
  let menu =  {
    label: t("bookmarks"),
    submenu: [
      {  label: t("bookmarks"),
         // accelerator: "CmdOrCtrl+b",
         click: () => { BrowserWindow.getFocusedWindow().webContents.send('route', 'bookmarks') } },

      { type: "separator" },

    ]
  }
  return menu
}
