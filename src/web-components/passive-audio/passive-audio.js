/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import validURL from 'valid-url'
import makeWCReactive from '../../lib/makeWCReactive'

function updateCurrentTime (audio, {completion}) {
  audio.currentTime = completion * audio.duration
}
export default {
  createdCallback () {
    makeWCReactive(this)
    this.__audio = document.createElement('audio')
    Object.defineProperty(this, 'src', {
      get () { return this.__audio.src },
      set (value) {
        if (validURL.isUri(value) && value !== this.__audio.src) {
          this.__audio.src = value
        }
      }
    })
    this.src = this.getAttribute('src')
  },

  attachedCallback () {
    this.src = this.getAttribute('src')
  },

  detachedCallback () {
    this.disposable()
  },

  attributeChangedCallback (name, old, src) {
    if (name === 'src') this.src = src
  },

  addEventListener (...args) {
    return this.__audio.addEventListener(...args)
  },

  removeEventListener (...args) {
    return this.__audio.removeEventListener(...args)
  },

  onAction ({type, params}) {
    switch (type) {
      case 'play':
        return this.__audio.play()
      case 'pause':
        return this.__audio.pause()
      case 'seek':
        return updateCurrentTime(this.__audio, params)
    }
  }
}
