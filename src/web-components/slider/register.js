/**
 * Created by tushar.mathur on 06/09/16.
 */

'use strict'

import registerWC from '../../lib/registerWC'
import rwc from 'rwc'
import style from './slider.style'
import snabbdomPatcher from '../../lib/snabbdom-patcher'
import Slider from './slider'

registerWC('x-slider', rwc.createWCProto(snabbdomPatcher(style), Slider))
