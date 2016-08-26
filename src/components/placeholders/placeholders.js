/**
 * Created by tushar.mathur on 10/05/16.
 */

'use strict'
import css from './placeholders.style'
import {h} from '@cycle/dom'

export const PlaylistItem = (
  h(`div.${css.placeholder}.flb.row.js_s`, [
    h(`div.${css.square50}`, [
      h(`div.${css.lineCol}`, [
        h(`div.${css.line100}`),
        h(`div.${css.line75}`)
      ])
    ])
  ])
)
