/**
 * Created by tushar.mathur on 10/09/16.
 */

'use strict'

import {createStyleSheet} from '../../lib/JSSHelpers'
import {Palette, BlockHeight, BlockSpace} from '../../lib/Themes'
const animation = time => ({animation: `playing-animation ${time}ms infinite`})
export default createStyleSheet({
  'artworkContainer': {
    height: BlockHeight,
    width: BlockHeight,
    margin: BlockSpace,
    backgroundColor: Palette.bg__artwork
  },
  '.playingAnimation': {
    display: 'flex',
    height: 17,
    width: 17,
    margin: 0,
    padding: 0,
    '& li': {
      display: 'block',
      backgroundColor: Palette.bg__artworkPlayingIcon,
      flexGrow: '1',
      transformOrigin: '0 100%',
      marginRight: '1px'
    },
    '& li:last-child': {marginRight: 0},
    '& li:nth-child(1)': animation(1250),
    '& li:nth-child(2)': animation(1000),
    '& li:nth-child(3)': animation(750)
  },
  '.pause-animation li': {
    animation: 'none !important',
    transform: 'scaleY(0.1)'
  },
  '@keyframes playing-animation': {
    '0%': {transform: 'scaleY(0.1)'},
    '50%': {transform: 'scaleY(1)'},
    '100%': {transform: 'scaleY(0.1)'}
  }
})
