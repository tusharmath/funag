/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import * as T from '../../lib/Themes'

export default addRules({
  input: {
    border: 'none',
    flex: '1 0 0',
    fontSize: '1rem',
    color: T.Palette.fg__search,
    fontWeight: '600',
    outline: 'none',
    backgroundColor: 'transparent'
  },
  searchContainer: {
    paddingLeft: `${T.BlockSpace}px`,
    transform: 'translateZ(0)',
    color: T.Palette.fg__search,
    margin: '0'
  },
  inputContainer: {
    minHeight: `${T.BlockHeight}px`
  }
})
