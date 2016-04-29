/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {div, input} from '@cycle/dom'
import * as F from '../../Utils/Flexbox'
import * as S from '../../Utils/StyleUtils'
import * as U from '../../Utils/DOMUtils'
import {font} from '../../Utils/Themes'

const searchBoxSTY = {
  border: 'none',
  width: '100%',
  fontSize: '1em',
  color: font.primary,
  fontWeight: '600',
  outline: 'none',
  height: '45px',
  backgroundColor: 'inherit'
}

const searchBoxContainer = {
  ...F.RowSpaceAround,
  alignItems: 'center',
  padding: '0 15px',
  minHeight: '47px',
  color: font.primary,
  boxShadow: '0px 1px 8px 1px rgba(0, 0, 0, 0.43)',
  zIndex: 1
}

export default ({DOM}) => {
  const value$ = U.inputVal(DOM.select('.search')).startWith('')
  return {
    DOM: value$.map(value =>
      div({className: 'search', style: searchBoxContainer}, [
        input({type: 'text', style: searchBoxSTY, value}),
        S.fa('search')
      ])
    ), value$
  }
}

