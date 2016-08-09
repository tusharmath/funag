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
export const EventStream = event => O.fromEvent(window, event)
  .map(window)
  .startWith(window)
export const ZipEventStreams = R.useWith(R.call, [R.zipObj, R.map(EventStream)])

export const EventDriver = R.curry((events, source$) => {
  source$.subscribe(([effect, event]) => {
    Effects[effect](event)
  })
  return ZipEventStreams(events, events)
}
)
