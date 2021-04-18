import { app, BrowserWindow } from "electron";
import { i18n as t } from "./i18n";
let log  = console.log

export function dictMenuTemplate() {
  let menu =  {
    label: t("dictionary"),
    submenu: [
      {  label: t("dictionary list"),
         // accelerator: "CmdOrCtrl+D", ======= ли то, либо это
         click: () => { BrowserWindow.getFocusedWindow().webContents.send('route', 'dictionary') } },

      { type: "separator" },
      { label: "Import StarDict .ifo", click: () => { BrowserWindow.getFocusedWindow().webContents.send('importDict') } },
      // { label: "Import DSL .ifo", click: () => { BrowserWindow.getFocusedWindow().webContents.send('importDict') } },

      { type: "separator" },
      { label: "Export  .dgl-dict", click: () => { BrowserWindow.getFocusedWindow().webContents.send('exportDGL-dict') } },

    ]
  }
  return menu
}
