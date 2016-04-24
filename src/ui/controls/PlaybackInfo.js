/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div, i} from '@cycle/dom'
import * as S from '../../lib/StyleUtils'
import * as F from '../../lib/Flexbox'

export default () => {
  return {
    DOM: Observable.just(
      div({style: F.RowSpaceBetween}, [
        div({style: {textTransform: 'capitalize', fontSize: '0.8em'}}, [
          div({style: {}}, ['Didi']),
          div({style: {fontSize: '0.8em', color: '#555'}}, [
            'Khaled',
            ' - ',
            'Tonie\'s top 2000 (1989-2000)'
          ])
        ]),
        div({style: F.ColCenter}, S.fa('ellipsis-v'))
      ])
    )
  }
}
