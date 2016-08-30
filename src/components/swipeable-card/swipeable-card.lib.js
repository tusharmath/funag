/**
 * Created by tushar.mathur on 30/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import getClientX from '../../dom-api/getClientX'
import {SET_TAB} from '../../redux-lib/actions'

export const selectedTab = ({STORE}) => {
  return STORE.select('view.selectedTab')
}

export const getDirection = delta =>
  Math.abs(delta) > 25 ? delta > 0 ? 1 : -1 : 0

export const changeTab = ({touches, STORE}) => {
  const {start$, end$} = touches
  return O.zip(start$.map(getClientX), end$.map(getClientX),
    R.compose(getDirection, R.subtract)
  ).withLatestFrom(selectedTab({STORE}), R.add)
    .map(SET_TAB)
}

export const getCurrentX = ({tab$, width$}) => {
  return tab$.withLatestFrom(width$, R.multiply).map(R.negate)
}

export const addPx = x => x + 'px'

export const getMovingX = ({start$, move$, currentX$}) => {
  return start$.map(getClientX).flatMapLatest(
    (start) => move$
      .map(R.compose(R.subtract(R.__, start), getClientX))
      .withLatestFrom(currentX$, R.add)
  )
}
