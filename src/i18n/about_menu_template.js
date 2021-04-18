import { app, BrowserWindow } from "electron";
import { i18n as t } from "./i18n";
let log  = console.log

export function aboutMenuTemplate() {
  let menu =  {
    label: t('about'),

    submenu: [
      {  label: t('essence '), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'essence') } },

      {  label: t('about'), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'about') } },

      {  label: t('acknowledgements'), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'acknowledgements') } },

      // {  label: t('code'), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'code') } },

      {  label: t('contacts'), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'contacts') } },

      {  label: t('license'), click: () => { BrowserWindow.getFocusedWindow().webContents.send('section', 'license') } },

    ]
  }
  return menu
}
