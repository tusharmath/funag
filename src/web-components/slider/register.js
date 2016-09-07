/**
 * Created by tushar.mathur on 06/09/16.
 */

'use strict'

import registerWC from '../../lib/registerWC'
import rwc from 'rwc'
import style from './slider.style'
import snabbdomPatcher from '../../lib/snabbdom-patcher'
import Slider from './slider'
import h from 'hyperscript'

registerWC('x-slider', rwc.createWCProto(
  snabbdomPatcher([
    h('style', style.toString())
  ]), Slider)
)
