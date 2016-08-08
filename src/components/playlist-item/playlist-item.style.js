/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import * as T from '../../lib/Themes'

export default create({
  playlistItem: {
    fontSize: '1rem',
    overflow: 'hidden'
  },
  trackInfo: {
    color: T.Palette.fg__playlistItem,
    borderBottom: T.Palette.br__playlistItem
  }
})
