/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

import {BlockHeight, Palette, BlockSpace} from '../../lib/Themes'
import {createStyleSheet} from '../../lib/JSSHelpers'

export default createStyleSheet({
  '.text-overflow': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  '.container': {
    marginBottom: BlockHeight
  },
  '.control-container': {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    boxShadow: Palette.zDepth__1,
    backgroundColor: Palette.bg__control,
    color: Palette.fg__control
  },
  '.control-track-detail': {
    color: Palette.fg__control,
    '& .track-title': {
      fontWeight: 600
    },
    '& .artist': {
      fontWeight: 600,
      fontSize: '0.8rem',
      color: Palette.fg__playbackInfo__light
    }
  },
  '.search-box-container': {
    paddingLeft: BlockSpace,
    backgroundColor: '#FFF',
    transition: 'all 300ms ease-in',
    '&.active': {
      backgroundColor: Palette.bg__header,
      boxShadow: Palette.zDepth__1
    }
  }
})
