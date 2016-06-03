/**
 * Created by tushar.mathur on 03/06/16.
 */

'use strict'
import {Observable as O} from 'rx'
import M from 'most'

export const toMost = signal$ => {
  return M.create((add, end, err) => {
    const disposable = signal$.subscribe(add, err, end)
    return () => disposable.dispose()
  })
}

export const toRx = signal$ => {
  return O.create(observer => {
    const disposable = signal$.subscribe({
      next: observer.onNext.bind(observer),
      complete: observer.onCompleted.bind(observer),
      error: observer.onError.bind(observer)
    })
    return () => disposable.unsubscribe()
  })
}
