/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {div, input} from '@cycle/dom'
import * as F from '../../utils/Flexbox'
import * as S from '../../utils/StyleUtils'
import * as U from '../../utils/DOMUtils'

const searchBoxSTY = {
  border: 'none',
  width: '100%',
  color: '#fff',
  fontSize: '0.8em',
  fontWeight: '600',
  backgroundColor: 'transparent',
  outline: 'none',
  height: '45px'
}

const searchBoxContainer = {
  ...F.RowSpaceAround,
  alignItems: 'center',
  backgroundColor: 'rgb(42, 44, 49)',
  padding: '0 15px',
  minHeight: '47px'
}

export default ({DOM}) => {
  const value$ = U.inputVal(DOM.select('.search')).startWith('')
  return {
    DOM: value$.map(value =>
      div({className: 'search', style: searchBoxContainer}, [
        input({type: 'text', style: searchBoxSTY, value, placeholder: 'search'}),
        S.fa('search')
      ])
    ), value$
  }
}

