/**
 * Created by tushar.mathur on 05/05/16.
 */

'use strict'

import {ReactiveTest, TestScheduler, Observable} from 'rx'
import test from 'ava'
import {currentTrack, createPlaylist} from '../src/Utils/Playlist'
const {onNext, onCompleted} = ReactiveTest

test('currentTrack():play/pause', t => {
  const sh = new TestScheduler()
  const playlist$ = Observable.just([0, 1, 2])
  const instruction$ = sh.createHotObservable(
    onNext(220, {type: 'NEXT'}),
    onNext(230, {type: 'NEXT'}),
    onNext(240, {type: 'NEXT'}),
    onNext(250, {type: 'PREVIOUS'}),
    onNext(260, {type: 'PREVIOUS'}),
    onNext(280, {type: 'PREVIOUS'}),
    onNext(280, {type: 'PREVIOUS'})
  )
  const {messages} = sh.startScheduler(() => currentTrack({instruction$, playlist$}))
  t.deepEqual(messages, [
    onNext(200, 0),
    onNext(220, 1), // N
    onNext(230, 2), // N
    onNext(240, 0), // P
    onNext(250, 2), // P
    onNext(260, 1), // P
    onNext(280, 0), // P
    onNext(280, 2) // P
  ])
})

test('createPlaylist()', t => {
  const sh = new TestScheduler()
  const instruction$ = sh.createHotObservable(
    onNext(220, {type: 'APPEND', track: 1}),
    onNext(230, {type: 'PREPEND', track: 2}),
    onNext(240, {type: 'APPEND', track: 3}),
    onNext(250, {type: 'DELETE', track: 1}),
    onNext(260, {type: 'CLEAR'})
  )
  const {messages} = sh.startScheduler(() => createPlaylist({instruction$}))
  t.deepEqual(messages, [
    onNext(220, [1]),
    onNext(230, [2, 1]),
    onNext(240, [2, 1, 3]),
    onNext(250, [2, 3]),
    onNext(260, [])
  ])
})
