/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import R from 'ramda'
import {mux} from 'muxer'
import Controls from '../Controls'
import Playlist from '../playlist/playlist'
import SearchBox from '../search/search'
import Empty from '../../lib/RxProxy'
import * as SC from '../../lib/SoundCloud'
import css from './main.style'

const view = ({playlist, searchBox, controls}) => O
  .combineLatest(searchBox.DOM, playlist.DOM, controls.DOM)
  .map(views => <div className={css(css.main, 'flexCol')}>{views}</div>)

const getSelectedTrack = (defaultTrack$, playlist, tracks$) => {
  return defaultTrack$
    .merge(playlist.selectedTrack$, tracks$.first().map(R.head))
    .distinctUntilChanged()
}
const getAudioSink = selectedTrack$ => mux({
  load: selectedTrack$
    .map(SC.trackStreamURL)
    .map(R.objOf('src'))
})

export default function ({DOM, route, AUDIO, HTTP}) {
  const searchBox = SearchBox({DOM, route, HTTP})
  const tracks$ = searchBox.tracks$
  const defaultTrack$ = Empty()
  const playlist = Playlist({
    tracks$, DOM, AUDIO, selectedTrack$: defaultTrack$
  })
  const selectedTrack$ = getSelectedTrack(defaultTrack$, playlist, tracks$)
  const controls = Controls({AUDIO, selectedTrack$, DOM})
  const audioSink$ = getAudioSink(selectedTrack$)
  return {
    HTTP: searchBox.HTTP.map(R.merge({accept: 'application/json'})),
    title: selectedTrack$.pluck('title'),
    EVENTS: searchBox.events$,
    AUDIO: O.merge(playlist.audio$, controls.audio$, audioSink$),
    DOM: view({playlist, searchBox, controls})
  }
}
