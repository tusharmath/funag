/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

import R from 'ramda'

export default function (node) {
  R.forEach(
    i => {
      const left = getComputedStyle(i).left
      const animation = i.animate([
        {transform: 'translateY(0)', left},
        {transform: 'translateY(105%)', left}
      ], node.duration)
      animation.onfinish = () => {
        node.__content.style.display = 'none'
      }
    },
    node.children
  )
}
