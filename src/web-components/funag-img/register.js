/**
 * Created by imamudin.naseem on 08/09/16.
 */

'use strict'
import snabbdomPatcher from '../../lib/snabbdom-patcher'
import style from './funag-img.style'
import rwc from 'rwc'
import img from './funag-img'
import h from 'hyperscript'
import registerWC from '../../lib/registerWC'

registerWC('funag-img', rwc.createWCProto(root => {
  root.appendChild(h('style', style.toString()))
  return snabbdomPatcher(root)
}, img))
