/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable as O} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './scrobber/scrobber'
import Playback from './playback/playback'
import {Palette} from '../lib/Themes'

const ControlSTY = {
  transform: 'translateZ(0)',
  boxShadow: Palette.zDepth__1,
  backgroundColor: Palette.bg__control,
  color: '#FFF'
}

const view = ({playback, scrobber}) => {
  return O
    .combineLatest(
      scrobber.DOM,
      playback.DOM
    )
    .map(([scrobber, playback]) =>
      div({style: ControlSTY}, [
        scrobber, playback
      ])
    )
}

const model = ({AUDIO, selectedTrack$}) => {
  const completion$ = O.merge(
    AUDIO.events('timeUpdate').map(x => x.currentTime / x.duration),
    AUDIO.events('ended').map(1),
    selectedTrack$.map(0)
  )
  return {completion$}
}

export default ({selectedTrack$, DOM, AUDIO}) => {
  const {completion$} = model({AUDIO, selectedTrack$})
  const playback = Playback({selectedTrack$, DOM, AUDIO})
  const scrobber = Scrobber({completion$, DOM})
  return {
    audio$: O.merge(playback.audio$, scrobber.audio$),
    DOM: view({playback, scrobber})
  }
}
