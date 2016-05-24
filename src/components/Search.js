/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {input, form} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../utils/Flexbox'
import * as S from '../utils/StyleUtils'
import * as U from '../utils/DOMUtils'
import * as T from '../utils/Themes'
import * as SC from '../utils/SoundCloud'
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
  ...S.position({top: 0, left: 0, right: 0}),
  position: 'fixed',
  margin: 0
}

const event = event => target => ({target, event})

export default ({DOM, HTTP}) => {
  // TODO: Add unit tests
  const tracks$ = HTTP
    .switch()
    .pluck('body')
    .share()

  const searchEl = DOM.select('.search')
  const inputEl = DOM.select('.search input')
  const value$ = U.inputVal(searchEl).debounce(300)
  const request$ = value$.startWith('').map(q => SC.toURI('/tracks', {q})).map(url => ({url}))
  const events$ = Observable
    .merge(
      searchEl.events('submit').map(event('preventDefault')),
      searchEl.events('submit').withLatestFrom(inputEl.observable, (_, a) => a[0])
        .map(event('blur'))
    )

  const searchIcon = SearchIcon({value$, tracks$, DOM})
  const Form = ({icon, value}) =>
    form({className: 'search', style: searchBoxContainerSTY}, [
      input({type: 'text', style: searchBoxSTY, placeholder: 'Search', value}),
      icon
    ])
  const vTree$ = Observable.merge(
    searchIcon.DOM.map(icon => Form({icon})),
    searchIcon.clear$
      .withLatestFrom(searchIcon.DOM)
      .map(([_, icon]) => Form({icon, value: ''}))
  )

  return {
    HTTP: request$,
    DOM: vTree$, value$, events$, tracks$
  }
}
