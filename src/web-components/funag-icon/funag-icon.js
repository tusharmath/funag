/**
 * Created by tushar.mathur on 08/09/16.
 */

'use strict'

import h from 'snabbdom/h'

export default {
  props: ['icon'],

  init (el) {
    return {icon: el.getAttribute('icon') || el.icon || ''}
  },

  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/attr/icon':
        return {icon: params}
      case '@@rwc/prop/icon':
        return {icon: params}
      default :
        return state
    }
  },

  view ({icon}) {
    return h('i.material-icons', [icon])
  }
}
