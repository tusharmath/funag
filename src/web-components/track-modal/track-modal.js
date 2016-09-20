/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import {ModalHideEvent, ModalShowEvent} from '../modal/modal.events'
import {TrackModalShowEvent, TrackModalHideEvent} from './track-modal.events'

export default {
  props: ['modalAction', 'track', 'show'],
  init () {
    return {
      track: null,
      show: false
    }
  },
  update (state, {params, type}) {
    switch (type) {
      case '@@rwc/prop/show':
        return [
          R.assoc('show', params, state),
          params ? TrackModalShowEvent.of() : TrackModalHideEvent.of()
        ]
      case '@@rwc/prop/track':
        return R.assoc('track', params, state)
      case 'HIDE':
        return [R.assoc('show', false, state), TrackModalHideEvent.of()]
      case 'SHOW':
        return [R.assoc('show', true, state), TrackModalShowEvent.of()]
      default:
        return state
    }
  },
  view ({show, track, menu}, dispatch) {
    if (!track) return ''
    return h(`fg-modal`, {
      props: {show},
      on: {
        [ModalHideEvent]: dispatch('HIDE'),
        [ModalShowEvent]: dispatch('SHOW')
      }
    }, [
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
