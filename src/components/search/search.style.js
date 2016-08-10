/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import * as T from '../../lib/Themes'

export default create({
  input: {
    border: 'none',
    flex: '1 0 0',
    color: T.Palette.fg__search,
    outline: 'none',
    backgroundColor: 'transparent'
  },
  searchContainer: {
    boxShadow: T.Palette.zDepth__1,
    transform: 'translateZ(0)',
    backgroundColor: T.Palette.bg__search,
    color: T.Palette.fg__search,
    margin: '0'
  },
  inputContainer: {
    minHeight: `${T.BlockHeight}px`
  }
})
