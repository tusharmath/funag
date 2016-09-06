/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import {BlockSpace, Palette, BlockHeight} from '../../lib/Themes'
import {jc_c as jcc, col} from 'flex-jss'

export default addRules({
  headerContainer: {
    backgroundColor: Palette.bg__header,
    boxShadow: Palette.zDepth__1,
    color: Palette.fg__header,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1,
    '& small': {
      color: Palette.fg__trackDetail__light,
      fontSize: '0.6rem',
      lineHeight: '1rem'
    }
  },
  headerText: {
    extend: [col, jcc],
    paddingLeft: BlockSpace,
    height: BlockHeight
  }
})
