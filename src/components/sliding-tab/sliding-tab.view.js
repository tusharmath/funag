/**
 * Created by tushar.mathur on 26/08/16.
 */

'use strict'

import {h} from '@cycle/dom'
import {Observable as O} from 'rx'
import css from './sliding-tab.style'

const controlSTYLE = (tabs) => ({width: `${100 / tabs.length}%`})
const containerSTYLE = (tabs, selected) => ({
  transform: `translateX(${100 / tabs.length * selected}%)`
})
const li = (name, i) => h(`li`, {attrs: {id: i}}, name)

export const view = (width, selected, tabs) => {
  const containerParams = {
    style: containerSTYLE(tabs, selected)
  }
  return h(`div`, [
    h(`div.${css.navContainer}`, [
      h(`ul.nav-items`, tabs.map(li)),
      h(`div.control-container`, containerParams, [
        h(`div.control`, {style: controlSTYLE(tabs)})
      ])
    ])
  ])
}

export default ({width$, selected$, tabs$}) => {
  console.log(typeof tabs$)
  return O.combineLatest(width$, selected$, tabs$, view)
}
