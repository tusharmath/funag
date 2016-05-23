/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './Scrobber'
import Playback from './Playback'
import * as S from '../utils/StyleUtils'
import {Pallete} from '../utils/Themes'

const ControlSTY = show => ({
  ...S.fixed({bottom: 0, left: 0, right: 0}),
  transform: show ? 'translateY(0%)' : 'translateY(105%)',
  transition: 'transform 300ms cubic-bezier(0.2, 0.9, 0.3, 1.5)',
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
        div({
          style: {
            boxShadow: Pallete.shadow
          }
        }, [scrobber, playback])])
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

export default ({audio$, selectedTrack$, DOM}) => {
  const {completion$, showControls$} = model({audio$, selectedTrack$})
  const playback = Playback({selectedTrack$, audio$, DOM})
  const scrobber = Scrobber({completion$})
  return {
    audio$: playback.audio$,
    DOM: view({playback, scrobber, showControls$})
  }
}
