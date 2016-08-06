/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import R from 'ramda'
import {mux} from 'muxer'
import * as S from '../lib/StyleUtils'
import * as T from '../lib/Themes'
import * as SC from '../lib/SoundCloud'

const intent = ({DOM, url$}) => {
  const select = R.compose(R.objOf('src'), R.nthArg(1))
  const audio$ = mux({
    play: DOM.select('.ctrl-play').events('click').withLatestFrom(url$, select),
    pause: DOM.select('.ctrl-pause').events('click').withLatestFrom(url$, select)
  })
  return {audio$}
}
export default ({selectedTrack$, audio$, DOM}) => {
  const event$ = audio$.pluck('event')
  const playPause$ = Observable.merge(
    event$.filter(x => x === 'playing').map('pause'),
    event$.filter(x => x === 'pause').map('play')
  )
    .startWith('play')
    .map(button => div(`.ctrl-${button}`, {style: S.block(T.BlockHeight)}, [S.fa(button)]))

  const loadStart$ = event$.filter(x => x === 'loadStart').map(div({style: S.block(T.BlockHeight)}, [div('.loader')]))
  const loadError$ = event$.filter(x => x === 'error').map(div({style: S.block(T.BlockHeight)}, [S.fa('exclamation-triangle')]))
  const url$ = selectedTrack$.map(SC.trackStreamURL)
  const actions = intent({DOM, url$})
  return {
    ...actions,
    DOM: Observable.merge(playPause$, loadStart$, loadError$).map(x => div([x]))
  }
}
