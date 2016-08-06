/**
 * Created by tushar.mathur on 31/05/16.
 */

'use strict'
import R from 'ramda'
import {raf$} from './DOMUtils'

export default ({start, end, move}) => {
  return start
    .flatMap(
      () => raf$()
        .withLatestFrom(move, R.nthArg(1))
        .takeUntil(end)
    )
}
