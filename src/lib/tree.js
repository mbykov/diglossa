import "../css/tree.css";

import { log, q, qs, empty, create, remove, span, p, div, space } from './utils'
import _ from 'lodash'
const marked = require('marked')

export function createTree(cnts, roots, books) {
  let oroots = []
  roots.forEach(root=> {
    let oroot = treeBlock(root)
    oroots.push(oroot)
    books.forEach(book=> {
      let doc = book.cnts[root.idx]
      if (!doc) return // un-synchronized
      let opar = treePar(doc)
      if (!book.origin && !book.shown) opar.classList.add('hidden')
      oroot.appendChild(opar)
    })

    let nextroot = cnts.find(cnt=> cnt.idx > root.idx && cnt.level == root.level)
    let chroots = cnts.filter(cnt=> cnt.idx > root.idx)
    if (nextroot) chroots = chroots.filter(cnt=> cnt.idx < nextroot.idx)
    chroots = chroots.filter(cnt=> cnt.level == root.level + 1)
    if (chroots.length) {
      let osign = create('span', 'tree-sign')
      osign.textContent = '▾'
      oroot.prepend(osign)
    }

    let ochildren = createTree(cnts, chroots, books)
    ochildren.forEach(ochild=> oroot.appendChild(ochild))
  })
  return oroots
}

function treeBlock(doc) {
  const oblock = create('div', 'block')
  oblock.setAttribute('level', doc.level)
  oblock.classList.add('tree-block')
  let levstyle = ['lev', doc.level].join('-')
  oblock.classList.add(levstyle)
  return oblock
}

function treePar(doc) {
  let opar = create('p')
  // opar.textContent = doc.md.replace(/#/g, '')
  opar.innerHTML = marked(doc.md)
  opar.setAttribute('path', doc.path)
  opar.setAttribute('size', doc.size)
  opar.setAttribute('idx', doc.idx)
  opar.classList.add('tree-text')
  opar.classList.add('ptext')
  return opar
}

// sign-collapse
document.addEventListener ("click",  (ev) => {
  if (!q('.page')) return
  let oblock = ev.target.closest('.block')
  if (!oblock) return
  let osign =  ev.target.closest('.tree-sign')
  if (!osign) return
  oblock.classList.toggle('tree-collapse')
  if (oblock.classList.contains('tree-collapse')) osign.textContent =  '▸'
  else osign.textContent = '▾'
  ev.stopPropagation()
})
