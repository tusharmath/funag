/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import SlidingTabs from '../sliding-tab/sliding-tab'
import view from './header.view'

export default (sources) => {
  const tabs = SlidingTabs(sources)
  return {DOM: view({tabs}), STORE: tabs.STORE}
}
