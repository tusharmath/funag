/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import {Observable} from 'rx'
import {div} from '@cycle/dom'
import * as F from '../../lib/Flexbox'

const infoSTY = {
  ...F.RowSpaceAround,
  color: '#555',
  fontWeight: 100,
  padding: '10px',
  fontFamily: 'Fjalla One, sans-serif',
  fontSize: '0.8em'
}

export default () => {
  return {
    DOM: Observable.just(
      div({style: infoSTY}, [
        div('MP3'),
        div('320 kbps'),
        div('44.1 Khz'),
        div('Stereo')
      ])
    )
  }
}
