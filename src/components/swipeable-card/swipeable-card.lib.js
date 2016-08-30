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

export const getDirection = (delta, threshold = SWIPE_THRESHOLD) =>
  Math.abs(delta) > threshold ? -Math.sign(delta) : 0

export const changeTab = ({touches, STORE}) => {
  const {start$, end$} = touches
  return O.zip(start$.map(getClientX), end$.map(getClientX),
    R.compose(getDirection, R.subtract)
  ).withLatestFrom(selectedTab({STORE}), R.add).map(SET_TAB)
}

export const addPx = x => x + 'px'

export const translateX = ({
  startX$,
  moveX$,
  endX$,
  threshold,
  width$,
  tab$
}) => {
  const currentX$ = tab$.combineLatest(width$, R.multiply)
  const swipeEnded$ = O.zip(startX$, endX$, R.subtract)
    .withLatestFrom(width$, (delta, width) =>
      getDirection(delta, threshold) * width
    )
  const swipeHappening$ = startX$.flatMapLatest(start =>
    moveX$.map(R.subtract(R.__, start))
  )
  return O.merge(swipeHappening$, swipeEnded$)
    .withLatestFrom(currentX$, R.subtract)
}
