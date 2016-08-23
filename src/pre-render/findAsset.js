/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import R from 'ramda'
import getAssetKeys from './getAssetKeys'

export default R.uncurryN(2, type =>
  R.compose(R.head, R.filter(R.contains(type)), getAssetKeys)
)
