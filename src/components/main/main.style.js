/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {create} from '../../lib/CreateStyle'
import * as F from '../../lib/Flexbox'

export default create({
  main: {
    ...F.FlexCol,
    height: '100%'
  }
})
