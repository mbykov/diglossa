// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from "path";
import url from "url";
import { app, BrowserWindow, Menu, ipcMain } from "electron";
import { devMenuTemplate } from "./menu/dev_menu_template";
import { editMenuTemplate } from "./menu/edit_menu_template";
import { libMenuTemplate } from "./menu/lib_menu_template";
import { fileMenuTemplate } from "./menu/file_menu_template";
import { aboutMenuTemplate } from "./menu/about_menu_template";
import { helpMenuTemplate } from "./menu/help_menu_template";
import { authMenuTemplate } from "./menu/auth_menu_template";
import { leftMenuTemplate } from "./menu/left_menu_template";
import { rightMenuTemplate } from "./menu/right_menu_template";
// import createWindow from "./lib/window";
const windowStateKeeper = require('electron-window-state');

const Store = require('electron-store')
const store = new Store()

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from "env";

const setApplicationMenu = () => {
  const menus = [leftMenuTemplate, rightMenuTemplate, libMenuTemplate, fileMenuTemplate, aboutMenuTemplate, authMenuTemplate, helpMenuTemplate];
  if (env.name !== "production") {
    menus.push(devMenuTemplate);
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
  const userDataPath = app.getPath("userData");
  app.setPath("userData", `${userDataPath} (${env.name})`);
}

app.on("ready", () => {
  setApplicationMenu();

  // Load the previous state with fallback to defaults
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });

  // Create the window using the state information
  const win = new BrowserWindow({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height
  });

  // Let us register listeners on the window, so we can update the state
  // automatically (the listeners will be removed when the window is closed)
  // and restore the maximized or full screen state
  mainWindowState.manage(win);

  // const mainWindow = createWindow("main", {
  //   width: 1000,
  //   height: 600
  // });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "app.html"),
      protocol: "file:",
      slashes: true
    })
  );

  if (env.name === "development") {
    win.openDevTools();
  }

});

app.on("window-all-closed", () => {
  app.quit();
});


// app.on('before-quit', (ev) => {
//   console.log('APP BEFORE QUIT')
//   win.webContents.send('save-state', 'whoooooooh!')
//   ev.preventDefault()
// })
