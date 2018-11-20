//

// import "./stylesheets/app.css";
// import "./stylesheets/main.css";

import "./lib/context_menu.js";
import _ from "lodash";
import Split from 'split.js'
import { remote } from "electron";
import { shell } from 'electron'
import { ipcRenderer } from "electron";
import { q, qs, empty, create, remove, span, p, div, enclitic } from './lib/utils'
import { twoPages, parseTitle, parseBook } from './lib/book'
import { openODS, openDir } from './lib/getfiles'

import { getDBState, setDBState, getInfo, getLib, getText } from './lib/pouch';

const Mousetrap = require('mousetrap')
let fse = require('fs-extra')
const log = console.log
const Store = require('electron-store')
const store = new Store()
// const elasticlunr = require('elasticlunr')

const path = require('path')

const clipboard = require('electron-clipboard-extended')
const {dialog} = require('electron').remote

// const isDev = require('electron-is-dev')
// const isDev = false
const isDev = true
const app = remote.app;
const apath = app.getAppPath()
let upath = app.getPath("userData")
// const watch = require('node-watch')

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
let libPath = path.resolve(upath, 'library')
let libdb = new PouchDB(libPath)
let ftdbPath = path.resolve(upath, 'ftdb')
let ftdb = new PouchDB(ftdbPath)

let current, info
// let limit = 20
let uf = '\ufff0'

window.onbeforeunload = function (ev) {
  // log('SAVE:')
  libdb.get('_local/current')
    .then(function(doc) {
      current._id = '_local/current'
      current._rev = doc._rev
      libdb.put(current).then(function() {
        ev.returnValue = false
      })
    }).catch(function (err) {
      libdb.put({ _id: '_local/current', section: 'lib'}).then(function() {
        navigate({section: 'lib'})
      })
    })
}

ipcRenderer.on('home', function (event) {
  navigate({section: 'lib'})
})

ipcRenderer.on('section', function (event, name) {
  log('SEC NAME', name)
  navigate({section: name})
})

ipcRenderer.on('parseDir', function (event, name) {
  log('PARSE DIR', name)
  // dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'book', extensions: ['ods'] }]}, showBook)
  dialog.showOpenDialog({properties: ['openDirectory'] }, getFNS)
})

// let hstates =   store.get('hstates') || []
// let hstate = store.get('hstate') || -1
let hstates = []
let hstate =  -1

// log('HSTATE=>', hstate)
// log('HSTATES=>', hstates)
// let position = hstates[hstate] || {section: 'lib'}
// log('HSTATES=>POS', position)

window.split = twoPages()
// window.split.setSizes([50,50])

getState()

function getState() {
  libdb.get('_local/current').then(function (navpath) {
    current = navpath
    log('INIT CURRENT:', current)
    navigate(current)
    // if (current.section == 'lib') navigate({section: 'lib'})
    // else if (current.section == 'search') parseQuery()
    // else getDir()
  }).catch(function (err) {
    if (err.name === 'not_found') {
      // Promise.all([
      //   // libdb.put({ _id: '_local/libstate', psize: 0}),
      //   libdb.put({ _id: '_local/current', section: 'lib'})
      // ])
      libdb.put({ _id: '_local/current', section: 'lib'})
        .then(function() {
          log('SET DEFAULT VALUES')
          navigate({section: 'lib'})
        })
    }
    else throw err
  })
}

function goLib() {
  getLib()
    .then(function (result) {
      let infos = result.rows.map(row=> { return row.doc})
      log('INFOS', infos)
      parseLib(infos)
    }).catch(function (err) {
      log('getLibErr', err);
    })
}

function getTitle() {
  // log('getTitle cur:', current)
  getInfo(current.infoid)
    .then(function (curinfo) {
      info = curinfo
      current.bpath = info.bpath
      parseTitle(info, current)
    }).catch(function (err) {
      log('getTitleErr', err);
    })
}

