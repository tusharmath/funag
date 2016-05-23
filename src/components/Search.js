/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {input, form, div} from '@cycle/dom'
import {Observable} from 'rx'
import * as F from '../utils/Flexbox'
import * as S from '../utils/StyleUtils'
import * as U from '../utils/DOMUtils'
import * as T from '../utils/Themes'
import * as SC from '../utils/SoundCloud'

const searchBoxSTY = {
  border: 'none',
  width: '100%',
  fontSize: '1em',
  color: T.Pallete.primaryColorPrimaryFont,
  fontWeight: '600',
  outline: 'none',
  backgroundColor: 'transparent'
}

const searchBoxContainer = {
  ...F.RowSpaceAround,
  alignItems: 'center',
  padding: `0 ${T.BlockSpace}px`,
  minHeight: `${T.BlockHeight}px`,
  boxShadow: T.Pallete.shadow,
  backgroundColor: T.Pallete.primaryColor,
  color: T.Pallete.primaryColorPrimaryFont,
  ...S.position({top: 0, left: 0, right: 0}),
  position: 'fixed',
  margin: 0
}

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
      searchEl.events('submit').map(U.event('preventDefault')),
      searchEl.events('submit').withLatestFrom(inputEl.observable, (_, a) => a[0])
        .map(U.event('blur'))
    )

  const isLoading$ = Observable.merge(value$.map(true), tracks$.map(false)).distinctUntilChanged()

  return {
    HTTP: request$,
    DOM: isLoading$.startWith(true).map(isLoading =>
      form({className: 'search', style: searchBoxContainer}, [
        input({type: 'text', style: searchBoxSTY, placeholder: 'Search'}),
        div({style: S.block(30)}, isLoading ? div('.loader') : S.fa('search'))
      ])
    ), value$, events$, tracks$
  }
}
