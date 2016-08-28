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
const params = (touchStarted) => {
  return {
    class: {[css.touchStarted]: touchStarted}
  }
}
export default ({controls, STORE, header, swipeableCard}) => {
  const touchStarted$ = isMoving(STORE)
  return O
    .combineLatest(
      header.DOM,
      touchStarted$,
      controls.DOM,
      swipeableCard.DOM
    ).map(([header, touchStarted, controls, swipeableCard]) =>
      h(`div.${css.main}`, params(touchStarted), [
        header,
        swipeableCard,
        controls
      ])
    )
}
