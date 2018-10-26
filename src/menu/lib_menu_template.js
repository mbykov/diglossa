import { app, BrowserWindow } from "electron";

export const libMenuTemplate = {
  label: "Home",
  submenu: [
    { label: "Library", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'library') } }
  ]
};
