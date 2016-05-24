/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import ControlLarge from './ControlLarge'
import ControlMini from './ControlMini'

export default ({audio$, selectedTrack$, DOM, MODEL}) => {
  const control$ = MODEL
    .value$
    .pluck('control')
  const timeupdate$ = audio$
    .filter(({event}) => event === 'timeUpdate')
  const completion$ = Observable.merge(audio$
    .filter(({event}) => event === 'timeUpdate')
    .pluck('audio')
    .throttle(1000)
    .map(x => x.currentTime / x.duration),
    audio$
      .filter(({event}) => event === 'ended')
      .map(1)
  ).startWith(0)
  const mini = ControlMini({audio$, selectedTrack$, DOM, completion$})
  const large = ControlLarge({audio$, selectedTrack$, DOM, completion$, timeupdate$, show$: control$.map(x => x === 'LARGE')})

  return {
    audio$: Observable.merge(mini.audio$, large.audio$),
    DOM: Observable.combineLatest(mini.DOM$, large.DOM$).map(x => div(x)),
    event$: Observable.merge(mini.event$, large.event$),
    control$: Observable.merge(mini.click$.map('LARGE'), large.click$.map('MINI')).startWith('MINI')
  }
}

