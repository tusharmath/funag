/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import {h} from '@cycle/dom'
import {Observable as O} from 'rx'
import css from './swipeable-card.style'
import Hook from './swipeable-card.hook'

export const getWidth = (cards) => ({
  width: `${cards.length * 100}%`
})

export const getTranslateX = (tab, cards) => ({
  transform: `translateX(-${tab / cards.length * 100}%)`
})

export default ({cards$, tab$}) => {
  const hook = new Hook()
  return O.combineLatest(cards$, tab$, (cards, tab) =>
    h(`div`, [
      h(`div.${css.swipeableCardContainer}`, [
        h(`div.${css.swipeableCard}`, {style: getWidth(cards)}, [
          h(`ul`, {style: getTranslateX(tab, cards), hook, on: hook.on},
            cards.map(i => h(`li`, [i]))
          )
        ])
      ])
    ])
  )
}


