/**
 * Created by tushar.mathur on 20/05/16.
 */

'use strict'

import {ReactiveTest, TestScheduler} from 'rx'
import test from 'ava'
import OverlayStatus from '../src/utils/OverlayStatus'
const {onNext, onCompleted} = ReactiveTest

test(t => {
  const sh = new TestScheduler()
  const selectedTrackId$ = sh.createColdObservable(
    onNext(0, 10)
  )
  const audio$ = sh.createHotObservable(
    onNext(210, {event: 'reallyPlaying'}),
    onNext(220, {event: 'pause'}),
    onNext(230, {event: 'reallyPlaying'}),
    onNext(240, {event: 'ended'})
  )
  const {messages} = sh.startScheduler(() => OverlayStatus({selectedTrackId$, audio$, id: 10}))
  t.deepEqual(
    messages, [
      onNext(200, 'SHOW_NONE'),

      onNext(210, 'PLAY_ANIMATION'),
      onNext(220, 'PAUSE_ANIMATION'),
      onNext(230, 'PLAY_ANIMATION'),
      onNext(240, 'SHOW_NONE')
    ]
  )
})
