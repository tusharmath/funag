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

function onTimeUpdated (params, state) {
  const completion = params.currentTime / params.duration
  return R.merge(state, {completion})
}

function getEvent (state) {
  return state.mediaStatus === MediaStatus.PAUSED ? PlayEvent.of() : PauseEvent.of()
}

function getIcon (status) {
  return {
    [MediaStatus.LOADING]: h(`funag-loader`),
    [MediaStatus.PLAYING]: h('funag-icon', {props: {icon: 'pause'}}),
    [MediaStatus.ERRED]: h('funag-icon', {props: {icon: 'error_outline'}}),
    [MediaStatus.PAUSED]: h('funag-icon', {props: {icon: 'play_arrow'}})
  }[status]
}

export const MediaStatus = {
  LOADING: 'LOADING',
  PLAYING: 'PLAYING',
  ERRED: 'ERRED',
  PAUSED: 'PAUSED'
}

export default {
  init () {
    return {
      completion: 0,
      src: null,
      mediaStatus: MediaStatus.LOADING
    }
  },

  update (state, {type, params}) {
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
        return [
          R.assoc('mediaStatus', MediaStatus.PLAYING, state),
          MediaPlaying.of()
        ]
      case 'PAUSED':
        return [
          R.assoc('mediaStatus', MediaStatus.PAUSED, state),
          MediaStopped.of()
        ]
      case 'ERROR':
        return [
          R.assoc('mediaStatus', MediaStatus.ERRED, state),
          MediaStopped.of()
        ]
      case 'SEEKING':
        return [
          R.assoc('mediaStatus', MediaStatus.LOADING, state),
          MediaStopped.of()
        ]
      case 'SEEK':
        return [state, SeekEvent.of(params.detail)]
      case 'SUSPEND':
        return [
          R.assoc('mediaStatus', MediaStatus.LOADING, state),
          MediaStopped.of()
        ]
      case 'CAN_PLAY':
        return [
          R.assoc('mediaStatus', MediaStatus.PAUSED, state),
          MediaStopped.of()
        ]
      default:
        return state
    }
  },

  view ({src, completion, mediaStatus}, dispatch) {
    return h('div', [
      h('funag-passive-audio', {
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
      h('x-slider', {attrs: {completion}, on: {change: dispatch('SEEK')}}),
      h('div.control-row', [
        h('div.control-button', {on: {click: dispatch('CLICK')}}, [
          getIcon(mediaStatus)
        ]),
        h(`div.slot-content`, [
          h('slot')
        ])
      ])
    ])
  }
}
