'use strict'

import _ from 'lodash'
import { ipcRenderer } from "electron";
const { dialog } = require('electron').remote
import { log, q, create, zerofill, cleanDname, cleanStr } from './lib/utils'

// import { fb2json } from '../../../b/book-fb2json'
// import { epub2json } from '../../../b/book-epub2json'
// import { md2json } from '../../../b/book-md2json'
// import { pdf2json } from '../../../b/book-pdf2json'
// import { fb2json } from 'book-fb2json'
// import { epub2json } from 'book-epub2json' // ??? нету
// import { md2json } from 'book-md2json'
// import { pdf2json } from 'book-pdf2json'

import { pushDocs, pushImgs, fetchChapterDocs } from './lib/pouch'
import { preference } from './prefs'
import { book } from './book'

import { syncDoc } from './page'
import { router } from './app'
const isZip = require('is-zip')
const JSZip = require("jszip");
const franc = require('franc')

const fse = require('fs-extra')
const path = require("path")
const Store = require('electron-store')
const bkstore = new Store({name: 'libks'})
const ftstore = new Store({name: 'fts'})
const prefstore = new Store({name: 'prefs'})
const appstore = new Store({name: 'app'})

const JSON5 = require('json5')

import { progress } from './lib/progress'
import { message } from './lib/message'

import { remote } from "electron"
let dgl = remote.getGlobal('dgl')

const mouse = require('mousetrap')
const ftsopts = remote.getGlobal('ftsopts')

export const getImportBook = {}

// todo: del ctrl+o
mouse.bind('ctrl+o', function(ev) {
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'DGL, FB2, EPUB, HTML, MD', extensions: ['dgl', 'json', 'epub', 'pdf', 'md', 'fb2', 'fb2.zip'] }]})
    .then(result => {
      const bpath = result.filePaths[0]
      if (!bpath) {
        message.show('can not locate book', 'darkred')
        return
      }
      let ext = path.extname(bpath)
      if (!ext) {
        message.show('can not locate book', 'darkred')
        return
      }
      progress.show()
      if (ext == '.dgl') importDgl(bpath)
      else if (ext == '.json') importDglJson(bpath)
      else ipcRenderer.send('importBook', {bpath})
    }).catch(err => {
      message.show('can not import book', 'darkred')
      console.log(err)
    })
})

ipcRenderer.on('importBook', function (event) {
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'DGL, FB2, EPUB, HTML, MD', extensions: ['dgl', 'json', 'epub', 'pdf', 'md', 'fb2', 'fb2.zip'] }]})
    .then(result => {
      const bpath = result.filePaths[0]
      if (!bpath) {
        message.show('can not locate book', 'darkred')
        return
      }
      let ext = path.extname(bpath)
      if (!ext) {
        message.show('can not locate book', 'darkred')
        return
      }
      progress.show()
      if (ext == '.dgl') importDgl(bpath)
      else if (ext == '.json') importDglJson(bpath)
      else ipcRenderer.send('importBook', {bpath})
    }).catch(err => {
      message.show('can not import book', 'darkred')
      console.log(err)
    })
})

ipcRenderer.on('addParallelBook', function (event) {
  if (!checkBooks()) return
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'PDF, FB2, EPUB, PDF, HTML, MD', extensions: ['epub', 'md', 'pdf', 'fb2', 'fb2.zip'] }]})
    .then(result => {
      const bpath = result.filePaths[0]
      if (!bpath) return
      if (!book) {
        message.show('select book to add to', 'darkred')
        return
      }
      progress.show()
      let origin = dgl.origin(book.sbooks)
      ipcRenderer.send('importBook', {bpath, orbid: origin.bid})

    }).catch(err => {
      message.show('can not read book', 'darkred')
      console.log(err)
    })
})

ipcRenderer.on('importBookResult', function (event, result) {
  if (!result.docs) {
    message.show('can not parse book', 'darkred')
    return
  }
  importBook(result)
})


function checkBooks() {
  if (book.sbooks) return true
  else message.show('select a book', 'darkred')
}

