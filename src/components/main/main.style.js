/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import css from '../playlist/playlist.style'
import {BlockHeight, ScrobberHeight} from '../../lib/Themes'

export default addRules({
  main: {
    paddingBottom: BlockHeight + ScrobberHeight,
    paddingTop: BlockHeight
  },
  touchStarted: {
    [`& .${css.playlist}`]: {
      overflow: 'hidden'
    }
  }
})
