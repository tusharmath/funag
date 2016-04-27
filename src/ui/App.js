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

  const playStreamURL$ = playlist.play$
    .withLatestFrom(tracks$, (id, tracks) => tracks.filter(x => x.id === id)[0])
    .pluck('stream_url')
    .map(src => ({type: 'LOAD', src: src + SC.clientIDParams({})}))

  return {
    audio: playStreamURL$,
    DOM: Observable.combineLatest(
      searchBox.DOM,
      playlist.DOM.map(view => div({style: {flexGrow: 1, overflow: 'auto'}}, [view])),
      Controls({audio}).DOM
    ).map(views =>
      div({style: {height: '100%', ...F.ColSpaceBetween}}, views)
    )
  }
}
