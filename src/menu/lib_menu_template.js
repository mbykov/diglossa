import { app, BrowserWindow } from "electron";

export const libMenuTemplate = {
  label: "Library",
  submenu: [
    { label: "Library", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'library') } }
  ]
};
