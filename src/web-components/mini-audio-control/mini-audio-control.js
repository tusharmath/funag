/**
 * Created by tushar.mathur on 08/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import {
  PlayEvent,
  PauseEvent,
  SeekEvent
} from '../passive-audio/passive-audio.event'
import {MediaPlaying, MediaStopped} from './mini-audio-control.events'

const onTimeUpdated = (params, state) => R.merge(
  state, {completion: params.currentTime / params.duration}
)
const getEvent = (state) => {
  if (state.mediaStatus === MediaStatus.PAUSED) return PlayEvent.of()
  return PauseEvent.of()
}
const getIcon = (status) => ({
  [MediaStatus.LOADING]: h(`fg-loader`),
  [MediaStatus.PLAYING]: h('fg-icon', {props: {icon: 'pause'}}),
  [MediaStatus.ERRED]: h('fg-icon', {props: {icon: 'error_outline'}}),
  [MediaStatus.PAUSED]: h('fg-icon', {props: {icon: 'play_arrow'}})
})[status]
export const MediaStatus = {LOADING: 0, PLAYING: 1, ERRED: 2, PAUSED: 3}
export default {
  init () {
    return {
      completion: 0,
      src: null,
      mediaStatus: MediaStatus.LOADING
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
        return [state, getEvent(state)]
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
        return [state, SeekEvent.of(params.detail)]
      case 'SUSPEND':
        return [updateMediaState(MediaStatus.LOADING), MediaStopped.of()]
      case 'CAN_PLAY':
        return [updateMediaState(MediaStatus.PAUSED), MediaStopped.of()]
      default:
        return state
    }
  },

  view ({src, completion, mediaStatus}, dispatch) {
    return h('div', [
      h('fg-passive-audio', {
        attrs: {src},
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
        h('div.control-button', {on: {click: dispatch('CLICK')}}, [
          getIcon(mediaStatus)
        ]),
        h(`div.slot-content`, [h('slot')])
      ])
    ])
  }
}
