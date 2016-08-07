/**
 * Created by tushar.mathur on 06/08/16.
 */

'use strict'

export default (min$, max$, value$) => value$.withLatestFrom(min$, max$)
  .map(([min, max, val]) => Math.max(Math.min(min, val), max))
  .distinctUntilChanged()
