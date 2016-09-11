/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

export default (node) => {
  while (node.parentNode !== null) {
    node = node.parentNode
  }
  return node
}
