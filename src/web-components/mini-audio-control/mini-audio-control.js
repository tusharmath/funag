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

function onTimeUpdated (params, state) {
  const completion = params.currentTime / params.duration
  return R.assoc('completion', completion, state)
}

function getEvent (state) {
  return state.icon === 'play_arrow' ? PlayEvent.of() : PauseEvent.of()
}

export default {
  init () {
    return {
      completion: 0,
      src: null,
      icon: 'play_arrow'
    }
  },

  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/attr/src':
        return R.merge(state, {
          src: params,
          completion: 0
        })
      case 'CLICK':
        return [state, getEvent(state)]
      case 'TIME_UPDATED':
        return onTimeUpdated(params, state)
      case 'PLAYING':
        return R.assoc('icon', 'pause', state)
      case 'PAUSE':
        return R.assoc('icon', 'play_arrow', state)
      case 'ERROR':
        return R.assoc('icon', 'error_outline', state)
      case 'SEEK':
        return [state, SeekEvent.of(params.detail)]
      case 'SUSPEND':
        return R.assoc('icon', 'play_arrow', state)
      default:
        return state
    }
  },

  view ({src, completion, icon}, dispatch) {
    return h('div', [
      h('funag-passive-audio', {
        attrs: {src},
        on: {
          timeupdate: dispatch('TIME_UPDATED'),
          playing: dispatch('PLAYING'),
          pause: dispatch('PAUSE'),
          error: dispatch('ERROR'),
          suspend: dispatch('SUSPEND')
        }
      }),
      h('x-slider', {attrs: {completion}, on: {change: dispatch('SEEK')}}),
      h('div.control-row', [
        h('div.control-button', [
          h('funag-icon', {
            props: {icon},
            on: {click: dispatch('CLICK')}
          })
        ]),
        h(`div.slot-content`, [
          h('slot')
        ])
      ])
    ])
  }
}
