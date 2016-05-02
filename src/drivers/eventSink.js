/**
 * Created by tushar.mathur on 02/05/16.
 */

'use strict'

export const eventSinkDriver = source$ => {
  source$.subscribe(({target, event}) => {
    target[event]()
  })
}
