/**
 * Created by tushar.mathur on 26/08/16.
 */

'use strict'

import R from 'ramda'
import view from './sliding-tab.view'
import {SET_TAB} from '../../redux-lib/actions'

const getNavClicks = DOM => {
  return DOM.select('.nav-items li').events('click')
    .pluck('target', 'attributes', 'id', 'value')
    .map(Number)
}
const intent = ({DOM}) => {
  const STORE = getNavClicks(DOM).map(SET_TAB)
  return {STORE}
}

export default (params) => {
  return R.merge(intent(params), {DOM: view(params)})
}
