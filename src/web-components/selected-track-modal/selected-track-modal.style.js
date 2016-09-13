/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import {BlockSpace, Palette} from '../../lib/Themes'
import {createStyleSheet} from '../../lib/JSSHelpers'

export default createStyleSheet({
  '.menu': {},
  '.trackContainer': {
    flex: '1 0 0',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    color: Palette.fg__trackDetail,
    borderBottom: Palette.br__playlistItem,
    padding: BlockSpace,
    '& > *': {
      marginRight: BlockSpace
    },
    '& > *:last-child': {
      marginRight: 0
    }
  },
  '.artist': {
    color: Palette.fg__trackDetail__light,
    fontSize: '0.8rem'
  },
  'fg-button': {
    '--fg-button-color': 'red'
  }
})
