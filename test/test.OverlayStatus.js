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
    onNext(0, [{id: 10}, {id: 11}])
  )
  const audio$ = sh.createHotObservable(
    onNext(210, {event: 'reallyPlaying'}),
    onNext(220, {event: 'pause'}),
    onNext(230, {event: 'reallyPlaying'}),
    onNext(240, {event: 'ended'})
  )
  const {messages} = sh.startScheduler(() => getStatus$({selectedTrackId$, audio$, tracks$}))
  t.deepEqual(messages, [
    onNext(201, [{status: DEFAULT, track: {id: 10}}, {status: DEFAULT, track: {id: 11}}]),
    onNext(210, [{status: PLAYING, track: {id: 10}}, {status: DEFAULT, track: {id: 11}}]),
    onNext(220, [{status: PAUSED, track: {id: 10}}, {status: DEFAULT, track: {id: 11}}]),
    onNext(230, [{status: PLAYING, track: {id: 10}}, {status: DEFAULT, track: {id: 11}}]),
    onNext(240, [{status: DEFAULT, track: {id: 10}}, {status: DEFAULT, track: {id: 11}}])
  ])
})

test('dynamic tracks', t => {
  const sh = new TestScheduler()
  const selectedTrackId$ = sh.createColdObservable(
    onNext(0, 10)
  )

  const tracks$ = sh.createHotObservable(
    onNext(205, [{id: 10}, {id: 11}]),
    onNext(300, [{id: 11}, {id: 12}]),
    onNext(400, [{id: 12}, {id: 10}])
  )
  const audio$ = sh.createHotObservable(
    onNext(210, {event: 'reallyPlaying'})
  )
  const {messages} = sh.startScheduler(() => getStatus$({selectedTrackId$, audio$, tracks$}))
  t.deepEqual(messages, [
    // 10, 11
    onNext(205, [{status: DEFAULT, track: {id: 10}}, {status: DEFAULT, track: {id: 11}}]),
    onNext(210, [{status: PLAYING, track: {id: 10}}, {status: DEFAULT, track: {id: 11}}]),

    // 11, 12
    onNext(300, [{status: DEFAULT, track: {id: 11}}, {status: DEFAULT, track: {id: 12}}]),

    // 12, 10
    onNext(400, [{status: DEFAULT, track: {id: 12}}, {status: PLAYING, track: {id: 10}}])
  ])
})

test('ignore timeUpdate', t => {
  const sh = new TestScheduler()
  const selectedTrackId$ = sh.createColdObservable(
    onNext(0, 10)
  )

  const tracks$ = sh.createHotObservable(
    onNext(205, [{id: 10}, {id: 11}])
  )
  const audio$ = sh.createHotObservable(
    onNext(210, {event: 'reallyPlaying'}),
    onNext(220, {event: 'timeUpdate'}),
    onNext(230, {event: 'timeUpdate'})
  )
  const {messages} = sh.startScheduler(() => getStatus$({selectedTrackId$, audio$, tracks$}))
  t.deepEqual(messages, [
    // 10, 11
    onNext(205, [{status: DEFAULT, track: {id: 10}}, {status: DEFAULT, track: {id: 11}}]),
    onNext(210, [{status: PLAYING, track: {id: 10}}, {status: DEFAULT, track: {id: 11}}])
  ])
})
