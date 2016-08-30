/**
 * Created by tushar.mathur on 30/08/16.
 */

'use strict'

import {ReactiveTest, TestScheduler} from 'rx'
import test from 'ava'
import {getTranslateX} from '../src/components/swipeable-card/swipeable-card.lib'
const {onNext} = ReactiveTest

test('simple-move', t => {
  const sh = new TestScheduler()
  const cardCount$ = sh.createColdObservable(onNext(0, 10))
  const width$ = sh.createHotObservable(onNext(210, 100))
  const tab$ = sh.createHotObservable(onNext(210, 0))
  const startX$ = sh.createHotObservable(onNext(210, 20))
  const endX$ = sh.createHotObservable()
  const moveX$ = sh.createHotObservable(
    onNext(220, 15),
    onNext(225, 10)
  )
  const {messages} = sh.startScheduler(
    () => getTranslateX({startX$, moveX$, endX$, width$, tab$, cardCount$})
  )
  t.deepEqual(messages, [
    onNext(220, -5),
    onNext(225, -10)
  ])
})

test('inside-threshold', t => {
  const sh = new TestScheduler()
  const threshold = 10
  const cardCount$ = sh.createColdObservable(onNext(0, 10))
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
    () => getTranslateX({
      startX$,
      moveX$,
      endX$,
      threshold,
      width$,
      tab$,
      cardCount$
    })
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
  const cardCount$ = sh.createColdObservable(onNext(0, 10))
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
    () => getTranslateX({
      startX$,
      moveX$,
      endX$,
      threshold,
      width$,
      tab$,
      cardCount$
    })
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
  const sh = new TestScheduler()
  const threshold = 10
  const cardCount$ = sh.createColdObservable(onNext(0, 10))
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
    () => getTranslateX({
      startX$,
      moveX$,
      endX$,
      threshold,
      width$,
      tab$,
      cardCount$
    })
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
  const sh = new TestScheduler()
  const threshold = 10
  const cardCount$ = sh.createColdObservable(onNext(0, 10))
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
    () => getTranslateX({
      startX$,
      moveX$,
      endX$,
      threshold,
      width$,
      tab$,
      cardCount$
    })
  )

  t.deepEqual(messages, [
    onNext(210, -400),
    onNext(220, -390),
    onNext(230, -380),
    onNext(240, -370),
    onNext(250, -300)
  ])
})

test('left-edge', t => {
  const sh = new TestScheduler()
  const threshold = 100
  const cardCount$ = sh.createColdObservable(onNext(0, 10))
  const tab$ = sh.createColdObservable(onNext(0, 0))
  const width$ = sh.createColdObservable(onNext(0, 100))
  const startX$ = sh.createHotObservable(onNext(210, 50))
  const endX$ = sh.createHotObservable(onNext(280, 20))
  const moveX$ = sh.createHotObservable(
    onNext(220, 60),
    onNext(230, 70),
    onNext(240, 60),
    onNext(250, 50),
    onNext(260, 40),
    onNext(270, 30)
  )

  const {messages} = sh.startScheduler(
    () => getTranslateX({
      startX$,
      moveX$,
      endX$,
      threshold,
      width$,
      tab$,
      cardCount$
    })
  )
  t.deepEqual(messages, [
    onNext(250, 0),
    onNext(260, -10),
    onNext(270, -20),
    onNext(280, 0)
  ])
})

test('right-edge', t => {
  console.log('===')
  const sh = new TestScheduler()
  const threshold = 50
  const cardCount$ = sh.createColdObservable(onNext(0, 3))
  const tab$ = sh.createColdObservable(onNext(0, 2))
  const width$ = sh.createColdObservable(onNext(0, 100))
  const startX$ = sh.createHotObservable(onNext(210, 50))
  const endX$ = sh.createHotObservable(onNext(270, 80))
  const moveX$ = sh.createHotObservable(
    onNext(210, 40),
    onNext(220, 30),
    onNext(230, 40),
    onNext(240, 50),
    onNext(250, 60),
    onNext(260, 70)
  )

  const {messages} = sh.startScheduler(
    () => getTranslateX(
      {startX$, moveX$, endX$, threshold, width$, tab$, cardCount$}
    )
  )
  t.deepEqual(messages, [
    onNext(240, -200),
    onNext(250, -190),
    onNext(260, -180),
    onNext(270, -200)
  ])
})
