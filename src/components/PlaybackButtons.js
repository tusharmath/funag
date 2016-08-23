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
import Loader from './loader/loader'

const pickClicks = ({DOM, url$}, name) => {
  const select = R.compose(R.objOf('src'), R.nthArg(1))
  return DOM.select(name)
    .events('click').withLatestFrom(url$, select)
}
const intent = ({DOM, url$}) => {
  const audio$ = mux({
    play: pickClicks({DOM, url$}, '.ctrl-play'),
    pause: pickClicks({DOM, url$}, '.ctrl-pause')
  })
  return {audio$}
}
export default ({selectedTrack$, AUDIO, DOM}) => {
  const playPause$ = Observable.merge(
    AUDIO.events('playing').map('pause'),
    AUDIO.events('pause').map('play_arrow'),
    AUDIO.events('loadedData').map('play_arrow'),
    AUDIO.events('seeked').map('play_arrow'),
    selectedTrack$.map('play_arrow')
  ).map(button =>
    div(`.ctrl-${button}`, {style: S.block(T.BlockHeight)}, [S.fa(button)])
  )
  const loadStart$ = AUDIO.events('loadStart').startWith(null).map(Loader)
  const loadError$ = AUDIO.events('error').map(
    div({style: S.block(T.BlockHeight)}, [S.fa('error_outline')])
  )
  const url$ = selectedTrack$.map(SC.trackStreamURL)
  const actions = intent({DOM, url$})
  return {
    ...actions,
    DOM: Observable.merge(playPause$, loadStart$, loadError$)
      .map(x => div([x]))
  }
}
