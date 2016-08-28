/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import {BlockSpace, Palette} from '../../lib/Themes'

export default addRules({
  'header': {
    backgroundColor: Palette.bg__tabsNavBar,
    width: '100%',
    zIndex: 1,
    boxShadow: Palette.zDepth__1,
    '& small': {
      color: Palette.fg__trackDetail__light,
      fontSize: '0.6rem',
      lineHeight: '1rem'
    }
  },
  headerText: {
    paddingLeft: BlockSpace,
    minHeight: '38px'
  }
})
