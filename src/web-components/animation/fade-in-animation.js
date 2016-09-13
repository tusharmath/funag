/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

import R from 'ramda'

export default function (node) {
  node.__content.style.display = ''
  R.forEach(
    i => i.animate([
      {opacity: 0, left: getComputedStyle(i).left},
      {opacity: 1, left: getComputedStyle(i).left}
    ], node.duration),
    node.children
  )
}
