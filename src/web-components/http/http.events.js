/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

/* global Event */

export class Request extends Event {
  constructor (url, params) {
    super('http-request', {bubbles: true})
    this.url = url
    this.params = params
  }

  static of (url, params) {
    return new Request(url, params)
  }
}

export class Response extends Event {
  constructor (response) {
    super('http-response', {bubbles: true})
    this.response = response
  }

  static of (response) {
    return new Response(response)
  }
}
