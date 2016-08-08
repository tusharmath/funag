/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable as O} from 'rx'
import R from 'ramda'
import Scrobber from '../scrobber/scrobber'
import Playback from '../playback/playback'
import css from './controls.style'

const view = ({playback, scrobber, show$}) => {
  const translate = R.ifElse(R.identity, R.always(css.translateUp), R.always(css.translateDown))
  return O
    .combineLatest(
      scrobber.DOM,
      playback.DOM,
      show$
    )
    .map(([scrobber, playback, show]) =>
      <div className={css(css.container, translate(show))}>
        {scrobber}
        {playback}
      </div>
    )
}

const model = ({AUDIO, selectedTrack$, resize}) => {
  const completion$ = O.merge(
    AUDIO.events('timeUpdate').map(x => x.currentTime / x.duration),
    AUDIO.events('ended').map(1),
    selectedTrack$.map(0)
  )
  const height$ = resize.pluck('innerHeight')
  const show$ = height$
    .withLatestFrom(height$.first())
    .map(([final, initial]) => final > 0.9 * initial)
    .startWith(true)
  return {completion$, show$}
}

export default ({selectedTrack$, DOM, AUDIO, resize}) => {
  const {completion$, show$} = model({AUDIO, selectedTrack$, resize})
  const playback = Playback({selectedTrack$, DOM, AUDIO})
  const scrobber = Scrobber({completion$, DOM})
  return {
    audio$: O.merge(playback.audio$, scrobber.audio$),
    DOM: view({playback, scrobber, show$})
  }
}
