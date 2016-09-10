/**
 * Created by tushar.mathur on 10/09/16.
 */

'use strict'

import R from 'ramda'
/* global Event */

export default function createCustomEvent (options, create, type) {
  class BaseEvent extends Event {
    constructor (...t) {
      super(type, options)
      create.call(this, ...t)
    }
  }
  return {
    type,
    of (...t) {
      return new BaseEvent(...t)
    },
    is (ev) {
      return ev instanceof BaseEvent
    }
  }
}

export const createWCEvent = R.partial(createCustomEvent, [
  {bubbles: true},
  function (params) { this.funagEventParams = params }
])