function getBook() {
  getInfo(current.infoid)
    .then(function (curinfo) {
      getText(current)
        .then(function(res) {
          let pars = _.compact(res.docs)
          // log('___getBook-pars:', pars.length)
          if (!pars || !pars.length) log('no texts')
          parseBook(current, curinfo, pars)
        })
    }).catch(function (err) {
      log('getTitleErr', err);
    })
}

function parseLib(infos) {
  window.split.setSizes([100,0])
  let osource = q('#source')
  empty(osource)
  let oul = create('ul')
  osource.appendChild(oul)

  if (!infos.length) oul.textContent = 'no book in lib'
  infos.forEach(info => {
    let ostr = create('li', 'libauth')
    ostr.infoid = info._id
    oul.appendChild(ostr)
    let author = span(info.book.author)
    let title = span(info.book.title)
    author.classList.add('lib-auth')
    title.classList.add('lib-title')
    ostr.appendChild(author)
    ostr.appendChild(title)
  })
  oul.addEventListener('click', goTitleEvent, false)
}

function goTitleEvent(ev) {
  if (ev.target.parentNode.nodeName != 'LI') return
  let infoid = ev.target.parentNode.infoid
  navigate({section: 'title', infoid: infoid})
}

export function navigate(navpath) {
  let osource = q('#source')
  let otrns = q('#trns')
  empty(osource)
  empty(otrns)
  let ohleft = q('.hleft')
  let ohright = q('.hright')
  remove(ohleft)
  remove(ohright)

  current = navpath
  let already = _.findIndex(hstates, current) + 1
  if (!already) {
    hstates.push(_.clone(current))
    hstate = hstates.length-1
  }
  log('HSTATES', hstates)
  log('Navigate:', current)

  let sec = current.section
  if (sec == 'lib') goLib()
  else if (sec == 'title') getTitle()
  else if (sec == 'book') getBook()
  else if (sec == 'search') parseQuery()
  else showSection(sec)

}

Mousetrap.bind(['alt+left', 'alt+right'], function(ev) {
  // log('EV', ev.which, hstate, hstates)
  if (ev.which == 37 && hstate - 1 <= -1) return
  if (ev.which == 37 && hstate - 1 > -1) hstate--
  if (ev.which == 39 && hstate + 1 >= hstates.length) return
  if (ev.which == 39 && hstate + 1 < hstates.length) hstate++
  let state = hstates[hstate]
  navigate(state)
})

// MAP
Mousetrap.bind(['ctrl+f'], function(ev) {
  let query = clipboard.readText()
  ftdb.get(query)
    .then(function (wfdoc) {
      log('WFdoc', query, wfdoc)
      let opts = { include_docs: true, keys: wfdoc.parids }
      libdb.allDocs(opts)
        .then(function (result) {
          let qdocs = _.compact(result.rows.map(row=> { return row.doc}))
          // log('QDOCS', qdocs)
          let qinfos = _.groupBy(qdocs, 'infoid')
          // log('QINFOS', qinfos)

          for (let infoid in qinfos) {
            let qgroups = _.groupBy(qinfos[infoid], 'fpath')
            // log('QGRS', infoid, qgroups)
            for (let fpath in qgroups) {
              let qgroup = qgroups[fpath]
              qgroup.forEach(par=> {
                // вычислить процент PROCENT
                if (par.author) par.innerHTMLhtml = aroundQuery(par.text, query)
                else par.text = par.text.slice(0, 100)
              })
            }
          }

          current = {_id: '_local/current', section: 'search', qinfos: qinfos, query: query}
          navigate(current)
        })
    })
})

function parseQuery() {
  window.split.setSizes([100,0])
  let osource = q('#source')
  let otrns = q('#trns')
  let oquery = div('', '')
  oquery.id = 'qresults'
  let otitle = div(current.query, 'qtitle')
  oquery.appendChild(otitle)
  osource.appendChild(oquery)
  // унести в help
  let disclaimer = 'Scroll with Shift, but note: the correspondence between a place of the query in the source and in the translations within the paragraph is very approximate'
  let odisc = p(disclaimer, 'disclaimer')
  oquery.appendChild(odisc)

  for (let infoid in current.qinfos) {
    getInfo(infoid)
      .then(function (info) {
        let qinfo = current.qinfos[infoid]
        parseQbook(info, qinfo)
      }).catch(function (err) {
        log('getTitleErr', err);
      })
  }
  oquery.addEventListener("wheel", scrollQueries, false)
}

