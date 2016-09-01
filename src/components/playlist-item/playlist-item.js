/**
 * Created by imamudin.naseem on 27/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import * as A from '../artwork/artwork'
import R from 'ramda'
import TrackDetail from '../track-details/track-details'
import isolate from '@cycle/isolate'
import {DEFAULT, PLAYING, PAUSED} from '../../lib/OverlayStatus'
import css from './playlist-item.style'
import DoubleClick from '../../lib/DoubleClick'
import {h} from '@cycle/dom'
import getElement from '../../dom-api/getElement'

const view = ({icon$, trackDetail}) => {
  return icon$.map(icon =>
    h(`div.${css.playlistItem}.playlist-item`, [
      h(`div.${css.trackInfo}.flb.row.jc_sb.ai_c`, [
        icon,
        trackDetail
      ])
    ])
  )
}
const isInsideViewport = (elem, window) =>
elem.top > 0 && elem.bottom < window.height

const model = ({track: {artwork_url: url}, status, isInsideVP$}) => {
  const OverlayMap = {
    [DEFAULT]: show => show && url ? A.ArtworkBG(url) : A.Placeholder(),
    [PAUSED]: () => A.PausedArtwork(),
    [PLAYING]: () => A.PlayingArtwork()
  }
  const icon$ = isInsideVP$
    .map(OverlayMap[status])
  return {icon$}
}
const intent = ({DOM, track}) => {
  const click$ = DoubleClick(DOM.select('.playlist-item')).map(track)
  return {click$}
}

const PlayListItem = ({DOM, ROW: {track, status}, scroll$, rootRect$}) => {
  const isInsideVP$ = O
    .combineLatest(
      scroll$.debounce(300).startWith(null),
      getElement(DOM, '.playlist-item').filter(Boolean),
      rootRect$
    )
    .map(([_, el, window]) =>
      isInsideViewport(el.getBoundingClientRect(), window)
    )
    .scan(R.or)
    .distinctUntilChanged()
    .startWith(false)
  const {icon$} = model({track, status, isInsideVP$})
  const trackDetail = TrackDetail(track)
  const vTree$ = view({icon$, trackDetail})
  const {click$} = intent({DOM, track})
  return {click$, DOM: vTree$}
}

// TODO: Rename file PlayListItem => Track
export default sources => isolate(PlayListItem)(sources)
