/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {div, i, small} from '@cycle/dom'
import {Observable} from 'rx'
import PlaybackInfo from './PlaybackInfo'
import PlaybackButtons from './PlaybackButtons'

export default ({selectedTrack$, audio, DOM}) => {
  const playbackButtons = PlaybackButtons({audio, DOM})
  return {
    play$: playbackButtons.$play,
    DOM: Observable
      .combineLatest(
        PlaybackInfo({selectedTrack$}).DOM,
        playbackButtons.DOM
      )
      .map(views => div({style: {padding: '6px'}}, views))
  }
}