function parseQbook(info, qinfo) {
  let qgroups = _.groupBy(qinfo, 'fpath')
  // log('QGRS', info._id, qgroups)
  for (let fpath in qgroups) {
    let qgroup = qgroups[fpath]
    let qpos = _.groupBy(qgroup, 'pos')
    for (let pos in qpos) {
      let qlines = qpos[pos]
      qlines.forEach(par=> {
        // вычислить процент PROCENT
        if (par.author) par.innerHTMLhtml = aroundQuery(par.text, current.query)
        else par.text = par.text.slice(0, 100)
      })
      parseGroup(info._id, fpath, pos, qlines)
    }
  }
}


function parseGroup(infoid, fpath, pos, lines) {
  // log('__________QGP', fpath, pos)
  let oresults = q('#qresults')

  let postxt = ['par:', pos].join(' ')
  let linktxt = [fpath, postxt].join(' - ')
  let ogroup = div('', '')
  let olink = div(linktxt, 'qlink')
  olink.setAttribute('infoid', infoid)
  olink.setAttribute('fpath', fpath)
  olink.setAttribute('pos', pos)

  let otext = div('', 'qtext')
  lines.forEach(par=> {
    let oline = p(par.text, 'qline')
    oline.setAttribute('nic', par.nic)
    oline.setAttribute('pos', par.pos)
    if (par.author) oline.innerHTML = aroundQuery(par.text, current.query)
    else oline.classList.add('hidden')
    otext.appendChild(oline)
  })
  ogroup.appendChild(olink)
  ogroup.appendChild(otext)
  oresults.appendChild(ogroup)
  olink.addEventListener('click', jumpPos, false)
}

function jumpPos(ev) {
  // log('JUMP', ev.target)
  let el = ev.target
  let infoid = el.getAttribute('infoid')
  let fpath = el.getAttribute('fpath')
  let pos = el.getAttribute('pos')
  let newcur = {section: "book", infoid: infoid, fpath: fpath, pos: pos, query: current.query}
  navigate(newcur)
}

function scrollQueries(ev) {
  if (ev.shiftKey != true) return
  // let idx = ev.target.getAttribute('pos')
  let el = ev.target
  let parent = el.closest('.qtext')
  // log('QP', parent)
  if (!parent) return
  let pars = parent.children
  // log('Qpars', pars)
  let nics = _.map(pars, par=> { return par.getAttribute('nic') })
  // log('Qnics', nics)

  let curpar = _.find(pars, par=> { return !par.classList.contains('hidden') })
  let nic = curpar.getAttribute('nic')
  let nicidx = nics.indexOf(nic)
  let nextnic = (nicidx+1 == nics.length) ? nics[0] : nics[nicidx+1]
  let next = _.find(pars, par=> { return par.getAttribute('nic') == nextnic })
  next.classList.remove('hidden')
  curpar.classList.add('hidden')

}

function aroundQuery(str, wf) {
  // это снести в общий метод посло структуризации кода
  let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)'
  let rePunct = new RegExp(punct, 'g')

  let limit = 100
  let arr = str.split(wf)
  let head = arr[0].slice(-limit)
  head =  head.replace(rePunct, "<span class=\"active\">$1<\/span>")
  let tail = arr[1].slice(0,limit)
  tail =  tail.replace(rePunct, "<span class=\"active\">$1<\/span>")
  let qspan = ['<span class="query">', wf, '</span>'].join('')
  let html = [head, qspan, tail] .join('')
  return html
}

function textAround(tobj, row, query, start) {
  let line = {nic: tobj.nic, lang: tobj.lang}
  if (tobj.author) {
    line.author = true
    line.text = aroundA(row, query)
  } else {
    line.text = row.slice(start, start+150)
  }
  return line
}


