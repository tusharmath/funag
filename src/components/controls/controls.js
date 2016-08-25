/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable as O} from 'rx'
import Scrobber from '../scrobber/scrobber'
import Playback from '../playback/playback'
import css from './controls.style'

const view = ({playback, scrobber, show$}) => {
  return O
    .combineLatest(scrobber.DOM, playback.DOM, show$)
    .map(([scrobber, playback, show, height]) =>
      <div class={{[css.hide]: !show}}
           className={css(css.controlsContainer, 'controls')}>
        {scrobber}
        {playback}
      </div>
    )
}

const screenReduced = (EVENTS) => {
  const windowHeight$ = EVENTS.select('resize').pluck('innerHeight')
  return windowHeight$.withLatestFrom(windowHeight$.first())
    .map(([final, initial]) => final > 0.9 * initial).startWith(true)
}

const completion = ({AUDIO, STORE}) => {
  return O.merge(
    AUDIO.events('timeUpdate').map(x => x.currentTime / x.duration),
    AUDIO.events('ended').map(1),
    STORE.select('track.selected').filter(Boolean).map(0)
  )
}

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
