/**
 * Created by tushar.mathur on 26/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import {h} from '@cycle/dom'
import css from './controls.style'

export default ({playback, scrobber, show$}) => {
  return O.combineLatest(scrobber.DOM, playback.DOM, show$)
    .map(([scrobber, playback, show, height]) =>
      h(`div.${css.controlsContainer}.control`, {class: {[css.hide]: !show}}, [
        scrobber,
        playback
      ])
    )
}
