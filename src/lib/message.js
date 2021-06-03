'use strict';

import { log, q } from './utils'
const omess = q('#message')
import { progress } from './progress'

let timer

export const message = {
  show(str, color, auto) {
    log('_message', str)
    let omessage = omess.querySelector('#message-text')
    progress.hide()
    omess.classList.remove('hidden')
    omessage.classList.remove('darkred')
    omessage.classList.remove('darkgreen')
    omessage.textContent = str
    omessage.classList.add(color)

    if (auto) return
    if (timer) clearTimeout(timer)
    timer = setTimeout(wait, 10000)
  },

  hide() {
    omess.classList.add('hidden')
  }
}

function wait() {
  progress.hide()
  omess.classList.add('hidden')
}
