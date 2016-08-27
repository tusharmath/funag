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
  return {class: {[css.touchStarted]: touchStarted}}
}
export default ({controls, header, STORE, slidingTabs}) => {
  const touchStarted$ = isMoving(STORE)
  return O
    .combineLatest(
      touchStarted$,
      header.DOM,
      slidingTabs.DOM,
      controls.DOM
    ).map(([touchStarted, header, slidingTabs, controls]) =>
      h(`div.${css.main}.flb.col`, params(touchStarted), [
        header,
        slidingTabs,
        controls
      ])
    )
}
