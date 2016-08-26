/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import {Palette, BlockSpace} from '../../lib/Themes'
import * as S from '../../lib/StyleUtils'
import {spread} from 'flex-jss'

export default addRules({
  trackDetailContainer: {
    flex: '1 0 0',
    overflow: 'hidden',
    marginRight: `${BlockSpace}px`
  },
  trackDetail: {
    overflow: 'hidden',
    marginRight: `${BlockSpace}px`,
    extend: spread
  },
  title: {
    extend: S.overflowEllipsisSTY
  },
  artist: {
    color: Palette.fg__trackDetail__light,
    fontSize: '0.8rem',
    extend: S.overflowEllipsisSTY
  }
})
