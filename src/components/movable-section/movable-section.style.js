/**
 * Created by tushar.mathur on 10/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import {flexRow, flexSpread} from '../html/flex-box'

export default create({
  movableSection: {
    overflowX: 'hidden',
    '& ul': {
      extend: flexRow,
      margin: 0,
      listStyle: 'none',
      padding: 0,
      '& li': {
        extend: flexSpread
      }
    }
  }
})
