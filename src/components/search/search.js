/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import * as U from '../../lib/DOMUtils'
import * as SC from '../../lib/SoundCloud'
import SearchIcon from '../search-icon/search-icon'
import {PREVENT_DEFAULT, BLUR} from '../../drivers/eventDriver'
import css from './search.style'
import {APPLY_FILTER, CLEAR_FILTER} from '../../redux-lib/app-actions'

const Form = ({value = '', icon}) =>
  <form className={css('search', css.container)}>
    <div className={css(css.inputContainer, 'flb row jc_sa ai_c')}>
      <input type='text' className={css.input} placeholder='Search'
             value={value}/>
      {icon}
    </div>
  </form>

const view = ({clear$, icon$}) => {
  return O.merge(
    icon$.map(icon => Form({icon})),
    clear$.withLatestFrom(icon$)
      .map(([_, icon]) => Form({icon, value: null}))
  )
}

const response = (HTTP) => HTTP
  .select('tracks')
  .switch()
  .pluck('body')
  .share()

const request = (value$) => {
  return value$.map(q => SC.toURI('/tracks', {q})).map(url => ({
    url,
    category: 'tracks'
  }))
}

const event = (searchEl, inputEl) => O
  .merge(
    searchEl.events('submit').map(PREVENT_DEFAULT),
    searchEl.events('submit').withLatestFrom(inputEl.elements(), (_, a) => a[0]).map(BLUR)
  )

const intent = ({HTTP, DOM, filter$}) => {
  // TODO: Add unit tests
  const tracks$ = response(HTTP)
  const searchEl = DOM.select('.search')
  const inputEl = DOM.select('.search input')
  const value$ = U.inputVal(searchEl).debounce(300)
  const request$ = request(filter$)
  const events$ = event(searchEl, inputEl)
  return {request$, events$, tracks$, value$}
}

export default ({DOM, HTTP, STORE}) => {
  const filter$ = STORE.select('track.filter').startWith('')
  const {request$, events$, tracks$, value$} = intent({HTTP, DOM, filter$})
  const searchIcon = SearchIcon({filter$, tracks$, DOM})
  const icon$ = searchIcon.DOM
  const vTree$ = view({clear$: searchIcon.clear$, icon$})
  return {
    HTTP: request$,
    DOM: vTree$, events$, tracks$,
    STORE: O.merge(
      value$.map(APPLY_FILTER),
      searchIcon.clear$.map(CLEAR_FILTER)
    )
  }
}
