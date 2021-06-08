import _ from 'lodash'

import { log, q } from './utils'
const { app } = require('electron').remote
const upath = app.getPath("userData")
// let apath = app.getAppPath()
const path = require('path')
const fse = require('fs-extra')
import { config } from '../config'
import { remote } from "electron"

const mouse = require('mousetrap')
// const PouchDB = require('pouchdb')
// import PouchDB from 'pouchdb'
// const PouchDB = require('pouchdb').default;
const PouchDB = require('electron').remote.require('pouchdb')

export async function deleteDB(dname) {
  // const pouchpath = path.resolve(upath, 'pouch')
  const dpath = path.resolve(upath, 'pouch', dname)
  await fse.remove(dpath)
}

function newDB(dbdict) {
  const pouchpath = path.resolve(upath, 'pouch')
  const dname = dbdict.dname || dbdict.bid
  if (!dname) return
  const dpath = path.resolve(upath, 'pouch', dname)
  let pouch = new PouchDB(dpath)
  pouch.dname = dname
  pouch.name = dbdict.name
  return pouch
}

export async function queryDBcomplex(qstems, dicts) {
  let indecls = qstems.filter(qstem=> qstem.indecl)
  qstems = qstems.filter(qstem=> !qstem.indecl)
  let keys = _.uniq(_.compact(qstems.map(qstem=> qstem.stem)))
  let flskeys = _.uniq(_.compact(qstems.map(qstem=> qstem.term)))
  let termkeys = _.uniq(_.compact(indecls.map(qstem=> qstem.term)))
  let dbdicts = dicts.filter(dict=> !dict.flex && !dict.indecl)
  let flsdicts = dicts.filter(dict=> dict.flex)
  let termdicts = dicts.filter(dict=> dict.indecl)

  let alldocs = await fetchDocs(keys, dbdicts)
  let dictdocs = alldocs.filter(doc=> !doc.refstem)

  let refdocs = alldocs.filter(doc=> doc.refstem)
  let refstems = refdocs.map(doc=> doc.refstem)
  let lemmas = await fetchDocs(refstems, dbdicts)

  // ref - сменить stem на stem исходной формы, и добавить keys исходной формы
  // refdoc м.б. найден только в WKT, и только в verbs
  lemmas.forEach(refdict=> {
    let refdoc = refdocs.find(doc=> doc.refstem == refdict.stem)
    refdict.stem = refdoc.stem
    refdict.keys = refdoc.keys
    refdict.time = refdoc.time
    // refdict.trns = refdoc.trns
  })

  dictdocs.push(...lemmas)

  let flsdocs = await fetchDocs(flskeys, flsdicts)
  let termdocs = await fetchDocs(termkeys, termdicts)

  return {dictdocs, flsdocs, termdocs}
}

export async function queryDB (stem, dicts) {
  let keys = [stem]
  let dbdicts = dicts.filter(dict=> !dict.flex)
  let dictdocs = await fetchDocs(keys, dbdicts)

  // exkey: surprise party
  let exkeys = _.uniq(_.compact(_.flatten(dictdocs.map(ddoc=> ddoc.refs))))
  let examples = await fetchDocs(exkeys, dbdicts)
  examples.forEach(example=> example.example = true)
  dictdocs.push(...examples)

  return dictdocs
}

function fetchDocs(keys, dbdicts) {
  const dbs = dbdicts.map(dbdict=> newDB(dbdict))
  return Promise.all(dbs.map(function (db) {
    return db.allDocs({
      keys: keys,
      include_docs: true
    })
      .then(function (res) {
        if (!res || !res.rows) throw new Error('no query dbs result')
        let rdocs = _.compact(_.flatten(res.rows.map(row => row.doc )))
        let docs = _.compact(_.flatten(rdocs.map(rdoc=> rdoc.docs)))
        docs.forEach(doc => { doc.dname = db.name })
        return docs
      })
  }))
    .then(docs=> {
      return _.flatten(docs)
    })
    .catch(function (err) {
      console.log('ERR fetchDocs', err)
      return []
    })
}

export function fetchFN(keys, bids) {
  const dbs = bids.map(bid=> newDBdname(bid))
  return Promise.all(dbs.map(function (db) {
    return db.allDocs({
      keys: keys,
      include_docs: true
    })
      .then(function (res) {
        if (!res || !res.rows) throw new Error('no query dbs result')
        let rdocs = _.compact(_.flatten(res.rows.map(row => row.doc )))
        return rdocs
      })
  }))
    .then(docs=> {
      return _.flatten(docs)
    })
    .catch(function (err) {
      console.log('ERR fetchFN', err)
      return []
    })
}

function fetchRefs(keys, dbdicts) {
  const dbs = dbdicts.map(dbdict=> newDB(dbdict))
  return Promise.all(dbs.map(function (db) {
    return db.allDocs({
      keys: keys,
      include_docs: true
    })
      .then(function (res) {
        if (!res || !res.rows) throw new Error('no query dbs result')
        let rdocs = _.compact(res.rows.map(row => { return row.doc }))
        rdocs = _.compact(_.flatten(rdocs))
        rdocs.forEach(rdoc => { rdoc.dname = db.dname })
        return rdocs
      }).catch(function (err) {
        console.log('ERR fetch_Refs', err)
      })
  }))
}

