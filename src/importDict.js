'use strict';

import _ from 'lodash'
import { ipcRenderer } from "electron";
const {dialog} = require('electron').remote
const path = require("path")
import { log, q, zerofill, cleanDname, cleanStr, defaultStemmer } from './lib/utils'
import { sd2js } from '../../../b/dict-sd2json'
// import { importDSL as dsl2json } from '../../../../b/dict-dsl2json'
import { pushDocs } from "./lib/pouch";
const franc = require('franc')
import { message } from './lib/message'
import { progress } from './lib/progress'
import { router } from './app'
// import { stemmer as stemmerGrc } from '../../../../b/greek/stemmer-grc'
import { porter } from './lib/stemmer'

const JSON5 = require('json5')
const fse = require('fs-extra')
const Store = require('electron-store')
const dictstore = new Store({name: 'dicts'})
const dstore = dictstore.store

export const getimportDict = {}

ipcRenderer.on('importDict', function (event) {
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'IFO, DSL, JSON', extensions: ['ifo', 'dsl', 'json'] }]})
    .then(result => {
      const bpath = result.filePaths[0]
      log('_IPC DICT PATH', bpath)
      if (!bpath) return
      let ext = path.extname(bpath)
      if (ext == '.ifo') importStarDict(bpath)
      else if (ext == '.dsl') importDSLDict(bpath)
      // else if (ext == '.json') importJsonDict(bpath)
    }).catch(err => {
      console.log(err)
    })
})


async function importStarDict(bpath) {
  log('_import SD:', bpath)
  progress.show()
  const result = await sd2js(bpath)
  let descr = result.descr
  descr.lang = guessLang(result.docs.slice(1000, 2000))

  log('_DESCR', descr)
  log('_D-LANG', descr.lang)
  // let stemmer = porter[descr.lang]
  // if (!stemmer) stemmer = defaultStemmer
  const stemmer = porter(descr.lang)
  // const stem = stemmer ? stemmer(wf) : wf
  log('_import SD:', result.docs.slice(1000,1020))

  const sdocs = []
  const skey = Object.create(null)
  let stem
  result.docs.forEach(doc=> {
    if (doc._id.split(' ').length == 1) {
      stem = stemmer ? stemmer(doc._id) : doc._id
      if (!skey[stem]) skey[stem] = {_id: stem, docs: []}
      skey[stem].docs.push(doc)
    } else {
      if (!skey[doc._id]) skey[doc._id] = {_id: doc._id, docs: []}
      skey[doc._id].docs.push(doc)
    }
  })
  const stemmed = Object.values(skey)
  sdocs.push(...stemmed)
  saveDict(descr, sdocs)
}

export async function importDSLDict(bpath) {
  progress.show()
  const result = await dsl2json(bpath)
  log('_import DSL res', result)
  let dict = result.descr
  dict.lang = result.descr.src
  saveDict(dict, result.docs)
}

async function saveDict(dict, docs) {
  progress.show()
  dict.active = true
  let dname = cleanDname(dict)
  dict.dname = dname
  dict.idx = 0
  let olddict = _.find(dstore, dict=> dict.dname == dict.dname)
  if (olddict) dictstore.delete(olddict.dname)

  let idx = 0
  for (const dname in dstore) {
    const dict = dstore[dname]
    idx++
    dict.idx = idx
  }
  dstore[dict.dname] = dict
  dictstore.set(dstore)

  log('_saved_dict_docs:', dname, docs.length)
  await pushDocs(dname, docs)

  let mess = ['dict', dict.name, 'installed'].join(' ')
  message.show(mess, 'darkgreen')
  router({route: 'dictionary'})
}

function guessLang(docs) {
  let test = docs.map(doc=> doc._id).join(' ')
  return franc(test)
}

async function importJsonDict(bpath) {
  let descr, mess, docs
  try {
    descr = await fse.readFileSync(bpath, 'utf-8')
    descr = JSON5.parse(descr)
  } catch(err) {
    mess = ['not a dict description', bpath].join(' ')
  }
  if (!descr.src) mess = ['no dictionary source'].join(' ')
  log('_GRC-DESCR', descr)
  try {
    const dirpath = path.dirname(bpath)
    let docspath = path.resolve(dirpath, descr.src)
    docs = await fse.readJsonSync(docspath)
  } catch(err) {
    mess = ['not a json dict file', bpath].join(' ')
  }

  if (mess) {
    message.show(mess, 'red')
    return
  }

  // log('_DICT JSON DOCS', docs)
  if (!descr.lang) descr.lang = guessLang(docs.slice(1000, 2000))

  log('_GRC-LANG', descr.lang)
  log('_GRC-FLEX', descr.flex)
  log('_GRC-docs_5', docs.slice(0,5))

  let stemmer = porter[descr.lang]
  // if (descr.lang == 'grc') stemmer = stemmerGrc
  if (!stemmer) stemmer = defaultStemmer
  // log('_import SD:', docs.slice(1000,1020))

  const skey = Object.create(null)
  let stem, stemmed
  let dicts = docs.filter(doc=> doc.dict) // .dsl or .sd dicts
  let terms = docs.filter(doc=> doc.term) // .dgl terms or flex dicts
  let jsons = docs.filter(doc=> doc.stem) // ready stem - .dgl dicts

  log('_DICT TYPE dicts', dicts.length)
  log('_DICT TYPE terms', terms.length)
  log('_DICT TYPE stems', jsons.length)

  dicts.forEach(doc=> {
    stem = stemmer ? stemmer(doc.dict) : doc.dict
    if (!skey[stem]) skey[stem] = {_id: stem, docs: []}
    skey[stem].docs.push(doc)
  })

  jsons.forEach(doc=> {
    if (!skey[doc.stem]) skey[doc.stem] = {_id: doc.stem, docs: []}
    skey[doc.stem].docs.push(doc)
  })

  terms.forEach(doc=> {
    if (!skey[doc.term]) skey[doc.term] = {_id: doc.term, docs: []}
    skey[doc.term].docs.push(doc)
  })

  stemmed = Object.values(skey)
  log('_stemmed', stemmed)
  saveDict(descr, stemmed)
}

/*
  формат словаря
  итого у меня тут два типа записей:
  либо _id=фраза: vizio di procedura + trns - повторный поиск по ref
  либо {_id=stem, docs, refs}; doc-> {_id=lemma, trns}; refs->массив фраз вроде trns
  doc может иметь любые доп атрибуты как verb=true, etc

*/
