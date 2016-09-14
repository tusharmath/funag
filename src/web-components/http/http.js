/**
 * Created by tushar.mathur on 07/09/16.
 */

'use strict'

import http from 'superagent'
import getRootNode from '../../dom-api/getRootNode'
import {Request, Response} from './http.events'

export default {
  createdCallback () {
    this.__timeout = null
    Object.defineProperty(this, 'debounce', {
      set (value) { this.__debounce = value },
      get () { return this.__debounce }
    })
    this.debounce = parseInt(this.getAttribute('debounce')) || 0
    this.onRequest = this.onRequest.bind(this)
    this.__root = getRootNode(this)
    document.addEventListener(Request.type, this.onRequest)
  },

  __dispatch (response) {
    this.dispatchEvent(Response.of(response.body))
  },

  makeRequest ({url, method = 'GET'}) {
    if (this.__request) this.__request.abort()
    this.__request = http(method, url)
      .end((err, response) => {
        if (err) throw err
        this.__dispatch(response)
      })
  },

  onRequest (ev) {
    if (this.__timeout) clearTimeout(this.__timeout)
    this.__timeout = setTimeout(() => {
      this.__timeout = null
      this.makeRequest(ev.detail)
    }, this.debounce)
  }
}
