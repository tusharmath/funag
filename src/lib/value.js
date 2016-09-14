/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

export default class Value {
  constructor (e) {
    this.__value = e
  }

  static of (e) {
    return new Value(e)
  }

  static get (e) {
    return e.__value
  }

  value () {
    return this.__value
  }

  equals (e) {
    return this.__value === e
  }
}
