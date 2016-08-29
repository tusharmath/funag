/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import R from 'ramda'
import {Observable as O} from 'rx'
import css from './swipeable-card.style'
import view from './swipeable-card.view'
import model from './swipeable-card.model'
import {TOUCH_START, TOUCH_END} from '../../redux-lib/actions'
import {PREVENT_DEFAULT} from '../../drivers/eventDriver'

export const preventDefault = ({start$, end$, move$}) => {
  return O.merge(start$, end$, move$).map(PREVENT_DEFAULT)
}

export const getTouches = ({DOM}) => {
  const element = DOM.select(`.${css.swipeableCardContainer}`)
  const start$ = element.events('touchstart')
  const end$ = element.events('touchend')
  const move$ = element.events('touchmove')
  return {start$, end$, move$}
}

export const getStore = (touches) => {
  const {start$, end$} = touches
  return O.merge(
    start$.map(TOUCH_START),
    end$.map(TOUCH_END)
  )
}

export default (sources) => {
  const touches = getTouches(sources)
  return {
    DOM: view(model(R.merge(sources, {touches}))),
    STORE: getStore(touches),
    EVENT: preventDefault(touches)
  }
}
