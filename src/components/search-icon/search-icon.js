/**
 * Created by tushar.mathur on 16/05/16.
 */

'use strict'

import isolate from '@cycle/isolate'
import {getIcon, getIconDOM} from './search-icon.model'

export const SearchIcon = ({hasValue$, isLoading$, DOM}) => {
  const clear$ = DOM
    .select('x-icon-button[icon="close"]')
    .events('click')
    .map('')
  const icon$ = getIcon(hasValue$, isLoading$)
    .map(getIconDOM)

  return {DOM: icon$, clear$}
}

export default sources => isolate(SearchIcon)(sources)
