import { app, BrowserWindow } from "electron";
import { i18n as t } from "./i18n";
let log  = console.log

export function bookMenuTemplate() {
  let menu =  {
    label: t("book"),
    submenu: [
      {  label: t("library"),
         accelerator: "CmdOrCtrl+L",
         click: () => { BrowserWindow.getFocusedWindow().webContents.send('route', 'library') } },

      // {  label: t("bookmarks"),
         // accelerator: "CmdOrCtrl+B",
         // click: () => { BrowserWindow.getFocusedWindow().webContents.send('route', 'bookmarks') } },

      { type: "separator" },
      { label: "Import book",
        accelerator: "CmdOrCtrl+O",
        click: () => { BrowserWindow.getFocusedWindow().webContents.send('importBook') } },
      { label: "Add parallel book", click: () => { BrowserWindow.getFocusedWindow().webContents.send('addParallelBook') } },
      { label: "Generate FTS", click: () => { BrowserWindow.getFocusedWindow().webContents.send('generateFTS') } },

      { type: "separator" },
      // { label: "Book package preferences", click: () => { BrowserWindow.getFocusedWindow().webContents.send('route', 'prefs') } },
      { label: "Export to .dgl package", click: () => { BrowserWindow.getFocusedWindow().webContents.send('route', 'preference') } },

      // { type: "separator" },

      { label: "Compress package", click: () => { BrowserWindow.getFocusedWindow().webContents.send('compress') } },
      { label: "Uncompress package", click: () => { BrowserWindow.getFocusedWindow().webContents.send('uncompress') } },
      // { label: "Publish", click: () => { BrowserWindow.getFocusedWindow().webContents.send('publishDGL') } },

    ]
  }
  return menu
}
