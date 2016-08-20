/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import Cycle from '@cycle/rx-run'
import {makeDOMDriver} from '@cycle/dom'
import {makeRouterDriver} from 'cyclic-router'
import {makeHTTPDriver} from '@cycle/http'
import {createHashHistory} from 'history'
import 'file?name=[hash].manifest.[ext]!./manifest.json'
import Main from './components/main/main'
import {audioDriver} from './drivers/audio'
import {EventDriver} from './drivers/eventDriver'
import {documentTitleDriver} from './drivers/documentTitle'
import {quickUpdateDOMDriver} from './drivers/quickUpdateDOM'

Cycle.run(Main, {
  DOM: makeDOMDriver('#container'),
  AUDIO: audioDriver,
  EVENTS: EventDriver,
  title: documentTitleDriver,
  HTTP: makeHTTPDriver(),
  ROUTER: makeRouterDriver(createHashHistory()),
  QUICK: quickUpdateDOMDriver
})
