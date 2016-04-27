/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import isolate from '@cycle/isolate'
import * as F from '../../utils/Flexbox'
import * as SC from '../../utils/SoundCloud'
import {overflowEllipsis, size} from '../../utils/StyleUtils'

const Artwork = url => div({
  style: {
    ...size(35, 35),
    backgroundImage: url ? `url('${url}')` : null,
    backgroundColor: 'rgb(42, 44, 49)',
    backgroundSize: '35px 35px',
    backgroundRepeat: 'no-repeat',
    marginRight: '10px'
  }
})

const TrackDuration = duration =>
  div({style: {marginLeft: '1em', color: '#555'}}, SC.durationFormat(duration))

const TrackDetail = ({artist, title}) =>
  div({style: {overflow: 'hidden', flex: '1 0 0'}}, [
    div({style: overflowEllipsis}, title),
    div({style: {color: '#555', fontSize: '0.8em', ...overflowEllipsis}}, artist)
  ])

const PlayListItem = ({DOM, track: {title, user, duration, artwork_url, id}, trackListClick$}) => {
  const select$ = DOM.select('.playlist-item').events('click').map(id)
  const activeSTY = {backgroundColor: '#fff', color: '#000'}
  const defaultStyle = {fontSize: '0.8em', fontWeight: 600, padding: '4px 10px', ...F.RowSpaceBetween}
  const isSelected$ = Observable.merge(trackListClick$.map(false), select$.map(true)).startWith(false).distinctUntilChanged()
  return {
    select$,
    DOM: isSelected$.map(selected => div({
      className: 'playlist-item', style: selected ? {...defaultStyle, ...activeSTY} : defaultStyle
    }, [
      Artwork(artwork_url),
      TrackDetail({title, artist: user.username}),
      TrackDuration(duration)
    ]))

  }
}

export default ({tracks$, DOM}) => {
  const trackListClick$ = DOM.select('.tracks').events('click')
  const playlistItem$ = tracks$
    .map(tracks => {
      return tracks
        .map(track => isolate(PlayListItem, track.id.toString())({track, DOM, trackListClick$}))
    })
  const playlistItemVTree$ = playlistItem$.map(tracks => tracks.map(x => x.DOM))
  const playlistItemClick$ = playlistItem$.map(tracks => tracks.map(x => x.select$))

  return {
    DOM: playlistItemVTree$
      .flatMapLatest(tracks => Observable.combineLatest(tracks))
      .map(x => div('.tracks', x)),
    selected$: playlistItemClick$.flatMapLatest(clicks => Observable.merge(clicks))
  }
}
