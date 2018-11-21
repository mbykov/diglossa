import { app, BrowserWindow } from "electron";

export const leftMenuTemplate = {
  label: "<--",
  // accelerator: "Alt+LeftArrow",
  click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'goleft') },
}
