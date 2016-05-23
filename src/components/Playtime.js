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
  return Observable.combineLatest(show$, timeupdate$.throttle(500).startWith({currentTime: 0}), (a, b) => b)
    .withLatestFrom(selectedTrack$)
    .map(([audio, selected]) =>
      div({
        style: {
          ...F.RowSpaceBetween,
          padding: '5px',
          fontSize: '0.8em',
          fontWeight: '100',
          color: T.font.secondary
        }
      }, [div(S.durationFormat(audio.currentTime, 'sec')), div(S.durationFormat(selected.duration))])
    )
}

export default sources => {
  return {
    DOM: view(sources)
  }
}

