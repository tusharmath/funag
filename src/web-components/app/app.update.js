/**
 * Created by tushar.mathur on 15/09/16.
 */

'use strict'

import R from 'ramda'
import {setTracks} from './app.utils'
import logUnhandledActions from '../../lib/logUnhandledActions'
import {MediaStatus} from '../../lib/MediaStatus'

function getDuration (params) {
  return params.target.currentTime / params.target.duration
}
export default (state, {type, params}) => {
  switch (type) {
    case `SEARCH`:
      return R.merge(state, {search: params.detail, tracks: []})
    case 'SELECT_TRACK':
      return R.merge(state, {selectedTrack: params.detail, showModal: true})
    case 'HTTP_TRACKS_RESPONSE':
      return setTracks(state, params)
    case 'PLAY':
      return R.merge(state, {
        activeTrack: state.selectedTrack,
        showModal: false,
        audioAction: 'play'
      })
    case 'PAUSE':
      return R.merge(state, {audioAction: 'pause'})
    case 'MEDIA_PAUSED':
      return R.assoc('mediaStatus', MediaStatus.PAUSED, state)
    case 'MEDIA_PLAYING':
      return R.assoc('mediaStatus', MediaStatus.PLAYING, state)
    case 'CONTROL_CLICK':
      return R.assoc('audioAction', {type: 'play'}, state)
    case 'UPDATE_COMPLETION':
      return R.assoc('completion', getDuration(params), state)
    default:
      logUnhandledActions(state, {type, params})
      return state
  }
}
