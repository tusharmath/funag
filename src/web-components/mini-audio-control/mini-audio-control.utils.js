/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'

export const MediaStatus = {LOADING: 0, PLAYING: 1, ERRED: 2, PAUSED: 3}
export const onTimeUpdated = (params, state) => R.merge(
  state, {completion: params.currentTime / params.duration}
)
export const toggleAudioAction = (state) => {
  if (state.mediaStatus === MediaStatus.PAUSED) {
    return R.assoc('audioAction', {type: 'play'}, state)
  }
  return R.assoc('audioAction', {type: 'pause'}, state)
}
export const iconElement = (icon, dispatch) =>
  h('fg-button', {on: {click: dispatch('CLICK')}}, [
    h('fg-icon', {props: {color: 'red', icon}})
  ])
export const getIcon = (status, dispatch) => {
  switch (status) {
    default:
      return h(`fg-loader`)
    case MediaStatus.PLAYING:
      return iconElement('pause', dispatch)
    case MediaStatus.ERRED:
      return iconElement('error_outline', dispatch)
    case MediaStatus.PAUSED:
      return iconElement('play_arrow', dispatch)
  }
}
