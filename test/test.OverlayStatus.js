/**
 * Created by tushar.mathur on 20/05/16.
 */

'use strict'

import {ReactiveTest, TestScheduler} from 'rx'
import test from 'ava'
import {getStatus$, DEFAULT, PLAYING, PAUSED} from '../src/utils/OverlayStatus'
const {onNext} = ReactiveTest

test('all statuses', t => {
  const sh = new TestScheduler()
  const selectedTrackId$ = sh.createColdObservable(
    onNext(0, 10)
  )

  const tracks$ = sh.createColdObservable(
    onNext(0, [10, 11])
  )
  const audio$ = sh.createHotObservable(
    onNext(210, {event: 'reallyPlaying'}),
    onNext(220, {event: 'pause'}),
    onNext(230, {event: 'reallyPlaying'}),
    onNext(240, {event: 'ended'})
  )
  const {messages} = sh.startScheduler(() => getStatus$({selectedTrackId$, audio$, tracks$}))
  t.deepEqual(messages, [
    onNext(201, [DEFAULT, DEFAULT]),
    onNext(210, [PLAYING, DEFAULT]),
    onNext(220, [PAUSED, DEFAULT]),
    onNext(230, [PLAYING, DEFAULT]),
    onNext(240, [DEFAULT, DEFAULT])
  ])
})

test('dynamic tracks', t => {
  const sh = new TestScheduler()
  const selectedTrackId$ = sh.createColdObservable(
    onNext(0, 10)
  )

  const tracks$ = sh.createHotObservable(
    onNext(205, [10, 11]),
    onNext(300, [11, 12]),
    onNext(400, [12, 10])
  )
  const audio$ = sh.createHotObservable(
    onNext(210, {event: 'reallyPlaying'})
  )
  const {messages} = sh.startScheduler(() => getStatus$({selectedTrackId$, audio$, tracks$}))
  t.deepEqual(messages, [
    // 10, 11
    onNext(205, [DEFAULT, DEFAULT]),
    onNext(210, [PLAYING, DEFAULT]),

    // 11, 12
    onNext(300, [DEFAULT, DEFAULT]),

    // 12, 10
    onNext(400, [DEFAULT, PLAYING])
  ])
})

test('ignore timeUpdate', t => {
  const sh = new TestScheduler()
  const selectedTrackId$ = sh.createColdObservable(
    onNext(0, 10)
  )

  const tracks$ = sh.createHotObservable(
    onNext(205, [10, 11])
  )
  const audio$ = sh.createHotObservable(
    onNext(210, {event: 'reallyPlaying'}),
    onNext(220, {event: 'timeUpdate'}),
    onNext(230, {event: 'timeUpdate'})
  )
  const {messages} = sh.startScheduler(() => getStatus$({selectedTrackId$, audio$, tracks$}))
  t.deepEqual(messages, [
    // 10, 11
    onNext(205, [DEFAULT, DEFAULT]),
    onNext(210, [PLAYING, DEFAULT])
  ])
})
