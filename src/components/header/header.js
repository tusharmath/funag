/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import SearchBox from '../search/search'
import view from './header.view'

export default (sources) => {
  const searchBox = SearchBox(sources)
  return {
    DOM: view({searchBox}),
    HTTP: searchBox.HTTP,
    EVENTS: searchBox.EVENTS,
    STORE: searchBox.STORE
  }
}
