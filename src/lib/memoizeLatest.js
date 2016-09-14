/**
 * Created by tushar.mathur on 14/09/16.
 */

'use strict'

import R from 'ramda'

export default function (func) {
  let lastArgs
  let lastResult
  return function () {
    const args = R.toString(arguments)
    if (lastArgs === args) {
      return lastResult
    }
    lastArgs = args
    lastResult = func.apply(this, arguments)
    return lastResult
  }
}
