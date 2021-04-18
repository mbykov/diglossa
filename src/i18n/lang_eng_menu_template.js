import { app, BrowserWindow } from "electron";

export const engMenuTemplate = {
  label: "ENG",
  submenu: [
    // {
    //   label: "DEU",
    //   click: () => {
    //     BrowserWindow.getFocusedWindow().webContents.send('lang', 'deu')
    //   }
    // },
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
