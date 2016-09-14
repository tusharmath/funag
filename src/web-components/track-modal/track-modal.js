/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'

export default {
  props: ['show', 'track'],
  init () {
    return {
      show: false,
      track: null
    }
  },
  update (state, {params, type}) {
    switch (type) {
      case '@@rwc/prop/show':
        return R.assoc('show', params, state)
      case '@@rwc/prop/track':
        return R.assoc('track', params, state)
      default:
        return state
    }
  },
  view ({show, track, menu}) {
    if (!track) return ''
    return h(`fg-modal`, {props: {show}}, [
      h(`div.trackContainer`, [
        h('fg-track-artwork', {
          props: {track, selected: false, playing: false}
        }),
        h(`div.trackDetail`, [
          h(`div.title`, [track.title]),
          h(`div.artist`, [track.user.username])
        ])
      ]),
      h('div.menu', [
        h(`slot`)
      ])
    ])
  }
}
