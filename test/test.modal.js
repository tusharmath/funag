/**
 * Created by tushar.mathur on 16/09/16.
 */

'use strict'

import test from 'ava'
import Modal from '../src/web-components/modal/modal'
import {
  ModalShowEvent,
  ModalHideEvent
} from '../src/web-components/modal/modal.events'

const {update} = Modal
function mockAction (type, params) {
  return {type, params}
}
test('@@rwc/prop/show', t => {
  t.deepEqual(
    update({}, mockAction('@@rwc/prop/show', false)),
    {show: false, animationCompleted: false, action: 'exit'}
  )
  t.deepEqual(
    update({}, mockAction('@@rwc/prop/show', true)),
    {show: true, animationCompleted: false, action: 'enter'}
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
    {show: false, animationCompleted: false, action: 'exit'}
  )
})
test('ANIMATION_END', t => {
  t.deepEqual(
    update({show: true}, mockAction('ANIMATION_END')),
    [{show: true, animationCompleted: true}, ModalShowEvent.of()]
  )
  t.deepEqual(
    update({show: false}, mockAction('ANIMATION_END')),
    [{show: false, animationCompleted: true}, ModalHideEvent.of()]
  )
})
