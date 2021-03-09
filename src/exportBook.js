'use strict'

import _ from 'lodash'
import { ipcRenderer } from "electron";
const { app } = require('electron').remote
let apath = app.getAppPath()
import { config } from './config'
import { log, q, qs, zerofill, initBookPrefs, stubEditor } from './lib/utils'
import { pushDocs, fetchBook, fetchChapterDocs, updateDocs } from './lib/pouch'

import { book, syncCnt, getCSyncs } from './book'
import { syncDoc, page, getSyncs } from './page'
// import { preference } from './prefs'
import { router } from './app'
const isZip = require('is-zip')
const JSZip = require("jszip");

const fse = require('fs-extra')
// const fetch = require('node-fetch')
const path = require("path")
const Store = require('electron-store')
const bkstore = new Store({name: 'libks'})
const ftstore = new Store({name: 'fts'})
const prefstore = new Store({name: 'prefs'})
const syncstore = new Store({name: 'syncs'})

import { progress } from './lib/progress'
import { message } from './lib/message'

import { remote } from "electron"
let dgl = remote.getGlobal('dgl')

// todo: del
const mouse = require('mousetrap')
// const FlexSearch = require("flexsearch")
const ftsopts = remote.getGlobal('ftsopts')

export const getExportBook = {}

function checkBooks() {
  if (dgl.bid && book.sbooks) return true
  message.show('select a book', 'darkred')
}

ipcRenderer.on('exportMD', function (event) {
  if (!checkBooks()) return
  try {
    progress.show()
    exportMarkDown()
  } catch(err) {
    let mess = 'can not export this book'
    message.show(mess, 'darkred')
  }
})

export async function exportMarkDown() {
  if (!checkBooks()) return
  // progress.show()
  let origin = dgl.origin(book.sbooks)
  let prefs = prefstore.get(origin.bid)  // || preference.initPrefs(origin)
  if (!prefs) return
  let exportpath = prefs.exportpath
  fse.ensureDirSync(exportpath)

  let packname = prefs.name
  let dirpath = path.resolve(exportpath, packname)
  fse.ensureDirSync(dirpath)
  let dgls = []

  let csyncs = getCSyncs(origin.bid)
  let books = bkstore.get(origin.bid)
  books = dgl.actives(books)
  book.sbooks = book.syncCnts(books, csyncs)
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

  // if (prefs.compress) compressPackage(packname, dirpath, infopath)
}

ipcRenderer.on('compress', async function (event) {
  if (!checkBooks()) return
  let origin = dgl.origin(book.sbooks)
  let prefs = prefstore.get(origin.bid)

  try {
    compressPackage(prefs)
    let mess = [prefs.name, 'compressed'].join(' ')
  } catch(err) {
    message.show('can not compress book', 'darkred')
  }
})

async function compressPackage(prefs) {
  let zip = new JSZip()
  let exportpath = prefs.exportpath
  let name = prefs.name
  let localpath = [name, 'json'].join('.')
  let info
  let jsonpath = path.resolve(exportpath, localpath)
  try {
    info = fse.readFileSync(jsonpath).toString()
  } catch(err) {
    message.show('no package.json file; already compressed?', 'darkred')
    return
  }

  zip.file(localpath, info)
  // zip.folder(name)
  let textsdir =  path.resolve(exportpath, name)
  let mdfilenames = _.compact(fse.readdirSync(textsdir).map(file => {
    if (path.extname(file) == '.md') return path.resolve(textsdir, file)
  }))

  mdfilenames.forEach(file=> {
    let fn = file.split(path.sep).slice(-1)[0]
    let localfnpath = [name, fn].join(path.sep)
    let md = fse.readFileSync(file).toString()
    zip.file(localfnpath, md)
  })

  let dglpath = jsonpath.replace(/\.json$/, '.dgl')
  zip
    .generateNodeStream({type:'nodebuffer', streamFiles: true})
    .pipe(fse.createWriteStream(dglpath))
    .on('finish', function () {
      fse.removeSync(jsonpath)
      fse.removeSync(textsdir)
      let mess = [name, 'exported and compressed to', dglpath].join(' ')
      message.show(mess, 'darkgreen')
    })
    .on('error', function () {
      message.show('can not compress book', 'darkred')
    })
}

ipcRenderer.on('uncompress', async function (event) {
  if (!checkBooks()) return
  let origin = dgl.origin(book.sbooks)
  let prefs = prefstore.get(origin.bid)
  let dirpath = path.resolve(prefs.exportpath, prefs.name)
  let dglpath = [dirpath, 'dgl'].join('.')
  let backup = dglpath + '.backup'

  try {
    fse.copySync(dglpath, backup)
  } catch(err) {
    message.show('no archive file', 'darkred')
    return
  }

  let iszip = isZip(fse.readFileSync(dglpath))
  if (!iszip) {
    message.show('not a zip file', 'darkred')
    return
  }

  try {
    await uncompressPackage(prefs)
    fse.removeSync(dglpath)
    let mess = [prefs.name, 'uncompressed'].join(' ')
    message.show(mess, 'darkgreen')
  } catch(err) {
    message.show('can not uncompress file', 'darkred')
  }
})

