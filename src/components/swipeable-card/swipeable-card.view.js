/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import {h} from '@cycle/dom'
import {Observable as O} from 'rx'
import css from './swipeable-card.style'

export default () => O.just(
  h(`div.${css.swipeableCard}`, [
    h(`ul`, [
      h(`li`, 'CONTENT A'),
      h(`li`, 'CONTENT B'),
      h(`li`, 'CONTENT C'),
      h(`li`, 'CONTENT D')
    ])
  ])
)

