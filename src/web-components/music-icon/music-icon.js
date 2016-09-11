/**
 * Created by tushar.mathur on 10/09/16.
 */

'use strict'

import h from 'snabbdom/h'
import R from 'ramda'

export default {
  props: ['paused'],
  init () {
    return {paused: false}
  },
  update (state, {type, params}) {
    switch (type) {
      case '@@rwc/prop/paused':
        return R.assoc('paused', params, state)
      default:
        return state
    }
  },
  view ({paused}) {
    return h(`div.artworkContainer`, [
      h(`div.playingAnimation`, {class: {'pause-animation': paused}},
        R.repeat(h('li'), 3)
      )
    ])
  }
}
