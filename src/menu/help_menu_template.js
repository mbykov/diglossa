import { app, BrowserWindow } from "electron";

export const helpMenuTemplate = {
  label: "Help",
  submenu: [
    { label: "Help", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'help') } }
  ]
};
