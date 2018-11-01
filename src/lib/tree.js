//
import { q, qs, empty, create, span, p, div, remove } from './utils'
let log = console.log

export default function tree(data) {
  // log('TREEDATA', data)
  let otree = create('div', 'tree')
  let otitle = create('div', 'tree-title')
  otitle.id = 'tree-title'
  otitle.textContent = 'content'
  otree.appendChild(otitle)
  let otbody = create('div', 'tree-body')
  otbody.id = 'tree-body'
  otree.appendChild(otbody)
  data.forEach(node=> {
    let onode = createNode(node)
    otbody.appendChild(onode)
  })
  return otree
}

function createNode(node) {
  // log('NODE', node)
  let onode = create('div', 'tree-text')
  let osign = create('span', 'tree-branch')
  osign.textContent = '▾'
  osign.addEventListener('click', toggleNode, false)
  let navclass = (node.hasFiles) ? 'tree-node-text' : 'tree-node-empty'
  let otext = create('span', navclass)
  otext.textContent = node.text
  otext.setAttribute('fpath', node.fpath)
  // otext.addEventListener('click', goNode, false)
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

// function goNode(ev) {
//   log('EV', ev.target.textContent)
// }

function toggleNode(ev) {
  let parent = ev.target.parentNode
  parent.classList.toggle('tree-collapse')
}
