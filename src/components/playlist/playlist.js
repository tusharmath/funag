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
import * as P from '../placeholders/placeholders'
import {getStatus$} from '../../lib/OverlayStatus'
import css from './playlist.style'
import {collectionFrom} from '../../lib/CycleCollection'

export const Audio = ({url$}) => url$.scan((last, src) => {
  const canPlay = R.anyPass([
    ({last}) => !last,
    ({last}) => last.type === 'PAUSE',
    ({last, src}) => last.src !== src
  ])
  if (canPlay({last, src})) return {src, type: 'PLAY'}
  return {src, type: 'PAUSE'}
}, null)

const PLACEHOLDER = (
  <div>
    {P.PlaylistItem}{P.PlaylistItem}{P.PlaylistItem}
  </div>
)

const view = ({playlistDOM$, isSeeking$}) => {
  return O.combineLatest(
    playlistDOM$.startWith(PLACEHOLDER),
    isSeeking$.startWith(false)
  )
    .map(([view, disableScroll]) =>
      <div class={{[css.disableScroll]: disableScroll}}
           classNames={[css.playlist]}>
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
const model = ({tracks$, DOM, STORE, AUDIO}) => {
  const audio$ = getAudioEvents(AUDIO)
  const selectedTrackId$ = STORE.select('track.selected').pluck('id')
  const data$ = getStatus$({selectedTrackId$, audio$, tracks$})
  const rows = collectionFrom(PlayListItem, {DOM}, data$)
  const playlistClick$ = rows.merged('click$')
  const playlistDOM$ = rows.combined('DOM')
  const url$ = playlistClick$.map(SC.trackStreamURL)
  const audioAction$ = Audio({url$})
  const ofType = R.compose(R.whereEq, R.objOf('type'))
  const play = audioAction$.filter(ofType('PLAY'))
  const pause = audioAction$.filter(ofType('PAUSE'))
  return {
    playlistDOM$,
    selectTrack$: playlistClick$,
    audio$: mux({play, pause})
  }
}
export default ({tracks$, DOM, STORE, AUDIO, isSeeking$}) => {
  const sources = {AUDIO, tracks$, DOM, STORE}
  const {audio$, selectTrack$, playlistDOM$} = model(sources)
  const vTree$ = view({playlistDOM$, isSeeking$})
  return {
    DOM: vTree$, audio$, selectTrack$
  }
}
