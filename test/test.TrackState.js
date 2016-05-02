/**
 * Created by imamudin.naseem on 02/05/16.
 */

'use strict'

import {ReactiveTest, TestScheduler} from 'rx'
import test from 'ava'
import TrackState from '../src/Utils/TrackState'
const {onNext} = ReactiveTest

test('isSongPlaying():play+pause', t => {
  const sh = new TestScheduler()
  const audio$ = sh.createHotObservable(
    onNext(210, 'play'),
    onNext(220, 'playing'),
    onNext(230, 'pause'),
    onNext(240, 'playing'),
    onNext(260, 'pause')
  )
  const selectedTrackId$ = sh.createHotObservable(onNext(205, 5))
  const out = sh.startScheduler(() => TrackState({audio$, selectedTrackId$}, 5))
  t.deepEqual(out.messages, [
    onNext(210, 'LOADING'),
    onNext(220, 'PLAYING'),
    onNext(230, 'PAUSED'),
    onNext(240, 'PLAYING'),
    onNext(260, 'PAUSED')
  ])
})

test('isSongPlaying():no-match', t => {
  const sh = new TestScheduler()
  const audio$ = sh.createHotObservable(
    onNext(210, 'play'),
    onNext(220, 'play')
  )
  const selectedTrackId$ = sh.createHotObservable(onNext(205, 4), onNext(215, 1))
  const out = sh.startScheduler(() => TrackState({audio$, selectedTrackId$}, 5))

  t.deepEqual(out.messages, [
    onNext(210, 'STOPPED'),
    onNext(220, 'STOPPED')
  ])
})

test('isSongPlaying():song-changed', t => {
  const sh = new TestScheduler()
  const audio$ = sh.createHotObservable(
    onNext(210, 'play'),
    onNext(220, 'playing'),
    onNext(240, 'play'),
    onNext(250, 'playing'),
    onNext(270, 'play'),
    onNext(280, 'playing'),
  )
  const selectedTrackId$ = sh.createHotObservable(
    onNext(205, 1),
    onNext(230, 2),
    onNext(260, 3),
  )
  const out = sh.startScheduler(() => TrackState({audio$, selectedTrackId$}, 2))
  t.deepEqual(out.messages, [
    onNext(210, 'STOPPED'),
    onNext(240, 'LOADING'),
    onNext(250, 'PLAYING'),
    onNext(270, "STOPPED")
  ])
})
