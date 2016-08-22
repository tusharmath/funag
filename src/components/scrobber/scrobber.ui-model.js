/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

import R from 'ramda'
import BoundingClientRect from '../../lib/BoundingClientRect'
import {mutate, mutateLatest} from '../../lib/BatchUpdates'
import css from './scrobber.style'

/* global CustomEvent */
const getClientX = R.compose(R.prop('clientX'), R.nth(0), R.prop('changedTouches'))
const clearTransition = el => (el.style.transition = null)
const disableTransition = el => (el.style.transition = 'none')
const translateX = R.curry((el, completion) => (el.style.transform = `translateX(${100 * (completion - 1)}%)`))
const dispatchEvent = (el, name, detail) => {
  el.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    detail: detail
  }))
}

export class ScrobberUIModel {
  constructor () {
    this.isMoving = false
    this.mutate = mutateLatest()
  }

  onUpdate (completion) {
    if (this.isMoving) return
    this.updatePosition(completion)
  }

  onInsert (e) {
    this.dimensions = BoundingClientRect(e.elm)
    this.scrobberEL = e.elm
  }

  updatePosition (completion) {
    if (completion >= 0 && completion <= 1 && this.scrobberTrackEL) {
      this.mutate(() => translateX(this.scrobberTrackEL, completion))
    }
  }

  getCompletion (e) {
    return getClientX(e) / this.dimensions.width
  }

  onTouchStart (e) {
    this.isMoving = true
    mutate(() => disableTransition(this.scrobberTrackEL))
    dispatchEvent(this.scrobberEL, 'changeStart', {completion: this.getCompletion(e)})
  }

  onTouchMove (e) {
    const completion = getClientX(e) / this.dimensions.width
    this.updatePosition(completion)
  }

  onTouchEnd (e) {
    this.isMoving = false
    mutate(() => clearTransition(this.scrobberTrackEL))
    dispatchEvent(this.scrobberEL, 'changeEnd', {completion: this.getCompletion(e)})
  }

  onTrackInsert (e) {
    this.scrobberTrackEL = e.elm
  }

  render ({completion}) {
    const ui = this
    this.onUpdate(completion)
    return (
      <div classNames={[css.scrobber, 'scrobber']} key='scrobber'
           hook-insert={ui.onInsert.bind(ui)}
           hook-update={ui.onUpdate.bind(ui)}
      >
        <div hook-insert={ui.onTrackInsert.bind(ui)}
             className={css(css.scrobberTrack, 'flb row jc_fe draggable-marker')}>
          <div className={css.scrobberIcon}
               on-touchStart={ui.onTouchStart.bind(ui)}
               on-touchstart={ui.onTouchStart.bind(ui)}
               on-touchmove={ui.onTouchMove.bind(ui)}
               on-touchend={ui.onTouchEnd.bind(ui)}
          />
        </div>
      </div>
    )
  }
}
