/**
 * Created by tushar.mathur on 24/04/16.
 */
// TODO: Rename to TrackList
'use strict'

import R from 'ramda'
import {Observable as O} from 'rx'
import {mux} from 'muxer'
import PlayListItem from '../playlist-item/playlist-item'
import * as SC from '../../lib/SoundCloud'
import {getStatus$} from '../../lib/OverlayStatus'
import {collectionFrom} from '../../lib/CycleCollection'
import {SELECT_TRACK} from '../../redux-lib/actions'
import view from './playlist.view'

export const Audio = ({url$}) => url$.scan((last, src) => {
  const canPlay = R.anyPass([
    ({last}) => !last,
    ({last}) => last.type === 'PAUSE',
    ({last, src}) => last.src !== src
  ])
  if (canPlay({last, src})) return {src, type: 'PLAY'}
  return {src, type: 'PAUSE'}
}, null)

const reallyPlaying = AUDIO => AUDIO
  .events('playing').flatMapLatest(
    () => AUDIO.events('timeUpdate').first()
  )
const getAudioEvents = AUDIO => {
  const _ = event => audio => ({event, audio})
  return O.merge(
    AUDIO.events('pause').map(_('pause')),
    AUDIO.events('ended').map(_('ended')),
    reallyPlaying(AUDIO).map(_('reallyPlaying')),
    O.merge(
      AUDIO.events('loadStart'),
      AUDIO.events('seeking')
    ).map(_('loadStart'))
  )
}
const ofType = R.compose(R.whereEq, R.objOf('type'))
const model = ({DOM, STORE, AUDIO}) => {
  const tracks$ = STORE.select('track.data')
  const height$ = O.zip(
    STORE.select('view.navBarHeight'),
    STORE.select('view.controlHeight'),
    STORE.select('view.rootDimensions.height'),
    (a, b, c) => c - a - b
  )

  const audio$ = getAudioEvents(AUDIO)
  const selectedTrackId$ = STORE.select('track.selected').filter(Boolean)
    .pluck('id')
  const data$ = getStatus$({selectedTrackId$, audio$, tracks$})
  const rows = collectionFrom(PlayListItem, {DOM}, data$)
  const playlistClick$ = rows.merged('click$')
  const playlistDOM$ = rows.combined('DOM')
  const url$ = playlistClick$.map(SC.trackStreamURL)
  const audioAction$ = Audio({url$})
  const play = audioAction$.filter(ofType('PLAY'))
  const pause = audioAction$.filter(ofType('PAUSE'))
  return {
    height$,
    playlistDOM$,
    STORE: playlistClick$.map(SELECT_TRACK),
    AUDIO: mux({play, pause})
  }
}

export default (sources) => {
  const {AUDIO, STORE, playlistDOM$, height$} = model(sources)
  const vTree$ = view({playlistDOM$, height$})
  return {
    DOM: vTree$, AUDIO, STORE
  }
}
