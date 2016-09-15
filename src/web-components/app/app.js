/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'
import {Response} from '../reactive-http/reactive-http.events'
import {trackStreamURL} from '../../lib/SoundCloud'
import {FunagInputValue} from '../input/input.events'
import {TrackChanged} from '../track-list/track-list.events'
import {
  MediaPlaying,
  MediaStopped
} from '../mini-audio-control/mini-audio-control.events'
import value from '../../lib/value'
import {createRequest, setTracks} from './app.utils'

export default {
  init () {
    return {
      tracks: [],
      selected: null,
      controlTrack: null,
      playing: null,
      search: '',
      showModal: false
    }
  },

  update (state, {type, params}) {
    switch (type) {
      case `SEARCH`:
        return R.merge(state, {search: params.detail, tracks: []})
      case 'TRACK_CHANGE':
        return R.merge(state, {selected: params.detail, showModal: true})
      case 'TRACKS':
        return setTracks(state, params)
      case 'PLAY_NOW':
        return R.merge(state, {controlTrack: state.selected, showModal: false})
      case 'MEDIA_PLAYING':
        return R.assoc('playing', true, state)
      case 'MEDIA_STOPPED':
        return R.assoc('playing', false, state)
      default:
        return state
    }
  },
  view (state, dispatch) {
    const {tracks, selected, playing, search, showModal, controlTrack} = state
    return h(`div.container`, [
      // HTTP
      h(`fg-reactive-http`, {
        props: {debounce: 300, action: createRequest(search)},
        on: {[Response.type]: dispatch('TRACKS')}
      }),

      // APP BAR
      h('fg-app-bar', {attrs: {toggleClass: 'active'}}, [
        h(`div.search-box-container`, [
          h('fg-input', {
            on: {[FunagInputValue.type]: dispatch('SEARCH')},
            attrs: {placeholder: 'Search', icon: 'search'}
          })
        ])
      ]),

      // TRACK MODAL
      h('fg-track-modal', {
        props: {track: selected, show: value.of(showModal)}
      }, [
        h(`fg-button`, {
          props: {wide: true}, on: {click: dispatch('PLAY_NOW')}
        }, ['PLAY NOW'])
      ]),

      // TRACK LIST
      h('fg-track-list', {
        props: {tracks, playing, selected},
        on: {[TrackChanged]: dispatch('TRACK_CHANGE')}
      }),

      // CONTROL/PLAYER
      controlTrack ? h(`div.control-container`, [
        h(`fg-mini-audio-control`,
          {
            attrs: {src: trackStreamURL(controlTrack)},
            on: {
              [MediaPlaying]: dispatch('MEDIA_PLAYING'),
              [MediaStopped]: dispatch('MEDIA_STOPPED')
            }
          }, [
            h(`div.control-track-detail`, [
              h(`div.track-title.text-overflow`, [controlTrack.title]),
              h(`div.artist.text-overflow`, [controlTrack.user.username])
            ])
          ])
      ]) : ''
    ])
  }
}
