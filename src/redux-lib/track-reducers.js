/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import R from 'ramda'
import {SELECT_TRACK, CLEAR_FILTER, APPLY_FILTER} from './actions'

const initialState = {selected: null, filter: ''}
export default (state = initialState, {type, params}) => {
  switch (type) {
    case SELECT_TRACK:
      return R.assoc('selected', params, state)
    case APPLY_FILTER:
      return R.assoc('filter', params, state)
    case CLEAR_FILTER:
      return R.assoc('filter', '', state)
    default :
      return state
  }
}
