/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import BoundingClientRect from './BoundingClientRect'
import R from 'ramda'

export default (DOM, name) => {
  return DOM.select(name).elements()
    .filter(x => x.length > 0)
    .map(R.compose(BoundingClientRect, R.head))
    .take(1)
    .shareReplay(1)
}
