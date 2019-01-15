import { app, BrowserWindow } from "electron";

export const libMenuTemplate = {
  label: "File",
  submenu: [
    {  label: "Home",
       accelerator: "CmdOrCtrl+L",
       click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'home') } },
    { label: "Quit",
      accelerator: "CmdOrCtrl+Q",
      click: () => {
        app.quit();
      }
    }
  ]
}
