/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import Controls from '../controls/controls'
import Playlist from '../playlist/playlist'
import Header from '../header/header'
import SlidingTabs from '../sliding-tab/sliding-tab'
import view from './main.view'

const pluckMerged = (prop, ...el) =>
  O.merge(R.filter(Boolean, R.pluck(prop, el)))

const title = (STORE) => {
  return STORE.select('track.selected')
    .filter(Boolean)
    .pluck('title')
}
const audio = ({playlist, controls}) => {
  return O.merge(playlist.AUDIO, controls.AUDIO)
}

const NAVIGATION_TABS = ['TRACKS', 'RECENT']
const NAVIGATION_CONTENT = [
  'TRACKS-CONTENT',
  'RECENT-CONTENT'
]

export default function (sources) {
  const controls = Controls(sources)
  const playlist = Playlist(sources)
  const header = Header(sources)
  const slidingTabs = SlidingTabs(R.merge(sources, {
    tabs$: O.just(NAVIGATION_TABS),
    content$: O.just(NAVIGATION_CONTENT)
  }))

  return {
    HTTP: header.HTTP.map(R.merge({accept: 'application/json'})),
    title: title(sources.STORE),
    EVENTS: header.EVENTS,
    AUDIO: audio({playlist, controls}),
    DOM: view(R.merge(sources, {playlist, controls, header, slidingTabs})),
    STORE: pluckMerged('STORE', playlist, header, controls, slidingTabs)
  }
}
