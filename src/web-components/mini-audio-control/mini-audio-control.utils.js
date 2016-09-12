/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import {PlayEvent, PauseEvent} from '../passive-audio/passive-audio.event'

export const MediaStatus = {LOADING: 0, PLAYING: 1, ERRED: 2, PAUSED: 3}
export const onTimeUpdated = (params, state) => R.merge(
  state, {completion: params.currentTime / params.duration}
)
export const getEvent = (state) => {
  if (state.mediaStatus === MediaStatus.PAUSED) return PlayEvent.of()
  return PauseEvent.of()
}
export const iconElement = (icon) => h('fg-icon', {props: {color: 'red', icon}})
export const getIcon = (status) => ({
  [MediaStatus.LOADING]: h(`fg-loader`),
  [MediaStatus.PLAYING]: iconElement('pause'),
  [MediaStatus.ERRED]: iconElement('error_outline'),
  [MediaStatus.PAUSED]: iconElement('play_arrow')
})[status]
