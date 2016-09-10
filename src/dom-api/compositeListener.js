/**
 * Created by tushar.mathur on 10/09/16.
 */

'use strict'

export default function (el, cb, events) {
  events.forEach(type => el.addEventListener(type, cb))
  return () => events.forEach(type => el.removeEventListener(type, cb))
}
