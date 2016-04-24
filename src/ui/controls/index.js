/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Scrobber from './Scrobber'
import Playback from './Playback'

export default () => {
  const completion$ = Observable.interval(500).map(x => x % 100 / 100).startWith(0)
  return {
    DOM: Observable.combineLatest(
      Scrobber({completion$}).DOM,
      Playback().DOM
    ).map(views => div(views))
  }
}
