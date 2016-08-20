/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import h from 'snabbdom/h'
import css from './fa-icon-button.style'

export default {
  render (icon) {
    return h('button.' + css.iconButton, [
      h(`.fa.fa-${icon} flb col jc_c ai_c`)
    ])
  }
}
