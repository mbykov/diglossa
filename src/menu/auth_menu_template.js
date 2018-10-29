import { app, BrowserWindow } from "electron";

export const authMenuTemplate = {
  label: "Authentication",
  submenu: [
    { label: "sign in", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'signin') } },
    { label: "sign up", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'signup') } }
  ]
};
