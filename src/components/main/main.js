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
import {SELECT_TRACK} from '../../redux-lib/app-actions'

const view = ({playlist, searchBox, controls}) => O
  .combineLatest(searchBox.DOM, playlist.DOM, controls.DOM)
  .map(views => <div className={css(css.main, 'flb col')}>{views}</div>)

const actions = ({tracks$, selectTrack$}) => {
  return O.merge(tracks$.map(R.head).take(1), selectTrack$).map(SELECT_TRACK)
}

export default function ({DOM, route, AUDIO, HTTP, EVENTS, STORE}) {
  const selectedTrack$ = STORE.select('track.selected')
  const searchBox = SearchBox({DOM, route, HTTP})
  const tracks$ = searchBox.tracks$
  const playlist = Playlist({tracks$, DOM, AUDIO, STORE})
  const controls = Controls({AUDIO, selectedTrack$, DOM, EVENTS})
  const action$ = actions({tracks$, selectTrack$: playlist.selectTrack$})
  return {
    HTTP: searchBox.HTTP.map(R.merge({accept: 'application/json'})),
    title: selectedTrack$.pluck('title'),
    EVENTS: searchBox.events$,
    AUDIO: O.merge(playlist.audio$, controls.audio$),
    DOM: view({playlist, searchBox, controls}),
    STORE: action$
  }
}
