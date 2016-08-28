/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import Tab from '../tab/tab'
import view from './header.view'

export default (sources) => {
  const tabs = Tab(sources)
  return {DOM: view({tabs}), STORE: tabs.STORE}
}
