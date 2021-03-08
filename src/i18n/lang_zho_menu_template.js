import { app, BrowserWindow, ipcRenderer } from "electron";

export const zhoMenuTemplate = {
  label: "ZHO",
  submenu: [
    {
      label: "ENG",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('lang', 'eng')
      }
    },
    {
      label: "DEU",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('lang', 'deu')
      }
    },
    {
      label: "RUS",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('lang', 'rus')
      }
    },
    {
      label: "TIB",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('lang', 'tib')
      }
    }
  ]
};
