/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import isolate from '@cycle/isolate'
import PlayListItem from './PlayListItem'
import * as M from './Models'
import * as SC from '../utils/SoundCloud'
import * as P from '../layouts/Placeholders'
import * as A from '../utils/Actions'

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
    .map(view => div({
      className: 'playlist',
      style: {
        backgroundColor: '#fff',
        padding: '62px 0'
      }
    }, [view]))
}

const model = ({tracks$, DOM, audio, selectedTrack$}) => {
  const playlistItem$ = tracks$.map(tracks => tracks.map((track, i) =>
    isolate(PlayListItem, track.id.toString())({track, DOM, audio, selectedTrack$}, i)
  ))

  const click$ = playlistItem$
    .map(tracks => tracks.map(x => x.click$))
    .flatMapLatest(clicks => Observable.merge(clicks))

  const url$ = click$
    .combineLatest(selectedTrack$, (_, b) => b)
    .pluck('stream_url').map(url => url + SC.clientIDParams({}))

  const audio$ = M.Audio({url$})

  const MODEL = click$
    .map(selectedTrack => ({selectedTrack}))
    .map(A.CONSTANT())

  return {MODEL, audio$, playlistItem$}
}

export default sources => {
  const {playlistItem$, MODEL, audio$} = model(sources)
  const vTree$ = view({playlistItem$})

  return {
    MODEL, DOM: vTree$, audio$
  }
}
