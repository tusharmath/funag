/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

import registerWC from '../../lib/registerWC'
import getRootNode from '../../dom-api/getRootNode'
import {AnimationStartEvent, AnimationEndEvent} from './animation-events'

registerWC('fg-animate', {
  createdCallback () {
    this.__lastAction = null
    this.__applyAnimation = this.__applyAnimation.bind(this)
    this.__onAnimationCompleted = this.__onAnimationCompleted.bind(this)

    Object.defineProperties(this, {
      animation: {
        get: () => this.__animation,
        set: (value) => (this.__animation = value)
      },
      action: {
        get: () => this.__lastAction,
        set: (_action) => {
          const action = _action.valueOf()
          if (action === this.__lastAction) return
          this.__lastAction = action
          this.__beginAnimation(action)
        }
      }
    })
  },
  attachedCallback () {
    this.__root = getRootNode(this)
    this.__animate(this.__lastAction)
  },
  __beginAnimation (action) {
    if (!this.animation || !this.__root) return
    this.dispatchEvent(AnimationStartEvent.of(this))
    const promises = this.__animate(action)
    Promise.all(promises).then(this.__onAnimationCompleted)
  },
  __onAnimationCompleted () {
    this.dispatchEvent(AnimationEndEvent.of(this))
  },
  __applyAnimation ({animation, select}) {
    return animation(this.__root.querySelector(select)).then(t => t.finished)
  },
  __animate (action) {
    switch (action) {
      case 'enter':
        return this.animation.enter.map(this.__applyAnimation)
      case 'exit':
        return this.animation.exit.map(this.__applyAnimation)
      default :
        return []
    }
  }
})
