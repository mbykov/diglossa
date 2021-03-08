'use strict';

import _ from 'lodash'
import { log, q, qs, previousSiblings, scrollToPosition } from './lib/utils'
import { router, render } from './app'
const mouse = require('mousetrap')
import { message } from './lib/message'
import { header } from './header'
const fse = require('fs-extra')
import { porter } from './lib/stemmer'

const Store = require('electron-store')

const natural = require('natural')
const tokenizer = new natural.WordTokenizer()
const sw = require('stopword')
const langs = require('langs')

import { remote } from "electron"
let dgl = remote.getGlobal('dgl')

import { page } from './page'
import { book } from './book'

let stemdictpath = '/home/michael/b/synchro.js/dicts/dict-stems-eng-rus.json'
let stemdicts = fse.readJsonSync(stemdictpath)

// function synchronize(action, param) {
//   if (!dgl.editMode) return
//   const oblock = q('.block:hover')
//   if (!oblock) {
//     message.show('select chapter / paragraph to synchronize', 'darkred')
//     return
//   }
//   let bid = oblock.closest('#src') ? dgl.origin().bid : dgl.shown().bid
//   if (dgl.route == 'page') {
//     const blockid = oblock.getAttribute('blockid') * 1
//     sync.blockid = blockid
//     if (param) sync.param = param
//     page.reSync(bid, sync)
//   } else if (dgl.route == 'book') {
//     const oline = q('p.tree-text:hover')
//     const path = oline.getAttribute('path')
//     sync.path = path
//     book.reSync(bid, sync)
//   }
// }

mouse.bind('ctrl+y', function(ev) {
  if (!dgl.editMode) return
  if (book.sbooks.length < 2) return
  let start = 0
  let oed = getFirstBlock()
  if (!oed) return
  // log('___PAGE', book.sbooks)
  start = oed.getAttribute('blockid')*1
  log('_start', start)
  setLamps(start)
  autoSync(start)
})

async function autoSync(blockid) {
  let synced = true
  while (synced) {
    synced = await nextLamp(blockid)
    blockid++
  }
}

function nextLamp(blockid) {
  let osrc = q(['#src .block[blockid="', blockid, '"]'].join(''))
  let otrn = q(['#trn .block[blockid="', blockid, '"]'].join(''))
  if (!osrc || otrn) return false
  otrn.classList.remove('em-red-circle')
  return sleep(1000)
    .then(async ()=> {
      scrollToPosition(osrc.offsetTop - 100)
      let synced = await syncParagraph(osrc, otrn)
      // if (synced) log('_ S_', blockid, synced)
      // else log('_NO S_', blockid, synced)
      if (synced) otrn.classList.add('em-green-circle')
      else otrn.classList.add('em-red-circle')
      return synced
    })
}

async function syncParagraph(osrc, otrn) {
  // log('_osrc, otrn', osrc, otrn)
  let oparsrc = osrc.querySelector('p.ptext:not(.hidden)')
  let srclang = oparsrc.getAttribute('lang')
  let src = oparsrc.textContent
  let opartrn = otrn.querySelector('p.ptext:not(.hidden)')
  let trnlang = opartrn.getAttribute('lang')
  let trn = opartrn.textContent


  let srcwfs = wordforms(src, srclang)
  let destwfs = wordforms(trn, trnlang)

  let limit = 10
  // log('_WFS', srcwfs.length, destwfs.length, 'math', Math.abs(srcwfs.length - destwfs.length)/srcwfs.length, '>', Math.abs(srcwfs.length - destwfs.length)/srcwfs.length> 0.5)
  if (Math.abs(srcwfs.length - destwfs.length)/srcwfs.length > 0.5 ) return false
  else if (srcwfs.length < limit && destwfs.length < limit ) return true

  let stemmer_src = porter(srclang)
  let stemmer_dest = porter(trnlang)
  let srcstems = srcwfs.map(wf=> stemmer_src ? stemmer_src(wf) : wf)
  let expects = await getStems(stemdicts, srcstems)

  let deststems = destwfs.map(wf=> stemmer_dest ? stemmer_dest(wf) : wf)
  let intersect = _.intersection(expects, deststems)
  // log('_intersect', blockid, intersect)
  return intersect.length ? true : false
}

function getStems(sdicts, ids) {
  return Promise.all(ids.map(function(id) {
    return sdicts.find(sdict=> sdict.id == id)
  }))
    .then(dicts=> {
      return _.flatten(_.compact(dicts).map(dict=> dict.stems))
    })
}

function wordforms(str, lang) {
  let lang2 = ''
  lang2 = langs.where('3', lang)
  if (!lang2) return []
  lang2 = lang2[1]
  let srcwfs = tokenizer.tokenize(str)
  srcwfs = sw.removeStopwords(srcwfs, sw[lang2])
  return _.uniq(srcwfs)
}

const sleep = ms => {
  return new Promise(resolve=> {
    setTimeout(() => resolve(), ms)
  })
}

function getFirstBlock() {
  const oblock = q('.block:hover')
  // const oblock = q('.editable')
  if (!oblock) message.show('select paragraph to start', 'darkred')
  return oblock
}

function setLamps(startidx) {
  let blocks = qs('#trn .block')
  let idx = 0
  for (let block of blocks) {
    if (idx < startidx) block.classList.add('em-green-circle'), block.classList.remove('em-red-circle')
    // else if (idx == startidx) block.classList.remove('em-green-circle'), block.classList.add('em-red-circle')
    else block.classList.remove('em-green-circle'), block.classList.remove('em-red-circle')
    idx++
  }
}

mouse.bind('space', function(ev) {
  // log('_SPACE')
  let ored = q('.em-red-circle')
  if (!ored) return
  let otrnpar = ored.closest('.block')
  let blockid = otrnpar.getAttribute('blockid')
  // log('_blockid', blockid)
  // ored.classList.remove('em-red-circle')
  // ored.classList.add('em-green-circle')
  let next = blockid*1 + 1
  log('_blockid', blockid)
  setLamps(next)
  autoSync(next)
})
