/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'
import _ from 'ramda'
import {Observable as O} from 'rxjs'
import raf from 'raf'

export const inputVal = $el => $el.events('keyup').map(x => x.target.value).distinctUntilChanged()
export const action = _.curry((event, target) => ({target, event}))
export const raf$ = () => {
  let started = false
  const update = cb => {
    if (!started) return
    raf(() => {
      cb()
      update(cb)
    })
  }
  return O.fromEventPattern(
    cb => {
      started = true
      update(cb)
    },
    () => {
      started = false
    }
  )
}
