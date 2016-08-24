/**
 * Created by tushar.mathur on 16/05/16.
 */

'use strict'

import {getIcon, getIconDOM} from './search-icon.model'

export default ({hasValue$, isLoading$, DOM}) => {
  const clear$ = DOM.select('x-icon-button[icon="close"]').events('click')
  const icon$ = getIcon(hasValue$, isLoading$)
    .map(getIconDOM)

  return {DOM: icon$, clear$}
}
