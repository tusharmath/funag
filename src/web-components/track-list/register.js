/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import registerWC from '../../lib/registerWC'
import rwc from 'rwc'
import style from './track-list.style'
import snabbdomPatcher from '../../lib/snabbdom-patcher'
import TrackList from './track-list'
import h from 'hyperscript'

registerWC('fg-track-list', rwc.createWCProto(root => {
  root.appendChild(h('style', style.toString()))
  return snabbdomPatcher(root)
}, TrackList))
