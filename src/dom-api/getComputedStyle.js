/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

/* global getComputedStyle */

export default function (node) {
  if (!node.__computedStyle) {
    node.__computedStyle = {}
    Object.assign(node.__computedStyle, getComputedStyle(node))
  }
  return node.__computedStyle
}
