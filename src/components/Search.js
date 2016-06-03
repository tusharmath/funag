/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {input, form} from 'cycle-maquette'
import {Observable as O} from 'rx'
import * as F from '../utils/Flexbox'
import * as S from '../utils/StyleUtils'
import * as U from '../utils/DOMUtils'
import * as T from '../utils/Themes'
import * as SC from '../utils/SoundCloud'
import RxProxy from '../utils/RxProxy'
import SearchIcon from './SearchIcon'

const searchBoxSTY = {
  'border': 'none',
  'flex': '1 0 0',
  'font-size': '1em',
  'color': T.Pallete.primaryColorPrimaryFont,
  'font-weight': '600',
  'outline': 'none',
  'background-color': 'transparent',
  'padding-left': `${T.BlockSpace}px`
}

const searchBoxContainerSTY = {
  ...F.RowSpaceAround,
  'align-items': 'center',
  'min-height': `${T.BlockHeight}px`,
  'box-shadow': T.Pallete.shadow,
  'transform': 'translateZ(0)',
  'background-color': T.Pallete.primaryColor,
  'color': T.Pallete.primaryColorPrimaryFont,
  ...S.position({top: 0, left: 0, right: 0}),
  'margin': 0
}

const Form = ({icon, value}) => form({class: 'search', style: S.stringifyStyle(searchBoxContainerSTY)}, [
  input({type: 'text', style: S.stringifyStyle(searchBoxSTY), placeholder: 'Search', value}),
  icon
])

const view = ({clear$, icon$}) => {
  return O.merge(
    icon$.map(icon => Form({icon})),
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
      searchEl.events('submit').map(U.action('preventDefault')),
      searchEl.events('submit').withLatestFrom(inputEl.observable, (_, a) => a[0])
        .map(U.action('blur'))
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
