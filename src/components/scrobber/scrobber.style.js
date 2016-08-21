/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {createShadowStyle} from '../../lib/CreateStyle'
import {Palette, BlockHeight} from '../../lib/Themes'

export default createShadowStyle({
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
    background: 'rgba(0,0,0, 0.2)',
    transform: 'translateY(-50%) translateX(50%)'
  }
})
