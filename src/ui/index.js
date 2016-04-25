/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {Observable} from 'rx'
import Cycle from '@cycle/core'
import {makeDOMDriver, div} from '@cycle/dom'
import Controls from './controls'
import Playlist from './playlist'
import Loader from './loader'
import * as F from '../lib/Flexbox'
import {container} from './bootstrapHTML'

function App ({DOM, storage}) {
  // Sources

  // Sink
  return {
    DOM: Observable.combineLatest(
      Playlist().DOM.map(view => div({style: {flexGrow: 1}}, [view])),
      Loader().DOM,
      Controls().DOM
    ).map(views =>
      div({style: {height: '100%', ...F.ColSpaceBetween}}, views)
    )
  }
}

Cycle.run(App, {DOM: makeDOMDriver(container)})
