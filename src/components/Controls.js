/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './Scrobber'
import Playback from './Playback'
import * as S from '../utils/StyleUtils'

const ControlSTY = show => ({
  ...S.fixed({bottom: 0, left: 0, right: 0}),
  transform: show ? 'translateY(0%)' : 'translateY(105%)',
  transition: 'transform 300ms cubic-bezier(0.2, 0.9, 0.3, 1.5)'
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
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
            backgroundColor: 'rgb(246, 246, 246)'
          }
        }, [scrobber, playback])])
    )
}

const model = ({audio, selectedTrack$}) => {
  const completion$ = Observable.merge(audio
    .events('timeupdate')
    .throttle(1000)
    .map(x => x.currentTime / x.duration),
    audio
      .events('ended')
      .map(1)
  ).startWith(0)
  const showControls$ = selectedTrack$.map(Boolean).startWith(false)
  return {completion$, showControls$}
}

export default ({audio, selectedTrack$, DOM}) => {
  const {completion$, showControls$} = model({audio, selectedTrack$})
  const playback = Playback({selectedTrack$, audio, DOM})
  const scrobber = Scrobber({completion$})
  return {
    audio$: playback.audio$,
    DOM: view({playback, scrobber, showControls$})
  }
}
