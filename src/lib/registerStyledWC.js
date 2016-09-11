/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import h from 'hyperscript'
import rwc from 'rwc'
import snabbdomPatcher from './snabbdom-patcher'
import registerWC from './registerWC'

export default (name, {style, component}) => {
  registerWC(name, rwc.createWCProto(root => {
    root.appendChild(h('style', style.toString()))
    return snabbdomPatcher(root)
  }, component))
}
