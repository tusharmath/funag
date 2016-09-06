/**
 * Created by imamudin.naseem on 08/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import {Palette} from '../../lib/Themes'

export default addRules({
  controlsContainer: {
    boxShadow: Palette.zDepth__1,
    backgroundColor: Palette.bg__control,
    color: Palette.fg__control,
    width: '100%'
  },
  hide: {
    display: 'none'
  }
})
