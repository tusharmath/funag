/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {attachStyleSheet} from '../../lib/JSSHelpers'
import * as T from '../../lib/Themes'

export default attachStyleSheet({
  input: {
    border: 'none',
    flex: '1 0 0',
    fontSize: '1rem',
    color: T.Palette.fg__search,
    fontWeight: '600',
    outline: 'none',
    backgroundColor: 'transparent'
  },
  container: {
    paddingLeft: `${T.BlockSpace}px`,
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
