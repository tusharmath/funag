/**
 * Created by tushar.mathur on 24/04/16.
 */
// TODO: Rename to TrackList
'use strict'
import {div} from '@cycle/dom'
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
    .map(([view, bottomPadding]) => div({
      className: 'playlist',
      style: {
        backgroundColor: '#fff',
        padding: '62px 0',
        paddingBottom: bottomPadding ? '62px' : 0
      }
    }, [view]))
}

const toPlaylistItem = ({status, DOM}) => {
  return status.map(track => PlayListItem({track, DOM}))
}

const model = ({tracks$, DOM, audio$, selectedTrack$}) => {
  const selectedTrackId$ = selectedTrack$.pluck('id')
  const status$ = getStatus$({selectedTrackId$, audio$, tracks$})

  const playlistItem$ = status$
    .map(status => toPlaylistItem({status, DOM}))

  const click$ = playlistItem$
    .map(tracks => tracks.map(x => x.click$))
    .flatMapLatest(clicks => Observable.merge(clicks)).shareReplay(1)

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
