/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import R from 'ramda'
export default R.uncurryN(2, chunk =>
  R.compose(R.head, R.path(['namedChunks', chunk, 'files']))
)
