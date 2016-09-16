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
  t.deepEqual(update({}, mockAction('SELECT_TRACK', '#track')), {
    selectedTrack: '#track',
    showModal: true
  })
})
test('HTTP_TRACKS_RESPONSE', t => {
  t.deepEqual(update({}, mockAction('HTTP_TRACKS_RESPONSE', ['t0', 't1'])), {
    tracks: ['t0', 't1'],
    selectedTrack: 't0',
    activeTrack: 't0'
  })
  t.deepEqual(
    update({selectedTrack: 't3'},
      mockAction('HTTP_TRACKS_RESPONSE', ['t0', 't1'])
    ), {
      tracks: ['t0', 't1'],
      selectedTrack: 't3',
      activeTrack: 't3'
    })
})
test('PLAY', t => {
  t.deepEqual(update({selectedTrack: 't0'}, mockAction('PLAY')), {
    activeTrack: 't0',
    selectedTrack: 't0',
    showModal: false,
    audioAction: 'play'
  })
})
test('PAUSE', t => {
  t.deepEqual(update({}, mockAction('PAUSE')), {
    audioAction: 'pause'
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
test('CONTROL_CLICK', t => {
  t.deepEqual(update(
    {mediaStatus: MediaStatus.PAUSED},
    mockAction('CONTROL_CLICK')), {
      audioAction: {type: 'play'},
      mediaStatus: MediaStatus.PAUSED
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
