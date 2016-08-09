/**
 * Created by tushar.mathur on 02/05/16.
 */

'use strict'

import R from 'ramda'
import {Observable as O} from 'rx'

export const EventType = R.curry((effect, event) => [effect, event])
export const Effects = [
  ev => ev.preventDefault(),
  ev => ev.stopPropagation(),
  ev => ev.blur()
]
export const PREVENT_DEFAULT = EventType(0)
export const STOP_PROPAGATION = EventType(1)
export const BLUR = EventType(2)
export const eventDriver = source$ => {
  source$.subscribe(([effect, event]) => {
    Effects[effect](event)
  })
  return O.fromEvent(window, 'resize')
    .map(R.compose(R.pickAll(['innerHeight', 'innerWidth']), R.prop('target')))
}
