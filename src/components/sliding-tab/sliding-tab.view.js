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
const contentSTYLE = (tabs, width, selected) => ({
  width: `${tabs.length * 100}%`,
  transform: `translateX(-${width * selected}px)`
})
const li = (name, i) => h(`li`, {attrs: {id: i}}, name)
const contentSectionItem = (content) => h(`li`, [content])

export const view = (width, selected, tabs, content) => {
  const contentParams = {
    style: contentSTYLE(tabs, width, selected)
  }
  const containerParams = {
    style: containerSTYLE(tabs, selected)
  }
  return h(`div`, [
    h(`div.${css.slidingTabHeader}`, [
      h(`div.${css.headerText}`, [
        h(`div`, [h(`strong`, 'Funag')]),
        h(`small`, ['Unofficial soundcloud player'])
      ]),
      h(`div.${css.navContainer}`, [
        h(`ul.nav-items`, tabs.map(li)),
        h(`div.control-container`, containerParams, [
          h(`div.control`, {style: controlSTYLE(tabs)})
        ])
      ])
    ]),
    h(`div.${css.contentSection}`, [
      h(`ul`, contentParams, content.map(contentSectionItem))
    ])
  ])
}

export default ({width$, selected$, tabs$, content$}) => {
  return O.combineLatest(width$, selected$, tabs$, content$, view)
}
