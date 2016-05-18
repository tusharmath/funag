/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {Observable} from 'rx'

export const inputVal = $el => $el.events('keyup').map(x => x.target.value).distinctUntilChanged()

export const swipe = ({DOM, select}) => {
  const touchStart$ = DOM.select(select).events('touchstart')
  const touchEnd$ = DOM.select(select).events('touchend')
  return Observable.merge(touchStart$, touchEnd$)
    .timeInterval()
    .filter(x => x.interval < 500)
    .withLatestFrom(touchStart$, touchEnd$)
    .map(([, start, end]) => start.changedTouches[0].clientY > end.changedTouches[0].clientY ? 'SWIPE-UP' : 'SWIPE-DOWN')
}
