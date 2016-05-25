/**
 * Created by imamudin.naseem on 24/05/16.
 */

'use strict'

import {Observable as O} from 'rx'

export const ANIMATE_SHOW = 0
export const ANIMATE_HIDE = 1
export const DELETE = 2

export const visibility = ({animationEnd$, isVisible$}) => {
  const show$ = isVisible$.filter(x => x)
  const hide$ = isVisible$.filter(x => !x)
  return O.merge(
    show$.map(ANIMATE_SHOW),
    hide$.map(ANIMATE_HIDE),
    animationEnd$.withLatestFrom(O.merge(show$, hide$)).filter(([, v]) => !v).map(DELETE)
  )
}
