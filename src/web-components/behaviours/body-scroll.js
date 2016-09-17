/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import registerWC from '../../lib/registerWC'
registerWC('fg-body-scroll', {
  createdCallback () {
    document.body.style.overflow = 'hidden'
  },
  __update (scroll) {
    if (!scroll && document.body.style !== 'hidden') {
      document.body.style.overflow = 'hidden'
    } else if (scroll && document.body.style !== '') {
      document.body.style.overflow = ''
    }
  },
  attributeChangedCallback (name) {
    if (name === 'enabled') this.__update(this.hasAttribute('enabled'))
  },
  detachedCallback () {
    document.body.style.overflow = ''
  }
})
