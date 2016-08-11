import * as R from 'ramda'
/**
 * Created by tushar.mathur on 11/08/16.
 */

'use strict'

export default root => {
  const clientX = R.compose(R.prop('clientX'), R.head, R.prop('changedTouches'))
  return {
    startX () {
      return root.events('touchstart').map(clientX)
    },
    moveX () {
      return root.events('touchmove').map(clientX)
    }
  }
}
