/**
 * Created by tushar.mathur on 18/09/16.
 */

'use strict'

import test from 'ava'
import update from '../src/web-components/modal/modal.update'

function mockAction (type, params) {
  return {type, params}
}
function Elm () {
  return {getBoundingClientRect: () => ({height: 100})}
}

test('START', t => {
  const elm = Elm()
  const out = update({elm},
    mockAction('START', {changedTouches: [{clientY: 10}]})
  )
  t.deepEqual(out, {
    elm,
    touchStart: 10,
    touchMove: 10,
    height: 100,
    isMoving: true
  })
})
test('MOVE', t => {
  const out = update(
    {
      touchMove: 8,
      opacity: 0.8,
      height: 80,
      translateY: 80
    },
    mockAction('MOVE', {changedTouches: [{clientY: 10}]})
  )
  t.deepEqual(out, {
    touchMove: 10,
    opacity: 0.775,
    height: 80,
    translateY: 82.5
  })
})
test('END', t => {
  const out = update(
    {},
    mockAction('END', {})
  )
  t.deepEqual(out, {
    isMoving: false,
    translateY: 0,
    opacity: 1
  })
})
