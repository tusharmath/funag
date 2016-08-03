/**
 * Created by tushar.mathur on 29/04/16.
 */

'use strict'

import {ReactiveTest, TestScheduler, Observable} from 'rxjs'
import test from 'ava'
import Proxy from '../src/utils/Proxy'
const {onNext, onCompleted} = ReactiveTest

const testFunction = source$ => source$.map(x => x * 2)

test(t => {
  const obProxy = Proxy()
  const sh = new TestScheduler()
  const out = obProxy.writer(testFunction(obProxy.reader().startWith(1)).delay(100, sh))
  const {messages} = sh.startScheduler(() => out.take(4))
  t.deepEqual(messages, [
    onNext(300, 2),
    onNext(400, 4),
    onNext(500, 8),
    onNext(600, 16),
    onCompleted(600)
  ])
})

test(t => {
  const obProxy = Proxy()
  const sh = new TestScheduler()
  const out = obProxy.writer(testFunction(obProxy.reader().startWith(1)).delay(100, sh))
  const observer0 = sh.createObserver()
  const observer1 = sh.createObserver()
  const observer2 = sh.createObserver()

  // expects 2, ends@410
  sh.scheduleAbsolute(null, 210, () => out.take(2).subscribe(observer0))
  // expects 3, ends@620
  sh.scheduleAbsolute(null, 320, () => out.take(3).subscribe(observer1))
  // expects 4, ends@620
  sh.scheduleAbsolute(null, 620, () => out.take(4).subscribe(observer2))

  sh.start()

  t.deepEqual(observer0.messages, [
    onNext(310, 2),
    onNext(410, 4),
    onCompleted(410)
  ])

  t.deepEqual(observer1.messages, [
    onNext(410, 4),
    onNext(510, 8),
    onNext(610, 16),
    onCompleted(610)
  ])

  t.deepEqual(observer2.messages, [onCompleted(620)])
})

test(t => {
  const obProxy = Proxy()
  t.is(obProxy.reader().onNext, void 0)
})

test(t => {
  const obProxy = Proxy()
  const sideEffects = []
  const sh = new TestScheduler()
  const observer0 = sh.createObserver()
  const observer1 = sh.createObserver()
  const out = obProxy.writer(Observable.of(100).tap(x => sideEffects.push(x)))
  out.subscribe(observer0)
  out.subscribe(observer1)
  t.deepEqual(sideEffects, [100])
  t.deepEqual(observer0.messages, [onNext(0, 100), onCompleted(0)])
  t.deepEqual(observer1.messages, [onCompleted(0)])
})
