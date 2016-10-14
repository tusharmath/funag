/**
 * Created by tushar.mathur on 17/09/16.
 */

'use strict'

import R from 'ramda'
import minmax from '../../lib/minmax'
import {ModalShowEvent, ModalHideEvent} from './modal.events'

function onDrag (params, state) {
  const {dragX, dragY} = params.detail
  const translateY = dragY * 100
  return R.merge(state, {
    opacity: minmax(0, 1, 1 - dragY),
    translateY: translateY < 0 ? state.translateY : translateY,
    isMoving: !(dragX === 0 && dragY === 0)
  })
}
export default (state, {type, params}) => {
  switch (type) {
    case '@@rwc/prop/show':
      return state.show === params.valueOf() ? state : R.merge(state, {
        show: params.valueOf(),
        animationCompleted: false,
        animationStatus: params.valueOf() ? 'enter' : 'exit'
      })
    case 'OVERLAY_CLICK':
      return R.merge(state, {
        show: false,
        animationStatus: 'exit',
        animationCompleted: false
      })
    case 'DRAG':
      return onDrag(params, state)
    case 'ANIMATION_END':
      return [R.assoc('animationCompleted', true, state),
        state.show ? ModalShowEvent.of(params) : ModalHideEvent.of(params)
      ]
    default:
      return state
  }
}