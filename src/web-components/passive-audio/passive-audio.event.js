/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

/* global Event */

export default class PassiveAudioEvent extends Event {
  static get type () {
    return 'passive-audio'
  }

  constructor (params) {
    super(PassiveAudioEvent.type, {bubbles: true})
    this.params = params
  }

  static of (updateParams) {
    return new PassiveAudioEvent(updateParams)
  }

  static is (ev) {
    return ev instanceof PassiveAudioEvent
  }
}
