/**
 * Created by tushar.mathur on 16/09/16.
 */

'use strict'

const noop = function () {}
const Debug = APP_CONFIG === 'production' ? noop : function (callback) {
  callback()
}
export default Debug
