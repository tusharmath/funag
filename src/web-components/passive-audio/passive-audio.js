/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import {PlayEvent, PauseEvent, SeekEvent} from './passive-audio.event'
import validURL from 'valid-url'
import getHostNode from '../../dom-api/getHostNode'
import compositeListener from '../../dom-api/compositeListener'

function updateCurrentTime (audio, {detail}) {
  audio.currentTime = detail.completion * audio.duration
}
export default {
  createdCallback () {
    this.__onEvent = this.__onEvent.bind(this)
    this.__audio = document.createElement('audio')
    this.src = this.getAttribute('src')
  },

  attachedCallback () {
    this.disposable = compositeListener(getHostNode(this), this.__onEvent, [
      PlayEvent.type,
      PauseEvent.type,
      SeekEvent.type
    ])
    this.src = this.getAttribute('src')
  },

  detachedCallback () {
    this.disposable()
  },

  set src (value) {
    if (!validURL.isUri(value)) return
    this.__audio.src = value
  },

  get src () {
    return this.__audio.src
  },

  attributeChangedCallback (name, old, src) {
    this.src = src
  },

  addEventListener (...args) {
    return this.__audio.addEventListener(...args)
  },

  removeEventListener (...args) {
    return this.__audio.removeEventListener(...args)
  },

  __onEvent (ev) {
    switch (ev.type) {
      case PlayEvent.type:
        return this.__audio.play()
      case PauseEvent.type:
        return this.__audio.pause()
      case SeekEvent.type:
        return updateCurrentTime(this.__audio, ev)
    }
  }
}
