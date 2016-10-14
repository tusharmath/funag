/**
 * Created by tushar.mathur on 24/08/16.
 */

'use strict'
/* global HTMLElement */

export default (name, proto) => {
  const prototype = proto instanceof HTMLElement ? proto : Object.assign(
    Object.create(HTMLElement.prototype),
    proto
  )
  document.registerElement(name, {prototype})
}