async function uncompressPackage(prefs) {
  // let origin = dgl.origin(book.sbooks)
  let exportpath = prefs.exportpath
  fse.ensureDirSync(exportpath)
  let packname = prefs.name
  let dirpath = path.resolve(exportpath, packname)
  fse.ensureDirSync(dirpath)
  let dglpath = [dirpath, 'dgl'].join('.')

  await fse.readFile(dglpath, function(err, data) {
    if (err) throw err;
    JSZip.loadAsync(data).then(function (zip) {
      let localdirfile = _.find(zip.files, file=> file.dir)
      let localdirpath = [dirpath, localdirfile.name].join(path.sep)
      let filepath
      for  (let fn in zip.files) {
        let file = zip.files[fn]
        if (file.dir) continue
        file.async('text')
          .then(data=> {
            filepath =  [exportpath, file.name].join(path.sep)
            fse.writeFileSync(filepath, data)
          })
      }
    })
  })
}

// todo: del
mouse.bind('ctrl+m', function(ev) {
  if (!checkBooks()) return
  progress.show()
  // createExternalPackage(dgl.bid)
  exportMarkDown() // todo: пока что
})

mouse.bind('ctrl+n', function(ev) {
  if (!checkBooks()) return
  let origin = dgl.origin(book.sbooks)
  let prefs = prefstore.get(origin.bid)
  compressPackage(prefs)
})

document.addEventListener('click', async (ev) => {
  let obutton = ev.target.closest('.create-package')
  if (!obutton) return
  progress.show()
  let origin = dgl.origin(book.sbooks)
  let prefs = prefstore.get(origin.bid)
  let rows = qs('.table-line')
  for (let orow of rows) {
    let prefname = orow.getAttribute('prefname')
    if (!prefname) continue
    let value = orow.querySelector('.td-value').textContent.trim()
    prefs[prefname] = value
  }
  prefstore.set(origin.bid, prefs)
  await exportMarkDown()
  const state = {route: 'library'}
  router(state)
  let mess =  [origin.descr.title, 'exported'].join(' ')
  message.show(mess, 'darkgreen')
})

export async function getSyncedDocs(book, syncs) {
  let cnts = book.cnts

  let sdocs = []
  for await (let cnt of cnts) {
    let query = {bid: book.bid, path: cnt.path, size: cnt.size}
    let sbooks = await fetchChapterDocs([query])
    let syncdocs = sbooks[0].chdocs
    syncs.forEach(sync=> {
      syncdocs = syncDoc(syncdocs, sync)
    })
    sdocs.push(...syncdocs)
  }

  // log('___SDOCS', sdocs.length)
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

// нужно отдельно - parse cnts и check sync
function exportFtsIdxJson_(book, docs) {
  book.cnts.forEach(cnt=> {
    let start = 0
    docs.every((doc, idx)=> {
      if (doc._id < cnt._id) return true
      start = idx
    })

    let ftspath = [book.lang, book.bid, cnt.idx].join('.')
    let chdocs = docs.slice(start, start+cnt.size)
    chdocs.forEach((chdoc, idx)=> chdoc.blockid = idx)

    let ftsidx = new FlexSearch(ftsopts)
    ftsidx.add(chdocs)
    let json = ftsidx.export()
    // let ftsbook =  {cntidx: cnt.idx, lang: book.lang, json: json}
    ftstore.set(ftspath, json)
  })
}

// это нужно унести в cli ?
// поближе к ~/b/diglossa.clone.fts
async function createExternalPackage(bid) {
  let libook = bkstore.store[bid]
  if (!libook) return

  // new:
  // books = bkstore.get(state.bid)
  // books = dgl.actives(books)
  return

  const extpath = config.extpath
  let external_dir = path.resolve(apath, extpath)
  let origin = libook.books.find(book=> book.origin)

  let ftspack = {bid: origin.bid, books: []}
  let packname = [origin.bid, 'json'].join('.')
  let packpath = path.resolve(external_dir, packname)

  // let origin_dir = path.resolve(external_dir, origin.bid)
  // await fse.emptyDirSync(origin_dir)

  let jsondocs = []
  let bids = libook.books.map(book=> book.bid)
  for await (let book of libook.books) {
    let mess = ['clean', book.title, '...'].join(' ')
    message.show(mess, 'darkgreen', true)

    let sdocs = await getSyncedDocs(book, true)
    log('__SDOCS__', book.bid, sdocs)

    let descr = {
      "_id": "description",
      title: book.descr.title,
      author: book.descr.author,
      lang: book.lang
    }

    let ddoc = {
      "_id": "_design/auth",
      "language": "javascript",
      "validate_doc_update": "function(n,o,u){if(n._id&&!n._id.indexOf(\"_local/\"))return;if(!u||!u.roles||u.roles.indexOf(\"_admin\")==-1){throw({forbidden:'Denied.'})}}"
    }
    sdocs.push(descr)
    sdocs.push(ddoc)

    let book_dir = path.resolve(external_dir, book.bid)
    await fse.emptyDirSync(book_dir)
    await pushDocs(book.bid, sdocs, external_dir)

    let ftsidx = new FlexSearch(ftsopts)
    ftsidx.add(sdocs)
    let json = ftsidx.export()

    let jsondoc = {_id: book.bid, lang: book.lang, json}
    jsondoc.bids = bids
    if (book.origin) {
      jsondoc.origin = true
    }
    jsondocs.push(jsondoc)
    ftspack.books.push(book.bid)
  }

  fse.writeJsonSync(packpath, ftspack, {spaces: 2})
  await updateDocs('ftsidx', jsondocs, external_dir)

  fse.writeJsonSync(packpath, jsondocs, {spaces: 2})

  let mess = 'package created'
  message.show(mess, 'darkgreen')
}
