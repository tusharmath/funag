/**
 * Created by imamudin.naseem on 27/04/16.
 */

import {div} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../utils/Flexbox'
import Artwork from './Artwork'
import TrackDetail from './TrackDetail'
import OverlayStatus from './OverlayStatus'
import * as T from '../utils/Themes'
import {AnimatedOverlay, PausedOverlay} from './ArtworkOverlay'
import isolate from '@cycle/isolate'

const playListItemSTY = {
  fontSize: '1em',
  overflow: 'hidden'
}

const trackInfoSTY = {
  ...F.RowSpaceBetween,
  alignItems: 'center',
  color: T.font.primary,
  borderBottom: '1px solid rgb(249, 246, 246)'
}
const PlayListItem = ({DOM, track, audio, selectedTrack$}) => {
  const {title, user, duration, artwork_url, id} = track
  const click$ = DOM.select('.playlist-item').events('click').map(track)
  const selectedTrackId$ = selectedTrack$.pluck('id')
  const status$ = OverlayStatus({selectedTrackId$, audio, id})
  const animation$ = status$.filter(x => x === 'PLAY_ANIMATION').map(AnimatedOverlay)
  const pausedAnimation$ = status$.filter(x => x === 'PAUSE_ANIMATION').map(PausedOverlay)
  const clearAnimation$ = status$.filter(x => x === 'SHOW_NONE').map(null)
  const overlayItem$ = Observable.merge(animation$, pausedAnimation$, clearAnimation$)
  const trackStatus$ = overlayItem$.startWith(null)
    .map(overlay => div({style: {padding: `${T.BlockSpace}px`}}, [
      div({style: {position: 'relative'}}, [
        Artwork(artwork_url),
        overlay
      ])
    ]))
  return {
    click$,
    DOM: trackStatus$.map(status =>
      div({className: 'playlist-item', style: {...playListItemSTY}}, [
        div({style: trackInfoSTY}, [
          status,
          TrackDetail({title, user, duration})
        ])
      ]))
  }
}

export default sources => isolate(PlayListItem, sources.track.id.toString())(sources)
