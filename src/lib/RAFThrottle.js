/**
 * Created by tushar.mathur on 31/05/16.
 */

'use strict'
import raf from 'raf'
import {Observable as O} from 'rx'

export default function RAFThrottle (source) {
  return O.create(observer => {
    let value
    let canUpdate = false

    function enableUpdating () { raf(() => (canUpdate = true)) }

    function update () {
      if (canUpdate) {
        observer.onNext(value)
        canUpdate = false
        enableUpdating()
      }
    }

    function setValue (_value) {
      value = _value
      update()
    }

    enableUpdating()
    return source.subscribe(
      setValue,
      err => observer.onError(err),
      () => observer.onCompleted()
    )
  })
}
