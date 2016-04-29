/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {div, input} from '@cycle/dom'
import * as F from '../../Utils/Flexbox'
import * as S from '../../Utils/StyleUtils'
import * as U from '../../Utils/DOMUtils'
import {theme} from '../../Utils/Themes'

const searchBoxSTY = {
  border: 'none',
  width: '100%',
  color: '#4E3300',
  fontSize: '1em',
  fontWeight: '600',
  backgroundColor: 'transparent',
  outline: 'none',
  height: '45px'
}

const searchBoxContainer = {
  ...F.RowSpaceAround,
  alignItems: 'center',
  backgroundColor: theme.search,
  padding: '0 15px',
  minHeight: '47px',
  color: '#4E3300'
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

