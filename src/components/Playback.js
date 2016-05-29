/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {div} from '@cycle/dom'
import {Observable} from 'rx'
import PlaybackInfo from './PlaybackInfo'
import PlaybackButtons from './PlaybackButtons'
import * as SC from '../utils/SoundCloud'
import * as F from '../utils/Flexbox'

export default ({selectedTrack$, audio$, DOM}) => {
  const playbackButtons = PlaybackButtons({audio$, DOM})
  const url$ = selectedTrack$.map(SC.trackStreamURL)
  return {
    audio$: playbackButtons.audio$.withLatestFrom(url$, (type, src) => ({type, src})),
    DOM: Observable
      .combineLatest(
        playbackButtons.DOM,
        PlaybackInfo({selectedTrack$}).DOM
      )
      .map(views => div({
        style: {...F.RowLeft, alignItems: 'center'}
      }, views))
  }
}
