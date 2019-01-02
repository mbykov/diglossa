//
import { q, qs, empty, create, span, p, div, remove } from './utils'
let log = console.log

export default function treeTitle(deftitle) {
}

export function tree(children, otree) {
  children.forEach(node=> {
    if (node.fpath) {
      let onode = createNode(node)
      otree.appendChild(onode)
    }
    else {
      let obranch = createBranch(node)
      otree.appendChild(obranch)
      tree(node.children, obranch)
    }
  })
  otree.addEventListener('click', goNode, false)
  log('OTREE', otree)
  return otree
}

function createNode(node) {
  log('NODE', node)
  let onode = create('div', 'tree-text')
  let otext = create('span', 'tree-node-text')
  otext.textContent = node.text
  otext.setAttribute('fpath', node.fpath)
  onode.appendChild(otext)
  return onode
}

function createBranch(node) {
  log('BRANCH', node)
  let onode = create('div', 'tree-branch')
  let osign = create('span', 'tree-sign')
  osign.textContent = '▾'
  osign.addEventListener('click', toggleNode, false)
  onode.appendChild(osign)
  let otext = create('span', 'tree-node-branch')
  otext.textContent = node.text
  otext.setAttribute('fpath', node.fpath)
  onode.appendChild(otext)
  return onode
}

function createNode_(node) {
  log('NODE', node)
  let onode = create('div', 'tree-text')
  let osign = create('span', 'tree-branch')
  osign.textContent = '▾'
  osign.addEventListener('click', toggleNode, false)
  let navclass = (node.hasFiles) ? 'tree-node-text' : 'tree-node-empty'
  let otext = create('span', navclass)
  otext.textContent = node.text
  otext.setAttribute('fpath', node.fpath)
  otext.addEventListener('click', goNode, false)
  if (node.children) onode.appendChild(osign)
  onode.appendChild(otext)
  if (node.children) {
    node.children.forEach(child=> {
      let ochild = createNode(child)
      onode.appendChild(ochild)
    })
  }
  // let texts = qs('.tree-text')
  return onode
}


function toggleNode(ev) {
  let parent = ev.target.parentNode
  parent.classList.toggle('tree-collapse')
}

function goNode(ev) {
  log('GONODE', ev.target)
}
