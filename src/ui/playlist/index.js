/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import isolate from '@cycle/isolate'
import PlayListItem from './PlayListItem'

export default ({tracks$, DOM, audio}) => {
  const trackListClick$ = DOM.select('.tracks').events('click')
  const play$ = audio.events('playing')
  const pause$ = audio.events('pause')
  const loadstart$ = audio.events('loadstart')
  const isPlaying$ = Observable.merge(play$.map(true), pause$.map(false), loadstart$.map(false)).startWith(false)
  const playlistItem$ = tracks$
    .map(tracks => tracks.map((track, i) =>
      isolate(PlayListItem, track.id.toString())({track, DOM, trackListClick$, isPlaying$}, i)
    ))
  const playlistItemVTree$ = playlistItem$.map(tracks => tracks.map(x => x.DOM))
  const playlistItemClick$ = playlistItem$.map(tracks => tracks.map(x => x.click$))

  return {
    DOM: playlistItemVTree$.flatMapLatest(tracks => Observable.combineLatest(tracks)).map(x => div('.tracks', x)),
    selectedTrack$: playlistItemClick$.flatMapLatest(clicks => Observable.merge(clicks))
  }
}
