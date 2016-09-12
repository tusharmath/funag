/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'

function artworkBG (track) {
  return {style: {backgroundImage: `url(${track.artwork_url})`}}
}

function artwork ({playing, track, selected}) {
  const paused = !playing
  if (track === selected) return h('fg-music-icon', {props: {paused}})
  if (track.artwork_url) return h('div.artwork-bg-image', artworkBG(track))
  return h(`fg-icon`, {props: {icon: 'music_note'}})
}

export default {
  props: ['track', 'playing', 'selected'],
  init () {
    return {
      track: {artwork_url: null},
      playing: false,
      selected: false
    }
  },
  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/prop/track':
        return R.assoc('track', params, state)
      case '@@rwc/prop/playing':
        return R.assoc('playing', params, state)
      case '@@rwc/prop/selected':
        return R.assoc('selected', params, state)
      default:
        return state
    }
  },
  view (state) {
    return h(`div.artwork`, [artwork(state)])
  }
}
