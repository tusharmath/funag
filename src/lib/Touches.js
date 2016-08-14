/**
 * Created by tushar.mathur on 11/08/16.
 */

'use strict'

import * as R from 'ramda'

export default function Touches (root) {
  const changedTouches = R.compose(R.head, R.prop('changedTouches'))
  const clientX = R.compose(R.prop('clientX'), changedTouches)

  const start = root.events('touchstart')
  const end = root.events('touchend')
  const move = root.events('touchmove')

  const startX = start.map(clientX)
  const endX = end.map(clientX)
  const moveX = move.map(clientX)
  return {
    start, move, end,
    startX, moveX, endX
  }
}
