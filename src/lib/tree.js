//
import { q, qs, empty, create, span, p, div, remove, getStore, setStore } from './utils'
let log = console.log

export default function tree(data) {
  log('TREEDATA', data)
  let otree = create('div', 'tree')
  data.forEach(node=> {
    let onode = createNode(node)
    otree.appendChild(onode)
  })
  return otree
}

function createNode(node) {
  log('NODE', node)
  let onode = create('div', 'tree-text')
  let osign = create('span', 'tree-branch')
  osign.textContent = '▾'
  osign.addEventListener('click', toggleNode, false)
  let otext = create('span', 'text')
  otext.textContent = node.text
  otext.addEventListener('click', goNode, false)
  if (node.children) onode.appendChild(osign)
  onode.appendChild(otext)
  if (node.children) {
    node.children.forEach(child=> {
      let ochild = createNode(child)
      onode.appendChild(ochild)
    })
  }
  let texts = qs('.tree-text')
  return onode
}

function goNode(ev) {
  log('EV', ev.target.textContent)
}

function toggleNode(ev) {
  let parent = ev.target.parentNode
  parent.classList.toggle('tree-collapse')
}




// id: 'other',
// children: [
//   {text: '4'},
//   {text: '5'},
//   {
//     text: 'sub title',
//     id: 'sub',
//     children: [
//       {text: '6'},
//       {text: '7', id: 7},
//       {text: '8'}
