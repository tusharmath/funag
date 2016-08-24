/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import R from 'ramda'
import {SELECT_TRACK, CLEAR_FILTER, APPLY_FILTER, SET_TRACKS} from './actions'

const initialState = {selected: null, filter: '', data: []}
export default (state = initialState, {type, params}) => {
  switch (type) {
    case SELECT_TRACK:
      return R.assoc('selected', params, state)
    case APPLY_FILTER:
      return R.assoc('filter', params, state)
    case CLEAR_FILTER:
      return R.assoc('filter', '', state)
    case SET_TRACKS:
      return R.assoc('data', params, state)
    default :
      return state
  }
}
