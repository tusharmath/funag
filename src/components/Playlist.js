/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import PlayListItem from './PlayListItem'
import * as M from './Models'
import * as SC from '../utils/SoundCloud'
import * as P from '../layouts/Placeholders'

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

const model = ({tracks$, DOM, audio, selectedTrack$}) => {
  const playlistItem$ = tracks$.map(tracks => tracks.map((track, i) =>
    PlayListItem({track, DOM, audio, selectedTrack$}, i)
  ))

  const click$ = playlistItem$
    .map(tracks => tracks.map(x => x.click$))
    .flatMapLatest(clicks => Observable.merge(clicks))

  const url$ = click$
    .combineLatest(selectedTrack$, (_, b) => b)
    .pluck('stream_url').map(url => url + SC.clientIDParams({}))

  const audio$ = M.Audio({url$})
  const bottomPadding$ = selectedTrack$.map(Boolean).startWith(false)

  return {
    bottomPadding$,
    selectedTrack$: click$,
    audio$,
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