function guessLang(docs) {
  let test = docs.map(doc=> doc.md).join(' ')
  return franc(test)
}

async function importBook(result) {
  let { descr, docs, imgs } = result
  let half = docs.length/2
  descr.lang = guessLang(docs.slice(half, half+200))

  let newbook = parseBookInfo(descr)
  newbook.bpath = result.bpath

  newbook.cnts = parseCnts(docs) // epub
  setDocPath(docs)
  newbook.active = true

  if (result.orbid) {
    book.sbooks.push(newbook)
    let origin = dgl.origin(book.sbooks)
    if (book.sbooks[1]) book.sbooks[1].shown = true
    bkstore.set(result.orbid, book.sbooks)
  } else {
    newbook.origin = true
    bkstore.set(newbook.bid, [newbook])
    let prefs = preference.initPrefs(newbook)
    prefstore.set(newbook.bid, prefs)
  }

  await pushDocs(newbook.bid, docs)
  if (imgs.length) await pushImgs(newbook.bid, imgs)
  router({route: 'library'})

  let mess = ['book', newbook.author, newbook.title, 'loaded'].join(' ')
  message.show(mess, 'darkgreen')
} // import common book

function parseCnts(docs) {
  let cnts = docs.filter(doc=> doc.level > -1)
  cnts.forEach((cnt, idx)=> cnt.idx = idx)
  return cnts
}

function setDocPath_(docs) {
  const fillsize = docs.length.toString().length
  let baredocs = []
  let levnumkey = {}, path = '00', counter = 0, filled
  let prevheader = {level: 0, path: '00'}
  let parent = {level: 0, path: ''}
  for (let doc of docs) {
    if (doc.level > -1) {
      counter = 0
      if (levnumkey[doc.level] > -1) levnumkey[doc.level] += 1
      else levnumkey[doc.level] = 0
      // doc.levnum = levnumkey[level] || 0

      if (prevheader.level === doc.level) path = [prevheader.path.slice(0,-1), levnumkey[doc.level]].join('')
      else if (prevheader.level < doc.level) levnumkey[doc.level] = 0, path = [prevheader.path, doc.level, levnumkey[doc.level]].join('')
      else if (prevheader.level > doc.level) {
        parent = _.last(_.filter(baredocs, (bdoc, idy)=> { return bdoc.level < doc.level  })) || {level: 0, path: '00'}
        path = [parent.path, doc.level, levnumkey[doc.level]].join('')
      }
      prevheader = doc
    }

    filled = zerofill(counter, fillsize)
    if (doc.footnote) {
      if (!doc._id) doc._id = ['ref', path, doc.ref].join('-')
    } else {
      doc.path = path
      doc._id = [path, filled].join('-')
      counter++
    }

    prevheader.size = counter
    baredocs.push(doc)
  }
}

function setDocPath(docs) {
  const fillsize = docs.length.toString().length
  let path = '', counter = 0, filled
  let prevheader = {}
  let parent = {level: 0, path: ''}
  let chapternum = 0
  let headers = docs.filter(doc=> doc.level > -1)
  const chaptesize = headers.length.toString().length
  for (let doc of docs) {
    if (doc.level > -1) {
      chapternum += 1
      counter = 0
      prevheader = doc
      path = zerofill(chapternum, chaptesize)
  }

    filled = zerofill(counter, fillsize)
    if (doc.footnote) {
      if (!doc._id) doc._id = ['ref', path, doc.ref].join('-')
    } else {
      doc.path = path
      doc._id = [path, filled].join('-')
      counter++
    }
    prevheader.size = counter
  }
}

function parseBookInfo(info) {
  let bid = cleanDname(info)
  let lang = info.lang || 'unk'
  let descr = {author: info.author, title: info.title}
  let book = {bid, descr, lang}
  if (info.origin) book.origin = true
  return book
}

async function parseBookByType(bpath, type) {
  // now only md as text type
  let result
  try {
    result = await md2json(bpath)
  } catch(err) {
    console.log('import ERR: can not import markdown')
    console.log('import ERR:', bpath)
    result = {descr: 'can not import book'}
  }
  return result
}

