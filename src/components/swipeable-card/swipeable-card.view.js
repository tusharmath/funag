/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import {h} from '@cycle/dom'
import {Observable as O} from 'rx'
import css from './swipeable-card.style'

export const getWidth = (cards) => ({
  width: `${cards.length * 100}%`
})

function getParams ({translateX}) {
  return {style: {delayed: {transform: `translateX(${translateX})`}}}
}

export default ({cards$, tab$, translateX$}) => {
  return O.combineLatest(
    cards$, tab$, translateX$.startWith(0),
    (cards, tab, translateX) =>
      h(`div`, [
        h(`div.${css.swipeableCardContainer}`, [
          h(`div.${css.swipeableCard}`, {style: getWidth(cards)}, [
            h(`ul`, getParams({translateX}),
              cards.map(i => h(`li`, [i]))
            )
          ])
        ])
      ])
  )
}


