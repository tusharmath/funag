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
  color: T.font.primary,
  fontWeight: '600',
  outline: 'none',
  backgroundColor: 'inherit'
}

const searchBoxContainer = {
  ...F.RowSpaceAround,
  alignItems: 'center',
  padding: `0 ${T.BlockSpace}px`,
  minHeight: `${T.BlockHeight}px`,
  color: T.font.primary,
  boxShadow: '0px 1px 8px 1px rgba(0, 0, 0, 0.50)',
  backgroundColor: 'rgb(246, 246, 246)',
  position: 'absolute',
  width: '100%',
  top: 0
}

const event = event => target => ({target, event})

export default ({DOM, HTTP}) => {
  const tracks$ = HTTP
    .mergeAll()
    .pluck('body')
    .share()

  const searchEl = DOM.select('.search')
  const inputEl = searchEl.select('input')
  const value$ = U.inputVal(searchEl).debounce(300).startWith('')
  const request$ = value$.map(q => SC.toURI('/tracks', {q})).map(url => ({url}))
  const events$ = Observable
    .merge(
      searchEl.events('submit').map(event('preventDefault')),
      searchEl.events('submit').withLatestFrom(inputEl.observable, (_, a) => a[0])
        .map(event('blur'))
    )

  const isLoading$ = Observable.merge(value$.map(true), tracks$.map(false)).distinctUntilChanged()

  return {
    HTTP: request$,
    DOM: isLoading$.map(isLoading =>
      form({className: 'search', style: searchBoxContainer}, [
        input({type: 'text', style: searchBoxSTY, placeholder: 'Search'}),
        div({style: S.block(30)}, isLoading ? div('.loader') : S.fa('search'))
      ])
    ), value$, events$, tracks$
  }
}
