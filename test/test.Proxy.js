/**
 * Created by tushar.mathur on 29/04/16.
 */

'use strict'

import {ReactiveTest, TestScheduler} from 'rx'
import test from 'ava'
import HoistObserverable from '../src/Utils/Proxy'
const {onNext, onCompleted} = ReactiveTest

test(t => {
  const sh = new TestScheduler()
  const obProxy = HoistObserverable(() => ob)
  const ob = sh.createHotObservable(
    onNext(210, 1),
    onCompleted(220)
  )
  const {messages} = sh.startScheduler(() => obProxy)
  t.deepEqual(messages, [
    onNext(210, 1),
    onCompleted(220)
  ])
})

test('multiple-subscription', t => {
  const sh = new TestScheduler()
  const obProxy = HoistObserverable(() => ob)
  const observer0 = sh.createObserver()
  const observer1 = sh.createObserver()
  const ob = sh.createHotObservable(
    onNext(110, 1),
    onNext(220, 2),
    onNext(230, 3),
    onCompleted(240)
  )

  sh.scheduleAbsolute(null, 200, () => obProxy.subscribe(observer0))
  sh.scheduleAbsolute(null, 225, () => obProxy.subscribe(observer1))
  sh.start()

  t.deepEqual(observer0.messages, [
    onNext(220, 2),
    onNext(230, 3),
    onCompleted(240)
  ])

  t.deepEqual(observer1.messages, [
    onNext(225, 2),
    onNext(230, 3),
    onCompleted(240)
  ])

})
