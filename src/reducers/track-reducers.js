/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import R from 'ramda'

const initialState = {track: {selected: null}}
export default (state = initialState, {type, track}) => {
  switch (type) {
    case 'SELECT_TRACK':
      return R.assoc('selected', track, state)
    default :
      return state
  }
}
