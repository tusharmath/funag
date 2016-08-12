/**
 * Created by tushar.mathur on 11/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import RootDimensions from './RootDimensions'
import Touches from './Touches'
import SlideDirection from './SlideDirection'

export const addPX = x => x + 'px'
export const toStyle = R.curry((count, width$, movement$) => {
  const createSTYLE = ([{x, animate}, width]) => ({
    width: addPX(width),
    transform: `translateX(${addPX(x)})`,
    transition: animate ? 'transform 100ms ease-in' : null
  })
  return O.combineLatest(movement$, width$.map(R.multiply(count))).map(createSTYLE)
})
export const createStyle = R.curry((animate, x) => ({animate, x}))
export const animatedX = createStyle(true)
export const unAnimatedX = createStyle(false)
export const screenWidth = (dom) => {
  return RootDimensions(dom).pluck('width')
}
export const delta = source$ => source$.bufferWithCount(2, 1).map(R.apply(R.subtract))
export const multiply = (a, b) => O.combineLatest(a, b, R.multiply)
export const createMovableSection = (DOM, element, count) => {
  const {startX, moveX} = Touches(element)
  const width$ = screenWidth(DOM, count)
  const direction$ = SlideDirection(element, width$)
  const drop$ = multiply(direction$.scan(R.add, 0), width$)

  const drag$ = drop$.startWith(0).flatMapLatest(x => {
    const deltaX = () => delta(moveX)
    return startX.flatMapLatest(deltaX).scan(R.add, -x).map(R.negate)
  })

  const movement$ = O.merge(
    drag$.map(unAnimatedX),
    drop$.map(animatedX)
  )
  return toStyle(count, width$, movement$)
}
