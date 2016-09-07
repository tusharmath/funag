/**
 * Created by imamudin.naseem on 07/09/16.
 */

'use strict'

import {createStyleSheet} from '../../lib/JSSHelpers'
import {BlockSpace, BlockHeight} from '../../lib/Themes'

const px = x => `${x}px`
export default createStyleSheet({
  '.container': {
    height: px(BlockHeight),
    width: px(BlockHeight),
    margin: px(BlockSpace),
    opacity: '0',
    transition: 'opacity 500ms'
  }
})
