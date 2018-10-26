import { app, BrowserWindow } from "electron";

export const aboutMenuTemplate = {
  label: "About",
  submenu: [
    { label: "What does this program do?", click: () => { BrowserWindow.getFocusedWindow().webContents.send('about') } },
    { label: "Code and Download", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'code') } },
    { label: "License", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'license') } },
    { label: "Acknowledgements", click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'acknowledgements') } }
  ]
};
