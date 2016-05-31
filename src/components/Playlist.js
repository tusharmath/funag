/**
 * Created by tushar.mathur on 24/04/16.
 */
// TODO: Rename to TrackList
'use strict'
import {div} from 'cycle-snabbdom'
import {Observable} from 'rx'
import PlayListItem from './PlayListItem'
import * as M from './Models'
import * as SC from '../utils/SoundCloud'
import * as P from '../layouts/Placeholders'
import {getStatus$} from '../utils/OverlayStatus'

const view = ({playlistItem$, bottomPadding$}) => {
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
    .combineLatest(bottomPadding$)
    .map(([view, bottomPadding]) => {
      return div('.playlist', {
        style: {
          backgroundColor: '#fff',
          padding: '62px 0',
          paddingBottom: bottomPadding ? '62px' : 0
        }
      }, view)
    })
}

const createPlaylistItem = ({track, index, statuses, DOM}) => {
  console.log(index, statuses[index])
  const status = statuses[index]
  return PlayListItem({track, DOM, status})
}

const toPlaylistItem = ({tracks, statuses, DOM}) => {
  return tracks.map((track, index) => createPlaylistItem({track, index, statuses, DOM}))
}

const model = ({tracks$, DOM, audio$, selectedTrack$}) => {
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
    .pluck('stream_url').map(url => url + SC.clientIDParams({}))

  const bottomPadding$ = selectedTrack$.map(Boolean).startWith(false)

  return {
    bottomPadding$,
    selectedTrack$: click$,
    audio$: M.Audio({url$}),
    playlistItem$
  }
}

export default sources => {
  const {playlistItem$, audio$, selectedTrack$, bottomPadding$} = model(sources)
  const vTree$ = view({playlistItem$, bottomPadding$})

  return {
    DOM: vTree$, audio$, selectedTrack$
  }
}
