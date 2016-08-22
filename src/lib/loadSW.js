/**
 * Created by tushar.mathur on 22/08/16.
 */

'use strict'

export default path => `
   if ('navigator' in window) {
      navigator.serviceWorker.register('${path}', {scope: '/'})
      .catch(err => console.error(err))
   }`
