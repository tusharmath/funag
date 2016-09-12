/**
 * Created by tushar.mathur on 12/09/16.
 */

'use strict'

import {createStyleSheet} from '../../lib/JSSHelpers'
import {BlockHeight, BlockSpace} from '../../lib/Themes'

export default createStyleSheet({
  '.icon-button': {
    height: `${BlockHeight}px`,
    margin: 0,
    padding: BlockSpace,
    border: 0,
    background: 0,
    width: `${BlockHeight}px`,
    color: 'var(--fg-button-color, inherit)',
    '&:focus': {
      outline: 0
    }
  },
  '.--wide': {
    width: '100%',
    textAlign: 'left',
    fontWeight: 500
  }
})
