import _ from 'lodash'
import Split from 'split.js'
import { q, qs, empty, create, span, p, div, remove } from './utils'
let fse = require('fs-extra')
let path = require('path')
const log = console.log

const glob = require('glob')

export function parseBook(book) {
  var sizes = localStorage.getItem('split-sizes')
  if (sizes) sizes = JSON.parse(sizes)
  else sizes = [50, 50]
  Split(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      alignPanes()
    }
  })

  placeHeaders()

  let bookpath = '../../texts/Thrax'
  getFiles(bookpath)
}

function getFiles(bookname) {
  let bookpath = path.resolve(__dirname, bookname)
  let dir = bookpath.split('/')[bookpath.split('/').length-1]
  let fns = glob.sync('**/*', {cwd: bookpath})
  let info = _.filter(fns, fn=>{ return path.extname == '.info' })
  fns = _.filter(fns, fn=>{ return path.extname != '.info' })
  // let trns = []
  let book = {nics: []}
  let auths = []
  let author
  let titles = []
  fns.forEach(fn => {
    let comment = false
    let com = fn.split('-')[1]
    if (com && com == 'com') comment = true, fn = fn.replace('-com', '')
    let parts = fn.split('.')
    if (parts.length != 3) return
    let title = parts[0]
    titles.push(title)
    let lang = parts[1]
    let nic = parts[2]
    if (!comment) book.nics.push(nic)
    let txt = fse.readFileSync(path.resolve(bookpath, fn)).toString()
    // no txt ?
    let rows = txt.split(/\n+/)
    let auth = { lang: lang, title: title, nic: nic, fn: fn, rows: rows }
    if (dir.toLowerCase() == nic.toLowerCase()) auth.author = true, book.author = nic, book.lang = lang
    else if (comment) auth.com = true
    auths.push(auth)
  })
  // if (_.uniq(titles).length != 1) return { err: 'different titles' } // тут нужно хитрее, неясно как
  localStorage.setItem('auths', JSON.stringify(auths))
  localStorage.setItem('book', JSON.stringify(book))
  parsePars(auths)
}

function parsePars(auths) {
  let otext = q('#source')
  let ores = q('#trns')
  empty(otext)
  empty(ores)
  let author = _.find(auths, auth=> { return auth.author })
  let trns = _.filter(auths, auth=> { return !auth.author && !auth.com })
  let nics = trns.map(auth => { return auth.nic })
  let current = localStorage.getItem('current')
  if (!current) current = nics[0]
  let osource = q('#source')
  let otrns = q('#trns')
  author.rows.forEach((astr, idx) => {
    let oleft = p(astr)
    osource.appendChild(oleft)
    trns.forEach(auth => {
      let rstr = auth.rows[idx]
      let oright = p(rstr)
      otrns.appendChild(oright)
      if (auth.nic != current) oright.classList.add('hidden')
      else alignPar(oleft, oright)
    })
  })
}

function alignPar(oleft, oright) {
  // oright.style.marginBottom = '12px';
  // oleft.style.marginBottom = '12px';
  let aheight = oleft.offsetHeight
  let rheight = oright.offsetHeight
  let max = _.max([aheight, rheight])
  let bottom
  if (rheight == max) {
    oleft.style.height = max + 'px'
  } else {
    oright.style.height = max + 'px'
  }
}

function alignPanes() {
  let auths = localStorage.getItem('auths')
  if (!auths) return
  auths = JSON.parse(auths)
  parsePars(auths)
}


export function parseHeaders(name) {
  if (name == 'close') closeHeaders()
  if (name == 'left') parseLeftHeader()
  if (name == 'right') parseRightHeader()
}

function parseLeftHeader() {
  let anchor = q('#hleft')
  // let oheader = placeHeader(anchor)
  // oheader.textContent = '========================'
}

function parseRightHeader() {
  let oheader = q('#hright')
  oheader.classList.add('header')
  oheader.dataset.header = 'close'
  let json = localStorage.getItem('book')
  if (!json) return
  let book = JSON.parse(json)
  let nics = _.uniq(book.nics)
  log('NICS', book.nics)

  let current = localStorage.getItem('current')
  if (!current) current = nics[0]

  let oul = create('ul')
  nics.forEach(nic=> {
    let oli = create('li')
    oli.textContent = nic
    oul.appendChild(oli)
  })
  oheader.appendChild(oul)
  // oheader.textContent = ' == right header =='

}

function closeHeaders() {
  let oright = q('#hright')
  oright.classList.remove('header')
  oright.dataset.header = 'right'
}

function placeHeaders() {
  let oapp = q('#book')
  let arect = oapp.getBoundingClientRect()
  let oright = div()
  oright.classList.add('hright')
  oright.style.left = arect.width*0.70 + 'px'
  let json = localStorage.getItem('book')
  if (!json) return
  let book = JSON.parse(json)
  let nics = _.uniq(book.nics)
  let current = localStorage.getItem('current')
  if (!current) current = nics[0]
  let oul = create('ul')
  let cnics = [current]
  cnics.forEach(nic=> {
    let oli = create('li')
    oli.textContent = nic
    oul.appendChild(oli)
  })
  oright.appendChild(oul)
  oapp.appendChild(oright)
  log('PLAICING', oright)
}
