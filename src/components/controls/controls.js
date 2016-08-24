/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable as O} from 'rx'
import R from 'ramda'
import Scrobber from '../scrobber/scrobber'
import Playback from '../playback/playback'
import css from './controls.style'
import BoundingClientRect from '../../lib/BoundingClientRect'

const view = ({playback, scrobber, show$, height$}) => {
  const translate = R.ifElse(
    R.identity,
    R.always(css.translateUp),
    R.always(css.translateDown)
  )
  return O
    .combineLatest(scrobber.DOM, playback.DOM, show$, height$)
    .map(([scrobber, playback, show, height]) =>
      <div className={css(css.container, translate(show), 'controls')}
           style={{height: show ? `${height}px` : null}}>
        {scrobber}
        {playback}
      </div>
    )
}

const model = ({AUDIO, STORE, EVENTS, DOM}) => {
  const height$ = DOM.select('.controls')
    .elements()
    .map(R.compose(BoundingClientRect, R.head))
    .pluck('height')
    .take(2)
    .startWith(null)
  const completion$ = O.merge(
    AUDIO.events('timeUpdate').map(x => x.currentTime / x.duration),
    AUDIO.events('ended').map(1),
    STORE.select('track.selected').filter(Boolean).map(0)
  )
  const windowHeight$ = EVENTS.select('resize').pluck('innerHeight')
  const show$ = windowHeight$
    .withLatestFrom(windowHeight$.first())
    .map(([final, initial]) => final > 0.9 * initial)
    .startWith(true)
  return {completion$, show$, height$}
}

export default ({STORE, DOM, AUDIO, EVENTS}) => {
  const {completion$, show$, height$} = model({
    AUDIO,
    STORE,
    EVENTS,
    DOM
  })
  const playback = Playback({STORE, DOM, AUDIO})
  const scrobber = Scrobber({completion$, DOM})
  return {
    AUDIO: O.merge(playback.AUDIO, scrobber.AUDIO),
    DOM: view({playback, scrobber, show$, height$}),
    STORE: scrobber.STORE
  }
}
