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
import value from '../../lib/value'
import {createRequest} from './app.utils'

export default (state, dispatch) => {
  const {
    tracks,
    selectedTrack,
    playing,
    search,
    showModal,
    activeTrack,
    audioAction,
    mediaStatus,
    completion
  } = state
  return h(`div.container`, [
    // HTTP
    h(`fg-reactive-http`, {
      props: {debounce: 300, action: createRequest(search)},
      on: {[Response.type]: dispatch('HTTP_TRACKS_RESPONSE')}
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
      props: {track: selectedTrack, show: value.of(showModal)}
    }, [
      h(`fg-button`, {
        props: {wide: true}, on: {click: dispatch('PLAY_NOW')}
      }, ['PLAY NOW'])
    ]),

    // TRACK LIST
    h('fg-track-list', {
      props: {tracks, playing, selected: selectedTrack},
      on: {[SelectTrack]: dispatch('SELECT_TRACK')}
    }),

    // CONTROL/PLAYER
    !activeTrack ? '' : h(`div.control-container`, [
      h(`fg-mini-audio-control`,
        {
          on: {
            click: dispatch('CONTROL_CLICK'),
            [Play]: dispatch('PLAY'),
            [Pause]: dispatch('PAUSE')
          },
          props: {mediaStatus, completion}
        }, [
          h(`div.control-track-detail`, [
            h(`div.track-title.text-overflow`, [activeTrack.title]),
            h(`div.artist.text-overflow`, [activeTrack.user.username])
          ])
        ])
    ]),

    // REACTIVE/AUDIO
    !activeTrack ? '' : h('fg-reactive-audio', {
      attrs: {src: trackStreamURL(activeTrack)},
      props: {action: audioAction},
      on: {
        timeupdate: dispatch('UPDATE_COMPLETION'),
        playing: dispatch('MEDIA_PLAYING'),
        pause: dispatch('MEDIA_PAUSED'),
        error: dispatch('audio.ERROR'),
        seeking: dispatch('audio.SEEKING'),
        canplay: dispatch('MEDIA_PAUSED')
      }
    })
  ])
}
