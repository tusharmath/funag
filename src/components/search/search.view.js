/**
 * Created by tushar.mathur on 23/08/16.
 */

'use strict'

import {Observable as O} from 'rx'
import css from './search.style'

const Form = ({value, icon}) =>
  <form className={css('search', css.container)}>
    <div className={css(css.inputContainer, 'flb row jc_sa ai_c')}>
      <input type='text' className={css.input} placeholder='Search'
             value={value}/>
      {icon}
    </div>
  </form>

export default ({clear$, icon$}) => {
  return O.merge(
    icon$.map(icon => Form({icon, value: ''})),
    clear$.withLatestFrom(icon$)
      .map(([_, icon]) => Form({icon}))
  )
}
