/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import {ul, li, div} from '@cycle/dom'
import * as F from '../../Utils/Flexbox'
import './SoundVisualizerIcon.less'

export default div({style: {height: '35px', width: '35px', ...F.RowMiddle}}, [
  ul('.animate-sound-visualizer', {style: {width: '15px', height: '15px'}}, [
    li(), li(), li(), li()
  ])
])
