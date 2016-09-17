/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

export default class Value {
  constructor (e) {
    this.__value = e
  }

  static of (e) {
    return e instanceof Value ? e : new Value(e)
  }

  valueOf () {
    return this.__value
  }
}
