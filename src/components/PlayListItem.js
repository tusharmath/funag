/**
 * Created by imamudin.naseem on 27/04/16.
 */

'use strict'

import {div} from 'cycle-snabbdom'
import {Observable} from 'rx'
import * as F from '../utils/Flexbox'
import Artwork from './Artwork'
import TrackDetail from './TrackDetail'
import * as T from '../utils/Themes'
import {AnimatedOverlay, PausedOverlay} from './ArtworkOverlay'
import isolate from '@cycle/isolate'
import {DEFAULT, PLAYING, PAUSED} from '../utils/OverlayStatus'

const playListItemSTY = {
  fontSize: '1em',
  overflow: 'hidden'
}

const trackInfoSTY = {
  ...F.RowSpaceBetween,
  alignItems: 'center',
  color: T.Pallete.baseColorPrimaryFont,
  borderBottom: T.Pallete.divider
}

const OverlayMap = {
  [DEFAULT]: null,
  [PLAYING]: AnimatedOverlay,
  [PAUSED]: PausedOverlay
}

const PlayListItem = ({DOM, track, status}) => {
  const {title, user, duration, artwork_url} = track
  const click$ = DOM.select('.playlist-item').events('click').map(track)
  const overlayItem$ = Observable.just(OverlayMap[status])
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
      div('.playlist-item', {style: {...playListItemSTY}}, [
        div({style: trackInfoSTY}, [
          status,
          TrackDetail({title, user, duration})
        ])
      ]))
  }
}

// TODO: Rename file PlayListItem => Track
export default sources => isolate(PlayListItem, sources.track.id.toString())(sources)
