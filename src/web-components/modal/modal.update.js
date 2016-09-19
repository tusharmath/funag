/**
 * Created by tushar.mathur on 17/09/16.
 */

'use strict'

import R from 'ramda'
import minmax from '../../lib/minmax'

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
        action: params.valueOf() ? 'enter' : 'exit'
      })
    case 'OVERLAY_CLICK':
      return R.merge(state, {
        show: false,
        action: 'exit',
        animationCompleted: false
      })
    case 'DRAG':
      return onDrag(params, state)
    case 'ANIMATION_END':
      return R.assoc('animationCompleted', true, state)
    default:
      return state
  }
}
