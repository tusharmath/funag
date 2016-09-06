/**
 * Created by tushar.mathur on 03/09/16.
 */

'use strict'

import snabbdom from 'snabbdom'

const patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/eventlisteners'),
  require('snabbdom/modules/attributes')
])

export default function snabbdomPatcher (shadowRoot) {
  let __vNode = shadowRoot.appendChild(document.createElement('div'))
  return function (vNode) {
    __vNode = patch(__vNode, vNode)
  }
}
