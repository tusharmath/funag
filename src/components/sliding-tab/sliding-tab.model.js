/**
 * Created by tushar.mathur on 27/08/16.
 */

'use strict'

import getRootBCR from '../../dom-api/getRootBCR'
import SlidingTabHooks from './sliding-tab.hooks'

const selectedTab = STORE => STORE.select('view.selectedTab')
const rootWidth = DOM => getRootBCR(DOM).pluck('width')

export default ({STORE, DOM, tabs$, content$}) => {
  const hooks = new SlidingTabHooks()
  const width$ = rootWidth(DOM).startWith(0)
  const selected$ = selectedTab(STORE)
  return {width$, selected$, tabs$, content$, hooks}
}
