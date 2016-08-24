/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import h from 'hyperscript'
import BoundingClientRect from '../../lib/BoundingClientRect'
import {mutate, mutateLatest} from '../../lib/BatchUpdates'
import getClientX from '../../lib/getClientX'
import customEvent from '../../lib/customEvent'
import view from './slider.view'
import registerWC from '../../lib/registerWC'
import style from './slider.style'
import R from 'ramda'

const clearTransition = el => (el.style.transition = null)
const disableTransition = el => (el.style.transition = 'none')
const translateX = (el, completion) => (
  el.style.transform = `translateX(${100 * (completion - 1)}%)`
)
const completionEvent = R.useWith(
  customEvent, [R.identity, R.objOf('completion')]
)

registerWC('x-slider', {
  attributeChangedCallback (name, _, completion) {
    if (name !== 'completion') return
    if (this.isMoving) return
    this.__updatePosition(Number(completion))
  },

  createdCallback () {
    this.isMoving = false
    this.mutatePosition = mutateLatest()
    this.__shadowRoot = this.createShadowRoot()
    this.__shadowRoot.appendChild(h('style', style.toString()))
    this.__shadowRoot.appendChild(view(this))
  },

  attachedCallback () {
    this.scrobberTrackEL = this.__shadowRoot.querySelector('.scrobberTrack')
    this.dimensions = BoundingClientRect(this.__shadowRoot.querySelector('div'))
    console.log(this.dimensions)
  },

  __updatePosition (completion) {
    if (completion >= 0 && completion <= 1 && this.scrobberTrackEL) {
      this.mutatePosition(() => translateX(this.scrobberTrackEL, completion))
    }
  },

  __getCompletion (e) {
    return getClientX(e) / this.dimensions.width
  },

  __onTouchStart (e) {
    this.isMoving = true
    mutate(() => disableTransition(this.scrobberTrackEL))
    this.dispatchEvent(completionEvent('changeStart', this.__getCompletion(e)))
  },

  __onTouchMove (e) {
    this.__updatePosition(this.__getCompletion(e))
  },

  __onTouchEnd (e) {
    this.isMoving = false
    mutate(() => clearTransition(this.scrobberTrackEL))
    this.dispatchEvent(completionEvent('changeEnd', this.__getCompletion(e)))
  }
})
