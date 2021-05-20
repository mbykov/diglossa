'use strict';

import _ from 'lodash'
import { ipcRenderer } from "electron";
const {dialog} = require('electron').remote
const path = require("path")
import { log, q, zerofill, cleanDname, cleanStr } from './lib/utils'
// import { sd2js } from '../../b/dict-sd2json'
import { sd2json } from 'dict-sd2json'
// import { importDSL as dsl2json } from 'dict-dsl2json'
import { pushDocs } from "./lib/pouch";
const franc = require('franc')
import { message } from './lib/message'
import { progress } from './lib/progress'
import { router } from './app'
import { porter } from './lib/stemmer'

const JSON5 = require('json5')
const fse = require('fs-extra')
const Store = require('electron-store')
const dictstore = new Store({name: 'dicts'})
let  dstore = dictstore.store

export const getimportDict = {}

ipcRenderer.on('importDict', function (event) {
  // dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'IFO, DSL, JSON', extensions: ['ifo', 'dsl', 'json'] }]})
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'IFO, DSL, JSON', extensions: ['ifo'] }]})
    .then(result => {
      const bpath = result.filePaths[0]
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
  progress.show()
  const result = await sd2json(bpath)
  let descr = result.descr
  descr.lang = guessLang(result.docs.slice(1000, 2000))

  const stemmer = porter(descr.lang)

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
  dstore = dictstore.store

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

  if (!descr.lang) descr.lang = guessLang(docs.slice(1000, 2000))

  let stemmer = porter[descr.lang]
  if (!stemmer) stemmer = defaultStemmer

  const skey = Object.create(null)
  let stem, stemmed
  let dicts = docs.filter(doc=> doc.dict) // .dsl or .sd dicts
  let terms = docs.filter(doc=> doc.term) // .dgl terms or flex dicts
  let jsons = docs.filter(doc=> doc.stem) // ready stem - .dgl dicts

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
  saveDict(descr, stemmed)
}
