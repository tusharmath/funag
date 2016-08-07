/**
 * Created by imamudin.naseem on 27/04/16.
 */

'use strict'

import {div} from '@cycle/dom'
import {Observable as O} from 'rx'
import {DefaultArtwork, PausedArtwork, PlayingArtwork} from '../artwork/artwork'
import TrackDetail from '../TrackDetail'
import isolate from '@cycle/isolate'
import {DEFAULT, PLAYING, PAUSED} from '../../lib/OverlayStatus'
import css from './playlist-item.style'

const view = ({icon$, trackDetail}) => {
  return icon$.map(icon =>
    <div className={css.playlistItem}>
      <div className={css.trackInfo}>
        {icon}
        {trackDetail}
      </div>
    </div>
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
export default sources => isolate(PlayListItem)(sources)
