/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import {i} from '@cycle/dom'
import * as F from './Flexbox'

export const size = (height, width) => ({height: `${height}px`, width: `${width}px`})
export const absolute = (left = 0, top = 0, right = 0, bottom = 0) => ({
  top, bottom, left, right,
  position: 'absolute'
})
export const fa = (name, dim = 1) => i(`.fa.fa-${name}`, {
  style: {
    fontSize: `${dim}em`,
    height: `${dim}em`,
    width: `${dim}em`, ...F.ColMiddle
  }
})
