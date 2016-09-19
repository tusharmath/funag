/**
 * Created by tushar.mathur on 17/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import {DragEvent} from '../draggable/draggable.events'

const DAMPED = {
  stopPropagation: true,
  preventDefault: true
}

export default (state, dispatch) => {
  const {show, translateY, opacity, isMoving} = state
  return h('div', {class: {hidden: !show, 'no-anime': isMoving}}, [
    h('div.modal-container', [
      h('div.dark-overlay', {
        style: {opacity: opacity.toString()},
        on: {
          click: dispatch('OVERLAY_CLICK', DAMPED)
        }
      }),
      h('div.slot-container', {
        style: {transform: `translateY(${translateY}%)`},
        hook: {insert: dispatch('INSERTED')}
      }, [
        h('fg-enhanced-drag', {on: {[DragEvent]: dispatch('DRAG')}}, [
          h('slot')
        ])
      ])
    ])
  ])
}
