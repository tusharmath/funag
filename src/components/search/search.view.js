/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import R from 'ramda'
import {Observable as O} from 'rx'
import {h} from '@cycle/dom'
import css from './search.style'

const resetValue = () =>
  h(`input.${css.input}`, {type: 'text', placeholder: 'Search', value: ''})

const ignoreValue = () =>
  h(`input.${css.input}`, {type: 'text', placeholder: 'Search'})

const selectValue = R.ifElse(R.identity, resetValue, ignoreValue)
const Form = R.curry((reset, icon) =>
  h(`form.${css.searchContainer}.search`, [
    h(`div.${css.inputContainer}.flb.row.jc_sa.ai_c`, [
      selectValue(reset),
      icon
    ])
  ])
)

export default ({clear$, icon$}) => {
  return O.merge(
    icon$.map(Form(false)),
    clear$.withLatestFrom(icon$, R.nthArg(1)).map(Form(true))
  )
}
