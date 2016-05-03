/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Controls from './controls'
import Playlist from './playlist'
import SearchBox from './search/index'
import * as SC from '../Utils/SoundCloud'

const view = ({playlist, searchBox, controls}) => Observable
  .combineLatest(
    playlist.DOM,
    searchBox.DOM,
    controls.DOM
  ).map(views => div(views))

const model = ({DOM, route, audio}) => {
  const searchBox = SearchBox({DOM, route})
  const tracks$ = searchBox.tracks$
  const playlist = Playlist({tracks$, DOM, audio})
  const selectedTrack$ = playlist.selectedTrack$

  const playStreamURL$ = selectedTrack$.pluck('stream_url')
    .map(src => ({type: 'LOAD', src: src + SC.clientIDParams({})}))

  const controls = Controls({audio, selectedTrack$, DOM})
  return {
    title: selectedTrack$.pluck('title'),
    events: searchBox.events$,
    audio: Observable.merge(playStreamURL$, controls.audio$),
    playlist, searchBox, controls
  }
}

export default function (sources) {
  const m = model(sources)
  return {
    title: m.title,
    events: m.events,
    audio: m.audio,
    DOM: view(m)
  }
}
