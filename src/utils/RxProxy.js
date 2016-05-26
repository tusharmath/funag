/**
 * Created by tushar.mathur on 24/05/16.
 */

'use strict'

import {Subject} from 'rx'

export default () => {
  const sub = new Subject()
  const _sub = sub.asObservable()
  _sub.merge = src => src.multicast(sub).refCount()
  return _sub
}
