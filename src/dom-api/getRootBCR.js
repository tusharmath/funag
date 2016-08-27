/**
 * Created by tushar.mathur on 06/08/16.
 */

'use strict'
import BoundingClientRect from './boundingClientRect'

export default DOM => DOM
  .select(':root')
  .elements()
  .take(1)
  .map(BoundingClientRect)
  .shareReplay(1)
