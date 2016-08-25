/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import * as T from '../../lib/Themes'

export default addRules({
  playlistItem: {
    fontSize: '1rem',
    overflow: 'hidden'
  },
  trackInfo: {
    color: T.Palette.fg__trackDetail,
    borderBottom: T.Palette.br__playlistItem
  }
})
