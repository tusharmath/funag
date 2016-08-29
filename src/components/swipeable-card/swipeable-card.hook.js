/**
 * Created by tushar.mathur on 29/08/16.
 */

'use strict'

import getClientX from '../../dom-api/getClientX'
import css from './swipeable-card.style'
import {mutateLatest} from '../../lib/BatchUpdates'

export default class Hook {
  constructor () {
    this.mutateLatest = mutateLatest()
    this.__captureMove = false
    this.__isMoving = false
  }

  insert (e) {
    this.__node = e.elm
  }

  updateX (clientX) {
    this.mutateLatest(() => {
      this.__node.style.transform = `translateX(${clientX}px)`
    })
  }

  onTouchMove (e) {
    const clientX = getClientX(e)
    const delta = Math.abs(this.__startX - clientX)
    if (this.__captureMove) {
      this.updateX(clientX)
      e.preventDefault()
    } else if (delta > 0 && this.__isMoving === false) {
      this.__captureMove = true
      this.updateX(clientX)
      e.preventDefault()
    }
    this.__isMoving = true
  }

  onTouchStart (e) {
    this.__startX = getClientX(e)
    this.__node.classList.add(css.noTransition)
  }

  onTouchEnd (e) {
    this.__node.classList.remove(css.noTransition)
    this.__captureMove = false
    this.__isMoving = false
  }

  get on () {
    return {
      touchmove: this.onTouchMove.bind(this),
      touchstart: this.onTouchStart.bind(this),
      touchend: this.onTouchEnd.bind(this)
    }
  }
}
