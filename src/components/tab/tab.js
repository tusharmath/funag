/**
 * Created by tushar.mathur on 10/08/16.
 */

'use strict'

import {Observable as O, Subject} from 'rx'
import R from 'ramda'
import css from './tab.style'
import TabNavItem from './tab-nav-item/tab-nav-item'
import {collectionFrom} from '../../lib/CycleCollection'

const calcDimensions = dim => ({
  width: dim.width,
  transform: `translateX(${dim.left}px)`
})
const view = ({navItemsDOM$, sections, dim$}) => O
  .combineLatest(navItemsDOM$, dim$.startWith(null))
  .map(([nav, dim]) =>
    <div className={css.tabs}>
      <ul className={css.tabsNavBar}>{nav}</ul>
      <div className={css.tabNavBarSlider} style={dim}/>
    </div>
  )
const createTabItems = (DOM, nav, navItemsClickCopy$) => {
  const selected$ = navItemsClickCopy$.startWith(0)
  const sources = {DOM, selected$}
  return collectionFrom(TabNavItem, sources, O.just(nav))
}
const Tab = ({DOM, nav, sections}) => {
  const navItemsClickCopy$ = new Subject()
  const navItems = createTabItems(DOM, nav, navItemsClickCopy$)
  const navItemsDOM$ = navItems.combined('DOM')
  const navItemsClick$ = navItems.merged('click$')
  const navItemsBCR$ = navItems.combined('bcr$')
  const selectedTab$ = navItemsClick$.multicast(navItemsClickCopy$).refCount()
  const dim$ = O.combineLatest(
    selectedTab$.startWith(0), navItemsBCR$, R.nth
  )
    .map(calcDimensions)
    .distinctUntilChanged()
  const vTree$ = view({sections, dim$, navItemsDOM$})
  return {DOM: vTree$, selectedTab$}
}

export default Tab
