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
  let otext = create('span', 'text')
  otext.textContent = node.text
  onode.appendChild(osign)
  onode.appendChild(otext)
  return onode
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
