/**
 * Created by tushar.mathur on 07/09/16.
 */

'use strict'

import http from 'superagent'
import getRootNode from '../../dom-api/getRootNode'
import {Response} from './reactive-http.events'
import makeWCReactive from '../../lib/makeWCReactive'

export default {
  createdCallback () {
    makeWCReactive(this)
    this.__timeout = null
    Object.defineProperty(this, 'debounce', {
      set (value) { this.__debounce = value },
      get () { return this.__debounce }
    })
    this.debounce = parseInt(this.getAttribute('debounce')) || 0
    this.__root = getRootNode(this)
  },

  __dispatch (response) {
    this.dispatchEvent(Response.event(response.body))
  },

  __makeRequest ({url, method = 'GET'}) {
    if (this.__request) this.__request.abort()
    this.__request = http(method, url)
      .end((err, response) => {
        if (err) throw err
        this.__dispatch(response)
      })
  },

  __setupRequest (params) {
    if (this.__timeout) clearTimeout(this.__timeout)
    this.__timeout = setTimeout(() => {
      this.__timeout = null
      this.__makeRequest(params)
    }, this.debounce)
  },

  onAction ({type, params}) {
    switch (type) {
      case 'request':
        return this.__setupRequest(params)
    }
  }
}
