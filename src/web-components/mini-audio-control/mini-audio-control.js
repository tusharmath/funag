/**
 * Created by tushar.mathur on 08/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import {MediaPlaying, MediaStopped} from './mini-audio-control.events'
import {
  MediaStatus,
  onTimeUpdated,
  toggleAudioAction,
  getIcon
} from './mini-audio-control.utils'

export default {
  init () {
    return {
      completion: 0,
      src: null,
      mediaStatus: MediaStatus.LOADING,
      audioAction: {}
    }
  },

  update (state, {type, params}) {
    const updateMediaState = R.assoc('mediaStatus', R.__, state)
    switch (type) {
      case '@@rwc/attr/src':
        return R.merge(state, {
          src: params,
          mediaStatus: MediaStatus.LOADING,
          completion: 0
        })
      case 'CLICK':
        return toggleAudioAction(state)
      case 'TIME_UPDATED':
        return onTimeUpdated(params, state)
      case 'PLAYING':
        return [updateMediaState(MediaStatus.PLAYING), MediaPlaying.of()]
      case 'PAUSED':
        return [updateMediaState(MediaStatus.PAUSED), MediaStopped.of()]
      case 'ERROR':
        return [updateMediaState(MediaStatus.ERRED), MediaStopped.of()]
      case 'SEEKING':
        return [updateMediaState(MediaStatus.LOADING), MediaStopped.of()]
      case 'SEEK':
        return R.assoc('audioAction', {
          type: 'seek',
          params: params.detail
        }, state)
      case 'SUSPEND':
        return [updateMediaState(MediaStatus.LOADING), MediaStopped.of()]
      case 'CAN_PLAY':
        return [updateMediaState(MediaStatus.PAUSED), MediaStopped.of()]
      default:
        return state
    }
  },

  view ({src, completion, mediaStatus, audioAction}, dispatch) {
    return h('div', [
      h('fg-reactive-audio', {
        attrs: {src},
        props: {action: audioAction},
        on: {
          timeupdate: dispatch('TIME_UPDATED'),
          playing: dispatch('PLAYING'),
          pause: dispatch('PAUSED'),
          error: dispatch('ERROR'),
          seeking: dispatch('SEEKING'),
          canplay: dispatch('CAN_PLAY')
        }
      }),
      h('fg-slider', {attrs: {completion}, on: {change: dispatch('SEEK')}}),
      h('div.control-row', [
        getIcon(mediaStatus, dispatch),
        h(`div.slot-content`, [h('slot')])
      ])
    ])
  }
}
