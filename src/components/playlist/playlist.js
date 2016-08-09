/**
 * Created by tushar.mathur on 24/04/16.
 */
// TODO: Rename to TrackList
'use strict'

import R from 'ramda'
import {Observable as O, Subject} from 'rx'
import {mux} from 'muxer'
import PlayListItem from '../playlist-item/playlist-item'
import * as SC from '../../lib/SoundCloud'
import * as P from '../placeholders/placeholders'
import {getStatus$} from '../../lib/OverlayStatus'
import css from './playlist.style'

export const getAudioIntent = ({url$}) => url$.scan((last, src) => {
  const canPlay = R.anyPass([
    ({last}) => !last,
    ({last}) => last.type === 'PAUSE',
    ({last, src}) => last.src !== src
  ])
  if (canPlay({last, src})) return {src, type: 'PLAY'}
  return {src, type: 'PAUSE'}
}, null)
const view = ({playlistDOM$}) => {
  return playlistDOM$.startWith(
    <div>{P.PlaylistItem}{P.PlaylistItem}{P.PlaylistItem}</div>
  ).map(view =>
    <div className={css.playlist}>
      {view}
    </div>
  )
}
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
const model = ({tracks$, DOM, selectedTrack$, AUDIO}) => {
  const PlaylistItemCtor = R.compose(PlayListItem, R.merge({DOM}))
  const audio$ = getAudioEvents(AUDIO)
  const selectedTrackId$ = selectedTrack$.pluck('id')
  const playlistItem$ = getStatus$({selectedTrackId$, audio$, tracks$})
    .map(R.map(PlaylistItemCtor))
    .share()
  const playlistClick$ = playlistItem$.map(R.pluck('click$')).flatMap(i => O.merge(i))
  const playlistDOM$ = playlistItem$.map(R.pluck('DOM')).flatMap(i => O.combineLatest(i))
  const url$ = playlistClick$.map(SC.trackStreamURL)
  const audioAction$ = getAudioIntent({url$})
  const ofType = R.compose(R.whereEq, R.objOf('type'))
  const play = audioAction$.filter(ofType('PLAY'))
  const pause = audioAction$.filter(ofType('PAUSE'))
  return {
    playlistDOM$,
    selectedTrack$: playlistClick$,
    audio$: mux({play, pause})
  }
}
export default ({tracks$, DOM, defaultTrack$, AUDIO}) => {
  const futureSelectedTrack$ = new Subject()
  const sources = {
    AUDIO, tracks$, DOM,
    selectedTrack$: O.merge(futureSelectedTrack$, defaultTrack$)
  }
  const {audio$, selectedTrack$, playlistDOM$} = model(sources)
  const vTree$ = view({playlistDOM$})
  return {
    DOM: vTree$, audio$,
    selectedTrack$: selectedTrack$.multicast(futureSelectedTrack$).refCount()
  }
}
