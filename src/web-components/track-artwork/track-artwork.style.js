/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import {createStyleSheet} from '../../lib/JSSHelpers'
import {Palette, BlockHeight} from '../../lib/Themes'

export default createStyleSheet({
  '.artwork': {
    color: Palette.fg__artwork,
    backgroundColor: Palette.bg__artwork,
    height: BlockHeight,
    width: BlockHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  '.artwork-bg-image': {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    backgroundSize: '100%',
    height: BlockHeight,
    width: BlockHeight
  }
})
