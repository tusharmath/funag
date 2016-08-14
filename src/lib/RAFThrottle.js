/**
 * Created by tushar.mathur on 31/05/16.
 */

'use strict'
import raf from 'raf'
import {Observable as O} from 'rx'

export default function RAFThrottle (source) {
  return O.create(observer => {
    let frame = null

    function queueValue (value) {
      if (frame) raf.cancel(frame)
      frame = raf(() => observer.onNext(value))
    }

    return source.subscribe(
      queueValue,
      err => observer.onError(err),
      () => observer.onCompleted()
    )
  })
}
