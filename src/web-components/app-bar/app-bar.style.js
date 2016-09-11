/**
 * Created by tushar.mathur on 11/09/16.
 */

'use strict'

import {createStyleSheet} from '../../lib/JSSHelpers'
import {Palette} from '../../lib/Themes'

export default createStyleSheet({
  '.position-fixed': {
    position: 'fixed',
    top: 0,
    width: '100%',
    boxShadow: Palette.zDepth__1,
    zIndex: 1
  },
  '.slot-container': {
    transition: 'box-shadow 300ms ease-in'
  }
})
