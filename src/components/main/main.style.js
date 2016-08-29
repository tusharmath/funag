/**
 * Created by tushar.mathur on 07/08/16.
 */

'use strict'

import {addRules} from '../../lib/JSSHelpers'
import playlistCSS from '../playlist/playlist.style'
import swCardCSS from '../swipeable-card/swipeable-card.style'

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
    [`& .${playlistCSS.playlist}`]: {
      overflow: 'hidden'
    },
    [`& .${swCardCSS.swipeableCard} ul`]: {
      transition: 'none !important',
      willChange: 'transform'
    }
  }
})
