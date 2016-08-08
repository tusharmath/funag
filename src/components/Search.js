/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import * as U from '../../lib/DOMUtils'
import * as SC from '../../lib/SoundCloud'
import RxProxy from '../../lib/RxProxy'
import SearchIcon from '../SearchIcon'
import {PREVENT_DEFAULT, BLUR} from '../../drivers/eventDriver'
import css from './search.style'

const Form = ({icon, value = ''}) =>
  <form className={css('search', css.container)}>
    <div className={css(css.inputContainer, 'rowSpaceAround', 'alignCenter')}>
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

const model = ({HTTP, DOM, clear$}) => {
  // TODO: Add unit tests
  const tracks$ = HTTP
    .select('tracks')
    .switch()
    .pluck('body')
    .share()

  const searchEl = DOM.select('.search')
  const inputEl = DOM.select('.search input')
  const value$ = O.merge(U.inputVal(searchEl).debounce(300), clear$)
  const request$ = value$.startWith('').map(q => SC.toURI('/tracks', {q})).map(url => ({
    url,
    category: 'tracks'
  }))
  const events$ = O
    .merge(
      searchEl.events('submit').map(PREVENT_DEFAULT),
      searchEl.events('submit').withLatestFrom(inputEl.elements(), (_, a) => a[0])
        .map(BLUR)
    )
  return {request$, events$, tracks$, value$}
}

export default ({DOM, HTTP}) => {
  const s0 = RxProxy()
  const {request$, events$, tracks$, value$} = model({HTTP, DOM, clear$: s0})
  const searchIcon = SearchIcon({value$, tracks$, DOM})
  const clear$ = s0.merge(searchIcon.clear$)
  const icon$ = searchIcon.DOM
  const vTree$ = view({clear$, icon$})

  return {
    HTTP: request$,
    DOM: vTree$, events$, tracks$
  }
}
