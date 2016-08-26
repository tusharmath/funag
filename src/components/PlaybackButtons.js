/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {h} from '@cycle/dom'
import {Observable} from 'rx'
import R from 'ramda'
import {mux} from 'muxer'
import * as SC from '../lib/SoundCloud'
import Loader from './loader/loader'

const pickClicks = ({DOM, url$}, name) => {
  const select = R.compose(R.objOf('src'), R.nthArg(1))
  return DOM.select(name)
    .events('click').withLatestFrom(url$, select)
}
const intent = ({DOM, url$}) => {
  const audio$ = mux({
    play: pickClicks({DOM, url$}, 'x-square-icon[icon="play_arrow"]'),
    pause: pickClicks({DOM, url$}, 'x-square-icon[icon="pause"]')
  })
  return {audio$}
}
export default ({STORE, AUDIO, DOM}) => {
  const selectedTrack$ = STORE.select('track.selected').filter(Boolean)
  const playPause$ = Observable.merge(
    AUDIO.events('playing').map(
      h('x-square-icon', {attrs: {icon: 'pause'}})
    ),
    AUDIO.events('pause').map(
      h('x-square-icon', {attrs: {icon: 'play_arrow'}})
    ),
    AUDIO.events('loadedData').map(
      h('x-square-icon', {attrs: {icon: 'play_arrow'}})
    ),
    AUDIO.events('seeked').map(
      h('x-square-icon', {attrs: {icon: 'play_arrow'}})
    ),
    selectedTrack$.map(
      h('x-square-icon', {attrs: {icon: 'play_arrow'}})
    )
  )
  const loadStart$ = AUDIO.events('loadStart').startWith(null).map(Loader)
  const loadError$ = AUDIO.events('error').map(
    h('x-square-icon', {attrs: {icon: 'error_outline'}})
  )
  const url$ = selectedTrack$.map(SC.trackStreamURL)
  return R.merge(intent({DOM, url$}), {
    DOM: Observable.merge(playPause$, loadStart$, loadError$)
      .map(x => h('div', [x]))
  })
}
