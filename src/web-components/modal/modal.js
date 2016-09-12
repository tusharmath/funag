/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'

export default {
  props: ['state'],
  init () { return {show: false} },
  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/prop/state':
        return R.assoc('show', params.show, state)
      case 'OVERLAY_CLICK':
        return R.assoc('show', false, state)
      default:
        return state
    }
  },
  view ({show}, dispatch) {
    return h('div', [
      !show ? '' : h('div.modal-container', {
        on: {click: dispatch('OVERLAY_CLICK', {preventDefault: true})}
      }, [
        h('fg-disable-scroll'),
        h('div.slot-container', [
          h('slot')
        ])
      ])
    ])
  }
}
