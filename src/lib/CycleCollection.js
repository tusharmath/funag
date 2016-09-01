/**
 * Created by tushar.mathur on 10/08/16.
 */

'use strict'

import * as R from 'ramda'
import {Observable as O} from 'rx'

export const mapI = R.addIndex(R.map)
export const collectionFrom = R.curry((component, sources, data$) => {
  const componentCTOR = (ROW, INDEX) =>
    component(R.merge(sources, {ROW, INDEX}))
  const items$$ = data$.map(mapI(componentCTOR)).shareReplay(1)
  return {
    combined (type) {
      return items$$.map(R.pluck(type)).flatMapLatest(i => O.combineLatest(i))
    },
    merged (type) {
      return items$$.map(R.pluck(type)).flatMapLatest(i => O.merge(i))
    }
  }
})
