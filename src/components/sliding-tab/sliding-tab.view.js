/**
 * Created by tushar.mathur on 26/08/16.
 */

'use strict'

import {h} from '@cycle/dom'
import {Observable as O} from 'rx'
import css from './sliding-tab.style'
import getRootBCR from '../../lib/getRootBCR'

const controlSTYLE = (tabs) => ({
  width: `${100 / tabs.length}%`
})
const controlContainerSTYLE = (tabs, selected) => ({
  transform: `translateX(${100 / tabs.length * selected}%)`
})
const sectionSTYLE = (tabs, width, selected) => ({
  width: `${tabs.length * 100}%`,
  transform: `translateX(-${width * selected}px)`
})

const selectedTab = STORE => STORE.select('view.selectedTab')
const li = (name, i) => h(`li`, {attrs: {id: i}}, name)
const rootWidth = DOM => getRootBCR(DOM).pluck('width')
const contentSectionItem = (content) => h(`li`, [content])

export default ({STORE, DOM, tabs$, content$}) => {
  const width$ = rootWidth(DOM).startWith(0)
  const selected$ = selectedTab(STORE)
  return O.combineLatest(
    width$, selected$, tabs$, content$,
    (width, selected, tabs, content) =>
      h(`div.sliding-tab`, [
        h(`div.${css.navContainer}`, [
          h(`ul.nav-items`, tabs.map(li)),
          h(`div.control-container`, {style: controlContainerSTYLE(tabs, selected)}, [
            h(`div.control`, {style: controlSTYLE(tabs)})
          ])
        ]),
        h(`div.${css.contentSection}`, [
          h(`ul`, {style: sectionSTYLE(tabs, width, selected)},
            content.map(contentSectionItem)
          )
        ])
      ])
  )
}
