import { app, BrowserWindow } from "electron";

export const aboutMenuTemplate = {
  label: "About",
  submenu: [
    { label: "What does this program do?", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'about') } },
    { label: "Code and Download", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'code') } },
    { label: "License", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'license') } },
    { label: "Acknowledgements", click: () => { BrowserWindow.getFocusedWindow().webContents.send('action', 'acknowledgements') } }
  ]
};
