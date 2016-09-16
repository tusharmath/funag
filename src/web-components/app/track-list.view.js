/**
 * Created by tushar.mathur on 17/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import {durationFormat} from '../../lib/SoundCloud'
import R from 'ramda'

function placeholder () {
  return h(`div.placeholder`, [
    h(`div.square50`),
    h(`div.lineCol`, [
      h(`div.line100`),
      h(`div.line75`)
    ])
  ])
}

export default (state, dispatch) => {
  const {tracks, selectedTrack, playing} = state
  return h('div', [
    h('div',
      tracks.length > 0 ? tracks.map(track =>
        h(`div.trackContainer`, {
          on: {click: [dispatch('SELECT_TRACK'), track]}
        }, [
          h('fg-track-artwork', {
            props: {track, selected: selectedTrack, playing}
          }),
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
