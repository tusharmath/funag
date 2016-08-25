/**
 * Created by imamudin.naseem on 08/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import {Palette} from '../../lib/Themes'

export default addRules({
  controlsContainer: {
    transform: 'translateZ(0)',
    boxShadow: Palette.zDepth__1,
    backgroundColor: Palette.bg__control,
    color: Palette.fg__control
  },
  translateDown: {
    transform: 'translateY(20px)',
    height: '0px'
  },
  translateUp: {
    transition: 'height 200ms linear'
  }
})
