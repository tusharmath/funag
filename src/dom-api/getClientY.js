/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import R from 'ramda'

export default R.compose(
  R.prop('clientY'),
  R.nth(0),
  R.prop('changedTouches')
)
