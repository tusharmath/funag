/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'
import {addRules} from '../../lib/JSSHelpers'
import {BlockHeight} from '../../lib/Themes'

export default addRules({
  playlist: {
    marginTop: `${BlockHeight * 2}px`,
    marginBottom: `${BlockHeight}px`
  },
  'disableScroll': {
    overflow: 'hidden'
  }
})
