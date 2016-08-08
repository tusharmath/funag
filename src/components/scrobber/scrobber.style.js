/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import * as F from '../../lib/Flexbox'
import {Palette} from '../../lib/Themes'
import * as S from '../../lib/StyleUtils'

export default create({
  scrobber: {
    height: '4px',
    width: '100%'
  },
  scrobberTrack: {
    ...F.RowRight,
    background: Palette.scrobberTrack_bg,
    height: '100%',
    willChange: 'transform',
    transformOrigin: 'left',
    marginRight: '15px'
  },
  scrobberIcon: {
    ...{...S.block(15), borderRadius: '20px'},
    backgroundColor: Palette.scrobber_bg,
    transform: 'translateY(-50%) translateX(100%)',
    boxShadow: Palette.darkShadow
  }
})
