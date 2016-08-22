/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import R from 'ramda'

const initialState = {selected: null, query: ''}
export default (state = initialState, {type, params}) => {
  switch (type) {
    case 'SELECT_TRACK':
      return R.assoc('selected', params, state)
    case 'APPLY_FILTER':
      return R.assoc('filter', params, state)
    default :
      return state
  }
}
