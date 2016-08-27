/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import R from 'ramda'
import {Observable as O} from 'rx'
import {h} from '@cycle/dom'
import Controls from '../controls/controls'
import Playlist from '../playlist/playlist'
import SlidingTabs from '../sliding-tab/sliding-tab'
import SearchBox from '../search/search'
import view from './main.view'
import mergePropStream from '../../lib/mergePropStream'

const title = (STORE) => {
  return STORE.select('track.selected')
    .filter(Boolean)
    .pluck('title')
}

const mockContent = (content, backgroundColor) => {
  return h(`div`, {style: {padding: '10px', width: '100%', backgroundColor}}, [
    content
  ])
}

const NAVIGATION_TABS = ['TRACKS', 'RECENT']

export default function (sources) {
  const controls = Controls(sources)
  const playlist = Playlist(sources)
  const searchBox = SearchBox(sources)
  const slidingTabs = SlidingTabs(R.merge(sources, {
    tabs$: O.just(NAVIGATION_TABS),
    content$: O.combineLatest(
      playlist.DOM,
      O.just(mockContent('RECENT-CONTENT', '#0F0'))
    )
  }))

  return {
    HTTP: searchBox.HTTP.map(R.merge({accept: 'application/json'})),
    title: title(sources.STORE),
    AUDIO: mergePropStream('AUDIO', playlist, controls),
    DOM: view(R.merge(sources, {controls, slidingTabs})),
    STORE: mergePropStream('STORE', playlist, controls, slidingTabs, searchBox),
    EVENTS: searchBox.EVENTS
  }
}
