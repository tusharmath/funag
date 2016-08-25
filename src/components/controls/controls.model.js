/**
 * Created by tushar.mathur on 26/08/16.
 */

'use strict'

import {Observable as O} from 'rx'

export const screenReduced = (EVENTS) => {
  const windowHeight$ = EVENTS.select('resize').pluck('innerHeight')
  return windowHeight$.withLatestFrom(windowHeight$.first())
    .map(([final, initial]) => final > 0.9 * initial).startWith(true)
}

export const completion = ({AUDIO, STORE}) => {
  return O.merge(
    AUDIO.events('timeUpdate').map(x => x.currentTime / x.duration),
    AUDIO.events('ended').map(1),
    STORE.select('track.selected').filter(Boolean).map(0)
  )
}
