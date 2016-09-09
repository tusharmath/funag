/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import registerWC from '../../lib/registerWC'
import rwc from 'rwc'
import h from 'hyperscript'
import snabbdomPatcher from '../../lib/snabbdom-patcher'
import style from './app.style'
import App from './app'

registerWC('funag-app', rwc.createWCProto(root => {
  root.appendChild(h('style', style.toString()))
  return snabbdomPatcher(root)
}, App))
