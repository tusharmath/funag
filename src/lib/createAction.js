/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import R from 'ramda'

export default R.curry((type, params) => R.merge({type}, params))
