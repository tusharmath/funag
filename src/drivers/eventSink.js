/**
 * Created by tushar.mathur on 02/05/16.
 */

'use strict'

import R from 'ramda'

export const EventType = R.curry((effect, event) => [effect, event])
export const Effects = [
  ev => ev.preventDefault(),
  ev => ev.stopPropagation(),
  ev => ev.blur()
]
export const PREVENT_DEFAULT = EventType(0)
export const STOP_PROPAGATION = EventType(1)
export const BLUR = EventType(2)
export const eventSinkDriver = source$ => {
  source$.subscribe(([effect, event]) => {
    Effects[effect](event)
  })
}
