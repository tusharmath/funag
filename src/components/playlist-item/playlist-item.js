/**
 * Created by imamudin.naseem on 27/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import * as A from '../artwork/artwork'
import TrackDetail from '../track-details/track-details'
import isolate from '@cycle/isolate'
import {DEFAULT, PLAYING, PAUSED, SEEKING} from '../../lib/OverlayStatus'
import css from './playlist-item.style'
import DoubleClick from '../../lib/DoubleClick'
const view = ({icon$, trackDetail, track}) => {
  return icon$.map(icon =>
    <div key={track.id} className={css(css.playlistItem, 'playlist-item')}>
      <div className={css(css.trackInfo, 'flb row jc_sb ai_c')}>
        {icon}
        {trackDetail}
      </div>
    </div>
  )
}

const model = ({track: {artwork_url, id}, status}) => {
  const OverlayMap = {
    [DEFAULT]: A.DefaultArtwork(artwork_url),
    [PAUSED]: A.PausedArtwork(),
    [PLAYING]: A.PlayingArtwork(),
    [SEEKING]: A.SeekingArtWork()
  }

  const icon$ = O.just(<div key={id}>{OverlayMap[status]}</div>)
  return {icon$}
}

const intent = ({DOM, track}) => {
  const click$ = DoubleClick(DOM.select('.playlist-item')).map(track)
  return {click$}
}

const PlayListItem = ({DOM, ROW: {track, status}}) => {
  const {icon$} = model({track, status})
  const trackDetail = TrackDetail(track)
  const vTree$ = view({icon$, trackDetail, track})
  const {click$} = intent({DOM, track})
  return {click$, DOM: vTree$}
}

// TODO: Rename file PlayListItem => Track
export default sources => isolate(PlayListItem)(sources)
