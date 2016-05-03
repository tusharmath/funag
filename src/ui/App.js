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
import * as S from '../Utils/StyleUtils'

export default function ({DOM, route, audio}) {
  const searchBox = SearchBox({DOM, route})
  const tracks$ = SC.searchTracks(searchBox.value$.debounce(300))
  const playlist = Playlist({tracks$, DOM, audio})
  const selectedTrack$ = playlist.selectedTrack$

  const playStreamURL$ = selectedTrack$.pluck('stream_url')
    .map(src => ({type: 'LOAD', src: src + SC.clientIDParams({})}))

  const controls = Controls({audio, selectedTrack$, DOM})
  return {
    events: searchBox.events$,
    audio: Observable.merge(playStreamURL$, controls.audio$),
    DOM: Observable.combineLatest(
      playlist.DOM.map(view => div({
        style: {
          flexGrow: 1,
          overflow: 'auto',
          top: '50px',
          bottom: '50px',
          position: 'absolute'
        }
      }, [view])),
      searchBox.DOM,
      controls.DOM.map(view => div({style: S.absolute(0, null, 0, 0)}, [view]))
    ).map(views =>
      div({style: {height: '100%', ...F.ColSpaceBetween}}, views)
    )
  }
}
