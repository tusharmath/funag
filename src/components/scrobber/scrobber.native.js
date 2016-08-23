/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import BoundingClientRect from '../../lib/BoundingClientRect'
import {mutate, mutateLatest} from '../../lib/BatchUpdates'
import NativeComponent from '../../lib/NativeComponent'
import getClientX from '../../lib/getClientX'
import customEvent from '../../lib/customEvent'
import view from './scrobber.native-view'
import R from 'ramda'

const clearTransition = el => (el.style.transition = null)
const disableTransition = el => (el.style.transition = 'none')
const translateX = (el, completion) => (
  el.style.transform = `translateX(${100 * (completion - 1)}%)`
)
const completionEvent = R.useWith(
  customEvent, [R.identity, R.objOf('completion')]
)

export class ScrobberUIModel extends NativeComponent {
  constructor () {
    super()
    this.isMoving = false
    this.mutatePosition = mutateLatest()
    this.attachView(ScrobberUIModel.tagName, view(this))
  }

  onParamsUpdated (completion) {
    if (this.isMoving) return
    this.__updatePosition(completion)
  }

  onCreatedCallback () {
    this.dimensions = BoundingClientRect(this.root)
    this.scrobberTrackEL = this.root.querySelector('.scrobberTrack')
  }

  __updatePosition (completion) {
    if (completion >= 0 && completion <= 1 && this.scrobberTrackEL) {
      this.mutatePosition(() => translateX(this.scrobberTrackEL, completion))
    }
  }

  __getCompletion (e) {
    return getClientX(e) / this.dimensions.width
  }

  __onTouchStart (e) {
    this.isMoving = true
    mutate(() => disableTransition(this.scrobberTrackEL))
    this.dispatchEvent(completionEvent('changeStart', this.__getCompletion(e)))
  }

  __onTouchMove (e) {
    this.__updatePosition(this.__getCompletion(e))
  }

  __onTouchEnd (e) {
    this.isMoving = false
    mutate(() => clearTransition(this.scrobberTrackEL))
    this.dispatchEvent(completionEvent('changeEnd', this.__getCompletion(e)))
  }
}

ScrobberUIModel.tagName = 'x-scrobber'
