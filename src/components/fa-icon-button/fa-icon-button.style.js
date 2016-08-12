/**
 * Created by tushar.mathur on 09/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import {BlockHeight} from '../../lib/Themes'

export default create({
  faLink: {
    textDecoration: 'none',
    color: 'initial',
    '& div': {
      fontSize: '1rem',
      height: BlockHeight,
      width: BlockHeight
    }
  }
})
