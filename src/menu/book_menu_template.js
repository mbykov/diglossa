import { app, BrowserWindow } from "electron";

export const bookMenuTemplate = {
  label: "Book",
  submenu: [
    { label: "Read", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'install') } },
    { label: "Cleanup", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'cleanup') } }
  ]
};
