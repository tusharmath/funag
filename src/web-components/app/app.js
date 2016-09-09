/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import {Request} from '../http/http.events'
import {toURI} from '../../lib/SoundCloud'

export default {
  init () {
    return {
      tracks: []
    }
  },

  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/attached':
        return [state, Request.of(toURI('/tracks'))]
      case 'TRACKS':
        return R.assoc('tracks', params.response, state)
      default:
        return state
    }
  },

  view ({tracks}, dispatch) {
    return h(`div.container`, [
      h(`funag-http`, {on: {'http-response': dispatch('TRACKS')}}),
      h('ul', tracks.map(track =>
        h('li', [track.title])
      )),
      h(`div.control-container`, [
        h(`funag-mini-audio-control`)
      ])
    ])
  }
}
