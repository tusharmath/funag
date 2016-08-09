/**
 * Created by tushar.mathur on 09/08/16.
 */

'use strict'

import * as R from 'ramda'

export default R.curry((HTTP, category) => HTTP
  .select(category)
  .pluck('body')
  .share()
)
