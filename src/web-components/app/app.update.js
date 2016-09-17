/**
 * Created by tushar.mathur on 15/09/16.
 */

'use strict'

import R from 'ramda'
import {setTracks} from './app.utils'
import {MediaStatus} from '../../lib/MediaStatus'
import Value from '../../lib/value'
import {trackStreamURL} from '../../lib/SoundCloud'

function getDuration (params) {
  return params.target.currentTime / params.target.duration
}
function getAudioAction (state) {
  return R.objOf(
    'type',
    state.mediaStatus === MediaStatus.PLAYING ? 'pause' : 'play'
  )
}
export default (state, {type, params}) => {
  switch (type) {
    case `SEARCH`:
      return R.merge(state, {search: params.detail, tracks: []})
    case 'SELECT_TRACK':
      return R.merge(state, {
        modalTrack: params,
        showModal: Value.of(true)
      })
    case 'HTTP_TRACKS_RESPONSE':
      return setTracks(state, params)
    case 'MEDIA_PAUSED':
      return R.assoc('mediaStatus', MediaStatus.PAUSED, state)
    case 'MEDIA_PLAYING':
      return R.assoc('mediaStatus', MediaStatus.PLAYING, state)
    case 'MEDIA_ERRED':
      return R.assoc('mediaStatus', MediaStatus.ERRED, state)
    case 'MEDIA_LOADING':
      return R.assoc('mediaStatus', MediaStatus.LOADING, state)
    case 'CONTROL_CLICK':
      return R.assoc('audioAction', getAudioAction(state), state)
    case 'UPDATE_COMPLETION':
      return R.assoc('completion', getDuration(params), state)
    case 'PLAY_NOW':
      return R.merge(state, {
        audioAction: {
          type: 'play',
          params: {src: trackStreamURL(state.modalTrack)}
        },
        selectedTrack: state.modalTrack,
        showModal: Value.of(false)
      })
    case 'SEEK':
      return R.merge(state,
        {audioAction: {type: 'seek', params: params.detail}}
      )
    default:
      return state
  }
}
