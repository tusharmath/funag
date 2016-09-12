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
        return R.merge(state, {show: true, track: params})
      default:
        return state
    }
  },
  view ({show, track}) {
    if (!track) return ''
    return h(`fg-modal`, {props: {state: {show}}}, [
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
        h('fg-button', {props: {wide: true}}, ['PLAY NOW']),
        h('fg-button', {props: {wide: true}}, ['ADD TO QUEUE']),
        h('fg-button', {props: {wide: true}}, ['ADD TO UP NEXT'])
      ])
    ])
  }
}
