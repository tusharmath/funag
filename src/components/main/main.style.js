/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import css from '../playlist/playlist.style'

export default addRules({
  main: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& > div:nth-child(2)': {
      overflow: 'auto',
      flexGrow: 1
    }
  },
  touchStarted: {
    [`& .${css.playlist}`]: {
      overflow: 'hidden'
    }
  }
})
