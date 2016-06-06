/**
 * Created by tushar.mathur on 03/05/16.
 */

'use strict'

import {ReactiveTest, TestScheduler} from 'rxjs'
import test from 'ava'
import {orig} from 'funjector'
import {Audio} from '../src/components/Playlist'
const {onNext} = ReactiveTest

test('Audio()', t => {
  const audio = orig(Audio)
  const sh = new TestScheduler()
  const url$ = sh.createHotObservable(
    onNext(210, '/*')
  )
  const {messages} = sh.startScheduler(() => audio({url$}))
  t.deepEqual(messages, [
    onNext(210, {type: 'PLAY', src: '/*'})
  ])
})

test('Audio():pause/play', t => {
  const audio = orig(Audio)
  const sh = new TestScheduler()
  const url$ = sh.createHotObservable(
    onNext(210, '/*'),
    onNext(220, '/*'),
    onNext(230, '/*'),
    onNext(240, '/*')
  )
  const {messages} = sh.startScheduler(() => audio({url$}))
  t.deepEqual(messages, [
    onNext(210, {type: 'PLAY', src: '/*'}),
    onNext(220, {type: 'PAUSE', src: '/*'}),
    onNext(230, {type: 'PLAY', src: '/*'}),
    onNext(240, {type: 'PAUSE', src: '/*'})
  ])
})

test('Audio():reset', t => {
  const audio = orig(Audio)
  const sh = new TestScheduler()
  const url$ = sh.createHotObservable(
    onNext(210, '/*'),
    onNext(220, '/**'),
    onNext(230, '/**')
  )
  const {messages} = sh.startScheduler(() => audio({url$}))
  t.deepEqual(messages, [
    onNext(210, {type: 'PLAY', src: '/*'}),
    onNext(220, {type: 'PLAY', src: '/**'}),
    onNext(230, {type: 'PAUSE', src: '/**'})
  ])
})
