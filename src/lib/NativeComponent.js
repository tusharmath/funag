/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import h from 'snabbdom/h'

export default class NativeComponent {
  constructor () {
    this.__mounted = false
    this.root = null
  }

  attachView (tagName, view) {
    const events = {insert: this.__onInsert.bind(this)}
    this.__view = h(tagName, {hook: events}, [view])
  }

  __onInsert (e) {
    this.__mounted = true
    this.root = e.elm
    if (this.onCreatedCallback) this.onCreatedCallback(this.root)
  }

  dispatchEvent (event) {
    this.root.dispatchEvent(event)
  }

  update (...args) {
    if (this.onParamsUpdated && this.__mounted) this.onParamsUpdated(...args)
    return this.__view
  }
}
