/**
 * Created by tushar.mathur on 24/05/16.
 */

'use strict'

import {Subject, Observable as O} from 'rxjs'

export default () => {
  const sub = new Subject()
  const _sub = sub.asObservable()
  _sub.merge = (...src) => {
    return O.merge(...src).multicast(sub).refCount()
  }
  return _sub
}
