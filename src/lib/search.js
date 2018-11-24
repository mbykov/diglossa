import _ from 'lodash'
import { q, qs, empty, create, span, p, div, remove } from './utils'
import { navigate } from '../app';
import { getInfo } from './pouch';

// const path = require('path')
const log = console.log

let current

export function parseQuery(curcurrent) {
  current = curcurrent
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
      let qlines = _.cloneDeep(qpos[pos])
      let qauth = _.find(qlines, par=> { return par.author })
      let {html, percent} = aroundQuery(qauth.text, current.query)
      qauth.text = html
      qlines.forEach(par=> {
        if (par.author) return
        else par.text = textAround(par.text, percent)
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

function aroundQuery(str, wf) {
  let punct = '([^\.,\/#!$%\^&\*;:{}=\-_`~()a-zA-Z0-9\'"<> ]+)'
  let rePunct = new RegExp(punct, 'g')

  let limit = 100
  let arr = str.split(wf)
  let head = arr[0].slice(-limit)
  let percent = head.length/str.length
  head =  head.replace(rePunct, "<span class=\"active\">$1<\/span>")
  if (!arr[1]) {
    log('NO TAIL !!', wf, 'str:', str)
    throw new Error('NO SEARCH!')
  }
  let tail = arr.slice(1).join('').slice(0,limit)
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
  // log('percent:', percent, 'c', center, head, tail)
  let line = [head, tail].join('')
  // log('line.length:', line.length)
  return line
}
