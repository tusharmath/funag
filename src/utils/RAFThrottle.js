/**
 * Created by tushar.mathur on 31/05/16.
 */

'use strict'
import {demux} from 'muxer'
import R from 'ramda'
import {raf$} from './DOMUtils'

export default signal$ => {
  const [{move, start, end}] = demux(signal$, 'move', 'start', 'end')
  return start
    .flatMap(() => raf$().takeUntil(end))
    .withLatestFrom(move, R.nthArg(1))
}
