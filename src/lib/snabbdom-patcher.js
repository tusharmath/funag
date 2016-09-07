/**
 * Created by tushar.mathur on 06/09/16.
 */

'use strict'

import snabbdom from 'snabbdom'
import h from 'snabbdom/h'
import R from 'ramda'

const dh = tag => document.createElement(tag)

const patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/eventlisteners')
])
export default R.curry(function patcher (css, shadowRoot) {
  const style = dh('style')
  style.innerHTML = css.toString()
  shadowRoot.appendChild(style)
  let __vNode = shadowRoot.appendChild(dh('div'))
  shadowRoot.appendChild(__vNode)
  return function (vNode) {
    __vNode = patch(__vNode, h('div', [vNode]))
  }
})
