'use strict';

import _ from 'lodash'
import { log, q, qs, previousSiblings, scrollToPosition } from './lib/utils'
import { render } from './app'
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

let stop = false

mouse.bind('ctrl+y', function(ev) {
  if (!dgl.editMode) return
  if (book.sbooks.length < 2) return
  stop = false
  let start = 0
  let oed = getFirstBlock()
  if (!oed) return
  start = oed.getAttribute('blockid')*1
  setLamps(start)
  autoSync(start)
})

async function autoSync(blockid) {
  let synced = true
  while (synced && !stop) {
    synced = await nextLamp(blockid)
    blockid++
  }
}

function nextLamp(blockid) {
  let osrc = q(['#src .block[blockid="', blockid, '"]'].join(''))
  let otrn = q(['#trn .block[blockid="', blockid, '"]'].join(''))
  if (!osrc || !otrn) return false
  otrn.classList.remove('em-red-circle')
  return sleep(1000)
    .then(async ()=> {
      scrollToPosition(osrc.offsetTop - 100)
      // let synced = await syncParagraphByStem(osrc, otrn)
      let synced = await checkBlock(osrc, otrn)
      if (synced) otrn.classList.add('em-green-circle')
      else otrn.classList.add('em-red-circle')
      if (stop) return false
      return synced
    })
}

async function checkBlock(osrc, otrn) {
  let oparsrc = osrc.querySelector('p.ptext:not(.hidden)')
  let srclang = oparsrc.getAttribute('lang')
  let src = oparsrc.textContent
  let opartrn = otrn.querySelector('p.ptext:not(.hidden)')
  let trnlang = opartrn.getAttribute('lang')
  let trn = opartrn.textContent

  let oblock = otrn.closest('.block')
  let blockid = oblock.getAttribute('blockid')

  let srcwfs = wordforms(src, srclang)
  let destwfs = wordforms(trn, trnlang)
  let limit = 10
  let sizes = [srcwfs.length, destwfs.length]

  let wfmax = _.max(sizes)
  let wfmin = _.min(sizes)

  if (wfmax < limit) return true
  if (wfmax/wfmin > 2) return false
  else return true
}

async function syncParagraphByStem_(osrc, otrn) {
  let oparsrc = osrc.querySelector('p.ptext:not(.hidden)')
  let srclang = oparsrc.getAttribute('lang')
  let src = oparsrc.textContent
  let opartrn = otrn.querySelector('p.ptext:not(.hidden)')
  let trnlang = opartrn.getAttribute('lang')
  let trn = opartrn.textContent

  let srcwfs = wordforms(src, srclang)
  let destwfs = wordforms(trn, trnlang)

  let limit = 10
  if (Math.abs(srcwfs.length - destwfs.length)/srcwfs.length > 0.5 ) return false
  else if (srcwfs.length < limit && destwfs.length < limit ) return true

  let stemmer_src = porter(srclang)
  let stemmer_dest = porter(trnlang)
  let srcstems = srcwfs.map(wf=> stemmer_src ? stemmer_src(wf) : wf)
  let expects = await getStems(stemdicts, srcstems)

  let deststems = destwfs.map(wf=> stemmer_dest ? stemmer_dest(wf) : wf)
  let intersect = _.intersection(expects, deststems)
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

export function getFirstBlock() {
  const oblock = q('.block:hover')
  if (!oblock) message.show('select paragraph to start', 'darkred')
  return oblock
}

function setLamps(startidx) {
  let blocks = qs('#trn .block')
  let idx = 0
  for (let block of blocks) {
    if (idx < startidx) block.classList.add('em-green-circle'), block.classList.remove('em-red-circle')
    else block.classList.remove('em-green-circle'), block.classList.remove('em-red-circle')
    idx++
  }
}

mouse.bind('space', function(ev) {
  let ored = q('.em-red-circle')
  if (!ored) return
  let otrnpar = ored.closest('.block')
  let blockid = otrnpar.getAttribute('blockid')
  let next = blockid*1 + 1
  setLamps(next)
  autoSync(next)
})


document.addEventListener("keydown", function(ev) {
  if (ev.which == 27) stop = true
})
