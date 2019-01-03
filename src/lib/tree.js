//
import { q, qs, empty, create, span, p, div, remove } from './utils'
let log = console.log

export default function treeTitle(deftitle) {
}

export function tree(children, otree) {
  let tbody = otree.lastChild
  children.forEach(node=> {
    if (node.fpath) {
      let onode = createNode(node)
      tbody.appendChild(onode)
    }
    else {
      let obranch = createBranch(node)
      tbody.appendChild(obranch)
      tree(node.children, obranch)
    }
  })
  // otree.addEventListener('click', goNode, false)
  return otree
}

function createNode(node) {
  let onode = create('div', 'tree-text')
  let otext = create('span', 'tree-node-text')
  otext.textContent = node.text
  otext.setAttribute('fpath', node.fpath)
  onode.appendChild(otext)
  return onode
}

function createBranch(node) {
  let onode = create('div', 'tree-branch')
  let osign = create('span', 'tree-sign')
  osign.textContent = '▾'
  osign.addEventListener('click', toggleNode, false)
  onode.appendChild(osign)
  let otext = create('span', 'tree-node-branch')
  otext.textContent = node.text
  otext.setAttribute('fpath', node.fpath)
  onode.appendChild(otext)
  let tbody = create('div', 'tbody')
  onode.appendChild(tbody)
  return onode
}

function toggleNode(ev) {
  let parent = ev.target.parentNode
  parent.classList.toggle('tree-collapse')
}

function goNode(ev) {
  log('GONODE', ev.target)
}
