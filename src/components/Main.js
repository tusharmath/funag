/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import {div} from '@cycle/dom'
import R from 'ramda'
import {mux} from 'muxer'
import Controls from './Controls'
import Playlist from './Playlist'
import SearchBox from './Search'
import BatchDOM from '../lib/BatchDOM'
import proxy from '../lib/RxProxy'
import * as F from '../lib/Flexbox'
import * as SC from '../lib/SoundCloud'

// TODO: Use muxer
const getAudio$ = audio => {
  const t = event => audio => ({event, audio})
  return O.merge(
    audio.events('loadeddata').map(t('loadedData')),
    audio.events('seeked').map(t('seeked')),
    audio.events('pause').map(t('pause')),
    audio.events('ended').map(t('ended')),
    audio.events('playing').map(t('playing')),
    audio.events('playing')
      .flatMapLatest(() => audio.events('timeupdate').first())
      .map(t('reallyPlaying')),
    O.merge(audio.events('loadstart'), audio.events('seeking'))
      .map(t('loadStart')),
    audio.events('error').map(t('error')),
    audio.events('timeupdate').map(t('timeUpdate'))
  )
}

const view = ({playlist, searchBox, controls}) => O
  .combineLatest(
    searchBox.DOM,
    playlist.DOM,
    controls.DOM
  ).map(views => div({style: {height: '100%', ...F.FlexCol}}, views))

// TODO: Split into intent + model
const model = ({DOM, route, AUDIO, HTTP}) => {
  // TODO: Pass HTTP.share()
  const audio$ = getAudio$(AUDIO)
  const searchBox = SearchBox({DOM, route, HTTP})
  const tracks$ = searchBox.tracks$
  const __selectedTrack$ = proxy()
  const playlist = Playlist({
    tracks$,
    DOM,
    audio$,
    selectedTrack$: __selectedTrack$
  })
  const selectedTrack$ = __selectedTrack$.merge(
    (playlist.selectedTrack$),
    tracks$.first().map(R.head)
  ).distinctUntilChanged()
  const controls = Controls({audio$, selectedTrack$, DOM})
  const audioOut$ = mux({
    load: selectedTrack$
      .map(SC.trackStreamURL)
      .map(R.objOf('src'))
  })
  return {
    HTTP: searchBox.HTTP.map(params => ({
      ...params,
      accept: 'application/json'
    })),
    title: selectedTrack$.pluck('title'),
    events: searchBox.events$,
    AUDIO: O.merge(playlist.audio$, controls.audio$, audioOut$),
    playlist, searchBox, controls
  }
}

export default function (sources) {
  const m = model(sources)
  return {
    HTTP: m.HTTP,
    title: m.title,
    events: m.events,
    AUDIO: m.AUDIO,
    DOM: BatchDOM(view(m))
  }
}
