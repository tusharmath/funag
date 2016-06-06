/**
 * Created by tushar.mathur on 29/04/16.
 */

'use strict'

import {Observable, Subject} from 'rxjs'

// TODO: Deprecate
export default () => {
  const subject = new Subject()
  return {
    reader: () => subject.asObservable(),
    writer: out => {
      let complete = false
      let refCount = 0
      const _out = out.replay(null, 1)
      const s0 = _out.subscribe(subject)
      let s1 = null
      return Observable.create(observer => {
        if (complete) {
          observer.onCompleted()
        }
        if (++refCount === 1) {
          s1 = _out.connect()
        }
        const s2 = subject.subscribe(observer)
        return () => {
          if (--refCount === 0) {
            s1.dispose()
            s0.dispose()
            complete = true
          }
          s2.dispose()
        }
      })
    }
  }
}
