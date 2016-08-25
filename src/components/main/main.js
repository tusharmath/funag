/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import Controls from '../controls/controls'
import Playlist from '../playlist/playlist'
import {SELECT_TRACK} from '../../redux-lib/actions'
import Header from '../header/header'
import view from './main.view'

const store = ({STORE, playlist, header, controls}) => {
  return O.merge(
    header.STORE,
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
  const controls = Controls(sources)
  const playlist = Playlist(sources)
  const header = Header(sources)
  return {
    HTTP: header.HTTP.map(R.merge({accept: 'application/json'})),
    title: title(sources.STORE),
    EVENTS: header.EVENTS,
    AUDIO: audio({playlist, controls}),
    DOM: view({playlist, controls, header, ...sources}),
    STORE: store({STORE: sources.STORE, playlist, header, controls})
  }
}
