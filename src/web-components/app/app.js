/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import {Request} from '../http/http.events'
import {toURI, trackStreamURL} from '../../lib/SoundCloud'

export default {
  init () {
    return {
      tracks: [],
      selected: null,
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
        return R.merge(state, {
          tracks: params.response,
          selected: state.selected ? state.selected : params.response[0]
        })
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
          attrs: {placeholder: 'Search', icon: 'search'}
        })
      ]),
      h('funag-track-list', {props: {tracks}}),
      selected ? h(`div.control-container`, [
        h(`funag-mini-audio-control`,
          {attrs: {src: trackStreamURL(selected)}}, [
            h(`div.control-track-detail`, [
              h(`div.track-title.text-overflow`, [selected.title]),
              h(`div.artist.text-overflow`, [selected.user.username])
            ])
          ])
      ]) : ''
    ])
  }
}
