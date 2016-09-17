/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import validURL from 'valid-url'
import makeWCReactive from '../../lib/makeWCReactive'

function updateCurrentTime (audio, {completion}) {
  audio.currentTime = completion * audio.duration
}
function isValidSource (audio, value) {
  return validURL.isUri(value) && value !== audio.src
}
export default {
  createdCallback () {
    makeWCReactive(this)
    this.__audio = document.createElement('audio')
  },

  addEventListener (...args) {
    return this.__audio.addEventListener(...args)
  },

  removeEventListener (...args) {
    return this.__audio.removeEventListener(...args)
  },

  onAction ({type, params = {}}) {
    switch (type) {
      case 'play':
        if (isValidSource(this.__audio, params.src)) {
          this.__audio.src = params.src
        }
        return this.__audio.play()
      case 'pause':
        return this.__audio.pause()
      case 'seek':
        return updateCurrentTime(this.__audio, params)
    }
  }
}
