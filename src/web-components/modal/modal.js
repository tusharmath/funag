/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import update from './modal.update'
import view from './modal.view'

export default {
  props: ['show'],
  init () {
    return {
      show: false,
      animationCompleted: true,
      opacity: 1,
      translateY: 0
    }
  },
  update,
  view
}
