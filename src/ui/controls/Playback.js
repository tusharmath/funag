/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {div, i, small} from '@cycle/dom'
import {Observable} from 'rx'
import PlaybackInfo from './PlaybackInfo'
import PlaybackButtons from './PlaybackButtons'

export default () => {
  return {
    DOM: Observable
      .combineLatest(
        PlaybackInfo().DOM,
        PlaybackButtons().DOM
      )
      .map(views => div({style: {padding: '6px'}}, views))
  }
}
