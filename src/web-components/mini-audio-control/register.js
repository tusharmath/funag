/**
 * Created by tushar.mathur on 08/09/16.
 */

'use strict'

import registerWC from '../../lib/registerWC'
import rwc from 'rwc'
import snabbdomPatcher from '../../lib/snabbdom-patcher'
import MiniAudioControl from './mini-audio-control'
import style from './mini-audio-control.style'
import h from 'hyperscript'

const proto = rwc.createWCProto(root => {
  root.appendChild(h('style', style.toString()))
  return snabbdomPatcher(root)
}, MiniAudioControl)

const dispatch = proto.__dispatch
proto.__dispatch = function (type, params) {
  if (type === 'TIME_UPDATED') {
    this.__timeUpdated = params.target
    if (this.__timeout) return
    this.__timeout = setTimeout(() => {
      dispatch.call(this, 'TIME_UPDATED', this.__timeUpdated)
      this.__timeout = null
    }, 1000)
  } else {
    dispatch.call(this, type, params)
  }
}

registerWC('funag-mini-audio-control', proto)
