/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {createStyleSheet} from '../../lib/JSSHelpers'
import {Palette, BlockHeight} from '../../lib/Themes'

export default createStyleSheet({
  '.scrobber': {
    width: '100%'
  },
  '.wrapper': {},
  '.scrobberTrack': {
    background: Palette.bg__scrobberTrack,
    height: '2px',
    transformOrigin: 'left',
    transition: 'transform 1000ms cubic-bezier(0, 0, 0.2, 1)',
    willChange: 'transform',
    transform: 'translateX(-100%)',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  '.scrobberIcon': {
    height: BlockHeight / 2,
    width: BlockHeight,
    transform: 'translateY(-50%) translateX(50%)'
  },
  '.disableAnime': {
    transition: 'none !important'
  }
})
