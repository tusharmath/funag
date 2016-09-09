/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

/* global HTMLAudioElement */

import PassiveAudioEvent from './passive-audio.event'
import validURL from 'valid-url'

export default class PassiveAudio extends HTMLAudioElement {
  static get observedAttributes () { return ['src'] }

  createdCallback () {
    this.__onUpdate = this.__onUpdate.bind(this)
    this.__audio = document.createElement('audio')
    this.appendChild(this.__audio)
  }

  attachedCallback () {
    this.__root = document
    this.__root.addEventListener(PassiveAudioEvent.type, this.__onUpdate)
    this.src = this.getAttribute('src')
  }

  detachedCallback () {
    this.__root.removeEventListener('audio-update', this.__onUpdate)
  }

  set src (value) {
    if (!validURL.isUri(value)) return
    this.__audio.src = value
  }

  attributeChangedCallback (name, old, src) {
    this.src = src
  }

  addEventListener (...args) {
    return this.__audio.addEventListener(...args)
  }

  removeEventListener (...args) {
    return this.__audio.removeEventListener(...args)
  }

  __onUpdate (ev) {
    if (!PassiveAudioEvent.is(ev)) return
    switch (ev.params.type) {
      case 'play':
        this.__audio.play()
        break
      case 'pause':
        this.__audio.pause()
        break
      case 'seek':
        this.__audio.currentTime = this.__audio.duration * ev.params.to
        break
    }
  }
}
