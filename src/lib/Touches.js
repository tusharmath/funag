import * as R from 'ramda'
/**
 * Created by tushar.mathur on 11/08/16.
 */

'use strict'

export default root => {
  const changedTouches = R.compose(R.head, R.prop('changedTouches'))
  const clientX = R.compose(R.prop('clientX'), changedTouches)
  const startX = root.events('touchstart').map(clientX)
  const endX = root.events('touchend').map(clientX)
  const moveX = root.events('touchmove').map(clientX)
  return {startX, moveX, endX}
}
