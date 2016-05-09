/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import Cycle from '@cycle/core'
import {makeDOMDriver} from '@cycle/dom'
import manifestFile from 'file!./pwd/manifest.json'
import sw from 'serviceworker!./pwd/sw.js'
import '../less/main.less'
import App from './app'
import {routerDriver} from '../drivers/router'
import {audioDriver} from '../drivers/audio'
import {eventSinkDriver} from '../drivers/eventSink'
import {documentTitleDriver} from '../drivers/documentTitle'

const manifest = document.createElement('link')
manifest.href = manifestFile
manifest.rel = 'manifest'
document.head.appendChild(manifest)

sw({scope: '/'})
  .then(
    x => console.log(x.active),
    x => console.error(x)
  )

Cycle.run(App, {
  DOM: makeDOMDriver('#container'),
  route: routerDriver,
  audio: audioDriver,
  events: eventSinkDriver,
  title: documentTitleDriver
})
