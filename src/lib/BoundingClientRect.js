/**
 * Created by tushar.mathur on 06/08/16.
 */

'use strict'

import * as R from 'ramda'

export const getBCR = el => el.getBoundingClientRect()
export const getElementBCR = elements => elements
  .map(R.head)
  .filter(Boolean)
  .map(getBCR)
