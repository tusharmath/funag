/**
 * Created by imamudin.naseem on 25/08/16.
 */

import css from './header.style'
import {h} from '@cycle/dom'
import {Observable as O} from 'rx'

export default () => O.just(
  h(`div.${css.headerContainer}`, [
    h(`div.${css.headerText}`, [
      h(`div`, [h(`strong`, 'Funag')]),
      h(`small`, ['Unofficial soundcloud player'])
    ])
  ])
)
