/**
 * Created by tushar.mathur on 10/09/16.
 */

'use strict'

/* global Event */

export class FunagInputValue extends Event {
  constructor (funagEventParams) {
    super('FunagInputValue'.toLowerCase(), {bubbles: true})
    this.funagEventParams = funagEventParams
  }

  static of (...t) {
    return new FunagInputValue(...t)
  }

  static is (ev) {
    return ev instanceof FunagInputValue
  }
}
