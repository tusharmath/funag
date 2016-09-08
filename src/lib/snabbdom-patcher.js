/**
 * Created by tushar.mathur on 06/09/16.
 */

'use strict'

import snabbdom from 'snabbdom'
import h from 'snabbdom/h'
import dh from 'hyperscript'

const patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/eventlisteners')
])
export default function snabbdomPatcher (shadowRoot) {
  let __vNode = shadowRoot.appendChild(dh('div'))
  return function (vNode) {
    __vNode = patch(__vNode, h('div', [vNode]))
  }
}

