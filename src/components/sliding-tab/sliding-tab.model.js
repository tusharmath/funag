/**
 * Created by tushar.mathur on 27/08/16.
 */

'use strict'

import getRootBCR from '../../dom-api/getRootBCR'

const selectedTab = STORE => STORE.select('view.selectedTab')
const rootWidth = DOM => getRootBCR(DOM).pluck('width')
const marginTop = STORE => STORE.select('animationState.navBarHeight')

export default ({STORE, DOM, tabs$, content$, header}) => {
  const width$ = rootWidth(DOM).startWith(0)
  const selected$ = selectedTab(STORE)
  const marginTop$ = marginTop(STORE)
  return {width$, selected$, tabs$, content$, marginTop$, header}
}
