/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import R from 'ramda'
import {h} from '@cycle/dom'
import css from './playlist.style'
import {PlaylistItem} from '../placeholders/placeholders'

const PLACEHOLDER = h('div', R.repeat(PlaylistItem, 3))

export default ({playlistDOM$}) => {
  return playlistDOM$.startWith(PLACEHOLDER)
    .map(view => h(`div.${css.playlist}`, view))
}
