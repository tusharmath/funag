/**
 * Created by tushar.mathur on 18/09/16.
 */

'use strict'

import test from 'ava'
import update from '../src/web-components/modal/modal.update'

function mockAction (type, detail) {
  return {type, params: {detail}}
}
test('DRAG', t => {
  const out = update({}, mockAction('DRAG', {dragX: 0, dragY: 0}))
  t.deepEqual(out, {
    opacity: 1,
    translateY: 0,
    isMoving: false
  })
})
