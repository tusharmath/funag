/**
 * Created by tushar.mathur on 08/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import * as T from '../../lib/Themes'
import * as F from '../../lib/Flexbox'

export default create({
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
    boxShadow: T.Palette.sd__intense,
    transform: 'translateZ(0)',
    backgroundColor: T.Palette.bg__search,
    color: T.Palette.fg__search,
    margin: '0'
  },
  inputContainer: {
    ...F.RowSpaceAround,
    alignItems: 'center',
    minHeight: `${T.BlockHeight}px`
  }
})
