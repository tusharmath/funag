/**
 * Created by tushar.mathur on 08/09/16.
 */

'use strict'

import {createStyleSheet} from '../../lib/JSSHelpers'
import {BlockHeight} from '../../lib/Themes'

export default createStyleSheet({
  '.control-button': {
    height: BlockHeight,
    width: BlockHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  '.control-row': {
    display: 'flex',
    alignItems: 'center'
  },
  '.slot-content': {
    flexBasis: 0,
    flexGrow: 1,
    overflow: 'hidden'
  }
})
