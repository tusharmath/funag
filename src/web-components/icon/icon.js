/**
 * Created by tushar.mathur on 08/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'

export default {
  props: ['icon'],

  init () {
    return {
      icon: null
    }
  },

  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/prop/icon':
        return R.assoc('icon', params, state)
      default :
        return state
    }
  },

  view ({icon}) {
    return icon ? h('i.material-icons', [icon]) : ''
  }
}
