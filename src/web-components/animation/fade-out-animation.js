/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

import R from 'ramda'
import attachFinished from './attach-finished'
import getComputedStyle from '../../dom-api/getComputedStyle'

export default R.curry(function (config, node) {
  const left = getComputedStyle(node).left
  return attachFinished(
    node.animate([
      {opacity: 1, left},
      {opacity: 0, left}
    ], config.duration)
  )
})

