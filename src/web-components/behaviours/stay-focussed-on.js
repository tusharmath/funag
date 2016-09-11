import registerWC from '../../lib/registerWC';
/**
 * Created by tushar.mathur on 07/09/16.
 */

'use strict'

registerWC('fg-stay-focused-on', {
  createdCallback () {
    this.onFocusOut = this.onFocusOut.bind(this)
    this.__selector = this.select || this.getAttribute('select')
    Object.defineProperty(this, 'select', {
      get: () => this.__selector,
      set: (value) => {
        this.__selector = value
      }
    })
  },
  attributeChangedCallback (name, old, current) {
    if (name === 'select') this.select = current
  },

  onFocusOut (ev) {
    if (ev.target !== this.__toFocus) {
      this.__toFocus.focus()
    }
  },

  attachedCallback () {
    this.__toFocus = this.querySelector(this.__selector)
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].addEventListener('focusin', this.onFocusOut)
    }
  },

  detachedCallback () {
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].removeEventListener('focusin', this.onFocusOut)
    }
  }
})
