/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import Search from '../search/search'

export default ({DOM, HTTP}) => {
  const search = Search({DOM, HTTP})
  return {DOM: search.DOM, EVENTS: search.events$}
}
