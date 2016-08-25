/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import R from 'ramda'
import {SHOW_SEARCH, HIDE_SEARCH} from './actions'

const initialState = {showSearchBox: false}
export default (state = initialState, {type}) => {
  switch (type) {
    case SHOW_SEARCH:
      return R.assoc('showSearch', true, state)
    case HIDE_SEARCH:
      return R.assoc('showSearch', false, state)
    default :
      return state
  }
}