async function importDglJson(bpath) {
  let dirpath = bpath.substring(0, bpath.lastIndexOf(path.sep))
  let pack, dgls
  try {
    let dgljson = await fse.readFile(bpath, 'utf-8')
    pack = JSON5.parse(dgljson)
    dgls = pack.texts
  } catch(err) {
    let mess = 'not a .dgl format'
    message.show(mess, 'darkred')
    return
  }
  pack.bpath = bpath

  let packages = []
  for (const dgldescr of dgls) {
    if (dgldescr.skip) continue
    if (!dgldescr.type) continue
    let srcpath = dgldescr.src
    let bpath = path.resolve(dirpath, srcpath)
    let { descr, docs, imgs } = await parseBookByType(bpath, dgldescr.type)
    if (!docs) {
      let mess = ['incorrect info.json, no book', dgldescr.src]
      message.show(mess, 'darkred')
      return
    }
    if (dgldescr.type == 'md') descr = dgldescr
    let pack = {descr, docs, imgs}
    packages.push(pack)
  } // for dgls

  saveDglBook(pack, packages)
} // import bare uncompressed dgl-json

async function importDgl(zippath) {
  progress.show()
  let iszip = isZip(fse.readFileSync(zippath))
  // log('_zip', iszip, zippath)
  if (!iszip) {
    let mess = 'not compressed file, not a .dgl format'
    message.show(mess, 'darkred')
    return
  }
  // log('__zip start')
  let packages = await getZipData(zippath)
  // log('__zip end pack', packages)
  saveDglBook(packages)

  message.show('zip in progress', 'darkgreen')
} // import compressed dgl

async function getZipData(zippath) {
  let data = await fse.readFileSync(zippath)
  let promise = new Promise(function(resolve, reject) {
    JSZip.loadAsync(data).then(function (zip) {
      let unzipped = {descr: '', docs: []}
      let fnsize = _.keys(zip.files).length -1
      let fnidx = 0
      for (let fn in zip.files) {
        let file = zip.files[fn]
        if (file.dir) continue
        file.async('text')
          .then(async (data)=> {
            fnidx++
            let ext = _.last(file.name.split('.'))
            if (ext == 'json') unzipped.descr = JSON5.parse(data)
            else if (ext == 'md') {
              let mds = _.compact(data.split('\n'))
              let {descr, docs, imgs} = await md2json(mds)
              unzipped.docs.push(docs)
            }
            if (fnidx == fnsize) resolve(unzipped)
          })
      }
    })
  })

  return promise
    .then(unzipped=> {
      let packages = []
      unzipped.descr.texts.forEach((descr, idx)=> {
        let pack = {descr, docs: unzipped.docs[idx], imgs: []}
        packages.push(pack)
      })
      return packages
    })
    .catch(err=> {
      return {descr: 'err'}
    })
}

async function saveDglBook(pack, packages) {
  let books = []
  for (const pack of packages)  {
    let { descr, docs, imgs } = pack
    if (!docs) {
      let mess = ['no book', descr.title].join(' ')
      message.show(mess, 'darkred')
      continue
    }
    let book = parseBookInfo(descr)
    books.push(book)
    book.active = true

    setDocPath(docs)
    book.cnts = parseCnts(docs) // dgl

    let mess = [book.lang, '-', book.title, 'loading...'].join(' ')
    message.show(mess, 'darkgreen', true)
    await pushDocs(book.bid, docs)
    if (imgs.length) await pushImgs(book.bid, imgs)
  } // for packages

  // todo: now: установить отметку synced
  let origin = books.find(book=> book.origin)
  let nonorigin = books.find(book=> !book.origin)
  if (nonorigin) nonorigin.shown = true
  bkstore.set(origin.bid, books)

  let prefs = pack
  delete prefs.texts
  prefs.exportpath = appstore.get('exportpath')
  prefstore.set(origin.bid, prefs)

  router({route: 'library'})
  let mess = ['book', origin.descr.author, origin.descr.title, 'loaded'].join(' ')
  message.show(mess, 'darkgreen')
}
