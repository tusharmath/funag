/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable as O} from 'rx'
import Scrobber from '../scrobber/scrobber'
import Playback from '../playback/playback'
import view from './controls.view'
import {completion, screenReduced} from './controls.model'

const model = ({AUDIO, STORE, EVENTS}) => {
  const completion$ = completion({AUDIO, STORE})
  const show$ = screenReduced(EVENTS)
  return {completion$, show$}
}

export default (sources) => {
  const {completion$, show$} = model(sources)
  const playback = Playback(sources)
  const scrobber = Scrobber({completion$, ...sources})
  return {
    AUDIO: O.merge(playback.AUDIO, scrobber.AUDIO),
    DOM: view({playback, scrobber, show$}),
    STORE: scrobber.STORE
  }
}
