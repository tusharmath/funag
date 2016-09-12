/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import {BlockSpace, Palette, BlockHeight} from '../../lib/Themes'
import {createStyleSheet} from '../../lib/JSSHelpers'

export default createStyleSheet({
  '.menu': {
    padding: `${BlockSpace}px 0`
  },
  '.menu-item': {
    color: 'red',
    fontWeight: 600,
    textTransform: 'uppercase',
    lineHeight: '2.5em',
    fontSize: '0.8rem',
    height: BlockHeight,
    display: 'flex',
    alignItems: 'center'
  },
  '.trackContainer': {
    flex: '1 0 0',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    color: Palette.fg__trackDetail,
    borderBottom: Palette.br__playlistItem,
    paddingBottom: BlockSpace,
    '& fg-track-artwork': {
      marginRight: BlockSpace
    }
  },
  '.artist': {
    color: Palette.fg__trackDetail__light,
    fontSize: '0.8rem'
  }
})
