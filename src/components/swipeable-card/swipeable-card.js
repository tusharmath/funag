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
import {changeTab} from './swipeable-card.lib'

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

export const getStore = (sources) => {
  const {start$, end$} = sources.touches
  return O.merge(
    start$.map(TOUCH_START),
    end$.map(TOUCH_END),
    changeTab(sources)
  )
}

export default (sources) => {
  const touches = getTouches(sources)
  const _sources = R.merge(sources, {touches})
  return {
    DOM: view(model(_sources)),
    STORE: getStore(_sources),
    EVENT: preventDefault(touches)
  }
}
