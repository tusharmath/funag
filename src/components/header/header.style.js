/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'
import {create} from '../../lib/CreateStyle'
import {BlockSpace, Palette} from '../../lib/Themes'

export default create({
  headerContainer: {
    backgroundColor: Palette.bg__header,
    boxShadow: Palette.zDepth__1,
    color: Palette.fg__header,
    transform: 'translateZ(0)',
    '& small': {
      color: Palette.fg__trackDetail__light,
      fontSize: '0.6rem',
      lineHeight: '1rem'
    }
  },
  headerText: {
    paddingLeft: BlockSpace
  }
})
