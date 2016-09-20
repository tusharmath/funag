/**
 * Created by tushar.mathur on 15/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import {Response} from '../reactive-http/reactive-http.events'
import {FunagInputValue} from '../input/input.events'
import {createRequest} from './app.utils'
import TrackListView from './track-list.view'
import {SeekEvent} from '../mini-audio-control/mini-audio-control.events'
import {
  TrackModalShowEvent,
  TrackModalHideEvent
} from '../track-modal/track-modal.events'

export default (state, dispatch) => {
  const {
    tracks,
    selectedTrack,
    search,
    showModal,
    modalTrack,
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
      props: {track: modalTrack, show: showModal},
      on: {
        [TrackModalShowEvent]: dispatch('SHOW_MODAL'),
        [TrackModalHideEvent]: dispatch('HIDE_MODAL')
      }
    }, [
      h(`fg-button`, {
        props: {wide: true}, on: {click: dispatch('PLAY_NOW')}
      }, ['PLAY NOW'])
    ]),

    // TRACK LIST
    TrackListView({tracks, selectedTrack, mediaStatus}, dispatch),

    // CONTROL/PLAYER
    !selectedTrack ? '' : h(`div.control-container`, [
      h(`fg-mini-audio-control`,
        {
          on: {
            [SeekEvent]: dispatch('SEEK'),
            click: dispatch('CONTROL_CLICK', {preventDefault: true})
          },
          props: {mediaStatus, completion}
        }, [
          h(`div.control-track-detail`, [
            h(`div.track-title.text-overflow`, [selectedTrack.title]),
            h(`div.artist.text-overflow`, [selectedTrack.user.username])
          ])
        ])
    ]),

    // REACTIVE/AUDIO
    !selectedTrack ? '' : h('fg-reactive-audio', {
      props: {action: audioAction},
      on: {
        timeupdate: dispatch('UPDATE_COMPLETION'),
        playing: dispatch('MEDIA_PLAYING'),
        pause: dispatch('MEDIA_PAUSED'),
        error: dispatch('MEDIA_ERRED'),
        seeking: dispatch('MEDIA_LOADING'),
        canplay: dispatch('MEDIA_PAUSED')
      }
    })
  ])
}
