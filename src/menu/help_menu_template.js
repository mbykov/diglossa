import { app, BrowserWindow } from "electron";

export const helpMenuTemplate = {
  label: "Help",
  submenu: [
    // { label: "how to create a book", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'howto-create') } },
    // { label: "how to create a dictionary", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'howto-dict') } },
    { label: "hot keys", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'hotkeys') } },
    { label: "Toggle DevTools",
      accelerator: "Alt+CmdOrCtrl+I",
      click: () => {
        BrowserWindow.getFocusedWindow().toggleDevTools();
      }
    }
  ]
};
