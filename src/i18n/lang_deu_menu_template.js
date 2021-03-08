import { app, BrowserWindow, ipcRenderer } from "electron";

export const deuMenuTemplate = {
  label: "DEU",
  submenu: [
    {
      label: "ENG",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('lang', 'eng')
      }
    },
    {
      label: "RUS",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('lang', 'rus')
      }
    },
    // {
    //   label: "TIB",
    //   click: () => {
    //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'tib')
    //   }
    // },
    // {
    //   label: "ZHO",
    //   click: () => {
    //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'zho')
    //   }
    // }
  ]
};
