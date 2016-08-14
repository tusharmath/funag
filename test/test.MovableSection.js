/**
 * Created by tushar.mathur on 14/08/16.
 */

'use strict'

import {ReactiveTest, TestScheduler} from 'rx'
import test from 'ava'
import {createMovableSection} from '../src/lib/MovableSection'
const {onNext, onCompleted} = ReactiveTest

test('return to default', t => {
  const sh = new TestScheduler()
  const startX = sh.createHotObservable(
    onNext(210, 10)
  )
  const moveX = sh.createHotObservable(
    onNext(220, 15),
    onNext(221, 16),
    onNext(222, 18),
    onNext(223, 19)
  )
  const endX = sh.createHotObservable(
    onNext(225, 20)
  )
  const width$ = sh.createColdObservable(
    onNext(0, 100)
  )
  const {messages} = sh.startScheduler(() =>
    createMovableSection(startX, moveX, endX, width$)
  )

  t.deepEqual(messages, [
    onNext(221, {x: 1, animate: false}),
    onNext(222, {x: 3, animate: false}),
    onNext(223, {x: 4, animate: false}),
    onNext(225, {x: 0, animate: true})
  ])
})

test('swipe right', t => {
  const sh = new TestScheduler()
  const startX = sh.createHotObservable(
    onNext(210, 10)
  )
  const moveX = sh.createHotObservable(
    onNext(220, 15),
    onNext(221, 35),
    onNext(222, 55),
    onNext(223, 75)
  )
  const endX = sh.createHotObservable(
    onNext(225, 60)
  )
  const width$ = sh.createColdObservable(
    onNext(0, 100)
  )
  const {messages} = sh.startScheduler(() =>
    createMovableSection(startX, moveX, endX, width$)
  )

  t.deepEqual(messages, [
    onNext(221, {x: 20, animate: false}),
    onNext(222, {x: 40, animate: false}),
    onNext(223, {x: 60, animate: false}),
    onNext(225, {x: 100, animate: true})
  ])
})

test('start and stop', t => {
  const sh = new TestScheduler()
  const startX = sh.createHotObservable(
    onNext(210, 10),
    onNext(223, 11)
  )
  const moveX = sh.createHotObservable(
    onNext(220, 10),
    onNext(221, 20),
    onNext(222, 30),

    onNext(224, 10),
    onNext(225, 20),
    onNext(226, 30),
    onNext(227, 40)
  )
  const endX = sh.createHotObservable(
    onNext(222, 30),
    onNext(227, 40)
  )
  const width$ = sh.createColdObservable(
    onNext(0, 100)
  )
  const {messages} = sh.startScheduler(() =>
    createMovableSection(startX, moveX, endX, width$, 0.2)
  )
  t.deepEqual(messages, [
    onNext(221, {x: 10, animate: false}),
    onNext(222, {x: 20, animate: false}),
    onNext(222, {x: 100, animate: true}),
    onNext(225, {x: 110, animate: false}),
    onNext(226, {x: 120, animate: false}),
    onNext(227, {x: 130, animate: false}),
    onNext(227, {x: 200, animate: true})
  ])
})
