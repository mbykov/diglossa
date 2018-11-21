import { app, BrowserWindow } from "electron";

export const fileMenuTemplate = {
  label: "File",
  submenu: [
    { label: "Import from ODS", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'readODS') } },
    { label: "Import from TXT", click: () => { BrowserWindow.getFocusedWindow().webContents.send('parseDir', 'readTXT') } },
    { label: "Clone from Github", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'cloneGithub') } },
    { type: "separator" },
    { label: "Re-read Files", accelerator: "CommandOrControl+Shift+R", click: () => { BrowserWindow.getFocusedWindow().webContents.send('re-read') } },
    { type: "separator" },
    { label: "Publish", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'publish') } },
    { type: "separator" },
    { label: "Export to TXT", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'exportTXT') } },
    { label: "Export to PDF", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'exportPDF') } },
    { label: "Export to HTML", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'exportHTML') } },
    { type: "separator" },
    { label: "Create dictionary for book", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'createDict') } },
    { type: "separator" },
    { label: "Clean up DB", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'cleanup') } },
    { type: "separator" },
    { label: "Quit",
      accelerator: "CmdOrCtrl+Q",
      click: () => {
        app.quit();
      }
    }
  ]
};
