import { app, BrowserWindow } from "electron";

export const fileMenuTemplate = {
  label: "Book",
  submenu: [
    { label: "Import from file", click: () => { BrowserWindow.getFocusedWindow().webContents.send('parseDir') } },
    // { label: "Clone from Github", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'cloneGithub') } },
    { type: 'separator' },
    { label: "Reload application", accelerator: "CommandOrControl+Shift+R", click: () => { BrowserWindow.getFocusedWindow().webContents.send('reload') } },
    { label: "Reload andRe-read source", accelerator: "CommandOrControl+R", click: () => { BrowserWindow.getFocusedWindow().webContents.send('reread') } },
    // { type: "separator" },
    // { label: "Publish", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'publish') } },
    // { type: "separator" },
    // { label: "Export to TXT", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'exportTXT') } },
    // { label: "Export to PDF", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'exportPDF') } },
    // { label: "Export to HTML", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'exportHTML') } },
    // { type: "separator" },
    // { label: "Create dictionary for book", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'createDict') } },
    // { type: "separator" },
    { label: "Clean up DB", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'cleanup') } },
    { type: "separator" },
  ]
};
