/**
 * Created by imamudin.naseem on 27/04/16.
 */

'use strict'

import {div} from 'cycle-maquette'
import {Observable as O} from 'rx'
import * as F from '../utils/Flexbox'
import {DefaultArtwork, PausedArtwork, PlayingArtwork} from './Artwork'
import TrackDetail from './TrackDetail'
import * as T from '../utils/Themes'
import * as S from '../utils/StyleUtils'
import isolate from '@cycle/isolate'
import {DEFAULT, PLAYING, PAUSED} from '../utils/OverlayStatus'

const playListItemSTY = {
  'font-size': '1em',
  'overflow': 'hidden'
}

const trackInfoSTY = {
  ...F.RowSpaceBetween,
  'align-items': 'center',
  'color': T.Pallete.baseColorPrimaryFont,
  'border-bottom': T.Pallete.divider
}

const view = ({icon$, trackDetail, key}) => {
  return icon$.map(icon =>
    div({class: 'playlist-item', key, style: S.stringifyStyle({...playListItemSTY})}, [
      div({style: S.stringifyStyle(trackInfoSTY)}, [
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
  const vTree$ = view({icon$, trackDetail, key: track.id})
  const {click$} = intent({DOM, track})
  return {click$, DOM: vTree$}
}

// TODO: Rename file PlayListItem => Track
export default sources => isolate(PlayListItem, sources.track.id.toString())(sources)
