/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import * as U from '../../lib/DOMUtils'
import SearchIcon from '../search-icon/search-icon'
import {PREVENT_DEFAULT, BLUR} from '../../drivers/eventDriver'
import {APPLY_FILTER, CLEAR_FILTER, SET_TRACKS} from '../../redux-lib/actions'
import view from './search.view'
import httpSelectBody from '../../lib/httpSelectBody'
import {requestTracks} from './search.request'

const event = (searchEl, inputEl) => O
  .merge(
    searchEl.events('submit').map(PREVENT_DEFAULT),
    searchEl.events('submit').withLatestFrom(
      inputEl.elements(), (_, a) => a[0]
    ).map(BLUR)
  )

const isLoading = (request$, response$) => {
  return O.merge(request$.map(true), response$.map(false))
}

const hasValue = (filter$) => {
  return filter$.map(f => f.length > 0)
}

const intent = ({HTTP, DOM, filter$}) => {
  const tracks$ = httpSelectBody(HTTP, 'tracks')
  const searchEl = DOM.select('.search')
  const inputEl = DOM.select('.search input')
  const value$ = U.inputVal(searchEl).debounce(300)
  const request$ = requestTracks(filter$)
  const events$ = event(searchEl, inputEl)
  const isLoading$ = isLoading(request$, tracks$)
  const hasValue$ = hasValue(filter$)
  return {request$, events$, tracks$, value$, isLoading$, hasValue$}
}

export default ({DOM, HTTP, STORE}) => {
  const filter$ = STORE.select('track.filter').startWith('')
    .distinctUntilChanged()
  const {request$, events$, tracks$, value$, isLoading$, hasValue$} = intent(
    {HTTP, DOM, filter$}
  )

  const searchIcon = SearchIcon({hasValue$, isLoading$, DOM})
  const icon$ = searchIcon.DOM
  const vTree$ = view({clear$: searchIcon.clear$, icon$})
  return {
    HTTP: request$,
    DOM: vTree$,
    EVENTS: events$,
    STORE: O.merge(
      value$.map(APPLY_FILTER),
      searchIcon.clear$.map(CLEAR_FILTER),
      tracks$.map(SET_TRACKS)
    )
  }
}
