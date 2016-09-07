/**
 * Created by imamudin.naseem on 08/09/16.
 */

'use strict'
import snabbdomPatcher from '../../lib/snabbdom-patcher'
import style from './img-adv.style'
import rwc from 'rwc'
import img from './img-adv'
import h from 'hyperscript'
import registerWC from '../../lib/registerWC'

registerWC('x-img-adv', rwc.createWCProto(root => {
  root.appendChild(h('style', style.toString()))
  return snabbdomPatcher(root)
}, img))
