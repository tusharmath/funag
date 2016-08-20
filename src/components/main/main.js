/**
 * Created by tushar.mathur on 23/04/16.
 */

'use strict'

import h from 'snabbdom/h'
import Header from '../header/header'

export default {
  render  () {
    return h('div', [
      Header.render()
    ])
  }
}
