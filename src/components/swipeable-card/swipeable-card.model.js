/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import R from 'ramda'
import css from './swipeable-card.style'
import {selectedTab, getTranslateX, addPx} from './swipeable-card.lib'
import getClientX from '../../dom-api/getClientX'
import getElementBCR from '../../dom-api/getElementBCR'

export const SELECTOR = `.${css.swipeableCardContainer}`

export const getCardPosition = (sources) => {
  const tab$ = selectedTab(sources)
  const cardCount$ = sources.cards$.map(R.length)
  const startX$ = sources.touches.start$.map(getClientX)
  const moveX$ = sources.touches.move$.map(getClientX)
  const endX$ = sources.touches.end$.map(getClientX)
  const width$ = getElementBCR(sources.DOM, SELECTOR).pluck('width')
  return getTranslateX({
    startX$,
    moveX$,
    endX$,
    width$,
    tab$,
    cardCount$
  }).map(addPx)
}

export default (sources) => {
  const tab$ = selectedTab(sources)
  const translateX$ = getCardPosition(sources)
  return R.merge(sources, {tab$, translateX$})
}
