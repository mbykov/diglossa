import { app, BrowserWindow } from "electron";

export const leftMenuTemplate = {
  label: "<--",
  click: () => { console.log('LEFT')},
}
