/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import R from 'ramda'
import {h} from '@cycle/dom'
import {Observable as O} from 'rx'
import css from './playlist.style'
import {PlaylistItem} from '../placeholders/placeholders'

const PLACEHOLDER = [h('div', R.repeat(PlaylistItem, 3))]

export default ({playlistDOM$, height$}) => {
  return O.combineLatest(
    playlistDOM$.startWith(PLACEHOLDER),
    height$,
    (view, height) => h(`div.${css.playlist}`, {style: {height}}, view)
  )
}
