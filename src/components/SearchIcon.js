/**
 * Created by tushar.mathur on 16/05/16.
 */

'use strict'

import {div} from '@cycle/dom'
import {Observable} from 'rxjs'
import * as S from '../utils/StyleUtils'

export default ({value$, tracks$, DOM}) => {
  const clear$ = DOM.select('.fa-times-circle').events('click').map('')
  const isLoading$ = Observable.merge(
    value$.mapTo(true),
    tracks$.map(false)
  )
    .startWith(true)
    .distinctUntilChanged()

  const loaderIconVTree$ = isLoading$.filter(x => x === true).mapTo(div('.loader'))
  const hasValue$ = isLoading$.combineLatest(value$.startWith(''))
    .filter(([loading]) => loading === false)
    .map(([_, val]) => val.length === 0)

  const searchIconVTree$ = Observable.merge(
    hasValue$.filter(x => x === true),
    clear$
  ).mapTo(S.fa('search'))
  const closeIconVTree$ = hasValue$.filter(x => x === false).mapTo(S.fa('times-circle'))

  const vTree$ = Observable
    .merge(searchIconVTree$, closeIconVTree$, loaderIconVTree$)
    .map(icon => div({style: S.block(60)}, [icon]))

  return {DOM: vTree$, clear$}
}
