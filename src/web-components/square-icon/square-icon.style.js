/**
 * Created by tushar.mathur on 24/08/16.
 */

'use strict'

import {createStyleSheet} from '../../lib/JSSHelpers'

export default createStyleSheet({
  ':host': {
    contain: 'strict',
    height: '50px',
    width: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
