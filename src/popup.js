//

import './css/popup.css';

import _ from 'lodash'
import { ipcRenderer } from "electron";
const mouse = require('mousetrap')
import { q, qs, empty, create, remove, span, p, div } from './lib/utils'

const log = console.log

class History {
  constructor() {
    this.store = [],
    this.index = 0
  }

  get state() {
    return this.store[this.index]
  }

  set state(state) {
    this.store.push(state)
    this.index = this.store.length -1
  }
}

export class Popup extends History {
  constructor() {
    super()
  }

  back() {
    if (this.index) this.index--
    this.render()
  }

  forward() {
    if (this.index < this.store.length-1) this.index++
    this.render()
  }

  log() {
    log('popup', this)
  }

  render() {
    let rdicts = this.state
    if (!rdicts) return
    const opopup = q('#popup')
    empty(opopup)
    rdicts.forEach(rdict=> {
      let odict = drawRdict(rdict)
      opopup.appendChild(odict)
    })
  }
}

function createDict() {
  const otmpl = q('.dict-container.tmpl')
  const odict = otmpl.cloneNode(true)
  odict.classList.remove('tmpl')
  return odict
}

function drawRdict(rdict) {
  log('_DRAW-R-DICT', rdict)
  let odict = createDict()
  let odname = odict.querySelector('.dict-dname')
  odname.textContent = rdict.dname
  let oquery = odict.querySelector('.dict-query')
  oquery.textContent = rdict.wf
  // rdict.dicts = rdict.dicts.filter(dict=> dict.trns)
  let dicts = rdict.dicts.filter(dict=> !dict.example)
  let examples = rdict.dicts.filter(dict=> dict.example)

  dicts.forEach(dict=> {
    let odl = drawDict(dict)
    odict.appendChild(odl)
  })

  examples.forEach(dict=> {
    let odl = drawDict(dict)
    odl.classList.add('dict-example')
    odict.appendChild(odl)
  })
  return odict
}

function drawDict(dict) {
  let otmpl = q('.dict-dl.tmpl')
  const odl = otmpl.cloneNode(true)
  odl.classList.remove('tmpl')
  let odt = odl.querySelector('.dict-dt')
  odt.textContent = dict._id // rdict || dict.term /// <<< ==================== here greek
  odl.appendChild(odt)
  otmpl = q('.dict-dd.tmpl')

  if (dict.pos) {
    const odd = otmpl.cloneNode(true)
    odd.classList.remove('tmpl')
    odd.classList.add('morph')
    const opos = create('span')
    opos.textContent = dict.pos
    opos.classList.add('green')
    odd.appendChild(opos)
    if (dict.morphs) {
      const omorph = create('span')
      omorph.classList.add('maroon')
      let morphs
      if (!dict.pos) dict.pos = 'verb'
      if (dict.pos == 'verb') morphs = dict.morphs.map(m=> [m.tense, m.numper].join('.'))
      else morphs = dict.morphs.map(m=> [m.gend, m.numcase].join('.'))
      morphs = _.uniq(morphs)
      // log('_MRPHS', morphs)

      omorph.textContent = ': ' + morphs.join(', ')
      odd.appendChild(omorph)
    }
    odl.appendChild(odd)
  }

  dict.trns = _.flatten(dict.trns) // это нужно поправить в словаре

  dict.trns.forEach(trn=> {
    if (trn == dict._id) return
    const odd = otmpl.cloneNode(true)
    odd.classList.remove('tmpl')
    // odd.textContent = trn
    odd.innerHTML = trn
    odl.appendChild(odd)
  })
  return odl
}

let popup = new Popup()

ipcRenderer.on('data', function (event, qresult) {
  popup.state = qresult
  popup.render()
})

mouse.bind('esc', function(ev) {
  ipcRenderer.send('hide-popup-window')
})

mouse.bind(['alt+left'], function(ev) {
  popup.back()
})

mouse.bind(['alt+right'], function(ev) {
  popup.forward()
})

mouse.bind(['ctrl+v'], function(ev) {
  popup.log()
})

mouse.bind('space', function(ev) {
  const ddfirst = q('.dict-dd')
  const dds = qs('.dict-dd')
  let show = ddfirst.classList.contains('hidden') ? true : false
  if (show) showResults(dds)
  else hideResults(dds)
})

function showResults(dds) {
  dds.forEach(dl=> { dl.classList.remove('hidden') })
}

function hideResults(dds) {
  dds.forEach(dl=> { dl.classList.add('hidden') })
}

function toggleResults(dds, show) {
  if (show) showResults(dds)
  else hideResults(dds)
}

mouse.bind('tab', function(ev) {
  let ddl
  let opened = q('.dict-dd:not(.hidden)')
  if (!opened) {
    openFirstResult()
    return
  }
  ddl = opened.closest('.dict-dl')
  let dds = ddl.querySelectorAll('.dict-dd')
  hideResults(dds)

  let nextddl = ddl.nextSibling
  if (!nextddl) {
    let ddc = opened.closest('.dict-container')
    let nextddc = ddc.nextSibling
    if (nextddc) nextddl = nextddc.querySelector('.dict-dl')
    else {
      openFirstResult()
      return
    }
  }
  log('_N', nextddl)
  let ndds = nextddl.querySelectorAll('.dict-dd')
  showResults(ndds)
})

function openFirstResult() {
  let ddl = q('.dict-dl')
  let dds = ddl.querySelectorAll('.dict-dd')
  showResults(dds)
}

document.addEventListener('click',  (ev) => {
  let ddl = ev.target.closest('.dict-dl')
  if (!ddl) return
  let ddfirst = ddl.querySelector('.dict-dd')
  let show = ddfirst.classList.contains('hidden') ? true : false
  let dds = ddl.querySelectorAll('.dict-dd')
  if (show) showResults(dds)
  else hideResults(dds)
})

function getNextSiblings(elem) {
  var sibs = [];
  while (elem = elem.nextSibling) {
    sibs.push(elem);
  }
  return sibs;
}

document.addEventListener("wheel", function(ev) {
  if (ev.shiftKey == true) return
  scrollPopup(ev)
}, false)

function scrollPopup(ev) {
  let ocurrent = ev.target.closest('#popup')
  let delta = (ev.deltaY > 0) ? 32 : -32
  ocurrent.scrollTop += delta
}
