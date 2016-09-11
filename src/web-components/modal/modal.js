/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'

export default {
  props: ['show'],
  init () {
    return {
      show: true,
      showContainer: true,
      showSlot: true
    }
  },
  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/prop/show':
        return R.assoc('show', params, state)
      case 'OVERLAY_CLICK':
        return R.assoc('show', false, state)
      case 'CONTAINER_TRANSITION_ENDED':
        return R.assoc('showContainer', false, state)
      case 'SLOT_TRANSITION_ENDED':
        return R.assoc('showSlot', false, state)
      default:
        return state
    }
  },
  view ({show, showSlot, showContainer}, dispatch) {
    const isHidden = showContainer === false && showSlot === false
    return h('div', [
      isHidden ? '' : h('div.modal-container', {
        class: {hidden: !show},
        on: {
          transitionend: dispatch('CONTAINER_TRANSITION_ENDED'),
          click: dispatch('OVERLAY_CLICK', {preventDefault: true})
        }
      }, [
        h('fg-disable-scroll'),
        h('div.slot-container', {
          on: {
            transitionend: dispatch('SLOT_TRANSITION_ENDED'),
            touchstart: dispatch('touchStart', {preventDefault: true}),
            touchmove: dispatch('touchMove', {preventDefault: true}),
            touchend: dispatch('touchEnd', {preventDefault: true})
          }
        }, [h('slot')])
      ])
    ])
  }
}
