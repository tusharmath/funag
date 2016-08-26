/**
 * Created by tushar.mathur on 26/08/16.
 */

'use strict'

import R from 'ramda'
import {Observable as O} from 'rx'

export default (prop, ...el) =>
  O.merge(R.filter(Boolean, R.pluck(prop, el)))
