/**
 * Created by tushar.mathur on 21/08/16.
 */

'use strict'

import h from 'hyperscript'
import R from 'ramda'
import HTMLElement from '../../lib/HTMLElement'
import document from '../../lib/Document'
import css from './scrobber.style'
import {mutateLatest, mutate} from '../../lib/BatchUpdates'

/* global CustomEvent */
const getClientX = R.compose(R.prop('clientX'), R.nth(0), R.prop('changedTouches'))
const createEventListeners = c => ({
  ontouchstart: c.onTouchStart.bind(c),
  ontouchmove: c.onTouchMove.bind(c),
  ontouchend: c.onTouchEnd.bind(c)
})
const clearTransition = el => (el.style.transition = null)
const disableTransition = el => (el.style.transition = 'none')
const translateX = R.curry((el, completion) => (el.style.transform = `translateX(${100 * (completion - 1)}%)`))
const dispatchEvent = (el, name, detail) => {
  el.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    detail: detail
  }))
}

export class ScrobberWC extends HTMLElement {
  createdCallback () {
    this.isMoving = false
    this.shadow = this.createShadowRoot()
    this.mutate = mutateLatest()
    this.render()
  }

  attributeChangedCallback (name, oldV, newV) {
    if (this.isMoving) return
    const completion = Number(newV)
    this.updatePosition(completion)
  }

  attachedCallback () {
    this.dimensions = this.getBoundingClientRect()
  }

  updatePosition (completion) {
    if (completion >= 0 && completion <= 1) {
      this.mutate(() => translateX(this.draggableEL, completion))
    }
  }

  getCompletion (e) {
    return getClientX(e) / this.dimensions.width
  }

  onTouchStart (e) {
    this.isMoving = true
    mutate(() => disableTransition(this.draggableEL))
    dispatchEvent(this, 'changeStart', {completion: this.getCompletion(e)})
  }

  onTouchMove (e) {
    e.preventDefault()
    const completion = getClientX(e) / this.dimensions.width
    this.updatePosition(completion)
  }

  onTouchEnd (e) {
    this.isMoving = false
    mutate(() => clearTransition(this.draggableEL))
    dispatchEvent(this, 'changeEnd', {completion: this.getCompletion(e)})
  }

  render () {
    const eventsListener = createEventListeners(this)
    this.draggableEL = h('div.scrobberTrack.flb.row.jc_fe.draggable-marker', [
      h('div.scrobberIcon', eventsListener)
    ])
    this.shadow.appendChild(h('style', css.toString()))
    this.scrobberEL = h('div.scrobber', [this.draggableEL])
    this.shadow.appendChild(this.scrobberEL)
  }
}

document.registerElement('wc-scrobber', ScrobberWC)
