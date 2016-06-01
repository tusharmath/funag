/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from 'cycle-snabbdom'
import Scrobber from './Scrobber'
import Playback from './Playback'
import {Pallete} from '../utils/Themes'

const ControlSTY = show => ({
  transform: 'translateZ(0)',
  boxShadow: Pallete.shadow,
  backgroundColor: Pallete.primaryColor,
  color: '#FFF'
})

const view = ({playback, scrobber, showControls$}) => {
  return Observable
    .combineLatest(
      showControls$,
      scrobber.DOM,
      playback.DOM
    )
    .map(([show, scrobber, playback]) =>
      div({style: ControlSTY(show)}, [
        scrobber, playback
      ])
    )
}

const model = ({audio$, selectedTrack$}) => {
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
  const showControls$ = selectedTrack$.map(Boolean).startWith(false)
  return {completion$, showControls$}
}

export default ({audio$, selectedTrack$, DOM, AUDIO}) => {
  const {completion$, showControls$} = model({audio$, selectedTrack$})
  const playback = Playback({selectedTrack$, audio$, DOM, AUDIO})
  const scrobber = Scrobber({completion$, DOM})
  return {
    audio$: playback.audio$,
    DOM: view({playback, scrobber, showControls$}),
    event$: scrobber.event$
  }
}
