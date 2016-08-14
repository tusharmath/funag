/**
 * Created by tushar.mathur on 11/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import sign from './Sign'

const direction = R.curry((threshold, x) => Math.abs(x) >= threshold ? R.negate(sign(x)) : 0)

export default (startX, endX, maxWidth$, threshold = 0.25) => {
  return O.zip(startX, endX)
    .map(R.apply(R.subtract))
    .withLatestFrom(maxWidth$)
    .map(R.apply(R.divide))
    .map(direction(threshold))
}
