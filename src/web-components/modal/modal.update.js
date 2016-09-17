/**
 * Created by tushar.mathur on 17/09/16.
 */

'use strict'

import R from 'ramda'
import getClientY from '../../dom-api/getClientY'
import minmax from '../../lib/minmax'

function onTouchMove (params, state) {
  const clientY = getClientY(params)
  const change = (clientY - state.touchMove) / state.height
  const translateY = state.translateY + change * 100
  return R.merge(state, {
    touchMove: clientY,
    opacity: minmax(0, 1, state.opacity - change),
    translateY: translateY < 0 ? state.translateY : translateY
  })
}
function onTouchEnd (params, state) {
  return R.merge(state, {
    isMoving: false,
    translateY: 0,
    opacity: 1
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
    case 'INSERTED':
      return R.assoc('elm', params.elm, state)
    case 'OVERLAY_CLICK':
      return R.merge(state, {
        show: false,
        action: 'exit',
        animationCompleted: false
      })
    case 'START':
      return R.merge(state, {
        touchStart: getClientY(params),
        touchMove: getClientY(params),
        height: state.elm.getBoundingClientRect().height,
        isMoving: true
      })
    case 'MOVE':
      return onTouchMove(params, state)
    case 'END':
      return onTouchEnd(params, state)
    case 'ANIMATION_END':
      return R.assoc('animationCompleted', true, state)
    default:
      return state
  }
}
