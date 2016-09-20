/**
 * Created by tushar.mathur on 21/09/16.
 */

'use strict'

import root from 'window-or-global'

export class CustomEvent {
  constructor (type, options) {
    this.type = type
    Object.assign(this, options)
  }
}
export default root.CustomEvent || CustomEvent
