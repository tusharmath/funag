/**
 * Created by tushar.mathur on 24/08/16.
 */

'use strict'

import {ReactiveTest, TestScheduler} from 'rx'
import test from 'ava'
import {getIcon, ICONS} from '../src/components/search-icon/search-icon.model'
const {onNext} = ReactiveTest

test(t => {
  const sh = new TestScheduler()
  const isLoading$ = sh.createHotObservable(
    onNext(215, true),
    onNext(220, false)
  )
  const hasValue$ = sh.createHotObservable(
    onNext(210, true)
  )
  const {messages} = sh.startScheduler(() => getIcon(hasValue$, isLoading$))
  t.deepEqual(messages, [
    onNext(200, ICONS.SEARCH),
    onNext(210, ICONS.CLEAR),
    onNext(215, ICONS.LOADER),
    onNext(220, ICONS.CLEAR)
  ])
})
