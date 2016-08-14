/**
 * Created by tushar.mathur on 11/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import SlideDirection from './SlideDirection'

export const createParams = R.curry((animate, x) => ({animate, x}))
export const animatedX = createParams(true)
export const unAnimatedX = createParams(false)
export const delta = source$ => source$.bufferWithCount(2, 1)
  .map(R.apply(R.flip(R.subtract)))
export const multiply = (a, b) => O.combineLatest(a, b, R.multiply)
export const createMovableSection = (startX, moveX, endX, width$, threshold) => {
  const direction$ = SlideDirection(startX, endX, width$, threshold)

  const drop$ = multiply(direction$.scan(R.add, 0), width$)
  const deltaX = () => delta(moveX)
  const translateX = start => {
    return startX.flatMapLatest(deltaX).scan(R.add, start)
  }
  const drag$ = drop$.startWith(0).flatMapLatest(translateX)
  return O.merge(
    drag$.map(unAnimatedX),
    drop$.map(animatedX)
  )
}
