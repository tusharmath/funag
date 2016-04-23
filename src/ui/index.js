/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import Cycle from '@cycle/core'
import {makeDOMDriver} from '@cycle/dom'
import Controls from './controls'

const container = document.createElement('div')
document.body.appendChild(container)

function App ({DOM, storage}) {
  // Sources

  // Sink
  return {
    DOM: Controls().DOM
  }
}

Cycle.run(App, {DOM: makeDOMDriver(container)})
