/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

export const inputVal = $el => $el.events('keyup').map(x => x.target.value).distinctUntilChanged()
export const doubleClick = ($el, timespan) => $el
  .events('click')
  .timeInterval()
  .filter(x => x.interval < timespan)
  .pluck('value')
