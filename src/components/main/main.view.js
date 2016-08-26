/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import {h} from '@cycle/dom'
import css from './main.style'

const isMoving = STORE => {
  return STORE.select('animationState.touchStarted')
}
export default ({playlist, controls, header, STORE, slidingTabs}) => {
  const touchStarted$ = isMoving(STORE)
  return O
    .combineLatest(
      touchStarted$,
      header.DOM,
      slidingTabs.DOM,
      playlist.DOM,
      controls.DOM
    ).map(([touchStarted, ...views]) =>
      h(`div.${css.main}.flb.col`, {class: {[css.touchStarted]: touchStarted}},
        views
      )
    )
}
