/**
 * Created by tushar.mathur on 07/09/16.
 */

'use strict'

/* global fetch */

import getRootNode from '../../dom-api/getRootNode'
import {Request, Response} from './http.events'

export default {
  createdCallback () {
    this.__timeout = null
    this.debounce = parseInt(this.getAttribute('debounce')) || 0
    this.onRequest = this.onRequest.bind(this)
    this.__root = getRootNode(this)
    document.addEventListener(Request.type, this.onRequest)
  },

  set debounce (value) {
    this.__debounce = value
  },

  get debounce () {
    return this.__debounce
  },

  __dispatch (response) {
    this.dispatchEvent(Response.of(response))
  },

  makeRequest ({url, params}) {
    fetch(url, params)
      .then(response => response.json())
      .then(
        json => this.__dispatch(json),
        function (err) { throw err }
      )
  },

  onRequest (ev) {
    if (this.__timeout) clearTimeout(this.__timeout)
    this.__timeout = setTimeout(() => {
      this.__timeout = null
      this.makeRequest(ev.detail)
    }, this.debounce)
  }
}
