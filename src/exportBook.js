'use strict'

import _ from 'lodash'
import { ipcRenderer } from "electron";
const { app } = require('electron').remote
let apath = app.getAppPath()
import { config } from './config'
import { log, q, qs, zerofill, initBookPrefs, stubEditor } from './lib/utils'
import { pushDocs, fetchBook, fetchChapter, updateDocs } from './lib/pouch'

import { book, syncCnt, getCSyncs } from './book'
import { syncDoc, page, getSyncs } from './page'
import { preference } from './prefs'
import { router } from './app'
const isZip = require('is-zip')
// const JSZip = require("jszip");
// import { compressDGL, uncompressDGL } from '../../b/dgl-utils'
import { compressDGL, uncompressDGL } from 'dgl-utils'

const fse = require('fs-extra')
const path = require("path")
const Store = require('electron-store')
const bkstore = new Store({name: 'libks'})
const ftstore = new Store({name: 'fts'})
const prefstore = new Store({name: 'prefs'})
const syncstore = new Store({name: 'syncs'})
const appstore = new Store({name: 'appstore'})

import { progress } from './lib/progress'
import { message } from './lib/message'

import { remote } from "electron"
let dgl = remote.getGlobal('dgl')

export const getExportBook = {}

// create book-DGL:
async function createDglPackage(prefs) {
  let exportpath = appstore.get('exportpath')
  fse.ensureDirSync(exportpath)

  let packname = prefs.name
  let dirpath = path.resolve(exportpath, packname)
  fse.ensureDirSync(dirpath)
  let dgls = []

  let origin = dgl.origin(book.sbooks)
  let syncs  = getSyncs(origin.bid)

  for await (let sbook of book.sbooks) {
    let bsyncs = syncs.filter(sync=> sync.bid == sbook.bid)
    let sdocs = await getSyncedDocs(sbook, bsyncs)
    let mds = docs2md(sdocs)
    let mdstr = mds.join('\n\n')
    let bidname = [sbook.descr.author.slice(0,25).replace(/ /g, ''), sbook.descr.title.slice(0,25).replace(/ /g, '-')].join('-')
    let mdname = [bidname, sbook.lang, 'md'].join('.')
    let mdpath = path.resolve(dirpath, mdname)
    await fse.writeFileSync(mdpath, mdstr)

    let dgldescr = {lang: sbook.lang, author: sbook.descr.author, title: sbook.descr.title, type: 'md' }
    dgldescr.src = [packname, mdname].join(path.sep)
    if (sbook.origin) dgldescr.origin = true
    dgls.push(dgldescr)
  }

  let dglpack = _.cloneDeep(prefs)
  dglpack.date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  dglpack.texts = dgls

  let jsonname = [packname, 'json'].join('.')
  let jsonpath = path.resolve(exportpath, jsonname)
  try {
    fse.writeJsonSync(jsonpath, dglpack, {spaces: 2})
  } catch(err) {
    let mess =  ['could not export', origin.descr.title].join(' ')
    message.show(mess, 'darkred')
  }
  let mess = [prefs.name, 'created', exportpath].join(' ')
  message.show(mess, 'darkgreen')
}

export async function getSyncedDocs(book, syncs) {
  let cnts = book.cnts
  let sdocs = []
  for await (let cnt of cnts) {
    let query = {bid: book.bid, path: cnt.path, size: cnt.size}
    let chdocs = await fetchChapter(query)
    let chsyncs = syncs.filter(sync => sync.idx === cnt.idx)
    let syncdocs = page.syncChapter(chsyncs, chdocs)
    sdocs.push(...syncdocs)
  }

  const fillsize = sdocs.length.toString().length
  let doc
  sdocs = sdocs.map(sdoc=> {
    doc = {path: sdoc.path, _id: sdoc._id, idx: sdoc.idx, md: sdoc.md}
    if (sdoc.level) doc.level = sdoc.level
    if (sdoc.type) doc.type = sdoc.type
    if (sdoc.size) doc.size = sdoc.size
    return doc
  })
  return sdocs
}

function docs2md(docs) {
  return docs.map(doc=> {
    let md = ''
    if (doc.level) md = '#'.repeat(doc.level) + ' '
    else if (doc.type == 'list') md = '-'
    md += doc.md
    return md
  })
}

async function compressPackage(prefs) {
  let exportpath = appstore.get('exportpath')
  let textsdir =  path.resolve(exportpath, prefs.name)
  let jsonpath = [textsdir, 'json'].join('.')
  let dglpath = [textsdir, 'dgl'].join('.')

  let zip = await compressDGL(jsonpath)
  if (zip.err) return message.show('can not read json file. Select a book', 'darkred')
  zip
    .generateNodeStream({type:'nodebuffer', streamFiles: true})
    .pipe(fse.createWriteStream(dglpath))
    .on('finish', function () {
      fse.removeSync(jsonpath)
      fse.removeSync(textsdir)
      let mess = [prefs.name, 'compressed to', dglpath].join(' ')
      message.show(mess, 'darkgreen')
    })
    .on('error', function () {
      message.show('can not compress book. Select a book', 'darkred')
    })
}

async function uncompressPackage(prefs) {
  let exportpath = appstore.get('exportpath')
  fse.ensureDirSync(exportpath)
  let packname = prefs.name
  let dirpath = path.resolve(exportpath, packname)
  let dglpath = [dirpath, 'dgl'].join('.')
  let jsonpath = [dirpath, 'json'].join('.')
  fse.ensureDirSync(dirpath)

  let pack = await uncompressDGL(dglpath)
  if (!pack || !pack.texts) return
  for await (let text of pack.texts) {
    let str = text.mds.join('\n')
    let filepath =  [exportpath, text.src].join(path.sep)
    fse.writeFileSync(filepath, str)
    delete text.mds
  }
  fse.writeJsonSync(jsonpath, pack, {spaces: 2})
  fse.removeSync(dglpath)
  let mess = [prefs.name, 'uncompressed to', dglpath].join(' ')
  message.show(mess, 'darkgreen')
}

document.addEventListener('click', async (ev) => {
  let oblock = ev.target.closest('#create-dgl-block')
  if (!oblock) return
  if (!checkBooks()) return
  progress.show()
  let prefs = checkPrefs()

  let ocreate = ev.target.closest('#create-dgl')
  let ocmp = ev.target.closest('#compress-dgl')
  let ounc = ev.target.closest('#uncompress-dgl')
  try {
    if (ocreate) createDglPackage(prefs)
    else if (ocmp) compressPackage(prefs)
    else if (ounc) uncompressPackage(prefs)
  } catch(err) {
    let mess = 'can not create dgl package'
    message.show(mess, 'darkgred')
  }
})

function checkPrefs() {
  let origin = dgl.origin(book.sbooks)
  let prefs = prefstore.get(origin.bid)
  let rows = qs('.prefs-line')
  for (let orow of rows) {
    let prefname = orow.getAttribute('prefname')
    if (!prefname) continue
    let value = orow.querySelector('.td-value').textContent.trim()
    prefs[prefname] = value
  }
  prefstore.set(origin.bid, prefs)
  return prefs
}

function checkBooks() {
  if (dgl.bid && book.sbooks) return true
  message.show('select a book', 'darkred')
}
