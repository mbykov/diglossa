'use strict'

const path = require("path")
const electron = require('electron')
const fse = require('fs-extra')
const config = require('../config')
const { ipcMain } = require('electron')
const log = console.log

let app = electron.app ? electron.app : electron.remote.app
let apath = app.getAppPath()
let content = {}

let lang = config.deflang
ipcMain.on('lang', (event, newlang) => {
  lang = newlang
})

let loadedLanguage
export function i18n(phrase) {
  if (!content[lang]) {
    let langFile = lang + '.js'
    let localePath = path.resolve(apath, 'src/i18n', langFile)
	  if (fse.pathExistsSync(localePath)) {
		  loadedLanguage = fse.readJsonSync(localePath)
	  } else {
      let enPath = path.resolve(apath, 'src/i18n/eng.js')
		  loadedLanguage = fse.readJsonSync(enPath)
	  }
    content[lang] = loadedLanguage
  }
  let dcased = uncap(phrase)
  let caped = capitalize(content[lang][dcased]) || capitalize(phrase)
  return caped
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const uncap = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toLowerCase() + s.slice(1)
}
