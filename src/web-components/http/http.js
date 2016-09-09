/**
 * Created by tushar.mathur on 07/09/16.
 */

'use strict'

/* global HTMLElement fetch */

import getRootNode from '../../dom-api/getRootNode'
import {Request, Response} from './http.events'

export default class Http extends HTMLElement {
  createdCallback () {
    this.onRequest = this.onRequest.bind(this)
    this.__root = getRootNode(this)
    document.addEventListener('http-request', this.onRequest)
  }

  __dispatch (response) {
    this.dispatchEvent(Response.of(response))
  }

  onRequest (ev) {
    if ((ev instanceof Request)) {
      fetch(ev.url, ev.params)
        .then(response => response.json())
        .then(
          json => this.__dispatch(json),
          function (err) { throw err }
        )
    }
  }
}
