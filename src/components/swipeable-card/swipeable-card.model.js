/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import R from 'ramda'
import {Observable as O} from 'rx'
import css from './swipeable-card.style'
import getElementBCR from '../../dom-api/getElementBCR'
import {selectedTab, getCurrentX, addPx, getMovingX} from './swipeable-card.lib'

export const SELECTOR = `.${css.swipeableCardContainer}`

export const translateX = ({touches, DOM}, tab$) => {
  const width$ = getElementBCR(DOM, SELECTOR).pluck('width')
  const currentX$ = getCurrentX({tab$, width$})
  const {move$, start$} = touches
  return O.merge(getMovingX({start$, move$, currentX$}), currentX$)
    .map(addPx)
}

export default (sources) => {
  const tab$ = selectedTab(sources)
  const translateX$ = translateX(sources, tab$)
  return R.merge(sources, {tab$, translateX$})
}
