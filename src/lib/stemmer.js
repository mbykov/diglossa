'use strict'

import { log } from './utils'
import _ from 'lodash'
const natural = require('natural')
const german = require('snowball-german')

const stemmer = {
  'nld': natural.PorterStemmerNl.stem,
  'eng': natural.PorterStemmer.stem,
  'faz': natural.PorterStemmerFa.stem,
  'fra': natural.PorterStemmerFr.stem,
  'ind': natural.StemmerId.stem, // indonesian
  'ita': natural.PorterStemmerIt.stem,
  'jpn': natural.StemmerJa.stem,
  'nor': natural.PorterStemmerNo.stem,
  'por': natural.PorterStemmerPt.stem,
  'rus': natural.PorterStemmerRu.stem,
  'spa': natural.PorterStemmerEs.stem,
  'swe': natural.PorterStemmerSv.stem
}

export function porter (lang)  {
  if (lang == 'deu') return german
  else return stemmer[lang]
}
