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
  ...S.position({bottom: 0, left: 0, right: 0}),
  position: 'fixed',
  transform: show ? 'translateY(0%)' : 'translateY(100%)',
  transition: 'transform ease-in 300ms'
})
export default ({audio, selectedTrack$, DOM}) => {
  const completion$ = audio.events('timeupdate').map(x => x.currentTime / x.duration).startWith(0)
  const playback = Playback({selectedTrack$, audio, DOM})
  return {
    audio$: playback.audio$,
    DOM: Observable
      .combineLatest(
        selectedTrack$.startWith(null),
        Scrobber({completion$}).DOM,
        playback.DOM
      )
      .map(([selected, scrobber, playback]) =>
        div({style: ControlSTY(Boolean(selected))}, [
          div({
            style: {
              boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.5)',
              backgroundColor: 'rgb(246, 246, 246)'
            }
          }, [scrobber, playback])])
      )
  }
}
