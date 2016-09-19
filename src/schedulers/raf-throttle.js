/**
 * Created by tushar.mathur on 19/09/16.
 */

'use strict'

/* global requestAnimationFrame */

export default function (func) {
  var __args
  var queue

  function flush () {
    func.apply(null, __args)
    queue = null
  }

  return function (...args) {
    __args = args
    if (!queue) queue = requestAnimationFrame(flush)
  }
}
