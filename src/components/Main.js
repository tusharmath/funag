/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Controls from './Controls'
import Playlist from './Playlist'
import SearchBox from './Search'
import BatchDOM from '../utils/BatchDOM'

const view = ({playlist, searchBox, controls}) => Observable
  .combineLatest(
    playlist.DOM,
    searchBox.DOM,
    controls.DOM
  ).map(views => div(views))

// TODO: Split into intent + model
const model = ({DOM, route, audio, HTTP, MODEL}) => {
  // TODO: Pass HTTP.share()

  const selectedTrack$ = MODEL
    .value$
    .filter(x => !x.isServer)
    .pluck('selectedTrack')
    .filter(Boolean)
  const searchBox = SearchBox({DOM, route, HTTP})
  const tracks$ = searchBox.tracks$
  const playlist = Playlist({tracks$, DOM, audio, selectedTrack$})
  const controls = Controls({audio, selectedTrack$, DOM})
  return {
    HTTP: searchBox.HTTP.map(params => ({...params, accept: 'application/json'})),
    title: selectedTrack$.pluck('title'),
    events: searchBox.events$,
    audio: Observable.merge(playlist.audio$, controls.audio$),
    MODEL: Observable
      .combineLatest(MODEL.value$, playlist.selectedTrack$.map(selectedTrack => ({selectedTrack})))
      .map(([canary, next]) => ({...canary, ...next})),
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
    DOM: BatchDOM(view(m)),
    MODEL: m.MODEL
  }
}
