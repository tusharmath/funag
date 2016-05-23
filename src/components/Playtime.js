/**
 * Created by imamudin.naseem on 19/05/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import * as F from '../utils/Flexbox'
import * as S from '../utils/SoundCloud'
import * as T from '../utils/Themes'

const view = ({selectedTrack$, timeupdate$}) => {
  return Observable.combineLatest(selectedTrack$, timeupdate$.startWith({audio: {currentTime: 0}}).throttle(500))
    .map(([selected, audio]) =>
      div({
        style: {
          ...F.RowSpaceBetween,
          padding: '5px',
          fontSize: '0.8em',
          fontWeight: '100'
        }
      }, [div(S.durationFormat(audio.audio.currentTime * 1000)), div(S.durationFormat(selected.duration))])
    )
}

export default sources => {
  return {
    DOM: view(sources)
  }
}
