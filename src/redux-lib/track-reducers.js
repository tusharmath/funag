/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import R from 'ramda'
import {SELECT_TRACK, CLEAR_FILTER, APPLY_FILTER, SET_TRACKS} from './actions'

const initialState = {selected: null, filter: '', data: []}
const updateTrackData = (params, state) => {
  const state0 = R.assoc('data', params, state)
  if (state0.selected === null) {
    return R.assoc('selected', state0.data[0], state0)
  } else {
    return state0
  }
}
export default (state = initialState, {type, params}) => {
  switch (type) {
    case SELECT_TRACK:
      return R.assoc('selected', params, state)
    case APPLY_FILTER:
      return R.assoc('filter', params, state)
    case CLEAR_FILTER:
      return R.assoc('filter', '', state)
    case SET_TRACKS:
      return updateTrackData(params, state)
    default :
      return state
  }
}
