/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import {h} from '@cycle/dom'
import css from './main.style'

export default ({playlist, controls, header}) => {
  return O
    .combineLatest(
      header.DOM,
      playlist.DOM,
      controls.DOM
    ).map(([header, playlist, controls]) =>
      h(`div.${css.main}.flb.col`, [
        header,
        playlist,
        controls
      ])
    )
}
