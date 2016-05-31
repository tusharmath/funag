/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {input, form} from 'cycle-snabbdom'
import {Observable as O} from 'rx'
import * as F from '../utils/Flexbox'
import * as S from '../utils/StyleUtils'
import * as U from '../utils/DOMUtils'
import * as T from '../utils/Themes'
import * as SC from '../utils/SoundCloud'
import RxProxy from '../utils/RxProxy'
import SearchIcon from './SearchIcon'

const searchBoxSTY = {
  border: 'none',
  flex: '1 0 0',
  fontSize: '1em',
  color: T.Pallete.primaryColorPrimaryFont,
  fontWeight: '600',
  outline: 'none',
  backgroundColor: 'transparent',
  paddingLeft: `${T.BlockSpace}px`
}

const searchBoxContainerSTY = {
  ...F.RowSpaceAround,
  alignItems: 'center',
  minHeight: `${T.BlockHeight}px`,
  boxShadow: T.Pallete.shadow,
  backgroundColor: T.Pallete.primaryColor,
  color: T.Pallete.primaryColorPrimaryFont,
  ...S.position({top: '0', left: '0', right: '0'}),
  position: 'fixed',
  margin: '0'
}

const event = event => target => ({target, event})

const Form = ({icon, value}) => form('.search', {style: searchBoxContainerSTY}, [
  input({props: {type: 'text', placeholder: 'Search', value}, style: searchBoxSTY}),
  icon
])

const view = ({clear$, icon$}) => {
  return O.merge(
    icon$.map(icon => Form({icon, value: null})),
    clear$.withLatestFrom(icon$)
      .map(([_, icon]) => Form({icon, value: ''}))
  )
}

const model = ({HTTP, DOM, clear$}) => {
  // TODO: Add unit tests
  const tracks$ = HTTP
    .switch()
    .pluck('body')
    .share()

  const searchEl = DOM.select('.search')
  const inputEl = DOM.select('.search input')
  const value$ = O.merge(U.inputVal(searchEl).debounce(300), clear$)
  const request$ = value$.startWith('').map(q => SC.toURI('/tracks', {q})).map(url => ({url}))
  const events$ = O
    .merge(
      searchEl.events('submit').map(event('preventDefault')),
      searchEl.events('submit').withLatestFrom(inputEl.observable, (_, a) => a[0])
        .map(event('blur'))
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
