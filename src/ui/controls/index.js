/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import * as S from '../../lib/StyleUtils'
import Scroller from './Scrobber'
import Playback from './Playback'

export default () => {
  const completion$ = Observable.interval(500).take(100).map(x => x % 100 / 100).startWith(0)
  return {
    DOM: Observable.combineLatest(
      Scroller({completion$}).DOM,
      Playback().DOM
    ).map(view =>
      div({style: {...S.absolute(null, null, null, 0), width: '100%'}}, view)
    )
  }
}
