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
export default ({controls, STORE, header, playlist}) => {
  const touchStarted$ = isMoving(STORE)
  return O
    .combineLatest(
      header.DOM,
      touchStarted$,
      controls.DOM,
      playlist.DOM
    ).map(([header, touchStarted, controls, playlist]) =>
      h(`div.${css.main}`, params(touchStarted), [
        header,
        h(`x-swipeable-pane`, {attrs: {count: 3, selected: 0}}, [
          h(`div.${css.equalWidth}`, [
            playlist,
            h(`div`, 'AAA'),
            h(`div`, 'BBB')
          ])
        ]),
        controls
      ])
    )
}
