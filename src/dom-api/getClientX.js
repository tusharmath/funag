/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import R from 'ramda'

// TODO: DEPRECATE
export default R.compose(
  R.prop('clientX'),
  R.nth(0),
  R.prop('changedTouches')
)
