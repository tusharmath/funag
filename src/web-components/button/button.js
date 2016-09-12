/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import h from 'snabbdom/h'

export default {
  init () {},
  update (state) { return state },
  view () {
    return h('button.icon-button', [h('slot')])
  }
}
