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
    transition: 'transform 100ms ease-in',
    willChange: 'transform',
    transform: 'translateX(-100%)',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  '.scrobberIcon': {
    height: BlockHeight,
    width: BlockHeight,
    transform: 'translateY(-50%) translateX(50%)'
  }
})
