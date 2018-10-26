import { app, BrowserWindow } from "electron";

export const fileMenuTemplate = {
  label: "File",
  submenu: [
    { label: "Read ODS", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'readFile') } },
    { label: "Read TXT", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'readFile') } },
    { type: "separator" },
    { label: "Export to PDF", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'exportPDF') } },
    { label: "Export to HTML", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'exportPDF') } },
    { type: "separator" },
    { type: "separator" }
  ]
};
