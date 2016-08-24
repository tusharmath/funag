/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import R from 'ramda'
import {TOUCH_END, TOUCH_START} from './actions'

const initialState = {selected: null, filter: '', data: []}
export default (state = initialState, {type}) => {
  switch (type) {
    case TOUCH_START:
      return R.assoc('touchStarted', true, state)
    case TOUCH_END:
      return R.assoc('touchEnd', true, state)
    default :
      return state
  }
}
