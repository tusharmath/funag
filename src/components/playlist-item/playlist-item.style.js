/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import * as F from '../../lib/Flexbox'
import * as T from '../../lib/Themes'

export default create({
  playlistItem: {
    fontSize: '1rem',
    overflow: 'hidden'
  },
  trackInfo: {
    ...F.RowSpaceBetween,
    alignItems: 'center',
    color: T.Palette.playlistItem_fg,
    borderBottom: T.Palette.divider
  }
})
