/**
 * Created by tushar.mathur on 24/08/16.
 */

'use strict'

import {Observable as O} from 'rx'

export const ICONS = {
  LOADER: 'loader',
  CLEAR: 'clear',
  SEARCH: 'search'
}

export const getIcon = (hasValue$, isLoading$) => {
  return O.combineLatest(hasValue$.startWith(false), isLoading$.startWith(false))
    .map(([hasValue, isLoading]) => {
      if (isLoading) return ICONS.LOADER
      if (hasValue) return ICONS.CLEAR
      return ICONS.SEARCH
    })
}
