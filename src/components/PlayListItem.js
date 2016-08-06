/**
 * Created by imamudin.naseem on 27/04/16.
 */

'use strict'

import {div} from '@cycle/dom'
import {Observable as O} from 'rx'
import * as F from '../lib/Flexbox'
import {DefaultArtwork, PausedArtwork, PlayingArtwork} from './Artwork'
import TrackDetail from './TrackDetail'
import * as T from '../lib/Themes'
import isolate from '@cycle/isolate'
import {DEFAULT, PLAYING, PAUSED} from '../lib/OverlayStatus'

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

const view = ({icon$, trackDetail}) => {
  return icon$.map(icon =>
    div('.playlist-item', {style: {...playListItemSTY}}, [
      div({style: trackInfoSTY}, [
        icon,
        trackDetail
      ])
    ])
  )
}

const model = ({track: {artwork_url}, status}) => {
  const OverlayMap = {
    [DEFAULT]: DefaultArtwork(artwork_url),
    [PAUSED]: PausedArtwork,
    [PLAYING]: PlayingArtwork
  }

  const icon$ = O.just(OverlayMap[status])
  return {icon$}
}

const intent = ({DOM, track}) => {
  const click$ = DOM.select('.playlist-item').events('click').map(track)
  return {click$}
}

const PlayListItem = ({DOM, track, status}) => {
  const {icon$} = model({track, status})
  const trackDetail = TrackDetail(track)
  const vTree$ = view({icon$, trackDetail})
  const {click$} = intent({DOM, track})
  return {click$, DOM: vTree$}
}

// TODO: Rename file PlayListItem => Track
export default sources => isolate(PlayListItem, sources.track.id.toString())(sources)
