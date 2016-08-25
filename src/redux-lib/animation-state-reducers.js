/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import R from 'ramda'
import {TOUCH_END, TOUCH_START} from './actions'

const initialState = {touchStarted: false}
export default (state = initialState, {type}) => {
  switch (type) {
    case TOUCH_START:
      return R.assoc('touchStarted', true, state)
    case TOUCH_END:
      return R.assoc('touchStarted', false, state)
    default :
      return state
  }
}