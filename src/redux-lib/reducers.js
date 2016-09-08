/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import {combineReducers} from 'redux'
import track from './track-reducers'
import view from './view-reducers'

export default combineReducers({
  track, view
})
