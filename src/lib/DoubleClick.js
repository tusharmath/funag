/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

export default (element, timeout = 600, sh) => element
  .events('click')
  .timeInterval(sh)
  .bufferWithCount(2)
  .filter(([a, b]) => b.interval < timeout)
  .map(([a, b]) => [a.value, b.value])
