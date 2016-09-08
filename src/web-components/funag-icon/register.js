/**
 * Created by tushar.mathur on 08/09/16.
 */

'use strict'

import h from 'hyperscript'
import rwc from 'rwc'
import registerWC from '../../lib/registerWC'
import FunagIcon from './funag-icon'
import snabbdomPatcher from '../../lib/snabbdom-patcher'

const CSS = '@import "//fonts.googleapis.com/icon?family=Material+Icons";'
document.querySelector('head').appendChild(h('link', {
  attrs: {
    rel: 'stylesheet',
    type: 'text/css',
    href: '//fonts.googleapis.com/icon?family=Material+Icons'
  }
}))

registerWC('funag-icon', rwc.createWCProto(root => {
  root.appendChild(h('style', CSS))
  return snabbdomPatcher(root)
}, FunagIcon))
