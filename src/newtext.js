'use strict';

import _ from 'lodash'
import { log, q, qs, empty, create, remove, span, p, div, space, ctext } from './lib/utils'
import { render } from './app'
import { remote, clipboard } from "electron"
const franc = require('franc')

export const newtext = {
  ready () {
    render('newtext')
    let ocontainer = q('#newtext')
    let str = clipboard.readText()
    let lang = franc(str)
    if (lang == 'ell') lang = 'grc'
    // lang = 'grc'
    // todo: прокатать dicts
    let rows = str.trim().split('\n')
    rows.forEach(row=> {
      let html = ''
      let orow = create('p', 'ptext')
      html += row.replace(/([^\p{P} ]+)/ug, "<span class=\"wf\">$1</span>")
      orow.innerHTML = html
      orow.setAttribute('lang', lang)
      ocontainer.appendChild(orow)
    })
  }
}
