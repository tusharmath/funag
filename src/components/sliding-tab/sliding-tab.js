/**
 * Created by tushar.mathur on 26/08/16.
 */

'use strict'

import R from 'ramda'
import view from './sliding-tab.view'
import {SET_TAB, SET_HEADER_HEIGHT} from '../../redux-lib/actions'
import model from './sliding-tab.model'
import css from './sliding-tab.style'
import getElementBCR from '../../dom-api/getElementBCR'
import {Observable as O} from 'rx'

const getNavClicks = DOM => {
  return DOM.select('.nav-items li').events('click')
    .pluck('target', 'attributes', 'id', 'value')
    .map(Number)
}
const getHeaderHeight = DOM => {
  return getElementBCR(DOM, `.${css.slidingTabHeader}`).pluck('height')
}
const intent = ({DOM}) => {
  const STORE = O.merge(
    getHeaderHeight(DOM).map(SET_HEADER_HEIGHT),
    getNavClicks(DOM).map(SET_TAB)
  )
  return {STORE}
}

export default (params) => {
  return R.merge(intent(params), {DOM: view(model(params))})
}
