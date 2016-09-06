/**
 * Created by tushar.mathur on 03/09/16.
 */

'use strict'

import {Jss} from 'jss'
import preset from 'jss-preset-default'

const jss = new Jss(preset())

export default jss.createStyleSheet({
  'swipeablePane': {
    width: '100%',
    overflowX: 'hidden'
  },
  'movingPane': {
    transition: 'transform 100ms ease-in',
    display: 'flex',
    '& > *': {
      display: 'table-cell'
    }
  },
  'noAnime': {
    transition: 'none !important',
    willChange: 'transform'
  }
})
