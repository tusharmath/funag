/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import isolate from '@cycle/isolate'
import {PlayListItem} from './PlayListItem'

export default ({tracks$, DOM}) => {
  const trackListClick$ = DOM.select('.tracks').events('click')
  const playlistItem$ = tracks$
    .map(tracks => {
      return tracks
        .map(track => isolate(PlayListItem, track.id.toString())({track, DOM, trackListClick$}))
    })
  const playlistItemVTree$ = playlistItem$.map(tracks => tracks.map(x => x.DOM))
  const playlistItemClick$ = playlistItem$.map(tracks => tracks.map(x => x.click$))

  return {
    DOM: playlistItemVTree$.flatMapLatest(tracks => Observable.combineLatest(tracks)).map(x => div('.tracks', x)),
    play$: playlistItemClick$.flatMapLatest(clicks => Observable.merge(clicks))
  }
}
