/**
 * Created by tushar.mathur on 10/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import {rowSpaceAround, flexSpread} from '../html/flex-box'
import {Palette} from '../../lib/Themes'

export default create({
  tabs: {
    color: Palette.fg__tabsNavBar,
    fontWeight: '600',
    textAlign: 'center'
  },
  tabsNavBar: {
    extend: rowSpaceAround,
    padding: 0,
    listStyle: 'none',
    margin: 0,
    '& li': {
      padding: '15px 0px',
      extend: flexSpread,
      transition: 'color 300ms linear',
      '&.active': {
        color: Palette.fg__tabsNavBar__active
      }
    }
  },
  tabNavBarSlider: {
    height: 2,
    backgroundColor: Palette.bg__tabsNavBarSlider,
    transition: 'all 300ms linear'
  },
  tabSection: {}
})
