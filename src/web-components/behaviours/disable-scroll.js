/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import registerWC from '../../lib/registerWC'
registerWC('fg-disable-scroll', {
  createdCallback () {
    document.body.style.overflow = 'hidden'
  },
  detachedCallback () {
    document.body.style.overflow = ''
  }
})
