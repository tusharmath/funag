/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import {durationFormat} from '../../lib/SoundCloud'
import findParent from '../../dom-api/findParent'
import {TrackChanged} from './track-list.events'

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
  props: ['tracks', 'playing', 'selected'],
  init (e) {
    return {
      tracks: [],
      selected: e.selected,
      playing: e.playing
    }
  },
  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/prop/tracks':
        return R.assoc('tracks', params, state)
      case '@@rwc/prop/playing':
        return R.assoc('playing', params, state)
      case '@@rwc/prop/selected':
        return R.assoc('selected', params, state)
      case 'CLICK':
        const node = findParent(R.prop('track'), params.target)
        return [
          node ? R.merge(state, {selected: node.track, playing: false}) : state,
          node ? TrackChanged.of(node.track) : null
        ]
      default:
        return state
    }
  },
  view ({tracks, selected, playing}, dispatch) {
    return h('div', {on: {click: dispatch('CLICK')}}, [
      h('div', tracks.length > 0 ? tracks.map(track =>
          h(`div.trackContainer`, {props: {track}}, [
            h('fg-track-artwork', {props: {track, selected, playing}}),
            h(`div.trackDetail`, [
              h(`div.title.hide-text-overflow`, [track.title]),
              h(`div.artist.hide-text-overflow`, [track.user.username])
            ]),
            h(`div.duration`, [durationFormat(track.duration)])
          ])
        ) : R.times(placeholder, 3)
      )
    ])
  }
}
