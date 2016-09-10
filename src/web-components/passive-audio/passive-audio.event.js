/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

/* global Event */

/* global Event */

export class PlayEvent extends Event {
  constructor (funagEventParams) {
    super(PlayEvent.type, {bubbles: true})
    this.funagEventParams = funagEventParams
  }

  static get type () {
    return 'FunagPassiveAudioPlayEvent'.toLowerCase()
  }

  static of (...t) {
    return new PlayEvent(...t)
  }

  static is (ev) {
    return ev instanceof PlayEvent
  }
}

/* global Event */

export class PauseEvent extends Event {
  constructor (funagEventParams) {
    super(PauseEvent.type, {bubbles: true})
    this.funagEventParams = funagEventParams
  }

  static get type () {
    return 'FunagPassiveAudioPauseEvent'.toLowerCase()
  }

  static of (...t) {
    return new PauseEvent(...t)
  }

  static is (ev) {
    return ev instanceof PauseEvent
  }
}

/* global Event */

export class SeekEvent extends Event {
  constructor (funagEventParams) {
    super(SeekEvent.type, {bubbles: true})
    this.funagEventParams = funagEventParams
  }

  static get type () {
    return 'FunagPassiveAudioSeekEvent'.toLowerCase()
  }

  static of (...t) {
    return new SeekEvent(...t)
  }

  static is (ev) {
    return ev instanceof SeekEvent
  }
}
