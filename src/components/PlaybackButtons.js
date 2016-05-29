/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import R from 'ramda'
import * as S from '../utils/StyleUtils'
import * as T from '../utils/Themes'
import * as SC from '../utils/SoundCloud'

export default ({selectedTrack$, audio$, DOM, AUDIO: {Play, Pause}}) => {
  const event$ = audio$.pluck('event')
  const playPause$ = Observable.merge(
    event$.filter(x => x === 'playing').map('pause'),
    event$.filter(x => x === 'pause').map('play')
  )
    .startWith('play')
    .map(button => div({className: `ctrl-${button}`, style: S.block(T.BlockHeight)}, [S.fa(button)]))

  const loadStart$ = event$.filter(x => x === 'loadStart').map(div({style: S.block(T.BlockHeight)}, [div('.loader')]))
  const loadError$ = event$.filter(x => x === 'error').map(div({style: S.block(T.BlockHeight)}, [S.fa('exclamation-triangle')]))
  const url$ = selectedTrack$.map(SC.trackStreamURL)

  return {
    DOM: Observable.merge(playPause$, loadStart$, loadError$).map(x => div(x)),
    audio$: Observable.merge(
      DOM.select('.ctrl-play').events('click').map(R.always(Play)),
      DOM.select('.ctrl-pause').events('click').map(R.always(Pause))
    ).withLatestFrom(url$, (type, src) => type(src))
  }
}
