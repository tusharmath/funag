/**
 * Created by tushar.mathur on 15/09/16.
 */

'use strict'

import update from '../src/web-components/app/app.update'
import test from 'ava'
import {MediaStatus} from '../src/lib/MediaStatus'

function mockAction (type, detail) {
  return {type, params: {detail}}
}
test('SEARCH', t => {
  t.deepEqual(update({}, mockAction('SEARCH', 'abc')), {
    search: 'abc',
    tracks: []
  })
})
test('SELECT_TRACK', t => {
  t.deepEqual(
    update({}, {type: 'SELECT_TRACK', params: '#track'}),
    {
      modalTrack: '#track',
      showModal: true
    }
  )
})
test('HTTP_TRACKS_RESPONSE:default', t => {
  const t0 = {name: 't0', stream_url: '/t0.mp3'}
  const t1 = {name: 't1', stream_url: '/t1.mp3'}
  t.deepEqual(update({}, mockAction('HTTP_TRACKS_RESPONSE', [t0, t1])), {
    tracks: [t0, t1],
    selectedTrack: t0,
    audioAction: {
      type: 'load',
      params: {src: '/t0.mp3?client_id=PASSWORD%40123'}
    }
  })
})
test('HTTP_TRACKS_RESPONSE', t => {
  const t0 = {name: 't0', stream_url: '/t0.mp3'}
  const t1 = {name: 't1', stream_url: '/t1.mp3'}
  const t3 = {name: 't3', stream_url: '/t3.mp3'}
  t.deepEqual(
    update({selectedTrack: t3, audioAction: null},
      mockAction('HTTP_TRACKS_RESPONSE', [t0, t1])
    ), {
      tracks: [t0, t1],
      selectedTrack: t3,
      audioAction: null
    })
})
test('MEDIA_PAUSED', t => {
  t.deepEqual(update({}, mockAction('MEDIA_PAUSED')), {
    mediaStatus: MediaStatus.PAUSED
  })
})
test('MEDIA_PLAYING', t => {
  t.deepEqual(update({}, mockAction('MEDIA_PLAYING')), {
    mediaStatus: MediaStatus.PLAYING
  })
})
test('MEDIA_ERRED', t => {
  t.deepEqual(update({}, mockAction('MEDIA_ERRED')), {
    mediaStatus: MediaStatus.ERRED
  })
})
test('MEDIA_LOADING', t => {
  t.deepEqual(update({}, mockAction('MEDIA_LOADING')), {
    mediaStatus: MediaStatus.LOADING
  })
})
test('CONTROL_CLICK', t => {
  t.deepEqual(update(
    {mediaStatus: MediaStatus.PAUSED},
    mockAction('CONTROL_CLICK')), {
      mediaStatus: MediaStatus.PAUSED,
      audioAction: {type: 'play'}
    }
  )
  t.deepEqual(update(
    {mediaStatus: MediaStatus.PLAYING},
    mockAction('CONTROL_CLICK')), {
      mediaStatus: MediaStatus.PLAYING,
      audioAction: {type: 'pause'}
    }
  )
})
test('UPDATE_COMPLETION', t => {
  t.deepEqual(update({},
    {
      type: 'UPDATE_COMPLETION',
      params: {target: {duration: 100, currentTime: 45}}
    }),
    {completion: 0.45}
  )
})
test('PLAY_NOW', t => {
  const modalTrack = {name: 't0', stream_url: '/t0.mp3'}
  t.deepEqual(
    update(
      {modalTrack},
      mockAction('PLAY_NOW')
    ),
    {
      audioAction: {
        type: 'play',
        params: {src: '/t0.mp3?client_id=PASSWORD%40123'}
      },
      modalTrack: modalTrack,
      selectedTrack: modalTrack,
      showModal: false,
      mediaStatus: MediaStatus.LOADING
    }
  )
})
test('PLAY_NOW:no-selected-track', t => {
  const modalTrack = {name: 't0', stream_url: '/t0.mp3'}
  t.deepEqual(
    update(
      {modalTrack},
      mockAction('PLAY_NOW')
    ),
    {
      audioAction: {
        type: 'play',
        params: {src: '/t0.mp3?client_id=PASSWORD%40123'}
      },
      modalTrack: modalTrack,
      selectedTrack: modalTrack,
      showModal: false,
      mediaStatus: MediaStatus.LOADING
    }
  )
})
test('PLAY_NOW:already-playing', t => {
  const modalTrack = {name: 't0', stream_url: '/t0.mp3'}
  t.deepEqual(
    update(
      {
        modalTrack: modalTrack,
        selectedTrack: modalTrack,
        mediaStatus: MediaStatus.PLAYING
      },
      mockAction('PLAY_NOW')
    ),
    {
      modalTrack: modalTrack,
      selectedTrack: modalTrack,
      showModal: false,
      mediaStatus: MediaStatus.PLAYING
    }
  )
})
test('PLAY_NOW:track-loading', t => {
  const modalTrack = {name: 't0', stream_url: '/t0.mp3'}
  t.deepEqual(
    update(
      {
        modalTrack: modalTrack,
        selectedTrack: modalTrack,
        mediaStatus: MediaStatus.LOADING
      },
      mockAction('PLAY_NOW')
    ),
    {
      modalTrack: modalTrack,
      selectedTrack: modalTrack,
      showModal: false,
      mediaStatus: MediaStatus.LOADING
    }
  )
})
test('PLAY_NOW:track-paused', t => {
  const modalTrack = {name: 't0', stream_url: '/t0.mp3'}
  t.deepEqual(
    update(
      {
        modalTrack: modalTrack,
        selectedTrack: modalTrack,
        mediaStatus: MediaStatus.PAUSED
      },
      mockAction('PLAY_NOW')
    ),
    {
      modalTrack: modalTrack,
      selectedTrack: modalTrack,
      mediaStatus: MediaStatus.LOADING,
      showModal: false,
      audioAction: {
        type: 'play',
        params: {src: '/t0.mp3?client_id=PASSWORD%40123'}
      }
    }
  )
})
test('SEEK', t => {
  t.deepEqual(
    update({}, mockAction('SEEK', {completion: 0.5})),
    {
      audioAction: {
        type: 'seek',
        params: {completion: 0.5}
      }
    }
  )
})
