/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './Scrobber'
import Playback from './Playback'
import * as S from '../../Utils/StyleUtils'

export default ({audio, selectedTrack$, DOM}) => {
  const completion$ = audio.events('timeupdate').map(x => x.currentTime / x.duration).startWith(0)
  const playback = Playback({selectedTrack$, audio, DOM})
  return {
    audio$: playback.audio$,
    DOM: Observable.combineLatest(
      Scrobber({completion$}).DOM,
      playback.DOM
    ).map(views =>
        div({
          style: {
            boxShadow: '0px -1px 8px 1px rgba(0, 0, 0, 0.43)',
            backgroundColor: 'rgb(246, 246, 246)'
          }
        }, views))
      .map(view => div({style: S.absolute(0, null, 0, 0)}, [view]))
  }
}
