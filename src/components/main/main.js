/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import R from 'ramda'
import {Observable as O} from 'rx'
import Controls from '../controls/controls'
import Playlist from '../playlist/playlist'
import SearchBox from '../search/search'
import view from './main.view'
import mergePropStream from '../../lib/mergePropStream'
import Header from '../header/header'
import getRootBCR from '../../dom-api/getRootBCR'
import {SET_ROOT_DIMENSIONS} from '../../redux-lib/actions'

const title = (STORE) => {
  return STORE.select('track.selected')
    .filter(Boolean)
    .pluck('title')
}
const Dimensions = ({DOM}) => {
  return {STORE: getRootBCR(DOM).map(SET_ROOT_DIMENSIONS)}
}
const getPadding = ({STORE}) => {
  const paddingTop$ = STORE.select('view.navBarHeight')
  const paddingBottom$ = STORE.select('view.controlHeight')
  return O.combineLatest(paddingTop$, paddingBottom$)
    .map(R.zipObj(['paddingTop', 'paddingBottom']))
}

const NAVIGATION_TABS = ['TRACKS', 'RECENT']

export default function (sources) {
  const header = Header(R.merge(sources, {
    tabs$: O.just(NAVIGATION_TABS)
  }))
  const controls = Controls(sources)
  const playlist = Playlist(sources)
  const dimensions = Dimensions(sources)
  const searchBox = SearchBox(sources)
  const padding$ = getPadding(sources)
  return {
    HTTP: searchBox.HTTP.map(R.merge({accept: 'application/json'})),
    title: title(sources.STORE),
    AUDIO: mergePropStream('AUDIO', playlist, controls),
    DOM: view(R.merge(sources, {controls, header, playlist, padding$})),
    STORE: mergePropStream(
      'STORE', playlist, controls, searchBox, header, dimensions
    ),
    EVENTS: mergePropStream('EVENTS', searchBox)
  }
}
