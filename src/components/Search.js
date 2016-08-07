/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import * as F from '../lib/Flexbox'
import * as S from '../lib/StyleUtils'
import * as U from '../lib/DOMUtils'
import * as T from '../lib/Themes'
import * as SC from '../lib/SoundCloud'
import RxProxy from '../lib/RxProxy'
import SearchIcon from './SearchIcon'
import {PREVENT_DEFAULT, BLUR} from '../drivers/eventSink'

const searchBoxSTY = {
  border: 'none',
  flex: '1 0 0',
  fontSize: '1rem',
  color: T.Palette.search_fg,
  fontWeight: '600',
  outline: 'none',
  backgroundColor: 'transparent',
  paddingLeft: `${T.BlockSpace}px`
}
const searchBoxContainerSTY = {
  ...F.RowSpaceAround,
  alignItems: 'center',
  minHeight: `${T.BlockHeight}px`,
  boxShadow: T.Palette.darkShadow,
  transform: 'translateZ(0)',
  backgroundColor: T.Palette.search_bg,
  color: T.Palette.search_fg,
  ...S.position({top: '0', left: '0', right: '0'}),
  margin: '0'
}

const Form = ({icon, value = ''}) =>
  <form className='search' style={searchBoxContainerSTY}>
    <input type='text' style={searchBoxSTY} placeholder='Search' value={value}/>
    {icon}
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
