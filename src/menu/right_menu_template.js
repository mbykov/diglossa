import { app, BrowserWindow } from "electron";

export const rightMenuTemplate = {
  label: "-->",
  click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'goright') },
}
