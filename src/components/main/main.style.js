/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import css from '../playlist/playlist.style'

export default addRules({
  touchStarted: {
    [`& .${css.playlist}`]: {
      overflow: 'hidden'
    }
  }
})
