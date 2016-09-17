/**
 * Created by tushar.mathur on 08/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import {MediaStatus} from '../../lib/MediaStatus'
import {SeekEvent} from './mini-audio-control.events'

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

export default {
  props: ['completion', 'mediaStatus'],
  init () {
    return {
      completion: 0,
      mediaStatus: MediaStatus.LOADING
    }
  },
  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/prop/mediaStatus':
        return R.assoc('mediaStatus', params, state)
      case '@@rwc/prop/completion':
        return R.assoc('completion', params, state)
      case 'SEEK':
        return [state, SeekEvent.of(params)]
      default:
        return state
    }
  },
  view ({completion, mediaStatus}, dispatch) {
    return h('div', [
      h('fg-slider', {attrs: {completion}, on: {change: dispatch('SEEK')}}),
      h('div.control-row', [
        getIcon(mediaStatus, dispatch),
        h(`div.slot-content`, [h('slot')])
      ])
    ])
  }
}
