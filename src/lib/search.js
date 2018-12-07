import _ from 'lodash'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import { navigate } from '../app';

// const path = require('path')
const log = console.log

let current

export function parseQuery(libdb, curcurrent) {
  current = curcurrent
  window.split.setSizes([100,0])
  let osource = q('#source')
  // let otrns = q('#trns')
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
    libdb.get(infoid)
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
  for (let fpath in qgroups) {
    let qgroup = qgroups[fpath]
    let qpos = _.groupBy(qgroup, 'pos')
    for (let pos in qpos) {
      let qlines = _.cloneDeep(qpos[pos])
      let qauths = _.filter(qlines, par=> { return par.author })
      qauths.forEach((qauth, idx)=> {
        let { html, percent } = aroundQuery(qauth.text, current.query, idx)
        qauth.text = html
        qlines.forEach(par=> {
          if (par.author) return
          else par.text = textAround(par.text, percent)
        })
        parseGroup(info._id, fpath, pos, qlines)
      })
    }
  }
}


function parseGroup(infoid, fpath, pos, lines) {
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
    if (par.author) oline.innerHTML = par.text
    else oline.classList.add('hidden')
    otext.appendChild(oline)
  })
  ogroup.appendChild(olink)
  ogroup.appendChild(otext)
  oresults.appendChild(ogroup)
  olink.addEventListener('click', jumpPos, false)
}

function jumpPos(ev) {
  let el = ev.target
  let infoid = el.getAttribute('infoid')
  let fpath = el.getAttribute('fpath')
  let pos = el.getAttribute('pos')
  let newcur = {section: "book", infoid: infoid, fpath: fpath, pos: pos, query: current.query}
  navigate(newcur)
}

function scrollQueries(ev) {
  if (ev.shiftKey != true) return
  let el = ev.target
  let parent = el.closest('.qtext')
  if (!parent) return
  let pars = parent.children
  let nics = _.map(pars, par=> { return par.getAttribute('nic') })

  let curpar = _.find(pars, par=> { return !par.classList.contains('hidden') })
  let nic = curpar.getAttribute('nic')
  let nicidx = nics.indexOf(nic)
  let nextnic = (nicidx+1 == nics.length) ? nics[0] : nics[nicidx+1]
  let next = _.find(pars, par=> { return par.getAttribute('nic') == nextnic })
  next.classList.remove('hidden')
  curpar.classList.add('hidden')
}

function aroundQuery(str, wf, idx) {
  let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)'
  let rePunct = new RegExp(punct, 'g')

  let limit = 100
  let arr = str.split(wf)
  let head = arr.slice(0, idx+1).join('').slice(-limit)
  let percent = head.length/str.length
  head =  head.replace(rePunct, "<span class=\"active\">$1<\/span>")
  let tail = arr.slice(idx+1).join('').slice(0,limit)
  tail =  tail.replace(rePunct, "<span class=\"active\">$1<\/span>")
  let qspan = ['<span class="query">', wf, '</span>'].join('')
  let html = [head, qspan, tail] .join('')
  return {html: html, percent: percent}
}

function textAround(str, percent) {
  let center = str.length*percent
  let start = center - 100
  let head = str.substr(start, 100)
  let tail = str.substr(center, 100)
  let line = [head, tail].join('')
  return line
}