function showSection(name) {
  window.split.setSizes([100,0])
  let osource = q('#source')
  let secpath = path.resolve(apath, 'src/sections', [name, 'html'].join('.'))
  const section = fse.readFileSync(secpath)
  osource.innerHTML = section
}


function pushInfo(ndoc) {
  // log('NDOCinfo', ndoc)
  return libdb.get(ndoc._id).catch(function (err) {
    if (err.name === 'not_found') return
    else throw err
  }).then(function (doc) {
    // log('DOC-old', doc)
    if (doc) {
      // log('DOC-old', doc)
      let testdoc = _.clone(doc)
      delete testdoc._rev
      if (_.isEqual(ndoc, testdoc)) return
      else {
        ndoc._rev = doc._rev
        // log('NDOC-rev', ndoc)
        return libdb.put(ndoc)
      }
    } else {
      return libdb.put(ndoc)
    }
  })
}

function pushTexts(newdocs) {
  return libdb.allDocs({include_docs: true})
    .then(function(res) {
      let docs = res.rows.map(row=>{ return row.doc})
      let cleandocs = []
      let hdoc = {}
      docs.forEach(doc=> { hdoc[doc._id] = doc })
      newdocs.forEach(newdoc=> {
        let doc = hdoc[newdoc._id]
        if (doc) {
          if (newdoc.text == doc.text) return
          else doc.text = newdoc.text, cleandocs.push(doc)
        } else {
          cleandocs.push(newdoc)
        }
      })
      log('CLD', cleandocs)
      return libdb.bulkDocs(cleandocs)
    })
}

// MAP
function pushMap(ndocs) {
  return ftdb.allDocs({include_docs: true})
    .then(function(res) {
      let docs = res.rows.map(row=>{ return row.doc})
      // log('ODOCS', docs)
      let hdoc = {}
      docs.forEach(doc=> { hdoc[doc._id] = doc })

      let cleandocs = []
      // log('NDOCS', map)
      ndocs.forEach(ndoc=> {
        let doc = hdoc[ndoc._id]
        if (doc) {
          // log('DOC-old', doc)
          let testdoc = _.clone(doc)
          delete testdoc._rev
          if (_.isEqual(ndoc, testdoc)) return
          else {
            // неверно - нужны только уникальные значения, uniq не катит
            doc.docs = ndoc.docs //  _.uniq(doc.docs.concat(ndoc.docs))
            cleandocs.push(doc)
          }
        } else {
          cleandocs.push(ndoc)
        }
      })
      log('map-cleandocs.length', cleandocs.length)
      return ftdb.bulkDocs(cleandocs)
    })
}

const historyMode_ = event => {
  const checkArrow = element => {
    // if (!element.classList.contains("arrow")) return
    if (element.id === "new-version") {
      // log('NEW VERS CLICKED')
    }
    if (element.id === "arrow-left") {
      if (hstate - 1 > -1) hstate--
      // showText(hstates[hstate])
    } else if (element.id === "arrow-right") {
      if (hstate + 1 < hstates.length) hstate++
      // showText(hstates[hstate])
    }
  };
  checkArrow(event.target);
}

// унести в getFile, и грязно пока
function getFNS(fns) {
  if (!fns) return
  let bpath = fns[0]
  getDir(bpath)
}

function getDir(bpath) {
  log('getDIR-bpath', bpath)
  if (!bpath) bpath = current.bpath
  openDir(bpath, (book) => {
    if (!book) return
    // log('DIR-INFO::', book.info) // то же что book from get
    Promise.all([
      pushInfo(book.info),
      pushTexts(book.pars),
      pushMap(book.mapdocs)
    ])
      .then(function(res) {
        log('PUSH ALL RES', res)
        if (res[1].length) {
          log('INDEX!')
          libdb.createIndex({
            index: {fields: ['fpath', 'pos']},
            name: 'fpathindex'
          })
            .then(function(res) {
              log('INDEX CREATED')
            })
        }
        // wtf ?
        if (current.section) info = book.info, navigate(current)
        else navigate({section: 'lib'})
        // navigate({section: 'lib'})
      }).catch(function(err) {
        log('ALL RES ERR', err)
      })

  })
}
