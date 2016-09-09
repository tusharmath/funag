/**
 * Created by tushar.mathur on 08/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import PassiveAudioEvent from '../passive-audio/passive-audio.event'

function onTimeUpdated (params, state) {
  const completion = params.currentTime / params.duration
  return R.assoc('completion', completion, state)
}

function getEvent (state) {
  if (state.icon === 'play_arrow') {
    return {type: 'play'}
  }
  return {type: 'pause'}
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
        return R.assoc('src', params, state)
      case 'CLICK':
        return [state, PassiveAudioEvent.of(getEvent(state))]
      case 'TIME_UPDATED':
        return onTimeUpdated(params, state)
      case 'PLAYING':
        return R.assoc('icon', 'pause', state)
      case 'PAUSE':
        return R.assoc('icon', 'play_arrow', state)
      case 'ERROR':
        return R.assoc('icon', 'error_outline', state)
      case 'SEEK':
        return [state, PassiveAudioEvent.of({
          type: 'seek',
          to: params.detail.completion
        })]
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
          error: dispatch('ERROR')
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
        h('slot')
      ])
    ])
  }
}
