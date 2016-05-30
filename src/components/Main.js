/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import {div} from '@cycle/dom'
import Controls from './Controls'
import Playlist from './Playlist'
import SearchBox from './Search'
import BatchDOM from '../utils/BatchDOM'
import RxProxy from '../utils/RxProxy'

const getAudio$ = audio => {
  const t = event => audio => ({event, audio})
  return O.merge(
    audio.events('pause').map(t('pause')),
    audio.events('ended').map(t('ended')),
    audio.events('playing').map(t('playing')),
    audio.events('playing')
      .flatMapLatest(() => audio.events('timeupdate').first())
      .map(t('reallyPlaying')),
    audio.events('loadstart').map(t('loadStart')),
    audio.events('error').map(t('error')),
    audio.events('timeupdate').map(t('timeUpdate'))
  )
}

const view = ({playlist, searchBox, controls}) => O
  .combineLatest(
    playlist.DOM,
    searchBox.DOM,
    controls.DOM
  ).map(views => div(views))

// TODO: Split into intent + model
const model = ({DOM, route, audio, HTTP}) => {
  const __selectedTrack$ = RxProxy()
  // TODO: Pass HTTP.share()
  const audio$ = getAudio$(audio)
  const searchBox = SearchBox({DOM, route, HTTP})
  const tracks$ = searchBox.tracks$
  const playlist = Playlist({tracks$, DOM, audio$, selectedTrack$: __selectedTrack$})
  const selectedTrack$ = __selectedTrack$.merge(playlist.selectedTrack$)
  const controls = Controls({audio$, selectedTrack$, DOM})
  return {
    HTTP: searchBox.HTTP.map(params => ({...params, accept: 'application/json'})),
    title: selectedTrack$.pluck('title'),
    audio: O.merge(playlist.audio$, controls.audio$),
    events: O.merge(searchBox.events$, controls.event$),
    playlist, searchBox, controls
  }
}

export default function (sources) {
  const m = model(sources)
  return {
    HTTP: m.HTTP,
    title: m.title,
    events: m.events,
    audio: m.audio,
    DOM: BatchDOM(view(m))
  }
}
