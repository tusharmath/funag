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
const params = (padding, touchStarted) => {
  return {
    class: {[css.touchStarted]: touchStarted},
    style: padding
  }
}
export default ({controls, STORE, slidingTabs, padding$}) => {
  const touchStarted$ = isMoving(STORE)
  return O
    .combineLatest(
      padding$,
      touchStarted$,
      slidingTabs.DOM,
      controls.DOM
    ).map(([padding, touchStarted, slidingTabs, controls]) =>
      h(`div.flb.col`, params(padding, touchStarted), [
        slidingTabs,
        controls
      ])
    )
}
