/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

/* global HTMLElement */

import {PlayEvent, PauseEvent, SeekEvent} from './passive-audio.event'
import validURL from 'valid-url'
import getRootNode from '../../dom-api/getRootNode'

function updateCurrentTime (audio, {funagEventParams}) {
  audio.currentTime = funagEventParams.completion * audio.duration
}
export default class PassiveAudio extends HTMLElement {
  static get observedAttributes () { return ['src'] }

  createdCallback () {
    this.__onUpdate = this.__onUpdate.bind(this)
    this.__audio = document.createElement('audio')
    this.src = this.getAttribute('src')
  }

  attachedCallback () {
    this.__root = getRootNode(this).host
    this.__root.addEventListener(PlayEvent.type, this.__onUpdate)
    this.__root.addEventListener(PauseEvent.type, this.__onUpdate)
    this.__root.addEventListener(SeekEvent.type, this.__onUpdate)
    this.src = this.getAttribute('src')
  }

  detachedCallback () {
    this.__root.removeEventListener(PlayEvent.type, this.__onUpdate)
    this.__root.removeEventListener(PauseEvent.type, this.__onUpdate)
    this.__root.removeEventListener(SeekEvent.type, this.__onUpdate)
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
    if (PlayEvent.is(ev)) this.__audio.play()
    else if (PauseEvent.is(ev)) this.__audio.pause()
    else if (SeekEvent.is(ev)) updateCurrentTime(this.__audio, ev)
  }
}
