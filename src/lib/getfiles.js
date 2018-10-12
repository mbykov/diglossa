import _ from 'lodash'
import { q, qs, empty, create, span, p, div, remove } from './utils'
// import { parseBook1 } from './book'

const fse = require('fs-extra')
const path = require('path')
const glob = require('glob')
const csv = require('csvtojson')
const textract = require('textract')
const log = console.log

export function openODS(fpath, cb) {
  if (fpath === undefined) return
  try {
    textract.fromFileWithPath(fpath, {preserveLineBreaks: true}, function(err, str) {
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
    if (/title/.test(row)) book.title = row.split(',')[0].split(':')[1].trim()
    else book.nics = row.split(','), book.author = book.nics[0]
  })
  if (!book.nics) book.nics = ['a', 'b', 'c']
  let auths = []
  book.nics.forEach((nic, idx) => {
    let auth = { idx: idx, nic: nic, rows: [] }
    auths.push(auth)
  })
  log('AUS', auths)
  rows.forEach((row, idx) => {
    if (row[0] == '#') return
    let cols = row.split('","')
    cols.forEach((col, idy) => {
      if (!auths[idy]) log('ERR', idx, idy, cols)
      auths[idy].rows.push(col)
    })
  })
  log('A', auths[0])
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
