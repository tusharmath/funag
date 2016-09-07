/**
 * Created by imamudin.naseem on 27/04/16.
 */

'use strict'

import * as A from '../artwork/artwork'
import R from 'ramda'
import TrackDetail from '../track-details/track-details'
import isolate from '@cycle/isolate'
import {DEFAULT, PLAYING, PAUSED} from '../../lib/OverlayStatus'
import css from './playlist-item.style'
import DoubleClick from '../../lib/DoubleClick'
import {h} from '@cycle/dom'

const view = ({icon$, trackDetail}) => {
  return icon$.map(icon =>
    h('x-vp-notifier', [
      h(`div.${css.playlistItem}.playlist-item`, [
        h(`div.${css.trackInfo}.flb.row.jc_sb.ai_c`, [
          icon,
          trackDetail
        ])
      ])
    ])
  )
}

const model = ({track: {artwork_url: url}, status, insideVP$}) => {
  const OverlayMap = {
    [DEFAULT]: show => show && url ? A.DefaultArtwork(url) : A.Placeholder(),
    [PAUSED]: () => A.PausedArtwork(),
    [PLAYING]: () => A.PlayingArtwork()
  }

  const icon$ = insideVP$.map(OverlayMap[status])
  return {icon$}
}
const isInsideVP =
  R.compose(R.lt(0), R.path(['detail', 'intersectionRect', 'height']))
const intent = ({DOM, track}) => {
  const click$ = DoubleClick(DOM.select('.playlist-item')).map(track)
  const insideVP$ = DOM.select('x-vp-notifier').events('onChange')
    .map(isInsideVP).startWith(false)
  return {click$, insideVP$}
}

const PlayListItem = ({DOM, ROW: {track, status}}) => {
  const {click$, insideVP$} = intent({DOM, track})
  const {icon$} = model({track, status, insideVP$})
  const trackDetail = TrackDetail(track)
  const vTree$ = view({icon$, trackDetail})
  return {click$, DOM: vTree$}
}

// TODO: Rename file PlayListItem => Track
export default sources => isolate(PlayListItem)(sources)
