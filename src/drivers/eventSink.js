/**
 * Created by tushar.mathur on 02/05/16.
 */

'use strict'

import R from 'ramda'

export const EventType = R.curry((effect, event) => [effect, event])
export const Effects = [
  ev => ev.preventDefault(),
  ev => ev.stopPropagation(),
  ev => ev.blur(),
  ev => ev.focus()
]
export const PREVENT_DEFAULT = R.map(EventType(0))
export const STOP_PROPAGATION = R.map(EventType(1))
export const BLUR = R.map(EventType(2))
export const FOCUS = R.map(EventType(3))
export const eventSinkDriver = source$ => {
  source$.subscribe(([effect, event]) => {
    Effects[effect](event)
  })
}
