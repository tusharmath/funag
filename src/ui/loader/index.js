/**
 * Created by tushar.mathur on 25/04/16.
 */

'use strict'
import {Observable} from 'rx'
import {div} from '@cycle/dom'
import * as F from '../../lib/Flexbox'

export default () => {
  return {
    DOM: Observable.just(
      div({
        style: {
          color: 'rgb(77, 78, 78)',
          height: '50px',
          border: '2px dashed #2D2D2D',
          margin: '10px',
          letterSpacing: '1em',
          ...F.ColMiddle
        }
      }, 'DROP')
    )
  }
}
