/**
 * Created by tushar.mathur on 10/08/16.
 */

'use strict'

import R from 'ramda'
import {Observable as O} from 'rx'
import css from './movable-section.style'
import {createMovableSection} from '../../lib/MovableSection'
import Touches from '../../lib/Touches'
import RootDimensions from '../../lib/RootDimensions'
import {PREVENT_DEFAULT} from '../../drivers/eventSink'
import addPX from '../../lib/AddPX'
import RAFThrottle from '../../lib/RAFThrottle'

export const screenWidth = (dom) => {
  return RootDimensions(dom).pluck('width')
}
export const toStyle = movement$ => {
  const createSTYLE = ({x, animate}) => ({
    transform: `translateX(${addPX(x)})`,
    transition: animate ? 'transform 100ms ease-in' : null
  })
  return movement$.map(createSTYLE)
}
const view = ({count, content, transform$, sectionWidth$}) => O
  .combineLatest(
    sectionWidth$.map(R.objOf('width')).startWith({width: `${100 * count}%`}),
    transform$.map(R.objOf('forced'))
  )
  .map(([width, transform]) =>
    <div className={css(css.movableSection, 'movable-section', 'fade-in')}
         style={width}>
      <div style={transform} className='box'>
        {content}
      </div>
    </div>
  )
export default ({DOM, count, content}) => {
  const element = DOM.select('.movable-section')
  const {startX, moveX, endX, move} = Touches(element)
  const width$ = screenWidth(DOM)
  const transform$ = toStyle(createMovableSection(
    startX, RAFThrottle(moveX), endX, width$
  ))
  const sectionWidth$ = width$.map(R.compose(addPX, R.multiply(count)))
  const vTree$ = view({count, content, transform$, sectionWidth$})
  return {DOM: vTree$, EVENTS: PREVENT_DEFAULT(move)}
}
