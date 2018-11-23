import { app, BrowserWindow } from "electron";

export const helpMenuTemplate = {
  label: "Help",
  submenu: [
    { label: "how to create a book", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'howto-create') } },
    { label: "how to create a dictionary", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'howto-dict') } },
    { label: "hot keys", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'hotkeys') } },
    { label: "Toggle DevTools",
      accelerator: "Alt+CmdOrCtrl+I",
      click: () => {
        BrowserWindow.getFocusedWindow().toggleDevTools();
      }
    }
  ]
};
