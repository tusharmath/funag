/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import R from 'ramda'

export const selectedTab = ({STORE}) => {
  return STORE.select('view.selectedTab')
}

export default (sources) => {
  const tab$ = selectedTab(sources)
  return R.merge(sources, {tab$})
}
