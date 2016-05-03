/**
 * Created by tushar.mathur on 03/05/16.
 */

'use strict'

import {ReactiveTest, TestScheduler} from 'rx'
import test from 'ava'
import {orig} from 'funjector'
import {Audio} from '../src/ui/playlist/Models'
const {onNext, onCompleted} = ReactiveTest

test('Audio()', t => {
  const audio = orig(Audio)
  const sh = new TestScheduler()
  const selectedTrack$ = sh.createHotObservable(
    onNext(210, {id: 0, stream_url: '/*'})
  )
  const {messages} = sh.startScheduler(() => audio(100, {selectedTrack$}))
  t.deepEqual(messages, [
    onNext(210, {type: 'LOAD', src: '/*100'})
  ])
})

test('Audio():pause/play', t => {
  const audio = orig(Audio)
  const sh = new TestScheduler()
  const selectedTrack$ = sh.createHotObservable(
    onNext(210, {id: 0, stream_url: '/*'}),
    onNext(220, {id: 0, stream_url: '/*'}),
    onNext(230, {id: 0, stream_url: '/*'}),
    onNext(240, {id: 0, stream_url: '/*'})
  )
  const {messages} = sh.startScheduler(() => audio(100, {selectedTrack$}))
  t.deepEqual(messages, [
    onNext(210, {type: 'LOAD', src: '/*100'}),
    onNext(220, {type: 'PAUSE'}),
    onNext(230, {type: 'PLAY'}),
    onNext(240, {type: 'PAUSE'})
  ])
})
