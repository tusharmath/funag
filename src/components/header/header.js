/**
 * Created by tushar.mathur on 20/08/16.
 */

'use strict'

import h from 'snabbdom/h'
import css from './header.style'
import IconButton from '../fa-icon-button/fa-icon-button'

export default {
  render () {
    return h('div', [
      h(`.fade-in.${css.headerContainer}`, [
        h('div.flb.row.jc_c.ai_c', [
          h(`.flb.spread.${css.headerText}`, [
            h('div', [
              h('strong', 'Funag')
            ]),
            h('div', [
              h('small', 'Unofficial soundcloud player')
            ])
          ]),
          IconButton.render('search')
        ])
      ])
    ])
  }
}
