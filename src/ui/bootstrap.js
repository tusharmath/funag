/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import Cycle from '@cycle/core'
import {makeDOMDriver} from '@cycle/dom'
import manifestFile from 'file!./pwd/manifest.json'
import sw from 'serviceworker!./pwd/sw.js'
import App from './app'

export const container = document.createElement('div')
document.body.appendChild(container)

const manifest = document.createElement('link')
manifest.href = manifestFile
manifest.rel = 'manifest'
document.head.appendChild(manifest)

sw({scope: '/'})
  .then(
    x => console.log(x.active),
    x => console.error(x)
  )

Cycle.run(App, {DOM: makeDOMDriver(container)})
