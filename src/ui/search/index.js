/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {Observable} from 'rx'
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
  boxSizing: 'border-box',
  outline: 'none',
  lineHeight: '3.5em'
}

const searchBoxContainer = {
  ...F.RowSpaceAround,
  alignItems: 'center',
  backgroundColor: 'rgb(42, 44, 49)',
  padding: '0 15px'
}

export default ({DOM, route}) => {

  const startValue$ = route.match('/search/:q').pluck('q').first()
  const value$ = startValue$.concat(U.inputVal(DOM.select('.search')))
  const href$ = value$.map(x => x ? `/search/${x}` : '/')
  return {
    DOM: value$.map(value =>
      div({className: 'search', style: searchBoxContainer}, [
        input({type: 'text', style: searchBoxSTY, value}),
        S.fa('search')
      ])
    ), value$, href$
  }
}

