/**
 * Created by tushar.mathur on 06/08/16.
 */

'use strict'

/* global Math */

export default (min, max, value) =>
  Math.max(Math.min(max, value), min)
