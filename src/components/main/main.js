/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import R from 'ramda'
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
  const playlist = Playlist(sources)
  const header = Header(sources)
  const track$ = sources.STORE.select('track.selected')
  return {
    HTTP: header.HTTP.map(R.merge({accept: 'application/json'})),
    title: title(sources.STORE),
    EVENTS: header.EVENTS,
    AUDIO: mergePropStream('AUDIO', playlist),
    DOM: view(R.merge(sources, {playlist, header, track$})),
    STORE: mergePropStream('STORE', playlist, header)
  }
}
