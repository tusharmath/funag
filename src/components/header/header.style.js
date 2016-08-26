/**
 * Created by tushar.mathur on 25/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import {Palette, BlockSpace} from '../../lib/Themes'
import {jc_c as jcc, col} from 'flex-jss'

export default addRules({
  headerContainer: {
    backgroundColor: Palette.bg__header,
    color: Palette.fg__header,
    transform: 'translateZ(0)',
    '& small': {
      color: Palette.fg__trackDetail__light,
      fontSize: '0.6rem',
      lineHeight: '1rem'
    }
  },
  headerText: {
    extend: [col, jcc],
    paddingLeft: BlockSpace
  }
})
