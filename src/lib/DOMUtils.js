/**
 * Created by tushar.mathur on 26/04/16.
 */

'use strict'
import {Observable as O} from 'rx'
import raf from 'raf'

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
