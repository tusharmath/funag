/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import * as F from '../../lib/Flexbox'
import {Palette, BlockSpace} from '../../lib/Themes'
import * as S from '../../lib/StyleUtils'

export default create({
  trackDetailContainer: {
    flex: '1 0 0',
    overflow: 'hidden', ...F.RowSpaceBetween,
    marginRight: `${BlockSpace}px`,
    alignItems: 'center'
  },
  trackDetail: {
    overflow: 'hidden', marginRight: `${BlockSpace}px`
  },
  title: {
    ...S.overflowEllipsisSTY
  },
  artist: {
    color: Palette.trackDetailSecondary_fg,
    fontSize: '0.8rem',
    ...S.overflowEllipsisSTY
  }
})
