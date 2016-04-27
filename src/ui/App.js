/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {Observable} from 'rx'
import {makeDOMDriver, div} from '@cycle/dom'
import Controls from './controls'
import Playlist from './playlist'
import SearchBox from './search/index'
import * as F from '../utils/Flexbox'
import * as SC from '../Utils/SoundCloud'

export default function ({DOM, route, audio}) {
  const searchBox = SearchBox({DOM, route})
  const tracks$ = SC.searchTracks(searchBox.value$)
  const playlist = Playlist({tracks$, DOM})
  const selectedTrack$ = SC.findTrack({id$: playlist.play$, tracks$})

  const playStreamURL$ = selectedTrack$.pluck('stream_url')
    .map(src => ({type: 'LOAD', src: src + SC.clientIDParams({})}))

  const controls = Controls({audio, selectedTrack$, DOM})
  return {
    audio: Observable.merge(playStreamURL$, controls.play$),
    DOM: Observable.combineLatest(
      searchBox.DOM,
      playlist.DOM.map(view => div({style: {flexGrow: 1, overflow: 'auto'}}, [view])),
      controls.DOM
    ).map(views =>
      div({style: {height: '100%', ...F.ColSpaceBetween}}, views)
    )
  }
}
