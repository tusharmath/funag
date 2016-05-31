/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {div} from 'cycle-snabbdom'
import {Observable} from 'rx'
import PlaybackInfo from './PlaybackInfo'
import PlaybackButtons from './PlaybackButtons'
import * as F from '../utils/Flexbox'

export default ({selectedTrack$, audio$, DOM}) => {
  const playbackButtons = PlaybackButtons({audio$, selectedTrack$, DOM})
  return {
    audio$: playbackButtons.audio$,
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
