/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import R from 'ramda'
import css from './swipeable-card.style'
import getClientX from '../../dom-api/getClientX'

export const selectedTab = ({STORE}) => {
  return STORE.select('view.selectedTab')
}

export const getTouches = ({DOM}) => {
  const element = DOM.select(`.${css.swipeableCardContainer}`)
  const start$ = element.events('touchstart')
  const end$ = element.events('touchend')
  const move$ = element.events('touchmove')
  return {start$, end$, move$}
}

export const translateX = ({touches}) => {
  const {move$} = touches
  return move$.map(R.compose(x => x + 'px', getClientX))
}

export default (sources) => {
  const tab$ = selectedTab(sources)
  const translateX$ = translateX(sources)
  return R.merge(sources, {tab$, translateX$})
}
