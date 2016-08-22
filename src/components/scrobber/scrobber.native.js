/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import R from 'ramda'
import BoundingClientRect from '../../lib/BoundingClientRect'
import {mutate, mutateLatest} from '../../lib/BatchUpdates'
import css from './scrobber.style'
import NativeComponent from '../../lib/NativeComponent'

/* global CustomEvent */
const getClientX = R.compose(R.prop('clientX'), R.nth(0), R.prop('changedTouches'))
const clearTransition = el => (el.style.transition = null)
const disableTransition = el => (el.style.transition = 'none')
const translateX = (el, completion) => (el.style.transform = `translateX(${100 * (completion - 1)}%)`)
const customEvent = (name, detail) => new CustomEvent(name, {
  bubbles: true,
  detail: detail
})

export class ScrobberUIModel extends NativeComponent {
  constructor () {
    super()
    this.isMoving = false
    this.mutatePosition = mutateLatest()
    this.attachView(ScrobberUIModel.tagName,
      <div classNames={[css.scrobber, 'scrobber']}
           key='scrobber'>
        <div className={css(css.scrobberTrack, 'scrobberTrack')}>
          <div className={css.scrobberIcon}
               on-touchStart={this.__onTouchStart.bind(this)}
               on-touchstart={this.__onTouchStart.bind(this)}
               on-touchmove={this.__onTouchMove.bind(this)}
               on-touchend={this.__onTouchEnd.bind(this)}
          />
        </div>
      </div>)
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
    return {completion: getClientX(e) / this.dimensions.width}
  }

  __onTouchStart (e) {
    this.isMoving = true
    mutate(() => disableTransition(this.scrobberTrackEL))
    this.dispatchEvent(customEvent('changeStart', this.__getCompletion(e)))
  }

  __onTouchMove (e) {
    const completion = getClientX(e) / this.dimensions.width
    this.__updatePosition(completion)
  }

  __onTouchEnd (e) {
    this.isMoving = false
    mutate(() => clearTransition(this.scrobberTrackEL))
    this.dispatchEvent(customEvent('changeEnd', this.__getCompletion(e)))
  }
}
ScrobberUIModel.tagName = 'x-scrobber'
