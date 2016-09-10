/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import {durationFormat} from '../../lib/SoundCloud'

function artwork ({artwork_url}) {
  return h(`div.artwork`, [
    h(`funag-icon`, {props: {icon: 'music_note'}})
  ])
}
function placeholder () {
  return h(`div.placeholder`, [
    h(`div.square50`),
    h(`div.lineCol`, [
      h(`div.line100`),
      h(`div.line75`)
    ])
  ])
}

export default {
  props: ['tracks'],
  init () {
    return {
      tracks: []
    }
  },
  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/prop/tracks':
        return R.assoc('tracks', params, state)
      default:
        return state
    }
  },
  view ({tracks}) {
    return h('div', tracks.length > 0 ? tracks.map(track =>
      h(`div.trackContainer`, [
        artwork(track),
        h(`div.trackDetail`, [
          h(`div.title`, [track.title]),
          h(`div.artist`, [track.user.username])
        ]),
        h(`div.duration`, [durationFormat(track.duration)])
      ])
    ) : R.times(placeholder, 3))
  }
}
