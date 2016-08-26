/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import R from 'ramda'
import {SHOW_SEARCH, HIDE_SEARCH, SET_TAB} from './actions'

const initialState = {showSearchBox: false, selectedTab: 0}
export default (state = initialState, {type, params}) => {
  switch (type) {
    case SHOW_SEARCH:
      return R.assoc('showSearch', true, state)
    case HIDE_SEARCH:
      return R.assoc('showSearch', false, state)
    case SET_TAB:
      return R.assoc('selectedTab', params, state)
    default :
      return state
  }
}
