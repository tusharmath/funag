/**
 * Created by tushar.mathur on 30/08/16.
 */

'use strict'

import {ReactiveTest, TestScheduler} from 'rx'
import test from 'ava'
import {translateX} from '../src/components/swipeable-card/swipeable-card.lib'
const {onNext} = ReactiveTest

test('simple-move', t => {
  const sh = new TestScheduler()
  const width$ = sh.createHotObservable(onNext(210, 100))
  const tab$ = sh.createHotObservable(onNext(210, 0))
  const startX$ = sh.createHotObservable(onNext(210, 20))
  const endX$ = sh.createHotObservable()
  const moveX$ = sh.createHotObservable(
    onNext(220, 15),
    onNext(225, 10)
  )
  const {messages} = sh.startScheduler(
    () => translateX({startX$, moveX$, endX$, width$, tab$})
  )
  t.deepEqual(messages, [
    onNext(220, -5),
    onNext(225, -10)
  ])
})

test('inside-threshold', t => {
  const sh = new TestScheduler()
  const threshold = 10
  const tab$ = sh.createColdObservable(onNext(0, 0))
  const width$ = sh.createColdObservable(onNext(0, 100))
  const startX$ = sh.createHotObservable(onNext(210, 15))
  const endX$ = sh.createHotObservable(onNext(214, 11))
  const moveX$ = sh.createHotObservable(
    onNext(211, 14),
    onNext(212, 13),
    onNext(213, 12)
  )

  const {messages} = sh.startScheduler(
    () => translateX({startX$, moveX$, endX$, threshold, width$, tab$})
  )
  t.deepEqual(messages, [
    onNext(211, -1),
    onNext(212, -2),
    onNext(213, -3),
    onNext(214, 0)
  ])
})

test('beyond-threshold', t => {
  const sh = new TestScheduler()
  const threshold = 10
  const tab$ = sh.createColdObservable(onNext(0, 0))
  const width$ = sh.createColdObservable(onNext(0, 100))
  const startX$ = sh.createHotObservable(onNext(210, 40))
  const endX$ = sh.createHotObservable(onNext(250, 10))
  const moveX$ = sh.createHotObservable(
    onNext(210, 40),
    onNext(220, 30),
    onNext(230, 20),
    onNext(240, 10)
  )

  const {messages} = sh.startScheduler(
    () => translateX({startX$, moveX$, endX$, threshold, width$, tab$})
  )
  t.deepEqual(messages, [
    onNext(210, 0),
    onNext(220, -10),
    onNext(230, -20),
    onNext(240, -30),
    onNext(250, -100)
  ])
})

test('beyond-threshold:on-tab(1)', t => {
  console.log('-')
  const sh = new TestScheduler()
  const threshold = 10
  const tab$ = sh.createColdObservable(onNext(0, 4))
  const width$ = sh.createColdObservable(onNext(0, 100))
  const startX$ = sh.createHotObservable(onNext(210, 40))
  const endX$ = sh.createHotObservable(onNext(250, 10))
  const moveX$ = sh.createHotObservable(
    onNext(210, 40),
    onNext(220, 30),
    onNext(230, 20),
    onNext(240, 10)
  )

  const {messages} = sh.startScheduler(
    () => translateX({startX$, moveX$, endX$, threshold, width$, tab$})
  )
  t.deepEqual(messages, [
    onNext(210, -400),
    onNext(220, -410),
    onNext(230, -420),
    onNext(240, -430),
    onNext(250, -500)
  ])
})

test('beyond-threshold:on-tab(1):right', t => {
  console.log('-')
  const sh = new TestScheduler()
  const threshold = 10
  const tab$ = sh.createColdObservable(onNext(0, 4))
  const width$ = sh.createColdObservable(onNext(0, 100))
  const startX$ = sh.createHotObservable(onNext(210, 10))
  const endX$ = sh.createHotObservable(onNext(250, 40))
  const moveX$ = sh.createHotObservable(
    onNext(210, 10),
    onNext(220, 20),
    onNext(230, 30),
    onNext(240, 40)
  )

  const {messages} = sh.startScheduler(
    () => translateX({startX$, moveX$, endX$, threshold, width$, tab$})
  )
  
  t.deepEqual(messages, [
    onNext(210, -400),
    onNext(220, -390),
    onNext(230, -380),
    onNext(240, -370),
    onNext(250, -300)
  ])
})
