/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import R from 'ramda'
import {TOUCH_END, TOUCH_START, SET_HEADER_HEIGHT} from './actions'

const initialState = {touchStarted: false, navBarHeight: 0}
export default (state = initialState, {type, params}) => {
  switch (type) {
    case TOUCH_START:
      return R.assoc('touchStarted', true, state)
    case TOUCH_END:
      return R.assoc('touchStarted', false, state)
    case SET_HEADER_HEIGHT:
      return R.assoc('navBarHeight', params, state)
    default :
      return state
  }
}
