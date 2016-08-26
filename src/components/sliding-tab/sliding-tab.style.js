/**
 * Created by tushar.mathur on 26/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import {row, col, jc_c, ai_c, spread} from 'flex-jss'
import {BlockSpace, BlockHeight, Palette} from '../../lib/Themes'

export default addRules({
  'navContainer': {
    backgroundColor: Palette.bg__tabsNavBar,
    boxShadow: Palette.zDepth__1,
    '& ul': {
      extend: [row],
      listStyle: 'none',
      padding: 0,
      margin: 0,
      '& li': {
        extend: [col, jc_c, ai_c, spread],
        fontWeight: 'bold',
        padding: BlockSpace,
        height: BlockHeight,
        boxSizing: 'border-box'
      }
    },
    '& .control': {
      backgroundColor: Palette.bg__tabsNavBarSlider,
      height: 2,
      transition: 'transform 100ms ease-in'
    }
  },
  'contentSection': {
    width: '100%',
    overflow: 'hidden',
    '& ul': {
      transition: 'transform 100ms ease-in',
      extend: [row],
      listStyle: 'none',
      padding: 0,
      margin: 0,
      '& li': {
        extend: [col, jc_c, ai_c, spread]
      }
    }
  }
})
