/**
 * Created by tushar.mathur on 30/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import getClientX from '../../dom-api/getClientX'
import {SET_TAB} from '../../redux-lib/actions'

export const SWIPE_THRESHOLD = 25

export const selectedTab = ({STORE}) => {
  return STORE.select('view.selectedTab')
}

export const getDirection = R.curry((threshold, delta) =>
  Math.abs(delta) > threshold ? -Math.sign(delta) : 0
)

export const changeTab = ({touches, STORE}) => {
  const {start$, end$} = touches
  return O.zip(start$.map(getClientX), end$.map(getClientX),
    R.compose(R.negate, getDirection(SWIPE_THRESHOLD), R.subtract)
  ).withLatestFrom(selectedTab({STORE}), R.add).map(SET_TAB)
}

export const addPx = x => x + 'px'

export function getDeltaX (startX$, moveX$) {
  return startX$.flatMapLatest(start =>
    moveX$.map(R.subtract(R.__, start))
  )
}

export function multiply$ (a$, b$) {
  return a$.combineLatest(b$, R.multiply)
}

export function getTranslateX ({
  startX$,
  moveX$,
  endX$,
  threshold = SWIPE_THRESHOLD,
  width$,
  tab$,
  cardCount$
}) {
  const currentX$ = multiply$(tab$, width$)
  const minX$ = multiply$(cardCount$.map(R.dec), width$).map(R.negate)
  const swipeEnded$ = O.zip(startX$, endX$, R.subtract)
    .withLatestFrom(width$, (delta, width) =>
      getDirection(threshold, delta) * width
    )
    .withLatestFrom(currentX$, R.subtract)

  const swipeHappening$ = getDeltaX(startX$, moveX$)
    .withLatestFrom(currentX$, R.subtract)
    .withLatestFrom(minX$)
    .filter(([x, min]) => x <= 0 && x >= min)
    .map(R.head)

  return O.merge(swipeHappening$, swipeEnded$)
}
