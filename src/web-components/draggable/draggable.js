/**
 * Created by tushar.mathur on 18/09/16.
 */

'use strict'

import raf from '../../schedulers/raf-scheduler'
import {getClientX, getClientY} from '../../dom-api/getClient'
import {DragEvent} from './draggable.events'

function deltaX (a, b) {
  return getClientX(a) - getClientX(b)
}

function deltaY (a, b) {
  return getClientY(a) - getClientY(b)
}

export default {
  createdCallback () {
    this.__dispatchTouchEvent = this.__dispatchTouchEvent.bind(this)
    this.__setChangedTouches = this.__setChangedTouches.bind(this)
    this.__setChangedTouches = this.__setChangedTouches.bind(this)
    this.__onTouchStart = this.__onTouchStart.bind(this)
    this.__onTouchEnd = this.__onTouchEnd.bind(this)

    // TODO: Lazy attach
    this.addEventListener('touchmove', this.__setChangedTouches)
    this.addEventListener('touchstart', this.__onTouchStart)
    this.addEventListener('touchend', this.__onTouchEnd)
  },

  __dispatchTouchEvent () {
    this.dispatchEvent(DragEvent.of({
      dragX: this.__clientX / this.__dimensions.width,
      dragY: this.__clientY / this.__dimensions.height
    }))
  },

  __onTouchStart (ev) {
    ev.preventDefault()
    ev.stopPropagation()
    this.__clientX = 0
    this.__clientY = 0
    this.__dimensions = this.getBoundingClientRect()
    this.__setChangedTouches(ev)
    this.__queue = raf.start(this.__dispatchTouchEvent)
  },

  __onTouchEnd () {
    this.__clientX = 0
    this.__clientY = 0
    this.__dispatchTouchEvent()
    this.__lastEV = null
    raf.stop(this.__queue)
  },

  __setChangedTouches (ev) {
    ev.preventDefault()
    ev.stopPropagation()
    if (this.__lastEV) {
      this.__clientX = this.__clientX + deltaX(ev, this.__lastEV)
      this.__clientY = this.__clientY + deltaY(ev, this.__lastEV)
    }
    this.__lastEV = ev
  },

  detachedCallback () {
    this.removeEventListener('touchmove', this.__setChangedTouches)
    this.removeEventListener('touchstart', this.__onTouchStart)
    this.removeEventListener('touchend', this.__onTouchEnd)
  }
}
