/**
 * Created by tushar.mathur on 10/09/16.
 */

'use strict'

import h from 'hyperscript'
import style from './loader.style'

export default {
  createdCallback () {
    const root = this.attachShadow({mode: 'open'})
    root.appendChild(h('style', style.toString()))
    root.appendChild(this.view())
  },

  view () {
    return h(`div.loaderContainer`, [
      h(`div.loader`)
    ])
  }
}
