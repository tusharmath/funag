/**
 * Created by tushar.mathur on 30/04/16.
 */

'use strict'

import test from 'ava'
import {orig} from 'funjector'
import {ReactiveTest, TestScheduler, Observable} from 'rxjs'
import * as SC from '../src/utils/SoundCloud'
const {onNext, onCompleted} = ReactiveTest

test('durationFormat()', t => {
  t.is(SC.durationFormat(5000), '0:50')
  t.is(SC.durationFormat(60000), '1:00')
  t.is(SC.durationFormat(645000), '10:45')
})

test('searchTracks()', t => {
  const searchTracks = orig(SC.searchTracks)
  const sh = new TestScheduler()

  const get = (_, {q}) => Observable.just(q).delay(q * 100, sh)

  const q$ = sh.createHotObservable(
    onNext(210, 5),
    onNext(220, 1)
  )

  const {messages} = sh.startScheduler(() => searchTracks(get, q$))
  t.deepEqual(messages, [onNext(320, 1)])
})
