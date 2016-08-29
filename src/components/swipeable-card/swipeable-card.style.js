/**
 * Created by tushar.mathur on 28/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'

export default addRules({
  'swipeableCardContainer': {
    width: '100%',
    overflow: 'hidden'
  },
  'swipeableCard': {
    '& ul': {
      width: '100%',
      transition: 'transform 200ms ease-in',
      display: 'table',
      tableLayout: 'fixed',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      '& li': {
        display: 'table-cell'
      }
    }
  }
})
