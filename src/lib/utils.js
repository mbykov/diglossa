import _ from 'lodash'
// const natural = require('natural')

// let util = require('util')

export const log = console.log

// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
export function hashCode(s) {
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

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
  // el.id = sel
  return el
}

export function recreate (element) {
  var newElement = element.cloneNode(true)
  element.parentNode.replaceChild(newElement, element)
}

export function ctext (str) {
  return document.createTextNode(str)
}

export function span (str, style) {
  let el = document.createElement('span')
  el.textContent = str
  if (style) el.classList.add(style)
  return el
}

export function space () {
  return document.createTextNode(' ')
}


export function br () {
  let oBR = document.createElement('br')
  return oBR
}

export function div (str, style) {
  let el = document.createElement('div')
  el.textContent = str
  if (style) el.classList.add(style)
  return el
}

export function p (str, style) {
  let el = document.createElement('p')
  el.textContent = str
  if (style) el.classList.add(style)
  return el
}

export function empty (el) {
  if (!el) return
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild)
  }
}

export function remove (el) {
  if (!el) return
  el.parentElement.removeChild(el)
}

export function removeAll (els) {
  els.forEach(el => { el.parentElement.removeChild(el) })
}

export function findAncestor (el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls)) {
    return el
  }
}

export function getCoords (el) {
  let rect = el.getBoundingClientRect()
  return rect
}

export function placePopup (coords, el) {
  let top = [coords.top, 'px'].join('')
  let left = [coords.left, 'px'].join('')
  el.style.top = top
  el.style.left = left
}

// https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib
export function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export function zerofill(number, size) {
  number = number.toString()
  while (number.length < size) number = "0" + number
  return number;
}

export function cleanStr(str) {
  return str.trim().replace(/\n+/g, '\n').replace(/↵+/, '\n').replace(/  +/, ' ').replace(/ /g, '') // .replace(/\s+/, ' ')
}

export function ndash(str) {
  return str.trim().replace(/^-/, '–').replace(/^—/, '–').replace(/ - /g, ' – ') // m-dash: —
}

export function cleanDname(descr) {
  if (!descr.author) descr.author = 'author'
  if (!descr.title) descr.title = descr.name || 'title'
  let lang = descr.lang || ''
  // let str = [descr.type || '', descr.lang || '', descr.author.slice(0,25), descr.title.slice(0,25)].join('-')
  let str = [descr.author.slice(0,25), descr.title.slice(0,25), lang].join('-')
  return str.replace(/[)(,\.]/g,'').replace(/\s+/g, '-').replace(/\//g, '_')
}

// ev.preventDefault()
// ev.stopPropagation()

export function replaceEl (el, html) {
  const parentElem = el.parentNode
  let innerElem
  while (innerElem = el.firstChild) { parentElem.insertBefore(innerElem, el) }
  parentElem.removeChild(el)
}

export function fromHTML(html) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.firstChild
}

export function previousSiblings(elem) {
  let sibs = []
  while (elem = elem.previousSibling) {
    if (elem.nodeName !== 'SPAN') continue
    sibs.push(elem)
  }
  return sibs
}

export function splitByPhrases(str) {
  return str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|")
}


// PAGE
export function scrollToPosition(scrollTop) {
  let osec = q('.page')
  osec.scrollTop = scrollTop
}

export function selectParallelBooks(store, bid) {
  for (let libook in store) {
    for (let book of store[libook].books) {
      if (book.bid == bid) return store[libook].books
    }
  }
}

export function tokenizer (str) {
  return str.split(/[\p{P} ]+/ug).filter(Boolean)
}
