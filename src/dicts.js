'use strict'

import { log, q, create } from './lib/utils'
import { ipcRenderer } from "electron";
import _ from 'lodash'
import { render } from './app'
const Store = require('electron-store')
const dictstore = new Store({name: 'dicts'})
import { queryDB, queryDBcomplex, deleteDB } from "./lib/pouch";
// siblings
// const langs = require('langs')
// const stopword = require('stopword')
const mouse = require('mousetrap')
import { message } from './lib/message'
import { progress } from './lib/progress'
import { porter } from './lib/stemmer'

export const dictionary = {
  async ready(state) {
    render('dicts')
    this.dstore = dictstore.store
    this.dicts = _.values(dictstore.store)
    this.parseDictionary()
    progress.hide()
  },
  parseDictionary() {
    const tbody = q('#dict-table .tbody')
    let dicts = this.dicts
    for (let ditem of dicts) {
      let dname = ditem.dname
      let dict = _.find(dicts, dict=> dict.dname == dname)
      const tmpl = q('.table-line.tmpl')
      const orow = tmpl.cloneNode(true)
      orow.classList.remove('tmpl')
      orow.setAttribute('dname', dname)
      let oname = orow.querySelector('.td-name')
      oname.textContent = dict.name
      let otype = orow.querySelector('.td-type')
      otype.textContent = dict.type
      let olang = orow.querySelector('.td-lang')
      olang.textContent = dict.lang
      let osize = orow.querySelector('.td-size')
      osize.textContent = dict.size
      tbody.appendChild(orow)
    }
  },
  async queryDict(wf, stem, dstore) {
    let rdicts = await queryDB(stem, dstore)
    firePopup(wf, rdicts)
  },

  //  τῆς δὲ ἀρχὴ τὰ
  async queryDictComplex(wf, qstems, dstore) {
    let {dictdocs, flsdocs, termdocs} = await queryDBcomplex(qstems, dstore)
    qstems = qstems.filter(qstem=> !qstem.indecl)
    let synths = plugin.synthesize(qstems, dictdocs, flsdocs)
    synths.push(...termdocs)

    let dictkeys = {}
    synths.forEach(qdoc=> {
      if (!dictkeys[qdoc.dname]) dictkeys[qdoc.dname] = [qdoc]
      else dictkeys[qdoc.dname].push(qdoc)
    })

    let rdicts = []
    for (let dname in dictkeys) {
      let rdict = {wf, dname, dicts: dictkeys[dname]}
      rdicts.push(rdict)
    }

    if (rdicts.length) ipcRenderer.send('show-popup-window', rdicts)
    else ipcRenderer.send('hide-popup-window')
  }
}

function firePopup(wf, docs) {
  let dictkeys = {}
  docs.forEach(qdoc=> {
    if (!dictkeys[qdoc.dname]) dictkeys[qdoc.dname] = [qdoc]
    else dictkeys[qdoc.dname].push(qdoc)
  })

  let rdicts = []
  for (let dname in dictkeys) {
    let rdict = {wf, dname, dicts: dictkeys[dname]}
    rdicts.push(rdict)
  }

  if (rdicts.length) ipcRenderer.send('show-popup-window', rdicts)
  else ipcRenderer.send('hide-popup-window')
}

document.addEventListener("mouseover", function(ev) {
  if (!ev.altKey || !q('.page')) return
  let target = ev.target
  if (target.nodeName != 'SPAN') return
  let parent = target.closest('p.ptext')
  if (!parent) return
  let lang = parent.getAttribute('lang')
  let wf = target.textContent

  let dicts = _.values(dictstore.store)
  if (!ev.shiftKey) dicts = _.filter(dicts, dict=> dict.lang == lang)

  if (!dicts.length) {
    let mess = ['dictionaries for the', lang, 'language are not installed'].join(' ')
    message.show(mess, 'darkgreen')
    return
  }

  const stemmer = porter(lang)
  const stem = stemmer ? stemmer(wf) : wf
// let siblings = getSiblings(target, lang)

  // todo: plugin
  dictionary.queryDict(wf, stem, dicts)
  if (lang == 'grc') {
    // const qstems = stemmerGrc(wf)
    // dictionary.queryDictComplex(wf, qstems, dicts)
  }
})

// todo: langs и stopword заменить на natural
function getSiblings(el, lang) {
  let lang2 = langs.where('3', lang)
  if (lang2) lang2 = lang2[1]
  const wfs = []
  let prev, pprev, next, nnext
  prev = el.previousElementSibling
  if (prev) wfs.push(prev.textContent), pprev = prev.previousElementSibling
  if (pprev) wfs.push(pprev.textContent)
  next = el.nextElementSibling
  if (next) wfs.push(next.textContent), nnext = next.nextElementSibling
  if (nnext)  wfs.push(nnext.textContent)
  let siblings = stopword.removeStopwords(wfs, stopword[lang2])
  siblings = siblings.map(wf=> { return wf.toLowerCase() })
  return siblings
}

document.addEventListener('click',  (ev) => {
  const otable = q('#dict-table')
  if (!otable) return
  let odel = ev.target.closest('.td-delete')
  let oparent = ev.target.closest('.table-line')
  if (!oparent) return
  let dname = oparent.getAttribute('dname')
  if (!dname) return
  progress.show()
  let direction = (ev.ctrlKey && ev.altKey) ? 'down' : (ev.ctrlKey) ? 'up' : null
  if (odel) deleteDict(dname)
  else if (direction) moveRow(dname, direction)
  else toggleActive(dname)
})

async function deleteDict(dname) {
  const dicts = dictionary.dicts
  if (!dicts.length) return
  let current = _.find(dicts, dict=> dict.dname == dname)
  const others = _.filter(dicts, dict=> dict.dname != dname)
  await deleteDB(dname)
  others.forEach((dict, idx)=> dict.idx = idx)
  dictionary.dicts = others
  setDstore(others)
  let mess = ['dict', current.name, 'removed'].join(' ')
  message.show(mess, 'darkgreen')
}

function moveRow(dname, direction) {
  const dicts = dictionary.dicts
  let current = _.find(dicts, dict=> dict.dname == dname)
  if (!current) return
  let idx = current.idx
  let step = (direction == 'up') ? -1 : 1
  let sibling = _.find(dicts, dict=> dict.idx == current.idx + step)
  if (sibling) current.idx = sibling.idx, sibling.idx = idx
  setDstore(dicts)
}

function toggleActive(dname) {
  const dicts = dictionary.dicts
  log('_A', dname)
  log('_Adicts', dicts)
  let current = _.find(dicts, dict=> dict.dname == dname)
  if (!current) return
  log('_C', current)
  current.active = (current.active) ? false : true
  setDstore(dicts)
}

function setDstore(dicts) {
  dicts = _.sortBy(dicts, 'idx')
  dicts.forEach((dict, idx)=> dict.idx = idx)
  dictionary.dicts = dicts
  const dstore = {}
  dicts.forEach(dict=> dstore[dict.dname] = dict)
  dictstore.clear()
  dictstore.set(dstore)
  dictionary.ready({dicts: dicts})
}
