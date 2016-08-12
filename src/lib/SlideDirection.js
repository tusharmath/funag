/**
 * Created by tushar.mathur on 11/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import sign from './Sign'
import Touches from './Touches'

const direction = R.curry((threshold, x) => Math.abs(x) > threshold ? R.negate(sign(x)) : 0)

export default (el, maxWidth$, threshold = 0.5) => {
  const {startX, endX} = Touches(el)
  return O.merge(startX, endX)
    .bufferWithCount(2)
    .map(R.apply(R.subtract))
    .withLatestFrom(maxWidth$)
    .map(R.apply(R.divide))
    .map(direction(threshold))
}
