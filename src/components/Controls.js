/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import ControlLarge from './ControlLarge'
import ControlMini from './ControlMini'

export default ({audio, selectedTrack$, DOM, MODEL}) => {
  const completion$ = audio.events('timeupdate').map(x => x.currentTime / x.duration).startWith(0)
  const bottom$ = MODEL
    .value$
    .filter(x => !x.isServer)
    .pluck('controlBottom')
  const mini = ControlMini({audio, selectedTrack$, DOM, completion$, bottom$})
  const large = ControlLarge({audio, selectedTrack$, DOM, completion$, slide$: mini.slide$})

  return {
    audio$: mini.audio$,
    DOM: Observable.combineLatest(large.DOM$, mini.DOM$).map(x => div(x)),
    event$: mini.event$
  }
}
