/**
 * Created by tushar.mathur on 07/09/16.
 */

'use strict'

/* global HTMLElement fetch CustomEvent */

export default class Http extends HTMLElement {
  set url (url) {
    if (this.__url !== url) {
      this.__url = url
      this.__request()
    }
  }

  get url () {
    return this.__url
  }

  set params (params) {
    if (this.__params !== params) {
      this.__params = params
      this.__request()
    }
  }

  get params () {
    return this.__params
  }

  __dispatch (name, response) {
    this.dispatchEvent(new CustomEvent(name, {detail: response}))
  }

  __request () {
    fetch(this.__url, this.__params)
      .then(
        response => this.__dispatch('response', response),
        error => this.__dispatch('error', error)
      )
  }
}
