/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

import R from 'ramda'
import attachFinished from './attach-finished'
import getComputedStyle from '../../dom-api/getComputedStyle'

export default R.curry(function (config, node) {
  return getComputedStyle(node).then(function ({left}) {
    return attachFinished(
      node.animate([
        {transform: 'translateY(0)', left},
        {transform: 'translateY(105%)', left}
      ], config.duration)
    )
  })
})
