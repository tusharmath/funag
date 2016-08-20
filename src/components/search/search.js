/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {Observable as O} from 'rx'
import SearchIcon from '../search-icon/search-icon'
import {PREVENT_DEFAULT, BLUR} from '../../drivers/eventDriver'
import css from './search.style'
import {PREVENT_DEFAULT, BLUR} from '../../drivers/eventSink'
import InputValue from '../../lib/InputValue'
import Button from '../fa-icon-button/fa-icon-button'

const view = () => O.just(
  <form className={css('search', css.searchContainer, 'fade-in')}>
    <div className={css(css.inputContainer, 'flb row jc_sa ai_c')}>
      {Button('arrow-left')}
      <input type='text' className={css.input} placeholder='Search...'
             autofocus/>
    </div>
  </form>
)
const pickEl = (_, a) => a[0]
const model = ({searchEl}) => {
  const value$ = O.merge(InputValue(searchEl).debounce(300))
  return {value$}
}
const intent = ({searchEl, inputEl}) => {
  const events$ = O.merge(
    PREVENT_DEFAULT(searchEl.events('submit')),
    BLUR(searchEl.events('submit').withLatestFrom(inputEl.elements(), pickEl))
  )
  return {events$}
}
export default ({DOM}) => {
  const searchEl = DOM.select('.search')
  const inputEl = DOM.select('.search input')
  const {events$} = intent({searchEl, inputEl})
  const {value$} = model({searchEl})
  const vTree$ = view()

  return {value$, DOM: vTree$, events$}
}
