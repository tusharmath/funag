/**
 * Created by tushar.mathur on 10/09/16.
 */

'use strict'

import R from 'ramda'
import EventTask from './EventTask'
import customEvent from '../dom-api/customEvent'

export function CustomEventType (options, type) {
  return {
    type,
    toString () {
      return type
    },
    event (detail) {
      return customEvent(type, detail, options)
    },
    of (detail) {
      return EventTask.of(this.event(detail))
    }
  }
}

export const BubblingEventType = R.partial(CustomEventType, [
  {bubbles: true}
])
