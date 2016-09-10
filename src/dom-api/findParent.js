/**
 * Created by tushar.mathur on 10/09/16.
 */

'use strict'

export default function (predicate, node) {
  while (node.parentElement) {
    if (predicate(node)) return node
    node = node.parentElement
  }
  return null
}
