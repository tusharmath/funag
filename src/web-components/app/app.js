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
      tracks: [],
      selected: 0,
      search: ''
    }
  },

  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/attached':
        return [state, Request.of(toURI('/tracks', {q: state.search}))]
      case `SEARCH`:
        return [
          R.merge(state, {search: params.funagEventParams, tracks: []}),
          Request.of(toURI('/tracks', {q: params.funagEventParams}))
        ]
      case 'TRACKS':
        return R.assoc('tracks', params.response, state)
      default:
        return state
    }
  },

  view ({tracks, selected}, dispatch) {
    return h(`div.container`, [
      h(`funag-http`, {
        props: {debounce: 300},
        on: {'http-response': dispatch('TRACKS')}
      }),
      h(`div.search-box-container`, [
        h('funag-input', {
          on: {funaginputvalue: dispatch('SEARCH')},
          attrs: {placeholder: 'Search'}
        })
      ]),
      h('funag-track-list', {props: {tracks}}),
      tracks.length > 0 ? h(`div.control-container.fade-in`, [
        h(`funag-mini-audio-control`, [
          h(`div.control-track-detail`, [
            h(`div.track-title.text-overflow`, [tracks[selected].title]),
            h(`div.artist.text-overflow`, [tracks[selected].user.username])
          ])
        ])
      ]) : ''
    ])
  }
}
