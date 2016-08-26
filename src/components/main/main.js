/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import R from 'ramda'
import Controls from '../controls/controls'
import Playlist from '../playlist/playlist'
import Header from '../header/header'
import view from './main.view'
import mergePropStream from '../../lib/mergePropStream'

const title = (STORE) => {
  return STORE.select('track.selected')
    .filter(Boolean)
    .pluck('title')
}

export default function (sources) {
  const controls = Controls(sources)
  const playlist = Playlist(sources)
  const header = Header(sources)
  return {
    HTTP: header.HTTP.map(R.merge({accept: 'application/json'})),
    title: title(sources.STORE),
    EVENTS: header.EVENTS,
    AUDIO: mergePropStream('AUDIO', playlist, controls),
    DOM: view(R.merge(sources, {playlist, controls, header})),
    STORE: mergePropStream('STORE', playlist, header, controls)
  }
}
