/**
 * Created by tushar.mathur on 16/05/16.
 */

'use strict'

import isolate from '@cycle/isolate'
import {div} from '@cycle/dom'
import {Observable} from 'rx'
import * as S from '../../lib/StyleUtils'
import Loader from '../loader/loader'
import {BlockHeight} from '../../lib/Themes'

export const SearchIcon = ({filter$, tracks$, DOM}) => {
  const clear$ = DOM.select('.material-icons').events('click').map('')
  const isLoading$ = Observable.merge(filter$.map(true), tracks$.map(false))
    .startWith(true)
    .distinctUntilChanged()

  const loaderIconVTree$ = isLoading$.filter(x => x === true).map(Loader)
  const hasValue$ = isLoading$.combineLatest(filter$.startWith(''))
    .filter(([loading]) => loading === false)
    .map(([_, val]) => val.length === 0)

  const searchIconVTree$ = Observable.merge(
    hasValue$.filter(x => x === true),
    clear$
  ).map(S.fa('search'))
  const closeIconVTree$ = hasValue$.filter(x => x === false).map(S.fa('close'))

  const vTree$ = Observable
    .merge(searchIconVTree$, closeIconVTree$, loaderIconVTree$)
    .map(icon => div({style: S.block(BlockHeight)}, [icon]))

  return {DOM: vTree$, clear$}
}

export default sources => isolate(SearchIcon)(sources)
