import { app, BrowserWindow } from "electron";

// export const libMenuTemplate = {
//   label: "Home",
//   submenu: [
//     { label: "Library", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'library') } }
//   ]
// };

export const libMenuTemplate = {
  label: "Home",
  accelerator: "CmdOrCtrl+L",
  click: () => { BrowserWindow.getFocusedWindow().webContents.send('home') } }
