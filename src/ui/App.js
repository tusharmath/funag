/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {Observable} from 'rx'
import {makeDOMDriver, div} from '@cycle/dom'
import Controls from './controls'
import Playlist from './playlist'
import SearchBox from './search/index'
import * as F from '../utils/Flexbox'

export default function ({DOM, storage}) {
  const searchBox = SearchBox({DOM})
  return {
    DOM: Observable.combineLatest(
      searchBox.DOM,
      Playlist().DOM.map(view => div({style: {flexGrow: 1}}, [view])),
      Controls().DOM
    ).map(views =>
      div({style: {height: '100%', ...F.ColSpaceBetween}}, views)
    )
  }
}
