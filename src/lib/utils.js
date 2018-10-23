import _ from 'lodash'

let util = require('util')

export function q (sel) {
  return document.querySelector(sel)
}

export function qs (sel) {
  return document.querySelectorAll(sel)
}

export function create (tag, style) {
  let el = document.createElement(tag)
  if (style) el.classList.add(style)
  return el
}

export function recreateDiv (sel) {
  let el = document.querySelector(sel)
  if (el) el.parentElement.removeChild(el)
  el = document.createElement('div')
  el.classList.add(sel)
  el.id = sel
  return el
}

export function recreate (element) {
  var newElement = element.cloneNode(true)
  element.parentNode.replaceChild(newElement, element)
}

// function cret (str) {
//   return document.createTextNode(str)
// }

export function span (str) {
  var oSpan = document.createElement('span')
  oSpan.textContent = str
  return oSpan
}

export function br () {
  var oBR = document.createElement('br')
  return oBR
}

export function div (str) {
  var oDiv = document.createElement('div')
  oDiv.textContent = str
  return oDiv
}

export function p (str) {
  var oDiv = document.createElement('p')
  oDiv.textContent = str
  return oDiv
}

export function empty (el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild)
  }
}

export function remove (el) {
  el.parentElement.removeChild(el)
}

export function removeAll (sel) {
  let els = document.querySelectorAll(sel)
  els.forEach(el => { el.parentElement.removeChild(el) })
}

// function closeAll() {
//     words = null
//     // window.close()
//     ipcRenderer.send('sync', 'window-hide')
// }

export function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls)) {
    return el
  }
}

export function placePopup (coords, el) {
  var top = [coords.top, 'px'].join('')
  var left = [coords.left, 'px'].join('')
  el.style.top = top
  el.style.left = left
}

export function log () { console.log.apply(console, arguments) }

export function plog () {
  var vs = _.values(arguments)
  if (vs.length === 1) vs = vs[0]
  // console.log(util.inspect(vs, {showHidden: false, depth: null}))
  console.log(util.inspect(vs, {showHidden: false, depth: 3}))
}

export function enclitic(str) {
  let syms = str.split('')
  let stress = false
  let clean = []
  let stresses = [ac.oxia, ac.varia, ac.peris]
  syms.forEach(sym => {
    if (!stresses.includes(sym)) clean.push(sym)
    else if (!stress) clean.push(sym), stress = true
  })
  return clean.join('')
}

export function getStore(name) {
  let json, obj

  return obj
}

export function setStore(name, obj) {
  let oapp = q('#app')
  q('#app').setAttribute()
}

export function getStore_(name) {
  let json, obj
  try {
    json = localStorage.getItem(name)
    obj = JSON.parse(json)
  } catch (err) {
    log('GET ERR', err)
  }
  return obj
}

export function setStore_(name, obj) {
  localStorage.setItem(name, JSON.stringify(obj))
}
