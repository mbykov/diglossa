import { app, BrowserWindow } from "electron";

export const authMenuTemplate = {
  label: "Sign in",
  submenu: [
    { label: "sign in", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'signin') } },
    // { label: "sign up", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'signup') } }
  ]
}
