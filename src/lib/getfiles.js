import _ from 'lodash'
import { q, qs, empty, create, span, p, div, remove } from './utils'
// import { parseBook } from './book'

const fse = require('fs-extra')
const path = require('path')
const glob = require('glob')
const csv = require('csvtojson')
const textract = require('textract')
const log = console.log

export function openODS(fpath, cb) {
  if (fpath === undefined) return
  try {
    textract.fromFileWithPath(fpath, {preserveLineBreaks: true, delimiter: '|'}, function(err, str) {
      parseCSV(str)
      cb(true)
    })
  } catch (err) {
    if (err) log('ODS ERR', err)
  }
}

function parseCSV(str) {
  let rows = str.split('\n')
  let size = rows[0].length
  let book = {}
  rows.slice(0,2).forEach((row, idx) => {
    if (row[0] != '#') return
    if (/title/.test(row)) book.title = row.split(',')[0].split(':')[1].trim()
    else book.nics = row.split(',')
  })
  let nics = ['name_a', 'name_b', 'name_c']
  if (!book.nics) book.nics = nics.slice(1)
  book.author = nics[0]
  let auths = []
  nics.forEach((nic, idx) => {
    let auth = { idx: idx, nic: nic, rows: [] }
    if (nic == book.author) auth.author = true
    auths.push(auth)
  })
  log('AUS', auths)
  rows.forEach((row, idx) => {
    // if (idx > 10) return
    if (row[0] == '#') return
    if (row == ',,') return
    let matches = extractAllText(row)
    // log('IDX____', idx)
    // log('M', matches)
    matches.forEach(str => {
      let corr = str.split(',').join('COMMA')
      row = row.replace(str, corr)
    })
    let cols = row.split(',')
    log('COLS', cols.length)
    cols.forEach((col, idy) => {
      col = col.split('COMMA').join(',')
      if (col == ',') return
      if (!auths[idy]) log('ERR', idy, row)
      auths[idy].rows.push(col)
    })
  })
  log('BOOK', book)
  localStorage.setItem('auths', JSON.stringify(auths))
  localStorage.setItem('book', JSON.stringify(book))
  // log('A', auths[0])
}

function extractAllText(str){
  const re = /"(.*?)"/g
  const results = []
  let current
  while (current = re.exec(str)) {
    results.push(current.pop())
  }
  return results
  // return (results.length > 0) ? results : [str]
}

// csv({
//   noheader: true,
//   output: "json"
// })
//   .fromString(data)
//   .then((json)=>{
//     // cb(json)
//     cb({})
//   })
