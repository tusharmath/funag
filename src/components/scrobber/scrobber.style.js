/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import {Palette, BlockHeight} from '../../lib/Themes'
import * as S from '../../lib/StyleUtils'

export default create({
  scrobber: {
    height: '2px',
    width: '100%'
  },
  scrobberTrack: {
    background: Palette.bg__scrobberTrack,
    height: '100%',
    transformOrigin: 'left'
  },
  scrobberIcon: {
    transform: 'translateY(-50%) translateX(50%)',
    ...S.block(BlockHeight)
  }
})
