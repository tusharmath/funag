/**
 * Created by tushar.mathur on 24/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import {h} from '@cycle/dom'
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
    .distinctUntilChanged()
}

export const getIconDOM = (icon) => ({
  [ICONS.LOADER]: Loader(),
  [ICONS.CLEAR]: h('x-square-icon', {attrs: {icon: 'close'}}),
  [ICONS.SEARCH]: h('x-square-icon', {attrs: {icon: 'search'}})
})[icon]
