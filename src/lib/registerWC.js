/**
 * Created by tushar.mathur on 24/08/16.
 */

'use strict'

import {document} from 'window-or-global'
/* global HTMLElement */

export default (name, proto) => {
  const prototype = Object.assign(Object.create(HTMLElement.prototype), proto)
  document.registerElement(name, {prototype})
}
