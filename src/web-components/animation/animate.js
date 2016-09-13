/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

import registerWC from '../../lib/registerWC'
import h from 'hyperscript'
import value from '../../lib/value'

const isFunction = (e) => typeof e === 'function'

registerWC('fg-animate', {
  createdCallback () {
    this.__show = false
    this.__content = h('div', [h('slot')])
    Object.defineProperties(this, {
      enterAnimation: {
        get: () => this.__enterAnimation,
        set: (value) => {
          if (isFunction(value)) this.__enterAnimation = value
        }
      },
      exitAnimation: {
        get: () => this.__exitAnimation,
        set: (value) => {
          if (isFunction(value)) this.__exitAnimation = value
        }
      },
      duration: {
        get: () => this.__duration || 300,
        set: (value) => (this.__duration = value)
      },
      show: {
        get: () => this.__show,
        set: (show) => {
          if (value.get(show) === this.__show) return
          this.__show = value.get(show)
          this.__animate()
        }
      }
    })
    this.__root = this.attachShadow({mode: 'open'})
  },
  attachedCallback () {
    if (this.show) {
      this.__root.appendChild(this.__content)
    }
  },
  __playEnterAnimation () {
    if (this.enterAnimation) this.enterAnimation(this)
  },
  __playExitAnimation () {
    if (this.exitAnimation) this.exitAnimation(this)
  },
  __animate () {
    this.show ? this.__playEnterAnimation() : this.__playExitAnimation()
  }
})
