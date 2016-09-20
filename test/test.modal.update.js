/**
 * Created by tushar.mathur on 16/09/16.
 */

'use strict'

import test from 'ava'
import Modal from '../src/web-components/modal/modal'
import Value from '../src/lib/value'

const {update} = Modal
function mockAction (type, params) {
  return {type, params}
}
test('@@rwc/prop/show', t => {
  t.deepEqual(
    update({}, mockAction('@@rwc/prop/show', Value.of(false))),
    {show: false, animationCompleted: false, animationStatus: 'exit'}
  )
  t.deepEqual(
    update({}, mockAction('@@rwc/prop/show', true)),
    {show: true, animationCompleted: false, animationStatus: 'enter'}
  )
  const state = {show: true}
  t.is(
    update(state, mockAction('@@rwc/prop/show', true)),
    state
  )
})
test('OVERLAY_CLICK', t => {
  t.deepEqual(
    update({}, mockAction('OVERLAY_CLICK')),
    {
      show: false,
      animationCompleted: false,
      animationStatus: 'exit'
    }
  )
})
test('ANIMATION_END', t => {
  t.deepEqual(
    update({}, mockAction('ANIMATION_END')),
    {animationCompleted: true}
  )
})
test('DRAG', t => {
  const out = update({}, mockAction('DRAG', {detail: {dragX: 0, dragY: 0}}))
  t.deepEqual(out, {
    opacity: 1,
    translateY: 0,
    isMoving: false
  })
})
