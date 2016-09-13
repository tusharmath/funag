/**
 * Created by tushar.mathur on 13/09/16.
 */

'use strict'

export default {
  of (__value) {
    return {__value}
  },
  get (e) {
    return e.__value
  }
}
