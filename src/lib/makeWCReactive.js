/**
 * Created by tushar.mathur on 14/09/16.
 */

'use strict'

export default function (component) {
  Object.defineProperty(component, 'action', {
    set (action) { if (this.onAction) this.onAction(action) },
    get () { return null }
  })
  return component
}
