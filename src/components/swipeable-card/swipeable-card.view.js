/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import {h} from '@cycle/dom'
import css from './swipeable-card.style'

export const style = (cards) => ({
  width: `${cards.length * 100}%`
})

export default ({cards$}) => cards$.map(cards =>
  h(`div.${css.swipeableCardContainer}`, [
    h(`div.${css.swipeableCard}`, {style: style(cards)}, [
      h(`ul`, cards.map(i => h(`li`, [i])))
    ])
  ])
)

