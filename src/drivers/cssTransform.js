/**
 * Created by tushar.mathur on 28/05/16.
 */

'use strict'

import {Observable as O} from 'rx'
import raf from 'raf'

const translate = (translate$, target$) => {
  const translateAction = ([target, {x = 0, y = 0}]) => [target, `translate(${x}, ${y})`]
  return O.combineLatest(target$, translate$)
    .map(translateAction)
}

export const cssTransformDriver = signal$ => {
  signal$.subscribe(([target, transform]) => {
    raf(() => (target.style.transform = transform))
  })
  return {translate}
}
