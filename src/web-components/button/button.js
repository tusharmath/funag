/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import h from 'snabbdom/h'

export default {
  props: ['wide'],
  init (e) {
    return {wide: e.wide}
  },
  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/prop/wide':
        return {wide: params}
      default:
        return state
    }
  },
  view ({wide}) {
    return h('button.icon-button', {class: {'--wide': wide}}, [
      h('slot')
    ])
  }
}
