/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import R from 'ramda'
import {Observable as O} from 'rx'
import css from './search.style'

const resetValue = () =>
  <input type='text' className={css.input} placeholder='Search' value=''/>

const ignoreValue = () =>
  <input type='text' className={css.input} placeholder='Search'/>

const selectValue = R.ifElse(R.identity, resetValue, ignoreValue)
const Form = R.curry((reset, icon) =>
  <form className={css('search', css.searchContainer)}>
    <div className={css(css.inputContainer, 'flb row jc_sa ai_c')}>
      {selectValue(reset)}
      {icon}
    </div>
  </form>
)

export default ({clear$, icon$}) => {
  return O.merge(
    icon$.map(Form(false)),
    clear$.withLatestFrom(icon$, R.nthArg(1)).map(Form(true))
  )
}
