/**
 * Created by tushar.mathur on 26/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import {row, col, jc_c as jcc, ai_c as aic, spread} from 'flex-jss'
import {BlockSpace, BlockHeight, Palette} from '../../lib/Themes'

export default addRules({
  'tabHeader': {
    backgroundColor: Palette.bg__tabsNavBar,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1,
    boxShadow: Palette.zDepth__1,
    '& small': {
      color: Palette.fg__trackDetail__light,
      fontSize: '0.6rem',
      lineHeight: '1rem'
    }
  },
  'navContainer': {
    '& ul': {
      extend: [row],
      listStyle: 'none',
      padding: 0,
      margin: 0,
      '& li': {
        extend: [col, jcc, aic, spread],
        fontWeight: 'bold',
        padding: BlockSpace,
        height: BlockHeight,
        boxSizing: 'border-box'
      }
    },
    '& .control-container': {
      transition: 'transform 200ms ease-in'
    },
    '& .control': {
      backgroundColor: Palette.bg__tabsNavBarSlider,
      height: 2
    }
  }
})
