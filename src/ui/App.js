/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {Observable} from 'rx'
import {div} from '@cycle/dom'
import Controls from './controls'
import Playlist from './playlist'
import SearchBox from './search/index'
import * as F from '../Utils/Flexbox'
import * as SC from '../Utils/SoundCloud'

export default function ({DOM, route, audio}) {
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
    DOM: Observable.combineLatest(
      playlist.DOM.map(view => div({style: {flexGrow: 1, overflow: 'auto'}}, [view])),
      searchBox.DOM,
      controls.DOM
    ).map(views =>
      div({style: {height: '100%', paddingTop: '51px', ...F.ColSpaceBetween}}, views)
    )
  }
}
