import { app, BrowserWindow } from "electron";

export const libMenuTemplate = {
  label: "Home",
  accelerator: "CmdOrCtrl+L",
  click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'lib') } }
