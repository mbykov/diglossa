import { app, BrowserWindow, ipcRenderer } from "electron";

export const rusMenuTemplate = {
  label: "RUS",
  submenu: [
    {
      label: "DEU",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('lang', 'deu')
      }
    },
    {
      label: "ENG",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('lang', 'eng')
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
