/**
 * Created by tushar.mathur on 03/09/16.
 */

'use strict'

import rwc from 'rwc'
import snabbdomPatcher from '../../lib/snabbdom-patcher'
import SwipeablePane from './swipeable-pane'
import registerWC from '../../lib/registerWC'
import css from './swipeable-pane.style'

const proto = rwc.createWCProto(function (shadowRoot) {
  const style = document.createElement('style')
  style.innerHTML = css.toString()
  shadowRoot.appendChild(style)
  return snabbdomPatcher(shadowRoot)
}, SwipeablePane)
registerWC('x-swipeable-pane', proto)
