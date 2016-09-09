/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import h from 'snabbdom/h'

export default {
  init () {

  },

  update () {},

  view () {
    return h(`div.container`, [
      h(`h1`, ['How you doing?']),
      h(`div.control-container`, [
        h(`funag-mini-audio-control`)
      ])
    ])
  }
}
