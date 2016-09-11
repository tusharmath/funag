/**
 * Created by tushar.mathur on 11/09/16.
 */

'use strict'

import h from 'hyperscript'
import style from './app-bar.style'

const view = () => h('div', [
  h('div.js_slotContainer.slot-container', [h('slot')]),
  h('div.js_placeholder')
])

export default {
  createdCallback () {
    this.__onScroll = this.__onScroll.bind(this)

    this.__root = this.attachShadow({mode: 'open'})
    this.__root.appendChild(h('style', [style.toString()]))
    this.__root.appendChild(view())
    this.__slotContainer = this.__root.querySelector('.js_slotContainer')
    this.__placeholder = this.__root.querySelector('.js_placeholder')
    window.addEventListener('scroll', this.__onScroll)
  },

  attachedCallback () {
    this.__top = this.getBoundingClientRect().top
    this.__height = this.getBoundingClientRect().height
  },

  detachedCallback () {
    window.removeEventListener('scroll', this.__onScroll)
  },

  __onScroll () {
    const toggleClass = this.getAttribute('toggleClass')
    if (window.scrollY >= this.__top) {
      this.__slotContainer.classList.add('position-fixed')
      if (this.__placeholder.style.height !== this.__height) {
        this.__placeholder.style.height = this.__height
      }
      if (toggleClass) this.children[0].classList.add(toggleClass)
    } else {
      this.__slotContainer.classList.remove('position-fixed')
      if (toggleClass) this.children[0].classList.remove(toggleClass)
      if (this.__placeholder.style.height !== 0) {
        this.__placeholder.style.height = 0
      }
    }
  }
}
