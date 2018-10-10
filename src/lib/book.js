import _ from 'lodash'
import Split from 'split.js'
import { q, qs, empty, create, span, p, div, enclitic } from './utils'
let fse = require('fs-extra')
let path = require('path')
const log = console.log

const glob = require('glob')

let split
export function parseBook(book) {
  var sizes = localStorage.getItem('split-sizes')
  if (sizes) sizes = JSON.parse(sizes)
  else sizes = [50, 50]
  split = Split(['#source', '#trns'], {
    sizes: sizes,
    gutterSize: 5,
    cursor: 'col-resize',
    minSize: [0, 0],
    onDragEnd: function (sizes) {
      alignPanes()
    }
  })

  let otext = q('#source')
  let ores = q('#trns')
  empty(otext)
  empty(ores)

  let bookpath = '../../texts/Thrax'
  getFiles(bookpath)
}

function getFiles(book) {
  let bookpath = path.resolve(__dirname, book)
  // log('__dirname', __dirname)
  // log('bookpath', bookpath)
  let dir = bookpath.split('/')[bookpath.split('/').length-1]
  let fns = glob.sync('**/*', {cwd: bookpath})
  // log('FNs', fns)
  let info = _.filter(fns, fn=>{ return path.extname == '.info' })
  fns = _.filter(fns, fn=>{ return path.extname != '.info' })
  let trns = []
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
    let txt = fse.readFileSync(path.resolve(bookpath, fn)).toString()
    let auth = { lang: lang, title: title, nic: nic, fn: fn, txt: txt }
    if (dir.toLowerCase() == nic.toLowerCase()) author = auth
    else {
      if (comment) auth.com = true
      trns.push(auth)
    }
  })
  if (_.uniq(titles).length != 1) return { err: 'different titles' }
  let rus = _.find(trns, auth=> { return auth.lang == 'ru' })
  parsePars(author, rus)
}

function parsePars(author, rus) {
  let astrs = _.compact(author.txt.split('\n'))
  let tstrs = _.compact(rus.txt.split('\n'))
  let osource = q('#source')
  let otrns = q('#trns')
  astrs.forEach((astr, idx) => {
    let oleft = p(astr)
    osource.appendChild(oleft)
    let tstr = tstrs[idx]
    let oright = p(tstr)
    otrns.appendChild(oright)
    alignPar(oleft, oright)
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
  let leftPars = qs('#source p')
  let rightPars = qs('#trns p')
  leftPars.forEach((oleft, idx) => {
    let oright = rightPars[idx]
    alignPar(oleft, oright)
  })
}
