/**
 * Created by tushar.mathur on 24/09/16.
 */

'use strict'

/* global Event */

export default class EventTask {
  constructor (event) {
    this.event = event
  }

  static of (...t) {
    return new EventTask(...t)
  }

  run (component) {
    if (this.event instanceof Event) {
      return component.dispatchEvent(this.event)
    }
  }
}
