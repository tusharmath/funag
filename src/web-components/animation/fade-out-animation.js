/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

import R from 'ramda'

export default function (node) {
  R.forEach(
    i => {
      const animation = i.animate([
        {opacity: 1, left: getComputedStyle(i).left},
        {opacity: 0, left: getComputedStyle(i).left}
      ], node.duration)
      animation.onfinish = () => {
        node.__content.style.display = 'none'
      }
    },
    node.children
  )
}
