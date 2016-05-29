/**
 * Created by tushar.mathur on 24/04/16.
 */
// TODO: Rename to TrackList
'use strict'
import {div} from '@cycle/dom'
import R from 'ramda'
import {Observable} from 'rx'
import PlayListItem from './PlayListItem'
import * as SC from '../utils/SoundCloud'
import * as P from '../layouts/Placeholders'
import {getStatus$} from '../utils/OverlayStatus'

export const Audio = ({url$, AUDIO: {Play, Pause}}) => url$.scan((last, src) => {
  const canPlay = R.anyPass([
    ({last}) => !last,
    ({last}) => last.type === 'PAUSE',
    ({last, src}) => last.src !== src
  ])
  if (canPlay({last, src})) return Play(src)
  return Pause(src)
}, null)

const view = ({playlistItem$}) => {
  return playlistItem$
    .map(tracks => tracks.map(x => x.DOM))
    .flatMapLatest(tracks => Observable.combineLatest(tracks))
    .startWith([
      div([
        P.PlaylistItem,
        P.PlaylistItem,
        P.PlaylistItem
      ])
    ])
    .map(view => div('.playlist', {style: {backgroundColor: '#fff', overflow: 'auto', height: '100%'}}, [view]))
}

const createPlaylistItem = ({track, index, statuses, DOM}) => {
  const status = statuses[index]
  return PlayListItem({track, DOM, status})
}

const toPlaylistItem = ({tracks, statuses, DOM}) => {
  return tracks.map((track, index) => createPlaylistItem({track, index, statuses, DOM}))
}

const model = ({tracks$, DOM, audio$, selectedTrack$, AUDIO}) => {
  const trackIds$ = tracks$.map(x => x.map(x => x.id))
  const selectedTrackId$ = selectedTrack$.pluck('id')
  const status$ = getStatus$({selectedTrackId$, audio$, tracks$: trackIds$})

  const playlistItem$ = Observable
    .combineLatest(tracks$, status$)
    .map(([tracks, statuses]) => toPlaylistItem({tracks, statuses, DOM}))

  const click$ = playlistItem$
    .map(tracks => tracks.map(x => x.click$))
    .flatMapLatest(clicks => Observable.merge(clicks))

  const url$ = click$
    .combineLatest(selectedTrack$, (_, b) => b)
    .map(SC.trackStreamURL)

  return {
    selectedTrack$: click$,
    audio$: Audio({url$, AUDIO}),
    playlistItem$
  }
}

export default sources => {
  const {playlistItem$, audio$, selectedTrack$} = model(sources)
  const vTree$ = view({playlistItem$})

  return {
    DOM: vTree$, audio$, selectedTrack$
  }
}
