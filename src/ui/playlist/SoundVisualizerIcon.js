/**
 * Created by tushar.mathur on 24/04/16.
 */

'use strict'

import {ul, li, div} from '@cycle/dom'
import * as S from '../../Utils/StyleUtils'
import './SoundVisualizerIcon.less'

export default div({style: S.block(35)}, [
  ul('.animate-sound-visualizer', {style: S.size(17)}, [
    li(), li(), li()
  ])
])
