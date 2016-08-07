/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import * as S from '../../lib/StyleUtils'
import {BlockHeight, BlockSpace, Palette} from '../../lib/Themes'

export default create({
  container: {
    ...S.block(BlockHeight - BlockSpace),
    margin: BlockSpace,
    backgroundColor: Palette.artworkPlaceholder_bg
  },
  playingAnimation: {
    ...S.size(17),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
    padding: 0,
    '& li': {
      display: 'block',
      backgroundColor: Palette.artwork_fg,
      flexGrow: '1',
      transformOrigin: '0 100%',
      marginRight: '1px',
      '&:last-child': {
        marginRight: 0
      },
      '&:nth-child(1)': {
        animation: 'playing-animation 1250ms infinite'
      },
      '&:nth-child(2)': {
        animation: 'playing-animation 1000ms infinite'
      },
      '&:nth-child(3)': {
        animation: 'playing-animation 750ms infinite'
      }
    },
    '&.pause-animation li': {
      animationPlayState: 'paused'
    }
  },
  '@keyframes playing-animation': {
    '0%': {transform: 'scaleY(0.1)'},
    '50%': {transform: 'scaleY(1)'},
    '100%': {transform: 'scaleY(0.1)'}
  },
  placeholder: {
    ...S.block(50),
    margin: BlockSpace,
    color: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: Palette.artworkPlaceholder_bg
  }
})
