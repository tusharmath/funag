/**
 * Created by imamudin.naseem on 02/05/16.
 */

'use strict'

import {ReactiveTest, TestScheduler} from 'rx'
import test from 'ava'
import TrackState from '../src/Utils/TrackState'
const {onNext} = ReactiveTest

test('test:PLAYING', t => {
  const sh = new TestScheduler()
  const audio$ = sh.createHotObservable(
    onNext(210, 'play'),
    onNext(220, 'playing'),
    onNext(230, 'play'),
    onNext(240, 'playing')
  )
  const selectedTrackId$ = sh.createHotObservable(
    onNext(205, 5),
    onNext(225, 4)
  )
  const out = sh.startScheduler(() => TrackState({audio$, selectedTrackId$}, 5))
  t.deepEqual(out.messages, [
    onNext(210, 'LOADING'),
    onNext(220, 'PLAYING'),
    onNext(230, 'STOPPED'),
    onNext(240, 'STOPPED')
  ])
})
test('test:PAUSED', t => {
  const sh = new TestScheduler()
  const audio$ = sh.createHotObservable(
    onNext(210, 'playing'),
    onNext(220, 'pause'),
    onNext(230, 'playing'),
    onNext(240, 'pause')
  )
  const selectedTrackId$ = sh.createHotObservable(
    onNext(205, 5),
    onNext(225, 4)
  )
  const out = sh.startScheduler(() => TrackState({audio$, selectedTrackId$}, 5))
  t.deepEqual(out.messages, [
    onNext(210, 'PLAYING'),
    onNext(220, 'PAUSED'),
    onNext(230, 'STOPPED'),
    onNext(240, 'STOPPED')
  ])
})
test('test:LOADING', t => {
  const sh = new TestScheduler()
  const audio$ = sh.createHotObservable(
    onNext(210, 'playing'),
    onNext(220, 'play'),
    onNext(230, 'playing'),
    onNext(240, 'play')
  )
  const selectedTrackId$ = sh.createHotObservable(
    onNext(205, 3),
    onNext(215, 5),
    onNext(225, 4)
  )
  const out = sh.startScheduler(() => TrackState({audio$, selectedTrackId$}, 5))
  t.deepEqual(out.messages, [
    onNext(210, 'STOPPED'),
    onNext(220, 'LOADING'),
    onNext(230, 'STOPPED'),
    onNext(240, 'STOPPED')
  ])
})
test('test:STOPPED', t => {
  const sh = new TestScheduler()
  const audio$ = sh.createHotObservable(
    onNext(210, 'play'),
    onNext(220, 'playing')
  )
  const selectedTrackId$ = sh.createHotObservable(
    onNext(205, 3),
    onNext(215, 5)
  )
  const out = sh.startScheduler(() => TrackState({audio$, selectedTrackId$}, 5))
  t.deepEqual(out.messages, [
    onNext(210, 'STOPPED'),
    onNext(220, 'PLAYING')
  ])
})
