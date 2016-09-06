/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import BoundingClientRect from './boundingClientRect'
import R from 'ramda'

export default (DOM, name) => {
  return DOM.select(name).elements()
    .filter(x => x.length > 0)
    .map(R.compose(BoundingClientRect, R.head))
    .filter(({height, width}) => height > 0 && width > 0)
    .take(1)
    .shareReplay(1)
}
