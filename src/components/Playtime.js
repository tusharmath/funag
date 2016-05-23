/**
 * Created by imamudin.naseem on 19/05/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import * as F from '../utils/Flexbox'
import * as S from '../utils/SoundCloud'
import * as T from '../utils/Themes'

const view = ({selectedTrack$, timeupdate$, show$}) => {
  return Observable.combineLatest(selectedTrack$, timeupdate$.throttle(500).startWith({currentTime: 0}))
    .map(([selected, audio]) =>
      div({
        style: {
          ...F.RowSpaceBetween,
          padding: '5px',
          fontSize: '0.8em',
          fontWeight: '100',
          color: T.font.secondary
        }
      }, [div(S.durationFormat(audio.currentTime * 1000)), div(S.durationFormat(selected.duration))])
    )
}

export default sources => {
  return {
    DOM: view(sources)
  }
}
