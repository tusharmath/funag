/**
 * Created by tushar.mathur on 15/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import {Response} from '../reactive-http/reactive-http.events'
import {trackStreamURL} from '../../lib/SoundCloud'
import {FunagInputValue} from '../input/input.events'
import {SelectTrack} from '../track-list/track-list.events'
import {Play, Pause} from '../mini-audio-control/mini-audio-control.events'
import {createRequest} from './app.utils'
import Value from '../../lib/value'

function TrackModal ({show, track}, children) {
  return h(`fg-modal`, {props: {show: Value.of(show)}}, [
    h(`div.trackContainer`, [
      h('fg-track-artwork', {
        props: {track, selected: false, playing: false}
      }),
      h(`div.trackDetail`, [
        h(`div.title`, [track.title]),
        h(`div.artist`, [track.user.username])
      ])
    ]),
    h('div.menu', children)
  ])
}
export default (state, dispatch) => {
  const {
    tracks,
    selectedTrack,
    playing,
    search,
    showModal,
    activeTrack,
    audioAction
  } = state
  return h('div.container', [
    // HTTP
    h('fg-reactive-http', {
      props: {debounce: 300, action: createRequest(search)},
      on: {[Response.type]: dispatch('HTTP_TRACKS_RESPONSE')}
    }),

    // APP BAR
    h('fg-app-bar', {attrs: {toggleClass: 'active'}}, [
      h('div.search-box-container', [
        h('fg-input', {
          on: {[FunagInputValue.type]: dispatch('SEARCH')},
          attrs: {placeholder: 'Search', icon: 'search'}
        })
      ])
    ]),

    // TRACK MODAL
    !selectedTrack ? '' : TrackModal({show: showModal, track: selectedTrack}, [
      h('fg-button', {
        props: {wide: true}, on: {click: dispatch('PLAY_NOW')}
      }, ['PLAY NOW'])
    ]),

    // TRACK LIST
    h('fg-track-list', {
      props: {tracks, playing, selected: selectedTrack},
      on: {[SelectTrack]: dispatch('SELECT_TRACK')}
    }),

    // CONTROL/PLAYER
    !activeTrack ? '' : h('div.control-container', [
      h('fg-mini-audio-control',
        {
          attrs: {src: trackStreamURL(activeTrack)},
          on: {
            [Play]: dispatch('PLAY'),
            [Pause]: dispatch('PAUSE')
          }
        }, [
          h('div.control-track-detail', [
            h('div.track-title.text-overflow', [activeTrack.title]),
            h('div.artist.text-overflow', [activeTrack.user.username])
          ])
        ])
    ]),

    // REACTIVE/AUDIO
    !activeTrack ? '' : h('fg-reactive-audio', {
      attrs: {src: trackStreamURL(activeTrack)},
      props: {action: audioAction},
      on: {
        timeupdate: dispatch('audio.TIME_UPDATED'),
        playing: dispatch('audio.PLAYING'),
        pause: dispatch('audio.PAUSED'),
        error: dispatch('audio.ERROR'),
        seeking: dispatch('audio.SEEKING'),
        canplay: dispatch('audio.CAN_PLAY')
      }
    })
  ])
}
