import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";
import jetpack from "fs-jetpack";
import env from "env";

let events = require('events')
let eventEmitter = new events.EventEmitter()

let ringBellB = function ringBellB(ev) {
  console.log('ring ring ring from APP', ev);
}
eventEmitter.on('showSection', ringBellB)


const log = console.log

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};

const links = document.querySelectorAll('link[rel="import"]')
log('LINKS', links)

// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
  let template = link.import.querySelector('.task-template')
  let clone = document.importNode(template.content, true)
  document.querySelector('.container').appendChild(clone)
})


document.querySelector("#title-section").classList.add('is-shown')

require('./lib/nav')
