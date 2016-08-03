/**
 * Created by tushar.mathur on 16/05/16.
 */

'use strict'

import {div} from '@cycle/dom'
import M from 'most'
import * as S from '../utils/StyleUtils'
import * as C from '../utils/Stream'

export default ({value$, tracks$, DOM}) => {
  const clear$ = C.toMost(DOM.select('.fa-times-circle').events('click').map(''))
  const isLoading$ = M.merge(C.toMost(value$.map(true)), C.toMost(tracks$.map(false)))
    .startWith(true)
    .skipRepeats()

  const loaderIconVTree$ = isLoading$.filter(x => x === true).map(() => div('.loader'))
  const hasValue$ = isLoading$.combine((x, y) => ([x, y]), C.toMost(value$.startWith('')))
    .filter(([loading]) => loading === false)
    .map(([_, val]) => val.length === 0)

  const searchIconVTree$ = M.merge(
    hasValue$.filter(x => x === true),
    clear$
  ).map(() => S.fa('search'))
  const closeIconVTree$ = hasValue$.filter(x => x === false).map(() => S.fa('times-circle'))

  const vTree$ = M
    .merge(searchIconVTree$, closeIconVTree$, loaderIconVTree$)
    .map(icon => div({style: S.block(60)}, [icon]))

  return {DOM: vTree$, clear$: clear$}
}
