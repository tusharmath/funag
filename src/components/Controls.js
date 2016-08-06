/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable as O} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './Scrobber'
import Playback from './Playback'
import {Pallete} from '../lib/Themes'

const ControlSTY = show => ({
  transform: 'translateZ(0)',
  boxShadow: Pallete.shadow,
  backgroundColor: Pallete.primaryColor,
  color: '#FFF'
})

const view = ({playback, scrobber, showControls$}) => {
  return O
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
  const completion$ = O.merge(audio$
      .filter(({event}) => event === 'timeUpdate')
      .pluck('audio')
      .map(x => x.currentTime / x.duration),
    audio$
      .filter(({event}) => event === 'ended')
      .map(1),
    selectedTrack$.map(0)
  )
  const showControls$ = selectedTrack$.map(Boolean).startWith(false)
  return {completion$, showControls$}
}

export default ({audio$, selectedTrack$, DOM, AUDIO}) => {
  const {completion$, showControls$} = model({audio$, selectedTrack$})
  const playback = Playback({selectedTrack$, audio$, DOM, AUDIO})
  const scrobber = Scrobber({completion$, DOM})
  return {
    audio$: O.merge(playback.audio$, scrobber.audio$),
    DOM: view({playback, scrobber, showControls$})
  }
}
