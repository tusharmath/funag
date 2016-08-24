/**
 * Created by tushar.mathur on 24/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import Loader from '../loader/loader'

export const ICONS = {
  LOADER: 'loader',
  CLEAR: 'clear',
  SEARCH: 'search'
}

export const getIcon = (hasValue$, isLoading$) => {
  return O.combineLatest(
    hasValue$.startWith(false),
    isLoading$.startWith(false)
  )
    .map(([hasValue, isLoading]) => {
      if (isLoading) return ICONS.LOADER
      if (hasValue) return ICONS.CLEAR
      return ICONS.SEARCH
    })
}

export const getIconDOM = (icon) => ({
  [ICONS.LOADER]: Loader(),
  [ICONS.CLEAR]: <x-icon-button key='close' attrs-icon='close'/>,
  [ICONS.SEARCH]: <x-icon-button key='search' attrs-icon='search'/>
})[icon]
