/**
 * Created by tushar.mathur on 10/09/16.
 */

'use strict'

import R from 'ramda'
/* global CustomEvent */

export function CustomEventType (options, type) {
  return {
    type,
    toString () {
      return type
    },
    of (detail) {
      return new CustomEvent(type, Object.assign({detail}, options))
    }
  }
}

export const BubblingEventType = R.partial(CustomEventType, [
  {bubbles: true}
])
