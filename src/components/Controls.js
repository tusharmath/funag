/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable, Subject} from 'rx'
import {div} from '@cycle/dom'
import ControlLarge from './ControlLarge'
import ControlMini from './ControlMini'
import * as A from './Animate'

export const RxProxy = () => {
  const sub = new Subject()
  const _sub = sub.asObservable()
  _sub.merge = src => src.multicast(sub).refCount()
  return _sub
}

export default ({audio$, selectedTrack$, DOM}) => {
  const proxy = RxProxy()
  const state$ = proxy.startWith({mini: 2, large: 2})
  const timeupdate$ = audio$
    .filter(({event}) => event === 'timeUpdate')
  const completion$ = Observable.merge(audio$
    .filter(({event}) => event === 'timeUpdate')
    .pluck('audio')
    .throttle(1000)
    .map(x => x.currentTime / x.duration),
    audio$
      .filter(({event}) => event === 'ended')
      .map(1),
    selectedTrack$.map(0)
  ).startWith(0)
  const mini = ControlMini({audio$, selectedTrack$, DOM, completion$, state$: state$.pluck('mini')})
  const large = ControlLarge({audio$, selectedTrack$, DOM, completion$, timeupdate$, state$: state$.pluck('large')})
  const _state$ = proxy.merge(state({mini, large}))
  return {
    audio$: Observable.merge(mini.audio$, large.audio$),
    DOM: Observable.combineLatest(mini.DOM$, large.DOM$).map(x => div(x)).withLatestFrom(_state$.startWith(null), (a, b) => a),
    event$: Observable.merge(mini.event$, large.event$)
  }
}

export const state = ({mini, large}) => {
  const miniLarge$ = Observable.merge(mini.click$.map('MINI'), large.click$.map('LARGE'))
  const miniStatus$ = A.visibility({isVisible$: miniLarge$.map(x => x === 'LARGE'), animationEnd$: mini.animationEnd$})
  const largeStatus$ = A.visibility({isVisible$: miniLarge$.map(x => x === 'MINI'), animationEnd$: large.animationEnd$})
  return Observable.combineLatest(miniStatus$, largeStatus$).map(([mini, large]) => ({mini, large})).distinctUntilChanged()
}
