/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import playlistCSS from '../playlist/playlist.style'

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
  equalWidth: {
    display: 'table',
    tableLayout: 'fixed',
    width: '100%',
    '& > *': {
      display: 'table-cell',
      width: '100%'
    }
  },
  touchStarted: {
    [`& .${playlistCSS.playlist}`]: {
      overflow: 'hidden'
    }
  }
})
