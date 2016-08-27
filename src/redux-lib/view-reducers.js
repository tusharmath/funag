/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import R from 'ramda'
import {
  SHOW_SEARCH,
  HIDE_SEARCH,
  SET_TAB,
  SET_HEADER_HEIGHT,
  SET_CONTROL_HEIGHT
} from './actions'

const initialState = {
  showSearchBox: false,
  selectedTab: 0,
  navBarHeight: 0,
  controlHeight: 0
}
export default (state = initialState, {type, params}) => {
  switch (type) {
    case SHOW_SEARCH:
      return R.assoc('showSearch', true, state)
    case HIDE_SEARCH:
      return R.assoc('showSearch', false, state)
    case SET_TAB:
      return R.assoc('selectedTab', params, state)
    case SET_HEADER_HEIGHT:
      return R.assoc('navBarHeight', params, state)
    case SET_CONTROL_HEIGHT:
      return R.assoc('controlHeight', params, state)
    default :
      return state
  }
}
