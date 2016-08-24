/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import Controls from '../controls/controls'
import Playlist from '../playlist/playlist'
import SearchBox from '../search/search'
import css from './main.style'
import {SELECT_TRACK} from '../../redux-lib/actions'

const view = ({playlist, searchBox, controls}) => O
  .combineLatest(searchBox.DOM, playlist.DOM, controls.DOM)
  .map(views => <div className={css(css.main, 'flb col')}>{views}</div>)

const store = ({STORE, playlist, searchBox, controls}) => {
  return O.merge(
    searchBox.STORE,
    playlist.STORE,
    controls.STORE,
    STORE.select('track.data').map(R.head).take(1).map(SELECT_TRACK)
  )
}
const title = (STORE) => {
  return STORE.select('track.selected')
    .filter(Boolean)
    .pluck('title')
}
const audio = ({playlist, controls}) => {
  return O.merge(playlist.AUDIO, controls.AUDIO)
}

export default function (sources) {
  const searchBox = SearchBox(sources)
  const controls = Controls(sources)
  const playlist = Playlist(sources)
  return {
    HTTP: searchBox.HTTP.map(R.merge({accept: 'application/json'})),
    title: title(sources.STORE),
    EVENTS: searchBox.EVENTS,
    AUDIO: audio({playlist, controls}),
    DOM: view({playlist, searchBox, controls}),
    STORE: store({STORE: sources.STORE, playlist, searchBox, controls})
  }
}
