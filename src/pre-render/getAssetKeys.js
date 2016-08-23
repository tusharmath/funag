/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import R from 'ramda'
export default R.compose(R.keys, R.prop('assets'))
