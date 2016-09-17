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

test('TOUCH_START', t => {
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
