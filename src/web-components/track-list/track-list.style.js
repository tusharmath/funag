import {createStyleSheet} from '../../lib/JSSHelpers'
import {BlockSpace, Palette, BlockHeight} from '../../lib/Themes'
/**
 * Created by tushar.mathur on 09/09/16.
 */

'use strict'

const overflowingText = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
}

export default createStyleSheet({
  '.trackContainer': {
    flex: '1 0 0',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: `${BlockSpace}px`,
    color: Palette.fg__trackDetail,
    borderBottom: Palette.br__playlistItem
  },
  '.trackDetail': {
    overflow: 'hidden',
    marginRight: `${BlockSpace}px`,
    flex: '1 0 0',
    extend: overflowingText
  },
  '.title': {
    extend: overflowingText
  },
  '.artist': {
    color: Palette.fg__trackDetail__light,
    fontSize: '0.8rem'
  },
  '.duration': {
    color: Palette.fg__trackDetail__light,
    fontSize: '0.8rem'
  },
  '.artwork': {
    color: Palette.fg__artwork,
    backgroundColor: Palette.bg__artwork,
    height: BlockHeight,
    width: BlockHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: BlockSpace
  }
})
