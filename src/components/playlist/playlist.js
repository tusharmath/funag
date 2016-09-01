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
import css from './playlist.style'
import getRootBCR from '../../dom-api/getRootBCR'

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
const model = ({DOM, STORE, AUDIO, scroll$, rootRect$}) => {
  const tracks$ = STORE.select('track.data')
  const audio$ = getAudioEvents(AUDIO)
  const selectedTrackId$ = STORE.select('track.selected').filter(Boolean)
    .pluck('id')
  const data$ = getStatus$({selectedTrackId$, audio$, tracks$})
  const rows = collectionFrom(PlayListItem, {DOM, scroll$, rootRect$}, data$)
  const playlistClick$ = rows.merged('click$')
  const playlistDOM$ = rows.combined('DOM')
  const url$ = playlistClick$.map(SC.trackStreamURL)
  const audioAction$ = Audio({url$})
  const play = audioAction$.filter(ofType('PLAY'))
  const pause = audioAction$.filter(ofType('PAUSE'))
  return {
    playlistDOM$,
    STORE: playlistClick$.map(SELECT_TRACK),
    AUDIO: mux({play, pause})
  }
}
const intent = ({DOM}) => ({
  scroll$: DOM.select(`.${css.playlist}`).events('scroll')
})
export default (sources) => {
  const {scroll$} = intent(sources)
  const rootRect$ = getRootBCR(sources.DOM)
  const {AUDIO, STORE, playlistDOM$} =
    model(R.merge(sources, {scroll$, rootRect$}))
  const vTree$ = view({playlistDOM$})
  return {
    DOM: vTree$, AUDIO, STORE
  }
}
