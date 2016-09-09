/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import {BlockHeight, Palette} from '../../lib/Themes'
import {createStyleSheet} from '../../lib/JSSHelpers'

export default createStyleSheet({
  '.container': {
    marginTop: BlockHeight,
    marginBottom: BlockHeight
  },
  '.control-container': {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    boxShadow: Palette.zDepth__1,
    backgroundColor: Palette.bg__control,
    color: Palette.fg__control
  }
})
