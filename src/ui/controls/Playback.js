/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {div, i, small} from '@cycle/dom'
import {Observable} from 'rx'
import PlaybackInfo from './PlaybackInfo'
import PlaybackButtons from './PlaybackButtons'
import * as F from '../../Utils/Flexbox'

export default ({selectedTrack$, audio, DOM}) => {
  const playbackButtons = PlaybackButtons({audio, DOM})
  return {
    audio$: playbackButtons.audio$,
    DOM: Observable
      .combineLatest(
        playbackButtons.DOM,
        PlaybackInfo({selectedTrack$}).DOM
      )
      .map(views => div({className: 'spaced', style: {...F.RowLeft, alignItems: 'center', padding: '10px'}}, views))
  }
}
