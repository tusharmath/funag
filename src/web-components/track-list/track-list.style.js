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
  },
  '.animatedBG': {
    background: 'linear-gradient(to right , rgb(245, 245, 245), #fff)',
    animation: 'horizontal-motion 1000ms linear infinite',
    backgroundSize: '400%'
  },
  '.square50': {
    extend: '.animatedBG',
    height: BlockHeight,
    width: BlockHeight
  },
  '.line100': {
    extend: '.animatedBG',
    height: '1rem',
    width: '100%'
  },
  '.line75': {
    extend: '.animatedBG',
    height: '1rem',
    width: '75%'
  },
  '.lineCol': {
    flex: '1 0 0',
    margin: '0 10px',
    height: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  '.placeholder': {
    padding: BlockSpace,
    alignItems: 'center',
    borderBottom: '1px solid rgb(249, 246, 246)',
    borderRadius: '2px',
    display: 'flex'
  },
  '@keyframes horizontal-motion': {
    '0%': {backgroundPosition: '0% 50%'},
    '50%': {backgroundPosition: '100% 50%'},
    '100%': {backgroundPosition: '0% 50%'}
  }
})
