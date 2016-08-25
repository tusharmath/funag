/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import css from './main.style'

const isMoving = STORE => {
  return STORE
    .select('animationState.touchStarted')
    .startWith(false)
}
export default ({playlist, controls, header, STORE}) => {
  const touchStarted$ = isMoving(STORE)
  return O
    .combineLatest(
      touchStarted$,
      header.DOM,
      playlist.DOM,
      controls.DOM
    ).map(([touchStarted, ...views]) =>
      <div class={{[css.touchStarted]: touchStarted}}
           className={css(css.main, 'flb col')}>
        {views}
      </div>
    )
}
