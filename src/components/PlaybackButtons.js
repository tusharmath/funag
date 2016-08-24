/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import R from 'ramda'
import {mux} from 'muxer'
import * as SC from '../lib/SoundCloud'
import Loader from './loader/loader'
import uuid from '../lib/uuid'

const pickClicks = ({DOM, url$}, name) => {
  const select = R.compose(R.objOf('src'), R.nthArg(1))
  return DOM.select(name)
    .events('click').withLatestFrom(url$, select)
}
const intent = ({DOM, url$}) => {
  const audio$ = mux({
    play: pickClicks({DOM, url$}, 'x-icon-button[icon="play_arrow"]'),
    pause: pickClicks({DOM, url$}, 'x-icon-button[icon="pause"]')
  })
  return {audio$}
}
export default ({selectedTrack$, AUDIO, DOM}) => {
  const playPause$ = Observable.merge(
    AUDIO.events('playing').map(
      <x-icon-button key={uuid()} attrs-icon='pause'/>
    ),
    AUDIO.events('pause').map(
      <x-icon-button key={uuid()} attrs-icon='play_arrow'/>
    ),
    AUDIO.events('loadedData').map(
      <x-icon-button key={uuid()} attrs-icon='play_arrow'/>
    ),
    AUDIO.events('seeked').map(
      <x-icon-button key={uuid()} attrs-icon='play_arrow'/>
    ),
    selectedTrack$.map(
      <x-icon-button key={uuid()} attrs-icon='play_arrow'/>
    )
  )
  const loadStart$ = AUDIO.events('loadStart').startWith(null).map(Loader)
  const loadError$ = AUDIO.events('error').map(
    <x-icon-button attrs-icon='error_outline'/>
  )
  const url$ = selectedTrack$.map(SC.trackStreamURL)
  const actions = intent({DOM, url$})
  return {
    ...actions,
    DOM: Observable.merge(playPause$, loadStart$, loadError$)
      .map(x => div([x]))
  }
}
