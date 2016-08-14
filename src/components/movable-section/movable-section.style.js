/**
 * Created by tushar.mathur on 10/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import {flexRow, flexSpread} from '../html/flex-box'

export default create({
  movableSection: {
    overflowX: 'hidden',
    '& .box': {
      willChange: 'transform'
    },
    '& content': {
      extend: flexRow,
      width: '100%',
      margin: 0,
      listStyle: 'none',
      padding: 0,
      '& section': {
        extend: flexSpread
      }
    }
  }
})
