'use strict'

const log = console.log
const _ = require('lodash')
// const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const marked = require('marked')

import { config } from "../config";
import { q, create, empty } from './utils'
import { remote } from "electron"

const { app } = require('electron').remote
let templates = remote.getGlobal('templates')
let apath = app.getAppPath()

export function loadTemplates() {
  appendFile('html')
}

function appendFile(ext) {
  let tmplpath = path.resolve(apath, 'src/templates')
  let tmpls = fse.readdirSync(tmplpath)
  let reExt = new RegExp('\.'+ext+'$')

  tmpls.forEach(sname=> {
    let spath, html
    try {
      spath = path.resolve(apath, 'src/templates', sname)
      if (!reExt.test(spath)) return
      html = fse.readFileSync(spath).toString()
    } catch (err) {
      log('__ERR LOADING TMPL', err)
    }
    templates[sname.replace(/\.html$/, '')] = html
  })
}

export function loadSection(lang, sname) {
  const app = q('#app')
  let md
  let spath = path.resolve(apath, 'src/i18n', lang, [sname, 'md'].join('.'))
  try {
    md = fse.readFileSync(spath).toString()
  } catch (err) {
    lang = config.deflang
    let spath = path.resolve(apath, 'src/i18n', lang, [sname, 'md'].join('.'))
    md = fse.readFileSync(spath).toString()
  }
  let osec = create('div', 'page')
  osec.classList.add('section')
  osec.innerHTML = marked(md)
  empty(app)
  app.appendChild(osec)
}
