/**
 * Created by tushar.mathur on 28/04/16.
 */

'use strict'

import {ReactiveTest, TestScheduler} from 'rx'
import test from 'ava'
import isTrackPlaying from '../src/Utils/isTrackPlaying'
const {onNext} = ReactiveTest

test('isSongPlaying():play+pause', t => {
  const sh = new TestScheduler()
  const audio$ = sh.createHotObservable(
    onNext(210, 'play'),
    onNext(220, 'playing'),
    onNext(230, 'pause'),
    onNext(240, 'play'),
    onNext(250, 'play'),
    onNext(260, 'pause'),
  )
  const selectedTrackId$ = sh.createHotObservable(onNext(205, 5))
  const out = sh.startScheduler(() => isTrackPlaying({audio$, selectedTrackId$}, 5))
  t.deepEqual(out.messages, [
    onNext(220, true),
    onNext(230, false),
    onNext(260, false)
  ])
})

test('isSongPlaying():no-match', t => {
  const sh = new TestScheduler()
  const audio$ = sh.createHotObservable(
    onNext(210, 'play'),
    onNext(220, 'playing'),
  )
  const selectedTrackId$ = sh.createHotObservable(onNext(205, 4))
  const out = sh.startScheduler(() => isTrackPlaying({audio$, selectedTrackId$}, 5))

  t.deepEqual(out.messages, [
    onNext(210, false)
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
  const out = sh.startScheduler(() => isTrackPlaying({audio$, selectedTrackId$}, 2))
  t.deepEqual(out.messages, [
    onNext(210, false),
    onNext(250, true),
    onNext(270, false)
  ])
})
