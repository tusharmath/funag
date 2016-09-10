/**
 * Created by tushar.mathur on 07/09/16.
 */

'use strict'

import registerWC from '../../lib/registerWC'
import rwc from 'rwc'
import h from 'hyperscript'
import style from './input.style'
import snabbdomPatcher from '../../lib/snabbdom-patcher'
import InputBox from './input'

registerWC('fg-input', rwc.createWCProto(root => {
  root.appendChild(h('style', style.toString()))
  const iconCSS = `@import '//fonts.googleapis.com/icon?family=Material+Icons';`
  root.appendChild(h('style', iconCSS))
  return snabbdomPatcher(root)
}, InputBox))
