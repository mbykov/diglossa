import { app, BrowserWindow } from "electron";

export const rightMenuTemplate = {
  label: "-->",
  click: () => { console.log('RIGHT')},
}
