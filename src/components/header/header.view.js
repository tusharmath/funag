/**
 * Created by imamudin.naseem on 25/08/16.
 */

import css from './header.style'
import {h} from '@cycle/dom'

export default ({searchBox}) =>
  searchBox.DOM.map(searchBox =>
    h(`div.${css.headerContainer}`, [
      h(`div.${css.headerText}`, [
        h('div', [h('strong', 'Funag')]),
        h('small', ['Unofficial soundcloud player'])
      ]),
      searchBox
    ])
  )
