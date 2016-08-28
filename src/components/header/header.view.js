/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import {h} from '@cycle/dom'
import css from './header.style'

export default ({tabs}) => {
  return tabs.DOM.map(tabs =>
    h(`div`, [
      h(`div.${css.header}`, [
        h(`div.${css.headerText}`, [
          h(`div`, [h(`strong`, 'Funag')]),
          h(`small`, ['Unofficial soundcloud player'])
        ]),
        tabs
      ])
    ])
  )
}