function showProgress(total, size) {
  let odprog = q('#dict-progress')
  odprog.classList.remove('hidden')
  let percent = Math.round(size*100/total)
  odprog.textContent = [percent, '%'].join(' ')
  if (percent >= 100) odprog.textContent = '', odprog.classList.add('hidden')
}

export async function fetchBlock(params) {
  const dbs = params.map(param=> newDBdname(param.bid))
  dbs.forEach((db, idx)=> {
    let opts = {include_docs: true, keys: [params[idx].id], lang: params[idx].lang, bid: params[idx].bid}
    db.options = opts
  })

  return Promise.all(dbs.map(async function (db) {
    return db.allDocs(db.options)
      .then(res=> {
        if (!res.rows.length) return
        let doc = res.rows[0].doc
        if (!doc) return
        doc.bid = db.options.bid
        doc.lang = db.options.lang
        return doc
      })
  }))
}

function newDBdname(dname) {
  const pouchpath = path.resolve(upath, 'pouch')
  const dpath = path.resolve(upath, 'pouch', dname)
  let pouch = new PouchDB(dpath)
  pouch.dname = dname
  return pouch
}

export async function fetchBook(bid) {
  const db = newDBdname(bid)
  return db.allDocs({include_docs: true})
    .then(res=> {
      db.close()
      return res.rows.map(row=> row.doc)
    })
    .catch(err=> {
      log('_ERR fetch book docs', db.dname, err)
    })
}

export async function fetchChapter(query) {
  const db = newDBdname(query.bid)
  let chpath, limit
  chpath = query.path
  limit = query.size
  // let startkey = [chpath, '-'].join('')
  let startkey = chpath
  db.options = {include_docs: true, startkey, limit}

  return db.allDocs(db.options)
    .then(res=> {
      const chdocs = res.rows.map(row=> row.doc)
      return chdocs
    })
    .catch(err=> {
      log('_ERR fetchChapter:', db.dname, err)
    })
}

export async function pushDocs(dname, docs, pouchpath) {
  if (!pouchpath) pouchpath = path.resolve(upath, 'pouch')
  await fse.ensureDirSync(pouchpath)
  const dpath = path.resolve(pouchpath, dname)
  let pouch = new PouchDB(dpath)
  await pouch.close()
  await fse.emptyDirSync(dpath)
  pouch = new PouchDB(dpath) // todo: wtf? but that's true
  pouch.dname = dname

  let total = docs.length
  let size = 0
  const chunks = _.chunk(docs, config.batch_size)
  for await (let chunk of chunks) {
    size += config.batch_size
    showProgress(total, size)
    await pouch.bulkDocs(chunk)
      .then(res=> {
        let oks = res.filter(doc=> doc.ok)
        // log('_chunk ok', res.length, oks.length, '=', res.length == oks.length)
        return true
      })
  }
  // log('_pouch-docs pushed', docs.length)
  pouch.close()
}

export async function updateDocs(dname, docs, pouchpath) {
  if (!pouchpath) pouchpath = path.resolve(upath, 'pouch')
  await fse.ensureDirSync(pouchpath)
  const dpath = path.resolve(pouchpath, dname)

  docs.forEach(doc=> delete doc._rev)
  await fse.emptyDirSync(dpath)
  let pouch = new PouchDB(dpath)

  await Promise.all(docs.map(async function (doc) {
    return pouch.get(doc._id)
      .then(function (orig) {
        if (doc.md && doc.md == orig.md) return false
        doc._rev = orig._rev
        return pouch.put(doc)
      })
      .catch(function (err) {
        if (err.name === 'not_found') {
          return pouch.put(doc)
        } else {
          // log('_not not-found-err', doc._id)
          throw err;
        }
      })
      .catch(function (err) {
        log('ERR: updating doc', err, 'doc:', doc)
      })
  }))
    // .then(res=> {
      // return 'updating docs: ok'
      // pouch.close()
    // })
  // log('_updated docs: ok')
  pouch.close()
}

export async function pushImgs(dname, imgs) {
  const pouchpath = path.resolve(upath, 'pouch')
  return

  await fse.ensureDirSync(pouchpath)
  const dpath = path.resolve(upath, 'pouch', dname)
  let pouch = new PouchDB(dpath)
  pouch.dname = dname

  imgs = imgs.slice(-3)
  Promise.all(imgs.map(function (img) {
    let name = img.name
    pouch.putAttachment(name, name, img.data, 'image/jpeg')
      .then(function (res) {
        log('___IMG-RES:', res)
      }).catch(function (err) {
        console.log('ERR push Imgs', err)
      })
  }))

  return

  let docs = imgs.map(img=> {
    // let ctype = ['image', path.extname(img.name)].join('')
    let name = img.name
    log('_pushing image_', name)
    let doc = {_id: name, _attachments: {}}
    let data = img.data.toString('base64')
    doc._attachments[name] = {content_type: 'text/plain', data: data}
    return doc
  })

  await pouch.bulkDocs(docs)
    .then(res=> {
      log('_images pushed_', res)
      return true
    }).catch(function (err) {
      log('IMG PUSH ERR:', err)
    });

}

export async function getImage(imgname) {
  let dname = 'JK-Rowling-Harry-Potter-and-the-Orde'
  const dpath = path.resolve(upath, 'pouch', dname)
  let pouch = new PouchDB(dpath)
  pouch.get(imgname, {attachments: true}).then(function (doc) {
    console.log(doc);
  })
}

mouse.bind('ctrl+g', function(ev) {
  //
})
