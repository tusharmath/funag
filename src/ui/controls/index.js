/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './Scrobber'
import Playback from './Playback'

export default ({audio, selectedTrack$, DOM}) => {
  const completion$ = audio.events('timeupdate').map(x => x.currentTime / x.duration).startWith(0)
  const playback = Playback({selectedTrack$, audio, DOM})
  return {
    play$: playback.play$,
    DOM: Observable.combineLatest(
      Scrobber({completion$}).DOM,
      playback.DOM
    ).map(views => div(views))
  }
}
