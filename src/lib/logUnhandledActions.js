/**
 * Created by tushar.mathur on 16/09/16.
 */

'use strict'

import Debug from './Debug'
export default function (state, {type, params}) {
  return Debug(() => {
    console.groupCollapsed(`UNHANDLED ACTION ${type}`)
    console.log('state:', state)
    console.log('params:', params)
    console.groupEnd(`UNHANDLED ACTION ${type}`)
  })
}
