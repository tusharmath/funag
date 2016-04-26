/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'

import {Observable} from 'rx'
import {div, input} from '@cycle/dom'
import * as F from '../../lib/Flexbox'
import * as S from '../../lib/StyleUtils'
import * as U from './../Utils'

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

export default ({DOM}) => {
  // TODO:  startWith() current route's `q`
  const value$ = U.inputVal(DOM.select('.search'))

  return {
    DOM: Observable.just(
      div({className: 'search', style: searchBoxContainer}, [
        input({type: 'text', style: searchBoxSTY}),
        S.fa('search')
      ])
    ), value$
  }
}

