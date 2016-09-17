/**
 * Created by tushar.mathur on 15/09/16.
 */

'use strict'

import update from '../src/web-components/app/app.update'
import test from 'ava'
import {MediaStatus} from '../src/lib/MediaStatus'
import Value from '../src/lib/value'

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
      showModal: Value.of(true)
    }
  )
})
test('HTTP_TRACKS_RESPONSE', t => {
  t.deepEqual(update({}, mockAction('HTTP_TRACKS_RESPONSE', ['t0', 't1'])), {
    tracks: ['t0', 't1'],
    selectedTrack: 't0'
  })
  t.deepEqual(
    update({selectedTrack: 't3'},
      mockAction('HTTP_TRACKS_RESPONSE', ['t0', 't1'])
    ), {
      tracks: ['t0', 't1'],
      selectedTrack: 't3'
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
      audioAction: 'play'
    }
  )
  t.deepEqual(update(
    {mediaStatus: MediaStatus.PLAYING},
    mockAction('CONTROL_CLICK')), {
      mediaStatus: MediaStatus.PLAYING,
      audioAction: 'pause'
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
  t.deepEqual(
    update(
      {modalTrack: {name: 't0', stream_url: '/t0.mp3'}},
      mockAction('PLAY_NOW')
    ),
    {
      audioAction: {
        type: 'play',
        params: {src: '/t0.mp3?client_id=PASSWORD%40123'}
      },
      modalTrack: {name: 't0', stream_url: '/t0.mp3'},
      selectedTrack: {name: 't0', stream_url: '/t0.mp3'},
      showModal: Value.of(false)
    }
  )
})
