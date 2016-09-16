/**
 * Created by tushar.mathur on 17/09/16.
 */

'use strict'

import {BlockHeight, Palette, BlockSpace} from '../../lib/Themes'

export default {
  'fg-button': {
    '--fg-button-color': 'red'
  },
  '.trackContainer': {
    flex: '1 0 0',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    color: Palette.fg__trackDetail,
    borderBottom: Palette.br__playlistItem
  },
  'fg-track-artwork': {
    margin: BlockSpace
  },
  '.trackDetail': {
    overflow: 'hidden',
    marginRight: `${BlockSpace}px`,
    flex: '1 0 0'
  },
  '.artist': {
    color: Palette.fg__trackDetail__light,
    fontSize: '0.8rem'
  },
  '.duration': {
    color: Palette.fg__trackDetail__light,
    fontSize: '0.8rem',
    marginRight: `${BlockSpace}px`
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
  },
  '.hide-text-overflow': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
}
