'use strict';

import { log, q } from './utils'

const oprogress = q('#progress')

export const progress = {
  show() {
    oprogress.classList.remove('hidden')
  },

  hide() {
    oprogress.classList.add('hidden')
  }
}
