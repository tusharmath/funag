/**
 * Created by tushar.mathur on 11/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import sign from './Sign'

const direction = x => Math.abs(x) > 0.5 ? R.negate(sign(x)) : 0

export default (el, maxWidth$, threshold = 0.5) => {
  const start$ = el.events('touchstart')
  const end$ = el.events('touchend')
  return O.merge(start$, end$)
    .bufferWithCount(2)
    .map(R.apply(R.subtract))
    .withLatestFrom(maxWidth$)
    .map(R.apply(R.divide))
    .map(direction)
    .tap(x => console.log(x))
    .filter(x => x === 0)
}
