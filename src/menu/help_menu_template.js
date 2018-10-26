import { app, BrowserWindow } from "electron";

export const helpMenuTemplate = {
  label: "Help",
  submenu: [
    { label: "how to create a book", click: () => { BrowserWindow.getFocusedWindow().webContents.send('help') } },
    { label: "how to publish the result", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'help') } },
    { label: "hot keys", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'help') } },
    { label: "Toggle DevTools",
      accelerator: "Alt+CmdOrCtrl+I",
      click: () => {
        BrowserWindow.getFocusedWindow().toggleDevTools();
      }
    }
  ]
};
