/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

import R from 'ramda'
export default function (node) {
  node.__content.style.display = ''
  R.forEach(
    i => {
      const left = getComputedStyle(i).left
      i.animate([
        {transform: 'translateY(105%)', left},
        {transform: 'translateY(0)', left}
      ], node.duration)
    },
    node.children
  )
}
