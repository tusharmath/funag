/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

/* global getComputedStyle */

import fastDOM from 'fastdom'
import fastDOMPromised from 'fastdom/extensions/fastdom-promised'

const F = fastDOM.extend(fastDOMPromised)

export default function (node, recompute) {
  return F.measure(function () {
    if (!node.__computedStyle || recompute) {
      node.__computedStyle = getComputedStyle(node)
    }
    return node.__computedStyle
  })
}
