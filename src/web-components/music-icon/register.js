/**
 * Created by tushar.mathur on 10/09/16.
 */

'use strict'

import h from 'hyperscript'
import rwc from 'rwc'
import registerWC from '../../lib/registerWC'
import MusicAnime from './music-icon'
import snabbdomPatcher from '../../lib/snabbdom-patcher'
import style from './music-icon.style'

registerWC('fg-music-icon', rwc.createWCProto(root => {
  root.appendChild(h('style', style.toString()))
  return snabbdomPatcher(root)
}, MusicAnime))
